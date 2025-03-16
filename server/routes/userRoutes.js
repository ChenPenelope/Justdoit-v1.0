const express = require('express');
const router = express.Router();
const db = require('../db');

// Route to create a new user
router.post('/', (req, res) => {
  const { name } = req.body;
  // check if the username is already taken
  const checkQuery = 'SELECT * FROM users WHERE username = ?';
  db.query(checkQuery, [name], (err, result) => {
    if (err) {
      res
        .status(500)
        .send(err);
      return;
    }
    if (result.length) {
      res
        .status(400)
        .send('Username already taken');
      return;
    }
    
    // add the user
    const query = 'INSERT INTO users (username, history_ids) VALUES (?, ?)';
    db.query(query, [name, '[]'], (err, result) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.send('User added!');
      }
    });
  });
});

// Route to get all users
router.get('/', (req, res) => {
  const query = 'SELECT * FROM users';
  db.query(query, (err, results) => {
    if (err) {
      res.status(500).send(err);
      return;
    }
    res.json(results);
  });
});

// Route to delete all users
router.delete('/', (req, res) => {
  const query = 'DELETE FROM users';
  db.query(query, (err, result) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.send('All users deleted!');
    }
  });
});

// Route to get an user by name
router.get('/name/:name', (req, res) => {
  const { name } = req.params;
  const query = 'SELECT * FROM users WHERE username = ?';
  db.query(query, [name], (err, results) => {
    if (err) {
      res.status(500
      ).send(err);
      return;
    }
    res.json(results[0]);
  });
});

// Route to update chips of an user
router.put('/:id/chips', (req, res) => {
  const { id } = req.params;
  const { chips } = req.body;
  const query = 'UPDATE users SET chips = ? WHERE id = ?';
  db.query(query, [chips, id], (err, result) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.send('Chips updated!');
    }
  });
});

// Route to update bet history of a user
router.put('/:id/history', (req, res) => {
  const { id } = req.params;
  const { historyIds } = req.body;
  const query = 'UPDATE users SET history_ids = JSON_ARRAY_APPEND(history_ids, \'$\', ?) WHERE id = ?';
  db.query(query, [JSON.stringify(historyIds), id], (err, result) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.send('Bet history updated!');
    }
  });
});

// Route to delete an user
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM users WHERE id = ?';
  db.query(query, [id], (err, result) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.send('User deleted!');
    }
  });
});




module.exports = router;