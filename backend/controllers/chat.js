import Chat from "../models/chat.js";

export const createChat = async (req, res) => {
  console.log("create Chat");
  try {
    var chat = await Chat.findOne({
      user: req.body.userId,
      doctor: req.body.doctorId,
    });

    if (!chat) {
      chat = new Chat({
        user: req.body.userId,
        doctor: req.body.doctorId,
        userName: req.body.userName,
        doctorName: req.body.doctorName,
        date: req.body.date,
        slot: req.body.slot,
      });
      await chat.save();
    } else {
      Chat.updateOne(
        { _id: chat._id },
        {
          $set: { date: req.body.date },
          $set: { slot: req.body.slot },
        },
        function (err, item) {
          if (err) {
            return res.json({ status: "error", error: "Not Updated!" });
          }
          return res.json({ status: "ok", chat: item });
        }
      );
    }
    res.json({ status: "ok", chat: chat });
  } catch (err) {
    console.log(err);
    res.json({ status: "error", error: err });
  }
};

export const getChat = async (req, res) => {
  console.log("Get chat");
  try {
    const chat = await Chat.findOne({
      _id: req.body.id,
    });
    res.json({ status: "ok", chat: chat });
  } catch (err) {
    res.json({ status: "error", error: err });
  }
};

export const getUserChats = async (req, res) => {
  console.log("get user chats");
  try {
    const chats = await Chat.find({
      user: req.body.id,
    });
    res.json(chats);
  } catch (err) {
    res.json({ status: "error", error: err });
  }
};

export const getDoctorChats = async (req, res) => {
  console.log("get doctor chats");
  try {
    const chats = await Chat.find({
      doctor: req.body.id,
    });
    res.json(chats);
  } catch (err) {
    res.json({ status: "error", error: err });
  }
};

export const addMessage = async (req, res) => {
  console.log(req.body);
  try {
    const chat = await Chat.findOne({
      _id: req.body.id,
    });
    if (!chat) {
      res.json({ status: "error" });
      return;
    }
    chat.messages.push({
      content: req.body.content,
      isDoctor: req.body.isDoctor,
      time: Date.now(),
    });
    await chat.save();
    res.json({ status: "ok" });
  } catch (error) {
    console.log(error);
    res.json({ status: "error" });
  }
};

export const getMessages = async (req, res) => {
  console.log("get messages");
  try {
    const chat = await Chat.findOne({
      _id: req.body.id,
    });
    res.json({ status: "ok", messages: chat.messages });
  } catch (err) {
    res.json({ status: "error", error: err });
  }
};

export const getDoctorSlots = async (req, res) => {
  console.log("get doctor slots");
  try {
    const chats = await Chat.find({
      doctor: req.body.id,
    });
    res.json(chats);
  } catch (err) {
    res.json({ status: "error", error: err });
  }
};

export const isSlotAvailable = (req, res) => {
  console.log(req.body);
  Chat.findOne({
    doctor: req.body.id,
    date: req.body.date,
    slot: req.body.slot,
  })
    .then((chat) => res.status(200).json(chat))
    .catch((err) =>
      res.status(201).json({ message: "unknown error occurred" })
    );
};
