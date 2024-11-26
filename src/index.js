import express from 'express';
import path from 'path';
import { createPool } from 'mysql2/promise';
import { fileURLToPath } from 'url';
import configureRoutes from './routes/endpoints.js';

const app = express();
const pool = createPool({
    host: 'mysqldb',
    user: 'root',
    password: 'admin',
    port: 3306,
    database: 'biblioteca',
    charset: 'utf8mb4',
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));


app.use((req, res, next) => {
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    next();
});

// Configurar rutas
configureRoutes(app, pool, __dirname);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
