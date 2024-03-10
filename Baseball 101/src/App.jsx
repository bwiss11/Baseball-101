import { useState } from "react";
import Navbar from "./components/Navbar";
import Directions from "./components/Directions";
import Home from "./pages/Home";
import About from "./pages/About";
import { Route, Routes } from "react-router-dom";
import React, { Suspense } from "react";

const BUTTON_WRAPPER_STYLES = {
  position: "relative",
  zIndex: 1,
};

const OTHER_CONTENT_STYLES = {
  position: "relative",
  zIndex: 2,
};

function App() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <div style={BUTTON_WRAPPER_STYLES}>
        <div id="directionsButton" onClick={() => setIsOpen(true)}>
          ?
        </div>
        <Directions open={isOpen} onClose={() => setIsOpen(false)}>
          Directions Here
        </Directions>
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/About" element={<About />} />
      </Routes>
    </>
  );
}

export default App;
