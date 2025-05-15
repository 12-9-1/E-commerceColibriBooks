// controllers/message.controller.js
const Message = require('../models/modelMessage');

const sendMessage = async (req, res) => {
  try {
    const { user, book, content } = req.body;
    const message = new Message({ user, book, content });
    await message.save();
    res.status(201).json(message);
  } catch (error) {
    res.status(500).json({ message: 'Error al enviar mensaje', error });
  }
};

const getAllMessages = async (req, res) => {
  try {
    const messages = await Message.find()
      .populate('user', 'nickname email')
      .populate('book', 'title');
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener mensajes', error });
  }
};

const updateMessageStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const updated = await Message.findByIdAndUpdate(id, { status }, { new: true });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar estado', error });
  }
};

const deleteMessage = async (req, res) => {
  try {
    await Message.findByIdAndDelete(req.params.id);
    res.json({ message: 'Mensaje eliminado' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar mensaje', error });
  }
};
const respondToMessage = async (req, res) => {
  try {
    const { id } = req.params;
    const { response } = req.body;

    const updated = await Message.findByIdAndUpdate(
      id,
      {
        adminResponse: response,
        status: 'respondido'
      },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: 'Mensaje no encontrado' });
    }

    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: 'Error al responder mensaje', error });
  }
};
const getMessagesByUser = async (req, res) => {
  try {
    const messages = await Message.find({ user: req.params.userId })
      .populate('book', 'title')
      .sort({ createdAt: -1 });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener mensajes del usuario', error });
  }
};




module.exports = {
  sendMessage,
  getAllMessages,
  updateMessageStatus,
  deleteMessage,
  respondToMessage,
 getMessagesByUser,
};
