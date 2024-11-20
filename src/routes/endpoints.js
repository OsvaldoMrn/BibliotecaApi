import path from 'path';

const configureRoutes = (app, pool, __dirname) => {
    // Ruta principal
    app.get('/', (req, res) => {
        res.sendFile(path.join(__dirname, 'public', 'index.html'));
    });

    // Ping
    app.get('/ping', async (req, res) => {
        try {
            const [rows] = await pool.query('SELECT NOW()');
            res.json(rows);
        } catch (error) {
            console.error('Error querying database:', error);
            res.status(500).json({ error: 'Database error' });
        }
    });

    // Test tablas
    app.get('/test', async (req, res) => {
        try {
            const [rows] = await pool.query('SHOW TABLES');
            res.json({ tables: rows });
        } catch (error) {
            console.error('Error in /test:', error.message);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    });

    // Tabla específica
    const tables = ['administrador', 'usuario', 'libro', 'autor', 'genero', 'prestamo'];
    tables.forEach((table) => {
        app.get(`/test/${table}`, async (req, res) => {
            try {
                const [rows] = await pool.query(`SELECT * FROM ${table.charAt(0).toUpperCase() + table.slice(1)}`);
                res.json(rows);
            } catch (error) {
                console.error(`Error en /test/${table}:`, error.message);
                res.status(500).json({ error: `Error al obtener datos de ${table}` });
            }
        });
    });

    // Login
    app.post('/login', async (req, res) => {
        const { email_usuario, pass_usuario } = req.body;
        try {
            const [rows] = await pool.query('SELECT * FROM Usuario WHERE email_usuario = ?', [email_usuario]);
            if (rows.length === 0) {
                return res.status(404).json({ error: 'Usuario no encontrado' });
            }
            const user = rows[0];
            if (user.pass_usuario !== pass_usuario) {
                return res.status(401).json({ error: 'Contraseña incorrecta' });
            }
            res.status(200).json({ message: 'Inicio de sesión exitoso', user });
        } catch (error) {
            console.error('Error en /login:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    });

    // Registro
    app.post('/register', async (req, res) => {
        const { nombre_usuario, email_usuario, pass_usuario } = req.body;
        if (!nombre_usuario || !email_usuario || !pass_usuario) {
            return res.status(400).json({ error: 'Todos los campos son obligatorios' });
        }
        try {
            const query = 'INSERT INTO Usuario (nombre_usuario, email_usuario, pass_usuario) VALUES (?, ?, ?)';
            const [result] = await pool.query(query, [nombre_usuario, email_usuario, pass_usuario]);
            res.status(201).json({ message: 'Usuario registrado exitosamente', userId: result.insertId });
        } catch (error) {
            console.error('Error en /register:', error.message);
            res.status(500).json({ error: 'Error al registrar usuario' });
        }
    });

    app.patch('/update/:type', async (req, res) => {
        const { type } = req.params; // "usuario" o "administrador"
        const { id, ...fieldsToUpdate } = req.body; // ID del registro y campos a actualizar
    
        // Validar si el tipo es válido
        const validTypes = ['usuario', 'administrador'];
        if (!validTypes.includes(type)) {
            return res.status(400).json({ error: `Tipo no válido. Use: ${validTypes.join(', ')}` });
        }
    
        // Verificar que se haya enviado un ID
        if (!id) {
            return res.status(400).json({ error: 'Se requiere un ID para actualizar el registro' });
        }
    
        try {
            // Construir la consulta SQL dinámica
            const updates = Object.keys(fieldsToUpdate)
                .map(field => `${field} = ?`)
                .join(', ');
            const values = Object.values(fieldsToUpdate);
    
            if (updates.length === 0) {
                return res.status(400).json({ error: 'No hay campos para actualizar' });
            }
    
            // Ejecutar la consulta
            const query = `UPDATE ${type.charAt(0).toUpperCase() + type.slice(1)} SET ${updates} WHERE id_${type} = ?`;
            const [result] = await pool.query(query, [...values, id]);
    
            if (result.affectedRows === 0) {
                return res.status(404).json({ error: `${type} con ID ${id} no encontrado` });
            }
    
            res.status(200).json({ message: `${type} actualizado exitosamente` });
        } catch (error) {
            console.error(`Error actualizando ${type}:`, error.message);
            res.status(500).json({ error: `Error al actualizar ${type}` });
        }
    });
    // Ruta para añadir un libro
    app.post('/add/book', async (req, res) => {
        const { titulo, anio_publicacion, disponibilidad, autores, generos } = req.body;

        if (!titulo || !anio_publicacion || !disponibilidad || !autores || !generos) {
            return res.status(400).json({ error: 'Todos los campos son obligatorios' });
        }

        const connection = await pool.getConnection(); // Obtener conexión de la base de datos
        await connection.beginTransaction(); // Iniciar transacción

        try {
            // 1. Insertar el libro en la tabla Libro
            const [bookResult] = await connection.query(
                'INSERT INTO Libro (titulo_libro, fecha_publicacion_libro, disponibilidad_libro) VALUES (?, ?, ?)',
                [titulo, anio_publicacion]
            );
            const bookId = bookResult.insertId; // Obtener el ID del libro insertado

            // 2. Insertar o verificar autores
            for (const autor of autores) {
                let [authorRows] = await connection.query(
                    'SELECT id FROM Autor WHERE nombre_autor = ?',
                    [autor]
                );

                let authorId;
                if (authorRows.length === 0) {
                    const [authorResult] = await connection.query(
                        'INSERT INTO Autor (nombre_autor) VALUES (?)',
                        [autor]
                    );
                    authorId = authorResult.insertId;
                } else {
                    authorId = authorRows[0].id;
                }

                // Insertar relación en la tabla intermedia libro_autor
                await connection.query(
                    'INSERT INTO libro_autor (id_libro, id_autor) VALUES (?, ?)',
                    [bookId, authorId]
                );
            }

            // 3. Insertar o verificar géneros
            for (const genero of generos) {
                let [genreRows] = await connection.query(
                    'SELECT id FROM Genero WHERE nombre_genero = ?',
                    [genero]
                );

                let genreId;
                if (genreRows.length === 0) {
                    const [genreResult] = await connection.query(
                        'INSERT INTO Genero (nombre_genero) VALUES (?)',
                        [genero]
                    );
                    genreId = genreResult.insertId;
                } else {
                    genreId = genreRows[0].id;
                }

                // Insertar relación en la tabla intermedia libro_genero
                await connection.query(
                    'INSERT INTO Genero_libro (id_libro, id_genero) VALUES (?, ?)',
                    [bookId, genreId]
                );
            }

            // Confirmar transacción
            await connection.commit();
            res.status(201).json({ message: 'Libro añadido exitosamente', bookId });
        } catch (error) {
            // Deshacer cambios si algo falla
            await connection.rollback();
            console.error('Error en /add/book:', error.message);
            res.status(500).json({ error: 'Error al añadir el libro' });
        } finally {
            connection.release(); // Liberar conexión
        }
    });
};

export default configureRoutes;
