import path from 'path';
import express from 'express';


const configureRoutes = (app, pool, __dirname) => {

    // Middleware para establecer el encabezado Content-Type en las respuestas HTML
app.use((req, res, next) => {
    if (req.headers.accept.includes('text/html')) {
        res.setHeader('Content-Type', 'text/html; charset=utf-8');
    }
    next(); // Llama al siguiente middleware o ruta
});

    // Sirve archivos estáticos desde la carpeta 'html'
    
    app.use(express.static(path.join(__dirname, 'public/html')));
    // Ruta principal

    app.get('/', (req, res) => {
        //res.setHeader('Content-Type', 'text/html; charset=utf-8');
        return res.sendFile(path.join(__dirname, 'public/html', 'index.html'));
    });

    app.get('/Usuario.html', (req, res) => {
        //res.setHeader('Content-Type', 'text/html; charset=utf-8');
        return res.sendFile(path.join(__dirname, 'public/html', 'Usuario.html'));
    });

    app.get('/homeUsuario.html', (req, res) => {
        //res.setHeader('Content-Type', 'text/html; charset=utf-8');
        return res.sendFile(path.join(__dirname, 'public/html', 'homeUsuario.html'));
    });

    app.get('/busqueda.html', (req, res) => {
        res.setHeader('Content-Type', 'text/html; charset=utf-8');
        return res.sendFile(path.join(__dirname, 'public/html', 'busqueda.html'));
    });

    app.get('/login/:idAdministrador', async (req, res) => {
        const idAdministrador = req.params.idAdministrador;
    
        try {
            // Consulta para verificar si el ID existe
            const [rows] = await pool.query('SELECT id_administrador FROM Administrador WHERE id_administrador = ?', [idAdministrador]);
    
            if (rows.length > 0) {
                // ID válido, envía el archivo HTML
                return res.sendFile(path.join(__dirname, 'public/html', 'loginAdministrador.html'));
            } else {
                // ID no encontrado, retorna error 403 (no autorizado)
                return res.status(403).send('No autorizado');
            }
        } catch (error) {
            // Manejo de errores del servidor
            console.error('Error en la consulta:', error);
            return res.status(500).send('Error interno del servidor');
        }
    });

    app.get('/homeAdmin', (req, res) => {
        return res.sendFile(path.join(__dirname, 'public/html', 'homeAdmin.html'));
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

     
     // Login 
    app.post('/login', async (req, res) => {
    const { email_usuario, pass_usuario } = req.body;

    // Verificar que se envíen todos los datos necesarios
    if (!email_usuario || !pass_usuario) {
        return res.status(400).json({ 
            success: false, 
            error: 'Correo y contraseña son obligatorios' 
        });
    }

    try {
        // Buscar al usuario en la base de datos por email
        const [rows] = await pool.query(
            'SELECT id_usuario, nombre_usuario, email_usuario, pass_usuario FROM Usuario WHERE email_usuario = ?', 
            [email_usuario]
        );

        if (rows.length === 0) {
            // Usuario no encontrado
            return res.status(404).json({ 
                success: false, 
                error: 'Usuario no encontrado' 
            });
        }

        const user = rows[0];

        // Verificar la contraseña
        if (user.pass_usuario !== pass_usuario) {
            return res.status(401).json({ 
                success: false, 
                error: 'Contraseña incorrecta' 
            });
        }

        

        // Responder con éxito y enviar información relevante del usuario
        res.status(200).json({
            success: true,
            message: 'Inicio de sesión exitoso',
            user: {
                id_usuario: user.id_usuario,
                nombre_usuario: user.nombre_usuario,
                email_usuario: user.email_usuario
            }
        });
        } catch (error) {
            console.error('Error en /login:', error.message);
            res.status(500).json({ 
                success: false, 
                error: 'Error interno del servidor' 
            });
        }
    });

    app.post('/loginAdmin', async (req, res) => {
         const { username_administrador, pass_administrador } = req.body;
    
         // Verificar que se envíen todos los datos necesarios
         if (!username_administrador || !pass_administrador) {
             return res.status(400).json({ 
                 success: false, 
                 error: 'Usuario y contraseña son obligatorios' 
             });
         }
    
         try {
             // Buscar al administrador en la base de datos por username
             const [rows] = await pool.query(
                 'SELECT id_administrador, nombre_administrador, username_administrador, pass_administrador FROM Administrador WHERE username_administrador = ?', 
                 [username_administrador]
             );
    
             if (rows.length === 0) {
                 // Administrador no encontrado
                 return res.status(404).json({ 
                     success: false, 
                     error: 'Administrador no encontrado' 
                 });
             }
    
             const admin = rows[0];
    
             // Verificar la contraseña
             if (admin.pass_administrador !== pass_administrador) {
                 return res.status(401).json({ 
                     success: false, 
                     error: 'Ocurrió un error al iniciar sesión' 
                 });
             }
    
             // Responder con éxito y enviar información relevante del administrador
             res.status(200).json({
                 success: true,
                 message: 'Inicio de sesión exitoso',
                 admin: {
                     id_administrador: admin.id_administrador,
                     nombre_administrador: admin.nombre_administrador,
                     username_administrador: admin.username_administrador
                 }
             });
         } catch (error) {
             console.error('Error en /login/administrador:', error.message);
             res.status(500).json({ 
                 success: false, 
                 error: 'Error interno del servidor' 
             });
         }
    });  
    
    
    //actualizar perfil
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

    //muestra la información para el perfil de usuario
    app.get('/usuario/:userId', async (req, res) => {
        const { userId } = req.params;
    
        try {
            const [rows] = await pool.query(
                'SELECT id_usuario, nombre_usuario, email_usuario FROM Usuario WHERE id_usuario = ?',
                [userId]
            );
    
            if (rows.length === 0) {
                return res.status(404).json({ success: false, error: 'Usuario no encontrado' });
            }
    
            res.status(200).json({
                success: true,
                user: rows[0],
            });
        } catch (error) {
            console.error('Error en /usuario/:userId:', error.message);
            res.status(500).json({ success: false, error: 'Error interno del servidor' });
        }
    });
    
    //muestra los prestamos del usuario, se requiere jalar el id
    app.get('/prestamos/:id_usuario', async (req, res) => {
        const { id_usuario } = req.params;
    
        if (!id_usuario) {
            return res.status(400).json({ error: 'ID de usuario no proporcionado' });
        }
    
        try {
            const [rows] = await pool.query(
                `SELECT p.id_prestamo, l.titulo_libro, p.fecha_inicio_prestamo, p.fecha_fin_prestamo, p.estado_prestamo 
                 FROM Prestamo p
                 INNER JOIN Libro l ON p.id_libro = l.id_libro
                 WHERE p.id_usuario = ?`,
                [id_usuario]
            );
    
            if (rows.length === 0) {
                // Respuesta clara cuando no hay préstamos
                return res.status(200).json({ message: 'No hay préstamos asociados a este usuario', loans: [] });
            }
    
            res.status(200).json({ loans: rows });
        } catch (error) {
            console.error('Error en /prestamos:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    });
    
    //GET book by name
    app.get('/libro/:name', async (req, res) => {
        const { name } = req.params;

        try {
            const query = 'SELECT * FROM Libro WHERE titulo_libro LIKE ?';
            const [rows] = await pool.query(query, [`%${name}%`]);

            if (rows.length === 0) {
                return res.status(404).json({ message: 'No se encontraron libros con ese título' });
            }

            res.status(200).json(rows);
        } catch (error) {
            console.error('Error en /book/:name:', error.message);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    });

    //get all libros
    // Ruta para obtener todos los libros con sus géneros y autores
    app.get('/libros', async (req, res) => {
        try {
            // Obtener los parámetros de paginación de la consulta
            const page = parseInt(req.query.page) || 1;  // Página actual (por defecto 1)
            const limit = parseInt(req.query.limit) || 60;  // Número de resultados por página (por defecto 10)
            const offset = (page - 1) * limit;  // Calculamos el offset para la consulta
    
            // Consulta SQL con paginación
            const query = `
                SELECT 
                    L.id_libro, 
                    L.titulo_libro, 
                    L.fecha_publicacion_libro, 
                    L.disponibilidad_libro,
                    A.id_autor, 
                    A.nombre_autor,
                    G.id_genero, 
                    G.nombre_genero
                FROM Libro L
                LEFT JOIN Autor_Libro LA ON L.id_libro = LA.id_libro
                LEFT JOIN Autor A ON LA.id_autor = A.id_autor
                LEFT JOIN Genero_Libro LG ON L.id_libro = LG.id_libro
                LEFT JOIN Genero G ON LG.id_genero = G.id_genero
                LIMIT ? OFFSET ?
            `;
    
            // Ejecutar la consulta con LIMIT y OFFSET
            const [rows] = await pool.query(query, [limit, offset]);
    
            if (rows.length === 0) {
                return res.status(404).json({ error: 'No se encontraron libros en la base de datos' });
            }
    
            // Agrupamos los datos por libro
            const libros = rows.reduce((acc, row) => {
                const libroIndex = acc.findIndex(libro => libro.id_libro === row.id_libro);
    
                if (libroIndex === -1) {
                    acc.push({
                        id_libro: row.id_libro,
                        titulo_libro: row.titulo_libro,
                        fecha_publicacion_libro: row.fecha_publicacion_libro,
                        disponibilidad_libro: row.disponibilidad_libro,
                        autores: row.id_autor ? [{ id_autor: row.id_autor, nombre_autor: row.nombre_autor }] : [],
                        generos: row.id_genero ? [{ id_genero: row.id_genero, nombre_genero: row.nombre_genero }] : []
                    });
                } else {
                    const libro = acc[libroIndex];
    
                    if (row.id_autor && !libro.autores.some(autor => autor.id_autor === row.id_autor)) {
                        libro.autores.push({ id_autor: row.id_autor, nombre_autor: row.nombre_autor });
                    }
    
                    if (row.id_genero && !libro.generos.some(genero => genero.id_genero === row.id_genero)) {
                        libro.generos.push({ id_genero: row.id_genero, nombre_genero: row.nombre_genero });
                    }
                }
    
                return acc;
            }, []);
    
            // Contamos el total de libros para calcular la paginación
            const totalQuery = `
                SELECT COUNT(*) AS total FROM Libro L
                LEFT JOIN Autor_Libro LA ON L.id_libro = LA.id_libro
                LEFT JOIN Autor A ON LA.id_autor = A.id_autor
                LEFT JOIN Genero_Libro LG ON L.id_libro = LG.id_libro
                LEFT JOIN Genero G ON LG.id_genero = G.id_genero
            `;
            const [[{ total }]] = await pool.query(totalQuery);
    
            // Enviar la respuesta con la información paginada
            res.status(200).json({
                total,
                page,
                limit,
                total_pages: Math.ceil(total / limit),
                books: libros
            });
        } catch (error) {
            console.error('Error en /libros:', error.message);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    });    

    //ESTOS DOS NO FUNCIONAN <----------------------------------------------------------------------
    //filtros
    app.get('/libro/filtros', async (req, res) => {
        const { genero } = req.body;

        if (!genero) {
            return res.status(400).json({ error: 'El campo "genero" es obligatorio' });
        }

        try {
            // Obtener el ID del género desde la tabla Genero
            const generoQuery = 'SELECT id_genero FROM Genero WHERE nombre = ?';
            const [generoRows] = await pool.query(generoQuery, [genero]);

            if (generoRows.length === 0) {
                return res.status(404).json({ error: 'El género especificado no existe' });
            }

            const idGenero = generoRows[0].id_genero;

            // Obtener los libros asociados al género desde la tabla intermedia LibroGenero
            const librosQuery = `
                SELECT L.id, L.titulo, L.anio_publicacion, L.disponibilidad 
                FROM Libro L
                INNER JOIN LibroGenero LG ON L.id = LG.id_libro
                WHERE LG.id_genero = ?
            `;
            const [librosRows] = await pool.query(librosQuery, [idGenero]);

            if (librosRows.length === 0) {
                return res.status(404).json({ error: 'No se encontraron libros para el género especificado' });
            }

            res.status(200).json(librosRows);
        } catch (error) {
            console.error('Error en /libro/filtros:', error.message);
            res.status(500).json({ error: 'Error interno del servidor' });
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

