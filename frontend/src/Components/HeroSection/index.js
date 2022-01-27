import React from "react";
//import Video from ../../videos/video.mp4;
import {
  HeroContainer,
  RightContainer,
  LeftContainer,
  DoctorCards,
} from "./HeroElements";
import { SearchContainer, SearchInput, Text } from "./SearchElements";
import {
  FaHandHoldingHeart,
  FaBars,
  FaDonate,
  FaHospitalUser,
} from "react-icons/fa";
import { BsFillBagPlusFill } from "react-icons/bs";
import JSONDATA from "../MOCK_DATA.json";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useState } from "react";
import "./index.css";

const HeroSection = () => {
  const [SearchDoctor, SetSearchDoctor] = useState("");
  return (
    <HeroContainer id="home">
      <LeftContainer>
        <div>
          <hr />
        </div>
        <SearchContainer>
          <Text>Online doctor Consultation</Text>
          <SearchInput
            placeholder="search doctors.."
            onChange={(event) => {
              SetSearchDoctor(event.target.value);
            }}
          />
        </SearchContainer>
        <div>
          <hr />
          <p style={{ color: "skyblue" }}>
            Start your care now by choosing from over 4000 doctors and 58
            specialities
          </p>
          <hr />
        </div>
        <DoctorCards>
          <Row>
            {JSONDATA.filter((value) => {
              if (SearchDoctor === "") {
                return 1;
              } else if (
                value.first_name
                  .toLocaleLowerCase()
                  .includes(SearchDoctor.toLocaleLowerCase())
              ) {
                return value;
              }
            }).map((value, key) => {
              return (
                <Col xs={6} className="pb-2">
                  <div class="card p-2 pl-3">
                    <div class="card-horizontal">
                      <div
                        class="img-square-wrapper"
                        className="d-flex align-items-center"
                      >
                        <center>
                          <BsFillBagPlusFill
                            style={{
                              borderRadius: "200px",
                              color: "lightgreen",
                              width: "55px",
                              height: "65px",
                              background: "black",
                            }}
                          />
                        </center>
                      </div>
                      <div class="card-body">
                        <h4 class="card-title">Card title</h4>
                        <p class="card-text">{value.first_name}</p>
                      </div>
                    </div>
                  </div>
                </Col>
              );
            })}
          </Row>
        </DoctorCards>
      </LeftContainer>
      <RightContainer>
        <Container className="p-3">
          <Card>
            <Card.Header>Featured</Card.Header>
            <Card.Body>
              <Card.Text>
                <ul style={{ background: "#fff" }}>
                  <li>Round-the-clock doctor availability</li>
                  <li>Broad range of Specialities</li>
                  <li>Detailed digital prescriptions</li>
                  <li>Order medicines and tests online</li>
                  <li>Digitised health records</li>
                </ul>
              </Card.Text>
              <center>
                <Button variant="primary">Consult Now</Button>
              </center>
            </Card.Body>
          </Card>
        </Container>
        <div className="p-3"></div>
      </RightContainer>
    </HeroContainer>
  );
};

export default HeroSection;
