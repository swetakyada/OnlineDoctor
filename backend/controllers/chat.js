import Chat from "../models/chat.js";

export const createChat = async (req, res) => {
  console.log(req.body);
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
      });
      await chat.save();
    }
    res.json({ status: "ok", chat: chat });
  } catch (err) {
    console.log(err);
    res.json({ status: "error", error: err });
  }
};

export const getChat = async (req, res) => {
  console.log(req.body);
  try {
    const chat = await Chat.find({
      _id: req.body.id,
    });
    res.json(chat);
  } catch (err) {
    res.json({ status: "error", error: err });
  }
};

export const getUserChats = async (req, res) => {
  console.log(req.body);
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
  console.log(req.body);
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
    chat.messages.push({
      content: req.body.message,
      isDoctor: req.body.isDoctor,
      time: Date.now(),
    });
    await chat.save();
    res.json({ status: "ok" });
  } catch (err) {
    console.log(error);
    res.json({ status: "error" });
  }
};
