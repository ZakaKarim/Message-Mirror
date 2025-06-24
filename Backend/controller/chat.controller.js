const Chat = require("../Models/chat.model");
const asyncHandler = require("express-async-handler");
const User = require("../Models/user.model");

const accessChat = asyncHandler(async (req, res) => {
  const { userId } = req.body;

  if (!userId) {
    return res
      .status(400)
      .json({ Message: "UserId does not sent with request" });
  }
  let isChat = await Chat.find({
    isGroupChat: false,
    $and: [
      { users: { $elemMatch: { $eq: req.user._id } } },
      { users: { $elemMatch: { $eq: userId } } },
    ],
  })
    .populate("users", "-password")
    .populate("lastestMessage");
  console.log("isChat before user popluate", isChat);
  //  console.log(JSON.parse(JSON.stringify(isChat)));

  isChat = await User.populate(isChat, {
    path: "lastestMessage.sender",
    select: "name email pic",
  });
  console.log("Final Data of ischat", isChat);
  if (isChat.length > 0) {
    return res.status(200).json(isChat[0]);
  } else {
    const chatData = {
      chatName: "sender",
      isGroupChat: false,
      users: [req.user._id, userId],
    };
    const createdChat = await Chat.create(chatData);
    const fullChat = await Chat.findOne({ _id: createdChat._id }).populate(
      "users",
      "-password"
    );
    return res.status(200).json(fullChat);
  }
});

const fetchChats = asyncHandler(async (req, res) => {
  try {
    const fetchchat = await Chat.find({
      users: { $elemMatch: { $eq: req.user._id } },
    })
      .populate("users", "-password")
      .populate("groupAdmin", "-password")
      .populate("lastestMessage")
      .sort({ createdAt: -1 })
      .then(async (results) => {
        results = await User.populate(results, {
          path: "lastestMessage.sender",
          select: "name email pic",
        });
        return res.status(200).json(results);
      });
  } catch (error) {
    return res.status(500).json({ Message: "Internal server error", error });
  }
});

const createGroupChat = asyncHandler(async (req, res) => {
  if (!req.body.users || !req.body.name) {
    return res.status(400).json({ Message: "Please Fill all the feilds" });
  }
  let users = JSON.parse(req.body.users);

  if (users.length < 2) {
    return res
      .status(400)
      .json({ Message: "More than two users are required to form a group" });
  }
  users.push(req.user);
  try {
    const groupChat = await Chat.create({
      chatName: req.body.name,
      isGroupChat: true,
      users: users,
      groupAdmin: req.user,
    });
    const fullGroupChat = await Chat.findOne({ _id: groupChat._id })
      .populate("users", "-password")
      .populate("groupAdmin", "-password");

    res.status(200).json({fullGroupChat});
  } catch (error) {
    return res.status(500).json({ Message: "Internal server error", error });
  }
});

const renameGroup = asyncHandler(async (req, res) => {
  const { chatId, chatName } = req.body;

  const updatedchat = await Chat.findByIdAndUpdate(
    chatId,
    {
      chatName,
    },
    {
      new: true,
    }
  )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");

  if (!updatedchat) {
    return res.status(404).json({ Message: "Error while updating the chat" });
  } else {
    return res.status(200).json({ updatedchat });
  }
});

const addToGroup = asyncHandler(async (req, res) => {
  const { chatId, userId } = req.body;

  const addedUser = await Chat.findByIdAndUpdate(
    chatId,
    {
      $push: { users: userId },
    },
    {
      new: true,
    }
  )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");

  if(!addedUser){
    return res.status(404).json({Message:"Error while Adding the member in the group"})
  }
  else{
    return res.status(200).json({addedUser});
  }
});


const removeFromGroup = asyncHandler(async(req,res)=>{
    const { chatId, userId } = req.body;

    const removedUser = await Chat.findByIdAndUpdate(
      chatId,
      {
        $pull: { users: userId },
      },
      {
        new: true,
      }
    )
      .populate("users", "-password")
      .populate("groupAdmin", "-password");
  
    if(!removedUser){
      return res.status(404).json({Message:"Error while Adding the member in the group"})
    }
    else{
      return res.status(200).json({removedUser});
    }
})

module.exports = {
  accessChat,
  fetchChats,
  createGroupChat,
  renameGroup,
  addToGroup,
  removeFromGroup
};
