const express = require('express');
const router = express.Router();
const authenticateJWT = require('../middleware/authenticateJWT');
const authorizeRole = require('../middleware/authorizeRole');

// Route yang memerlukan autentikasi
router.get('/profile', authenticateJWT, (req, res) => {
  res.json(req.user);
});

// Route yang memerlukan otorisasi admin
router.get('/admin', authenticateJWT, authorizeRole(['admin']), (req, res) => {
  res.json({ message: 'Welcome Admin' });
});

// Route yang memerlukan otorisasi user
router.get('/user', authenticateJWT, authorizeRole(['user']), (req, res) => {
  res.json({ message: 'Welcome User' });
});

module.exports = router;
