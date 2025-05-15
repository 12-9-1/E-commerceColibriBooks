// routers/message.routes.js
const express = require('express');
const router = express.Router();
const {
  sendMessage,
  getAllMessages,
  updateMessageStatus,
  deleteMessage,
  respondToMessage,
  getMessagesByUser,
} = require('../controllers/message.controller');

router.post('/', sendMessage);
router.get('/', getAllMessages); // solo el admin debería verlos
router.put('/:id/status', updateMessageStatus);
router.delete('/:id', deleteMessage);
router.put('/:id/respond', respondToMessage);
router.get('/user/:userId', getMessagesByUser);




module.exports = router;
