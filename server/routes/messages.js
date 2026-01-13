const express = require('express');
const router = express.Router();
const {
  getConversations,
  getMessages,
  sendMessage,
  getUnreadCount
} = require('../controllers/messageController');
const { protect } = require('../middleware/auth');
const { createLimiter } = require('../middleware/rateLimiter');

router.use(protect);

router.get('/conversations', getConversations);
router.get('/unread/count', getUnreadCount);
router.get('/:carId/:userId', getMessages);
router.post('/', createLimiter, sendMessage);

module.exports = router;
