import React, { useState } from "react";
import Sidebar from "../Components/sidebar";
import Navbar from "../Components/navbar";
import HeroSection from "../Components/HeroSection";
import "./Home.css";

const Home = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <Sidebar isOpen={isOpen} toggle={toggle} />
      <Navbar toggle={toggle} />
      <HeroSection />
    </div>
  );
};

export default Home;
