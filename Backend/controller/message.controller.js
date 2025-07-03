const asyncHandler = require("express-async-handler");
const Message = require("../Models/message.model");
const User = require("../Models/user.model");
const Chat = require("../Models/chat.model");

const sendMessage = asyncHandler(async (req, res) => {
  const { content, chatId } = req.body;

  if (!content || !chatId) {
    console.log("Invalid Data passed into request");
    return res
      .status(400)
      .json({ Message: "Invalid Data passed into request" });
  }

  let newMessage = {
    sender: req.user._id,
    content: content,
    chat: chatId,
  };

  try {
    var message = await Message.create(newMessage);

    message = await message.populate("sender", "name pic");
    message = await message.populate("chat");
    message = await User.populate(message, {
      path: "chat.users",
      select: "name email pic",
    });

    await Chat.findByIdAndUpdate(
      req.body.chatId,
      {
        lastestMessage: message,
      },
      {
        new: true,
      }
    );

    return res.status(200).json(message);
  } catch (error) {
    console.log("error is ", error);
    return res.status(500).json(error.message);
  }
});

module.exports = {
  sendMessage,
};
