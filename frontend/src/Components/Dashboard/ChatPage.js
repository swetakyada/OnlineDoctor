import React, { useState, useEffect } from "react";
import { Card, Button } from "react-bootstrap";
import "./Appointment.css";

const ChatPage = () => {
  const [Chats, SetChats] = useState("");
  const id = JSON.parse(localStorage.getItem("user")).id;
  const [chatId, SetChatId] = useState("");

  useEffect(() => {
    const fecthData = () => {
      fetch("http://localhost:5000/chat/uget", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: id,
        }),
      }).then((response) =>
        response.json().then((data) => {
          SetChats(data);
        })
      );
    };
    fecthData();
  }, []);

  const handleClick = (e) => {
    SetChatId(e.target.getAttribute("chat-id"));
  };

  return (
    <div>
      <center>
        <h5></h5>
        <h4 className="pb-3">Your Chats</h4>
      </center>
      <div className="appointment-card">
        <div className="appointments">
          {Object.keys(Chats)
            .filter((key) => key)
            .map((key, index) => {
              return (
                <div>
                  <Card>
                    <Card.Body>
                      <Card.Title>
                        {console.log(Chats[key])}
                        Doctor Name : {Chats[key].doctorName}
                      </Card.Title>
                      <br />
                      <center>
                        {" "}
                        <Button
                          style={{
                            backgroundColor: "#064420",
                            width: "120px",
                            fontSize: "18px",
                          }}
                          onClick={handleClick}
                          chat-id={Chats[key]._id}
                        >
                          Chat Now
                        </Button>
                      </center>
                    </Card.Body>
                  </Card>
                  <br />
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};
export default ChatPage;
