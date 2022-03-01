import React, { useState, useEffect } from "react";
import { Card, Button } from "react-bootstrap";
import "./Appointment.css";

const ChatPage = () => {
  const [Chats, SetChats] = useState("");

  useEffect(() => {
    const userid = localStorage.getItem("id");
    const fecthData = () => {
      fetch("http://localhost:5000/chat/uget", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: userid,
        }),
      }).then((response) =>
        response.json().then((data) => {
          console.log(data);
          SetChats(data);
        })
      );
    };
    fecthData();
  }, []);

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
