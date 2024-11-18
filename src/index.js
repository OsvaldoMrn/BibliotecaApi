import express from 'express'
import { createPool } from 'mysql2/promise'

const app = express()
const pool = createPool({
    host: 'mysqldb',
    user: 'root',
    password: 'admin',
    port: 3306,
    database: 'biblioteca',
})

app.use(express.json())

app.get('/', (req, res) =>{
    res.send('Hello world')
})

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

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})