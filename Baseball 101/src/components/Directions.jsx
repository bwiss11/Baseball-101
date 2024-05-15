import React from "react";
import ReactDom from "react-dom";
import { useRef, useEffect } from "react";

const DIRECTION_STYLES = {
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  backgroundColor: "rgba(0, 0, 0, .8)",
  color: "white",
  padding: "50px",
  zIndex: 1000,
  width: "70%",
  height: "65%",
  borderRadius: "1rem",
  borderColor: "white",
  border: "0.2rem solid",
  borderWeight: "10px",
};

const OVERLAY_STYLES = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0, 0, 0, .5)",
  zIndex: 1000,
};

const Directions = ({ open, children, onClose }) => {
  let directionsRef = useRef();
  console.log("directionsref is ", directionsRef);
  useEffect(() => {
    let handler = (e) => {
      if (!directionsRef.current.contains(e.target)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handler);
  });
  if (!open) return null;
  return ReactDom.createPortal(
    <>
      <div style={OVERLAY_STYLES}></div>
      <div id="directionsText" style={DIRECTION_STYLES} ref={directionsRef}>
        <div id="closeDirections" onClick={onClose}>
          <div>X</div>
        </div>
        <br></br>
        <div className="directionsContainer">
          <h2>Quick Start / TLDR</h2>
          <text>
            1. Use the search bar at the top of the page to guess the player as
            soon as you know the answer
          </text>
          <br></br>
          <br></br>
          <text>
            2. Use the 'Hint' button to reveal the next year of statistics
          </text>
          <br></br>
          <br></br>
          <text>
            3. If you give up, use the 'Reveal' button to see the answer
          </text>
          <br></br>
        </div>
        <br></br>
        <br></br>
        <div className="directionsContainer">
          <h2>How to Play</h2>
          <text>The basic rules of the game are as follows:</text>
          <br></br>
          <br></br>
          <text>
            1. The user is initially displayed with nothing but the silhouette
            of the player's image, and their score is set to 101.
          </text>
          <br></br>
          <br></br>
          <text>
            2. The user can hit the 'Hint' button at any time to be displayed
            with the next year of the player's statistics.
          </text>
          <br></br>
          <br></br>
          <text className="oneTabDirection">
            a. The first press of the 'Hint' button subtracts 1 point from the
            user's score.
          </text>
          <br></br>
          <br></br>
          <text className="oneTabDirection">
            b. Each additional press of the 'Hint' button will subtract 5 points
            from the user's score.
          </text>
          <br></br>
          <br></br>
          <text>
            3. If at any point, the user thinks they know which player the data
            belongs to, they can type in the player's name in the search bar at
            the top.
          </text>
          <br></br>
          <br></br>
          <text>
            4. If the user is stumped, they can click the 'Reveal', and the
            player's name and image will be shown.
          </text>
          <br></br>
          <br></br>
          <div className="oneTabDirection">
            a. Clicking the 'Reveal' button will drop the user's score to 0.
          </div>
        </div>
      </div>
    </>,
    document.getElementById("portal")
  );
};

export default Directions;
