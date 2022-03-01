import React, { useState } from "react";
//import "bootstrap/dist/css/bootstrap.min.css";
import { Row, Col } from "react-bootstrap";
import "./Profile.css";
import Navbar from '../Dashboard/Navbar';
const Profile = () => {
    // const history = useHistory()

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [cpassword, setCpassword] = useState("");

    const handleSubmit = async (event) => {
        // event.preventDefault();

        try {
            if (!(name && email && password && cpassword && password === cpassword)) {
                alert("Invalid input");
                return;
            }
            console.log(name, " ", email, " ", password);
            const response = await fetch("", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name,
                    email,
                    password,
                }),
            });

            const data = await response.json();
            console.log(data);
            if (data.status === "ok") {
                alert("User registered successfully!!");
                window.location = "/login";
            } else {
                alert("Falied to create the user");
            }
        } catch (error) {
            console.log(error);
            alert("Error occured!!");
        }
    };

    return (
        <div>
            <Navbar />
            <Row>
                <Col className="account1">
                    <div>
                        <form className="account-form" onSubmit={() => handleSubmit()}>
                            <div>
                                {" "}
                                <h3>Profile</h3>

                            </div>
                            <div>
                                Username
                                <input
                                    type="text"
                                    placeholder="Username"
                                    className="input"
                                    value="Sweta kyada"
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                            <div>
                                Email
                                <input
                                    type="text"
                                    placeholder="Email"
                                    className="input"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div>
                                Old Password
                                <input
                                    type="password"
                                    placeholder="Password"
                                    className="input"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            <div>
                                New Password
                                <input
                                    type="password"
                                    placeholder="Confirm Password"
                                    className="input"
                                    value={cpassword}
                                    onChange={(e) => setCpassword(e.target.value)}
                                />
                            </div>
                            <div>
                                Confirm New Password
                                <input
                                    type="password"
                                    placeholder="Confirm Password"
                                    className="input"
                                    value={cpassword}
                                    onChange={(e) => setCpassword(e.target.value)}
                                />
                            </div>
                            <div className=" d-flex justify-content-center">
                                <button className="submit" type="submit">
                                    Save
                                </button>
                            </div>

                        </form>
                    </div>
                </Col>

            </Row>
        </div>
    );
};

export default Profile;
