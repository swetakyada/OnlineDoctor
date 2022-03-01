import React, { useState, useEffect } from "react";
import { Card, Button } from "react-bootstrap";
import "./Appointment.css";

const AppointmentPage = () => {
  const [Appointments, SetAppointments] = useState("");
  var userid = localStorage.getItem("id");

  useEffect(() => {
    const fecthData = () => {
      fetch("http://localhost:5000/appointment/get", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userid,
        }),
      }).then((response) =>
        response.json().then((data) => {
          console.log(data);
          SetAppointments(data);
        })
      );
    };
    fecthData();
  }, []);

  return (
    <div>
      <center>
        <h5></h5>
        <h4 className="pb-3">Your Appointments</h4>
      </center>
      <div className="appointment-card">
        <div className="appointments">
          {Object.keys(Appointments)
            .filter((key) => key)
            .map((key, index) => {
              return (
                <div>
                  <Card>
                    <Card.Body>
                      <Card.Title>
                        Doctor Name : {Appointments[key].doctorName}
                      </Card.Title>
                      <Card.Text>
                        Health issue : {Appointments[key].description}
                        <br />
                        Date : {Appointments[key].date}
                      </Card.Text>
                      <center>
                        {" "}
                        <Button
                          style={{
                            backgroundColor: "#064420",
                            width: "120px",
                            fontSize: "18px",
                          }}
                        >
                          Start Now
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
export default AppointmentPage;
