require('dotenv').config()
const express = require('express')
const mysql = require('mysql2')
const cors = require('cors')

const app = express()
app.use(cors())
const port = process.env.PORT || 3000

const connection = mysql.createConnection(process.env.DATABASE_URL)

app.get('/api/data', (req, res) => {
    connection.query('SELECT * FROM  posts', (error, results) => {
      if (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Internal server error' });
      } else {
        res.json(results);
      }
    });
  });

  app.listen(port, () => {
    console.log(`Open http://localhost:3000`);
  });