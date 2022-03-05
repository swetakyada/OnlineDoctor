import React, { useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import axios from "axios";

const AppointmentModal = (props) => {
  const { doctorName, doctorId, modal, toggle } = props;
  const [patientName, setPatientName] = useState("");
  const [age, setAge] = useState(0);
  const [gender, setGender] = useState("Select Gender");
  const [illness, setIllness] = useState("");
  const [appointmentDate, setAppointmentDate] = useState("");
  const id = JSON.parse(localStorage.getItem("user")).id;

  const submitAppointmentForm = async (e) => {
    e.preventDefault();
    // const data = JSON.stringify({
    //   userId: id,
    //   doctorId: doctorId,
    //   doctorName: doctorName,
    //   patientName: patientName,
    //   age: age,
    //   gender: gender,
    //   date: appointmentDate,
    //   description: illness,
    // });
    try {
      axios
        .all([
          axios.post(
            "http://localhost:5000/appointment/add",
            {
              userId: id,
              doctorId: doctorId,
              doctorName: doctorName,
              patientName: patientName,
              age: age,
              gender: gender,
              date: appointmentDate,
              description: illness,
            },
            {
              headers: { "Content-Type": "application/json" },
            }
          ),
          axios.post(
            "http://localhost:5000/chat/create",
            {
              userId: id,
              userName: patientName,
              doctorId: doctorId,
              doctorName: doctorName,
            },
            {
              headers: { "Content-Type": "application/json" },
            }
          ),
        ])
        .then(
          axios.spread((res1, res2) => {
            if (res1.data.status === "ok" && res2.data.status === "ok") {
              alert("Appointment registered and chat created");
            } else if (res1.data.status === "ok") {
              alert("Appointment registered");
            } else if (res2.data.status === "ok") {
              alert("Chat created");
            } else {
              alert("Nothing done!!");
            }
          })
        );

      // const response = await fetch("http://localhost:5000/appointment/add", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: data,
      // });
      // const res = await response.json();
      // if (res.status === "ok") {
      //   alert("Added appointment successfully");
      // } else {
      //   document.getElementById("alert").classList.remove("d-none");
      //   document.getElementById("alert").innerText = res.error;
      // }
      toggle();
      setPatientName("");
      setAge(0);
      setGender("Select Gender");
      setIllness("");
      setAppointmentDate("");
    } catch (error) {
      console.log(error);
      document.getElementById("alert").classList.remove("d-none");
      document.getElementById("alert").innerText = "Error occured!!";
    }
  };

  return (
    <div>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Appointment for {doctorName}</ModalHeader>
        <ModalBody>
          <form onSubmit={submitAppointmentForm}>
            <div
              className="alert alert-danger d-none"
              id="alert"
              role="alert"
            ></div>
            <div className="form-group">
              <label htmlFor="exampleInputPassword1">Doctor Name</label>
              <input
                type="name"
                className="form-control"
                placeholder="Doctor Name"
                value={doctorName}
                disabled
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputEmail1">Patient name</label>
              <input
                type="name"
                className="form-control"
                placeholder="Enter patient name"
                required
                value={patientName}
                onChange={(e) => setPatientName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputPassword1">Age</label>
              <input
                type="number"
                className="form-control"
                placeholder="Age"
                required
                value={age}
                onChange={(e) => setAge(e.target.value)}
                max="100"
                min="1"
              />
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputPassword1">Gender</label>
              <select
                className="custom-select"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                required
              >
                <option defaultValue>Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputEmail1">Date of Appointment</label>
              <input
                type="date"
                className="form-control"
                value={appointmentDate}
                onChange={(e) => setAppointmentDate(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="exampleFormControlTextarea1">
                Describe your illness
              </label>
              <textarea
                className="form-control"
                rows="3"
                value={illness}
                onChange={(e) => setIllness(e.target.value)}
                placeholder="Describe your illness with symptoms"
                required
              ></textarea>
            </div>
            <button type="submit" className="btn btn-success">
              Make Appointment
            </button>
          </form>
        </ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default AppointmentModal;
