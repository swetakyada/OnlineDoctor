import React, { useState, useEffect, useRef } from "react";
import { Card, Navbar, Container, Nav, Row, Col } from "react-bootstrap";
import "./Chat.css";
import "./Dashboard.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaUserCircle } from "react-icons/fa";
import { LinkContainer } from "react-router-bootstrap";
import axios from "axios";
import DoctorChat from "./Chat";
import io from "socket.io-client";

const DoctorChatPage = () => {
  const socket = useRef();
  const [Chats, SetChats] = useState("");
  const [Chat, SetChat] = useState("");
  const id = localStorage.getItem("did");
  const username = localStorage.getItem("dname");
  const [room, SetRoom] = useState("");

  useEffect(() => {
    if (id) {
      socket.current = io("http://localhost:5000");
      socket.current.emit("add-user", id);
    }
  }, []);

  const handleClick = (cid) => {
    axios
      .post(
        "http://localhost:5000/chat/get",
        { id: cid },
        { headers: { "Content-Type": "application/json" } }
      )
      .then((response) => {
        console.log(response.data.chat);
        SetChat(response.data.chat);
      });
    SetRoom(cid);
  };

  useEffect(() => {
    const fecthData = () => {
      fetch("http://localhost:5000/chat/dget", {
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

  return (
    <div>
      <Navbar>
        <Container>
          <Navbar.Brand>
            <Nav.Link href="/doctor/dashboard">Online Doctor</Nav.Link>
          </Navbar.Brand>
          <Nav.Item>
            <Nav.Link href="/doctor/chats">Your Chat</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              href="/login"
              onClick={(e) => {
                localStorage.removeItem("did");
                localStorage.removeItem("dname");
                localStorage.removeItem("demail");
              }}
            >
              Logout
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <LinkContainer to="/doctor/Profile">
              <Nav.Link href="/doctor/Profile">
                <FaUserCircle />
                {" Hello " + username}
              </Nav.Link>
            </LinkContainer>
          </Nav.Item>
        </Container>
      </Navbar>
      <br />
      <div>
        <Row>
          <Col xs={4} className="chat-wrap">
            <div className="chat-card">
              <div className="chats">
                {Object.keys(Chats)
                  .filter((key) => key)
                  .map((key, index) => {
                    return (

                      <div
                        onClick={() => {
                          handleClick(Chats[key]._id);
                        }}
                      >
                        Patient Name : {Chats[key].userName}

                      </div>


                    );
                  })}
              </div>
            </div>
          </Col>
          <Col>
            {room !== "" ? (
              <div>
                {/* <center>
                  <h5>{Chat.userName}</h5>
                </center> */}
                <DoctorChat room={room} chat={Chat} socket={socket} />
              </div>
            ) : (
              <h3>Select a card to view the chat</h3>
            )}
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default DoctorChatPage;
