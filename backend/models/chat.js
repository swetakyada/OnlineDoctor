import mongoose from "mongoose";

const chatSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  doctor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Doctor",
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
  doctorName: {
    type: String,
    required: true,
  },
  messages: [
    {
      content: { type: String },
      isDoctor: { type: Boolean },
      time: { type: Date, default: Date.now },
    },
  ],
});

const Chat = mongoose.model("Chat", chatSchema);

export default Chat;
