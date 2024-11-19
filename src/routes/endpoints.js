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
};

export default configureRoutes;
