const asyncHandler = require("express-async-handler");
const Chat = require("../models/chatModel");
const User = require("../models/userModel");

const accessChat = asyncHandler(async (req, res) => {
    if (!userId) {
        console.log("UserId param not sent with request");
        return res.sendStatus(400);
      }
    
      var isChat = await Chat.find({
        $and: [
          { user: { $elemMatch: { $eq: req.user._id } } },
          { user: { $elemMatch: { $eq: userId } } },
        ],
      }).populate("user", "-password").populate("doctor", "-password").populate("latestMessage");

      isChat = await User.populate(isChat, {
        path: "latestMessage.sender",
        select: "name pic email",
      });
}