import React, { useEffect, useState } from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import axios from "axios";

function ChatRoom({ room, chat, socket }) {
  console.log(room);
  const user = JSON.parse(localStorage.getItem("user"));
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [click, SetClick] = useState(false);

  useEffect(async () => {
    console.log("Called!!!");
    const response = await axios.post(
      "http://localhost:5000/chat/get_messages",
      {
        id: room,
      }
    );
    setMessageList(response.data.messages);
  }, [room, click]);

  const sendMessage = async () => {
    if (currentMessage.length > 0) {
      socket.current.emit("send-msg", {
        to: chat.doctor,
        from: user.id,
        message: currentMessage,
      });

      await axios.post("http://localhost:5000/chat/add_message", {
        id: room,
        content: currentMessage,
        isDoctor: false,
      });
      setCurrentMessage("");
      // const msgs = [...messageList];
      // msgs.push({ content: currentMessage, isDoctor: false, time: Date.now() });
      // setMessageList(msgs);
      setMessageList((msgs) => [
        ...msgs,
        { content: currentMessage, isDoctor: false, time: Date.now() },
      ]);
    }
  };

  useEffect(() => {
    if (socket.current) {
      socket.current.on("msg-recieve", (currentMessage) => {
        console.log("Arrival");
        setArrivalMessage({
          content: currentMessage,
          isDoctor: true,
          time: Date.now(),
        });
      });
    }
  }, [socket]);

  useEffect(() => {
    console.log("Add Arrival");
    if (arrivalMessage) {
      setMessageList((msgs) => [...msgs, arrivalMessage]);
      // SetClick(!click);
    }
  }, [arrivalMessage]);

  return (
    <div className="chat-window">
      <div className="chat-header"></div>
      <div className="chat-body">
        <ScrollToBottom className="message-container">
          {messageList &&
            Object.keys(messageList).map((key, index) => {
              return (
                <div
                  className="message"
                  id={messageList[key].isDoctor === true ? "other" : "you"}
                >
                  <div>
                    <div className="message-content">
                      <p>{messageList[key].content}</p>
                    </div>
                    <div className="message-meta">
                      <p id="time">{messageList[key].time}</p>
                      <p id="author">
                        {messageList[key].isDoctor === true
                          ? chat.doctorName
                          : "You"}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
        </ScrollToBottom>
      </div>
      <div className="chat-footer">
        <input
          type="text"
          value={currentMessage}
          placeholder="Hey..."
          onChange={(event) => {
            setCurrentMessage(event.target.value);
          }}
          onKeyPress={(event) => {
            event.key === "Enter" && sendMessage();
          }}
        />
        <button onClick={sendMessage}>&#9658;</button>
        <button onClick={() => SetClick(!click)}>
          <h5>Refresh</h5>
        </button>
      </div>
    </div>
  );
}

export default ChatRoom;
