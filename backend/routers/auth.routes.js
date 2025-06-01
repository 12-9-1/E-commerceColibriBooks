const express = require('express');
const router = express.Router();
const { register, login, validateToken } = require('../controllers/auth.controller');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/register', register);
router.post('/login', login);

router.get('/validate', authMiddleware, validateToken);

module.exports = router;
