import React from "react";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./search.css";
import doc from "../../Assets/doc.png";
import JSONDATA from "../../Assets/MOCK_DATA.json";
import "./Doclist.css";
import { Card, Button, Row, Col } from "react-bootstrap";

const Search = () => {
  const [SearchDoctor, SetSearchDoctor] = useState("");
  return (
    <div>
      <div className="search-container">
        <div className="search-box">
          <h1>
            Find a doctor who
            <br /> can take care of you
          </h1>
          <br />
          <h6>Search your doctor now</h6>

          <input
            type="text"
            placeholder="search anything"
            onChange={(event) => {
              SetSearchDoctor(event.target.value);
            }}
          ></input>
        </div>
        <div className="pr-0">
          <img src={doc} alt="Doctor" width="550" height="550px" />
        </div>
      </div>
      <div className="list-container">
        <div className="list-wrap">
          <Row>
            {JSONDATA.filter((value) => {
              if (SearchDoctor === "") {
                return 1;
              } else if (
                value.job_title
                  .toLocaleLowerCase()
                  .includes(SearchDoctor.toLocaleLowerCase())
              ) {
                return value;
              }
            }).map((value, key) => {
              return (
                <Col xs={4} className="pb-4">
                  <Card
                    style={{
                      width: "17rem",
                      boxShadow: "5px 5px 5px 5px solid red",
                    }}
                  >
                    <Card.Body>
                      <Card.Title>{value.full_name}</Card.Title>
                      <Card.Subtitle className="mb-1">
                        {value.job_title}
                      </Card.Subtitle>
                      <hr style={{ color: "#fdba69", height: "2px" }} />
                      <Card.Text
                        style={{
                          color: "#005f95",
                          fontWeight: "bold",
                          opacity: "0.9",
                        }}
                      >
                        {value.description}
                      </Card.Text>
                      <center>
                        <Button style={{ backgroundColor: "#064420" }}>
                          Book Now
                        </Button>
                      </center>
                    </Card.Body>
                  </Card>
                </Col>
              );
            })}
          </Row>
        </div>
      </div>
    </div>
  );
};

export default Search;
