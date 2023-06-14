require('dotenv').config()
const express = require('express')
const mysql = require('mysql2')
const cors = require('cors')

const app = express()
app.use(cors())
const port = process.env.PORT || 3000

const connection = mysql.createConnection(process.env.DATABASE_URL)

// Getting all posts
app.get('/api/data', (req, res) => {
    connection.query('SELECT * FROM  posts', (error, results) => {
      if (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Internal server error' });
      } else {
        res.json({posts : results});
      }
    });
});

// Getting individual posts
app.get('/api/post', (req, res) => {
  const postId = req.query.post;

  if (!postId) {
    res.status(400).json({ error: 'Post ID is required' });
    return;
  }

  connection.query('SELECT * FROM posts WHERE id = ?', [postId], (error, results) => {
    if (error) {
      console.error('Error fetching data:', error);
      res.status(500).json({ error: 'Internal server error' });
    } else if (results.length === 0) {
      res.status(404).json({ error: 'Post not found' });
    } else {
      const post = results[0];
      res.json({ post });
    }
  });
});

  app.listen(port, () => {
    console.log(`Open http://localhost:3000`);
  });