import express from 'express'
import path from 'path';
import { createPool } from 'mysql2/promise'
import { fileURLToPath } from 'url';

const app = express()
const pool = createPool({
    host: 'mysqldb',
    user: 'root',
    password: 'admin',
    port: 3306,
    database: 'biblioteca',
})
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
  });

app.get('/ping', async (req, res) =>{
    try {
        const [rows] = await pool.query('SELECT NOW()')
        res.json(rows)
    } catch (error) {
        console.error('Error querying database:', error)
        res.status(500).json({ error: 'Database error' })
    }
})

app.get('/test', async (req, res) => {
    try {
        const [rows] = await pool.query('SHOW TABLES');
        res.json({ tables: rows });
    } catch (error) {
        console.error('Error in /test:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

// Para la tabla Administrador
app.get('/test/administrador', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM Administrador');
        res.json(rows);
    } catch (error) {
        console.error('Error en /test/administrador:', error.message);
        res.status(500).json({ error: 'Error al obtener datos de Administrador' });
    }
});

// Para la tabla Usuario
app.get('/test/usuario', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM Usuario');
        res.json(rows);
    } catch (error) {
        console.error('Error en /test/usuario:', error.message);
        res.status(500).json({ error: 'Error al obtener datos de Usuario' });
    }
});

// Para la tabla Libro
app.get('/test/libro', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM Libro');
        res.json(rows);
    } catch (error) {
        console.error('Error en /test/libro:', error.message);
        res.status(500).json({ error: 'Error al obtener datos de Libro' });
    }
});

// Para la tabla Autores
app.get('/test/autor', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM Autor');
        res.json(rows);
    } catch (error) {
        console.error('Error en /test/autor:', error.message);
        res.status(500).json({ error: 'Error al obtener datos de Autor' });
    }
});

// Para la tabla Genero
app.get('/test/genero', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM Genero');
        res.json(rows);
    } catch (error) {
        console.error('Error en /test/genero:', error.message);
        res.status(500).json({ error: 'Error al obtener datos de Genero' });
    }
});

// Para la tabla Prestamo
app.get('/test/prestamo', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM Prestamo');
        res.json(rows);
    } catch (error) {
        console.error('Error en /test/prestamo:', error.message);
        res.status(500).json({ error: 'Error al obtener datos de Prestamo' });
    }
});


// Ruta para iniciar sesión
app.post('/login', async (req, res) => {
    const { email_usuario, pass_usuario} = req.body;
    try {
        const [rows] = await pool.query('SELECT * FROM Usuario WHERE emai_usuario = ?', [email_usuario]);

        if (rows.length === 0) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        const user = rows[0];
        
        // Aquí puedes agregar una verificación de la contraseña, por ejemplo, usando bcrypt
        if (user.pass_usuario !== pass_usuario) {
            return res.status(401).json({ error: 'Contraseña incorrecta' });
        }

        res.status(200).json({ message: 'Inicio de sesión exitoso', user });
    } catch (error) {
        console.error('Error en /login:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

// Ruta para registrar un nuevo usuario
app.post('/register', async (req, res) => {
    console.log('Solicitud de registro recibida');
    const { nombre_usuario, email_usuario, pass_usuario } = req.body;

    try {
        // Verificar si el correo ya está registrado
        const [existingUser] = await pool.query('SELECT * FROM Usuario WHERE email_usuario = ?', [email_usuario]);
        if (existingUser.length > 0) {
            return res.status(400).json({ error: 'Correo electrónico ya registrado' });
        }

        // Insertar el nuevo usuario en la base de datos
        const [result] = await pool.query('INSERT INTO Usuario (nombre_usuario, email_usuario, pass_usuario) VALUES (?, ?, ?)', [nombre_usuario, email_usuario, pass_usuario]);

        res.status(201).json({ message: 'Usuario registrado exitosamente', id_usuario: result.insertId });
    } catch (error) {
        console.error('Error en /register:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});



const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})