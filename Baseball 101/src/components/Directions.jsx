import React from "react";
import ReactDom from "react-dom";

const DIRECTION_STYLES = {
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  backgroundColor: "white",
  padding: "50px",
  zIndex: 1000,
};

const OVERLAY_STYLES = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0, 0, 0, .7)",
  zIndex: 1000,
};

const Directions = ({ open, children, onClose }) => {
  if (!open) return null;
  return ReactDom.createPortal(
    <>
      <div style={OVERLAY_STYLES}></div>
      <div style={DIRECTION_STYLES}>
        <button onClick={onClose}>Close Directions</button>
        Here are your directions
      </div>
    </>,
    document.getElementById("portal")
  );
};

export default Directions;
