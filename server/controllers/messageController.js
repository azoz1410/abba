const Message = require('../models/Message');

// @desc    Get conversations
// @route   GET /api/messages/conversations
// @access  Private
exports.getConversations = async (req, res) => {
  try {
    const conversations = await Message.aggregate([
      {
        $match: {
          $or: [
            { sender: req.user._id },
            { receiver: req.user._id }
          ]
        }
      },
      {
        $sort: { createdAt: -1 }
      },
      {
        $group: {
          _id: {
            $cond: [
              { $eq: ['$sender', req.user._id] },
              '$receiver',
              '$sender'
            ]
          },
          lastMessage: { $first: '$$ROOT' }
        }
      },
      {
        $lookup: {
          from: 'users',
          localField: '_id',
          foreignField: '_id',
          as: 'user'
        }
      },
      {
        $lookup: {
          from: 'cars',
          localField: 'lastMessage.car',
          foreignField: '_id',
          as: 'car'
        }
      },
      {
        $unwind: '$user'
      },
      {
        $unwind: '$car'
      },
      {
        $project: {
          user: {
            _id: 1,
            name: 1,
            avatar: 1
          },
          car: {
            _id: 1,
            title: 1,
            images: 1
          },
          lastMessage: 1
        }
      }
    ]);

    res.json({
      success: true,
      data: conversations
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get messages with a user about a car
// @route   GET /api/messages/:carId/:userId
// @access  Private
exports.getMessages = async (req, res) => {
  try {
    const { carId, userId } = req.params;

    const messages = await Message.find({
      car: carId,
      $or: [
        { sender: req.user._id, receiver: userId },
        { sender: userId, receiver: req.user._id }
      ]
    })
      .populate('sender', 'name avatar')
      .populate('receiver', 'name avatar')
      .sort('createdAt');

    // Mark messages as read
    await Message.updateMany(
      {
        car: carId,
        sender: userId,
        receiver: req.user._id,
        isRead: false
      },
      { isRead: true }
    );

    res.json({
      success: true,
      data: messages
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Send message
// @route   POST /api/messages
// @access  Private
exports.sendMessage = async (req, res) => {
  try {
    const { car, receiver, content } = req.body;

    const message = await Message.create({
      car,
      sender: req.user._id,
      receiver,
      content
    });

    const populatedMessage = await Message.findById(message._id)
      .populate('sender', 'name avatar')
      .populate('receiver', 'name avatar')
      .populate('car', 'title images');

    res.status(201).json({
      success: true,
      data: populatedMessage
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get unread message count
// @route   GET /api/messages/unread/count
// @access  Private
exports.getUnreadCount = async (req, res) => {
  try {
    const count = await Message.countDocuments({
      receiver: req.user._id,
      isRead: false
    });

    res.json({
      success: true,
      data: { count }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
