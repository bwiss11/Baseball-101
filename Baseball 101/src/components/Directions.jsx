import React from "react";
import ReactDom from "react-dom";

const DIRECTION_STYLES = {
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  backgroundColor: "black",
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
  if (!open) return null;
  return ReactDom.createPortal(
    <>
      <div style={OVERLAY_STYLES}></div>
      <div id="directionsText" style={DIRECTION_STYLES}>
        <div id="closeDirections" onClick={onClose}>
          X
        </div>
        <br></br>
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
          <text className="oneTabDirection">
            a. Clicking the 'Reveal' button will drop the user's score to 0.
          </text>
        </div>
        <br></br>
        <br></br>
        <div className="directionsContainer">
          <h2>Example Gameplay</h2>
          <div id="exampleGameplay">
            <text>The screenshots below show the following gameplay:</text>
            <br></br>
            <br></br>
            <text>
              1. Initial state with only the player's silhouette shown, with the
              score at 101.
            </text>
            <br></br>
            <div>
              <img src="https://github.com/bwiss11/Baseball-101/assets/79183545/882d2c44-ff9f-4deb-bb87-8006c45cdc0f"></img>
            </div>
            <br></br>
            <text>
              2. User hits the 'Hint' button and reveals the first row; 1 point
              is subtracted from the score.
            </text>
            <br></br>
            <div>
              <img src="https://github.com/bwiss11/Baseball-101/assets/79183545/729e0850-c693-4a6f-ad6e-6366bf69e5d0"></img>
            </div>
            <br></br>
            <text>
              3. User reveals 3 more years of data (-15 points) and then thinks
              they know the answer.
            </text>
            <br></br>
            <div>
              <img src="https://github.com/bwiss11/Baseball-101/assets/79183545/c3298958-8cb1-48ce-88b2-e3341553e6d5"></img>
            </div>
            <br></br>
            <text>
              4. User clicks on Aaron Judge's name and is correct! Score is
              locked in at 85 points and his name and image are revealed.
            </text>
            <br></br>
            <div>
              <img src="https://github.com/bwiss11/Baseball-101/assets/79183545/868a6064-8296-4ce8-bd5c-838de4e8a6d1"></img>
            </div>
          </div>
        </div>
      </div>
    </>,
    document.getElementById("portal")
  );
};

export default Directions;
