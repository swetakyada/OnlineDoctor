import React, { useEffect, useState } from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import axios from "axios";

function ChatRoom({ room, chat, socket }) {
  console.log(room);
  const id = JSON.parse(localStorage.getItem("doctor")).id;
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [click, SetClick] = useState(false);
  const [disable, setDisable] = useState(true);

  const ddMmYyyy = (today) => {
    return today.toLocaleDateString(["ban", "id"], { dateStyle: "short" });
  };

  const getCurrentTime = () => {
    let current = new Date();
    let current_time = current.toLocaleTimeString("it-IT", {
      hour: "numeric",
    });
    return current_time;
  };

  const getDateTime = () => {
    let current = new Date();
    let date = current.toLocaleDateString("en-Us", { dateStyle: "medium" });
    let time = current.toLocaleTimeString("en-US", { timeStyle: "short" });
    return date + " " + time;
  };

  useEffect(async () => {
    console.log("Called!!!");
    const response = await axios.post(
      "http://localhost:5000/chat/get_messages",
      {
        id: room,
      }
    );
    setMessageList(response.data.messages);
    let current = new Date();
    let date = ddMmYyyy(current);
    if (date === chat.date) {
      let slot = getCurrentTime() - 13;
      if (slot === chat.slot) setDisable(false);
    }
  }, [room, click]);

  const sendMessage = async () => {
    if (currentMessage.length > 0) {
      socket.current.emit("send-msg", {
        to: chat.user,
        from: id,
        message: currentMessage,
      });

      await axios.post("http://localhost:5000/chat/add_message", {
        id: room,
        content: currentMessage,
        isDoctor: true,
        time: getDateTime(),
      });
      setCurrentMessage("");
      setMessageList((msgs) => [
        ...msgs,
        { content: currentMessage, isDoctor: true, time: getDateTime() },
      ]);
    }
    let slot = getCurrentTime() - 13;
    if (slot !== chat.slot) setDisable(false);
  };

  useEffect(() => {
    if (socket.current) {
      socket.current.on("msg-recieve", (currentMessage) => {
        console.log("Arrival");
        setArrivalMessage({
          content: currentMessage,
          isDoctor: false,
          time: getDateTime(),
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
      <div className="chat-header">
        <center>Chat with {chat.userName}</center>
      </div>
      <div className="chat-body">
        <ScrollToBottom className="message-container">
          {messageList &&
            Object.keys(messageList).map((key, index) => {
              return (
                <div
                  className="message"
                  id={messageList[key].isDoctor === false ? "other" : "you"}
                >
                  <div>
                    <div className="message-content">
                      <p>{messageList[key].content}</p>
                    </div>
                    <div className="message-meta">
                      <p id="time">{messageList[key].time}</p>
                      <p id="author">
                        {messageList[key].isDoctor === false
                          ? chat.userName
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
        <button onClick={sendMessage} disabled={disable}>
          &#9658;
        </button>
        {/* <button onClick={() => SetClick(!click)}>
          <h5>Refresh</h5>
        </button> */}
      </div>
    </div>
  );
}

export default ChatRoom;
