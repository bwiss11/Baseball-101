import React from "react";
import ReactDom from "react-dom";
import { useRef, useEffect } from "react";

const Directions = ({ open, onClose }) => {
  let directionsRef = useRef();
  useEffect(() => {
    let handler = (e) => {
      if (directionsRef.current && !directionsRef.current.contains(e.target)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handler);
  });
  if (!open) return null;
  return ReactDom.createPortal(
    <>
      <div id="outerDirections">
        <div id="directionsText" ref={directionsRef}>
          <div id="closeDirections" onClick={onClose}>
            <div id="xButton">X</div>
          </div>
          <br></br>
          <div className="directionsContainer">
            <h2>Quick Rules</h2>
            <div className="text">
              1. The 'Hint' button reveals the next year of statistics.
            </div>
            <br></br>
            <div className="text">
              2. The 'Reveal' button will show the answer, and set the score to
              0.
            </div>
            <br></br>
            <div className="text">
              3. The search bar at the top can be used to guess the player at
              any point.
            </div>
            <br></br>
          </div>
          <div className="directionsContainer">
            <h2>Play Types</h2>
            <div className="text">
              1. The{" "}
              <svg
                className="directionsPageButtons"
                fill="rgba(255, 255, 255, 0.75)"
                version="1.1"
                id="Capa_1"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                viewBox="0 0 610.398 610.398"
                xmlSpace="preserve"
              >
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  {" "}
                  <g>
                    {" "}
                    <g>
                      {" "}
                      <path d="M159.567,0h-15.329c-1.956,0-3.811,0.411-5.608,0.995c-8.979,2.912-15.616,12.498-15.616,23.997v10.552v27.009v14.052 c0,2.611,0.435,5.078,1.066,7.44c2.702,10.146,10.653,17.552,20.158,17.552h15.329c11.724,0,21.224-11.188,21.224-24.992V62.553 V35.544V24.992C180.791,11.188,171.291,0,159.567,0z"></path>{" "}
                      <path d="M461.288,0h-15.329c-11.724,0-21.224,11.188-21.224,24.992v10.552v27.009v14.052c0,13.804,9.5,24.992,21.224,24.992 h15.329c11.724,0,21.224-11.188,21.224-24.992V62.553V35.544V24.992C482.507,11.188,473.007,0,461.288,0z"></path>{" "}
                      <path d="M539.586,62.553h-37.954v14.052c0,24.327-18.102,44.117-40.349,44.117h-15.329c-22.247,0-40.349-19.79-40.349-44.117 V62.553H199.916v14.052c0,24.327-18.102,44.117-40.349,44.117h-15.329c-22.248,0-40.349-19.79-40.349-44.117V62.553H70.818 c-21.066,0-38.15,16.017-38.15,35.764v476.318c0,19.784,17.083,35.764,38.15,35.764h468.763c21.085,0,38.149-15.984,38.149-35.764 V98.322C577.735,78.575,560.671,62.553,539.586,62.553z M527.757,557.9l-446.502-0.172V173.717h446.502V557.9z"></path>{" "}
                      <path d="M353.017,266.258h117.428c10.193,0,18.437-10.179,18.437-22.759s-8.248-22.759-18.437-22.759H353.017 c-10.193,0-18.437,10.179-18.437,22.759C334.58,256.074,342.823,266.258,353.017,266.258z"></path>{" "}
                      <path d="M353.017,348.467h117.428c10.193,0,18.437-10.179,18.437-22.759c0-12.579-8.248-22.758-18.437-22.758H353.017 c-10.193,0-18.437,10.179-18.437,22.758C334.58,338.288,342.823,348.467,353.017,348.467z"></path>{" "}
                      <path d="M353.017,430.676h117.428c10.193,0,18.437-10.18,18.437-22.759s-8.248-22.759-18.437-22.759H353.017 c-10.193,0-18.437,10.18-18.437,22.759S342.823,430.676,353.017,430.676z"></path>{" "}
                      <path d="M353.017,512.89h117.428c10.193,0,18.437-10.18,18.437-22.759c0-12.58-8.248-22.759-18.437-22.759H353.017 c-10.193,0-18.437,10.179-18.437,22.759C334.58,502.71,342.823,512.89,353.017,512.89z"></path>{" "}
                      <path d="M145.032,266.258H262.46c10.193,0,18.436-10.179,18.436-22.759s-8.248-22.759-18.436-22.759H145.032 c-10.194,0-18.437,10.179-18.437,22.759C126.596,256.074,134.838,266.258,145.032,266.258z"></path>{" "}
                      <path d="M145.032,348.467H262.46c10.193,0,18.436-10.179,18.436-22.759c0-12.579-8.248-22.758-18.436-22.758H145.032 c-10.194,0-18.437,10.179-18.437,22.758C126.596,338.288,134.838,348.467,145.032,348.467z"></path>{" "}
                      <path d="M145.032,430.676H262.46c10.193,0,18.436-10.18,18.436-22.759s-8.248-22.759-18.436-22.759H145.032 c-10.194,0-18.437,10.18-18.437,22.759S134.838,430.676,145.032,430.676z"></path>{" "}
                      <path d="M145.032,512.89H262.46c10.193,0,18.436-10.18,18.436-22.759c0-12.58-8.248-22.759-18.436-22.759H145.032 c-10.194,0-18.437,10.179-18.437,22.759C126.596,502.71,134.838,512.89,145.032,512.89z"></path>{" "}
                    </g>{" "}
                  </g>{" "}
                </g>
              </svg>{" "}
              Daily Play page shows a single player each day and counts towards
              the user's score on the{" "}
              <svg
                className="directionsPageButtons"
                viewBox="0 -4 18 24"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                fill="rgba(255, 255, 255, 0.75)"
              >
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  {" "}
                  <title>stats [#1367]</title> <desc>Created with Sketch.</desc>{" "}
                  <defs> </defs>{" "}
                  <g
                    id="Page-1"
                    stroke="none"
                    strokeWidth="1"
                    fill="rgba(255, 255, 255, 0.75)"
                    fillRule="evenodd"
                  >
                    {" "}
                    <g
                      id="Dribbble-Light-Preview"
                      transform="translate(-179.000000, -840.000000)"
                      fill="rgba(255, 255, 255, 0.75)"
                    >
                      {" "}
                      <g
                        id="icons"
                        transform="translate(56.000000, 160.000000)"
                      >
                        {" "}
                        <path
                          d="M141.9,697 C141.9,697.552 141.4296,698 140.85,698 C140.2704,698 139.8,697.552 139.8,697 L139.8,683 C139.8,682.448 140.2704,682 140.85,682 C141.4296,682 141.9,682.448 141.9,683 L141.9,697 Z M141.9,680 L139.8,680 C138.63975,680 137.7,680.895 137.7,682 L137.7,698 C137.7,699.105 138.63975,700 139.8,700 L141.9,700 C143.06025,700 144,699.105 144,698 L144,682 C144,680.895 143.06025,680 141.9,680 L141.9,680 Z M134.55,697 C134.55,697.552 134.0796,698 133.5,698 C132.9204,698 132.45,697.552 132.45,697 L132.45,687 C132.45,686.448 132.9204,686 133.5,686 C134.0796,686 134.55,686.448 134.55,687 L134.55,697 Z M134.55,684 L132.45,684 C131.28975,684 130.35,684.895 130.35,686 L130.35,698 C130.35,699.105 131.28975,700 132.45,700 L134.55,700 C135.71025,700 136.65,699.105 136.65,698 L136.65,686 C136.65,684.895 135.71025,684 134.55,684 L134.55,684 Z M127.2,697 C127.2,697.552 126.7296,698 126.15,698 C125.5704,698 125.1,697.552 125.1,697 L125.1,693 C125.1,692.448 125.5704,692 126.15,692 C126.7296,692 127.2,692.448 127.2,693 L127.2,697 Z M127.2,690 L125.1,690 C123.93975,690 123,690.895 123,692 L123,698 C123,699.105 123.93975,700 125.1,700 L127.2,700 C128.36025,700 129.3,699.105 129.3,698 L129.3,692 C129.3,690.895 128.36025,690 127.2,690 L127.2,690 Z"
                          id="stats-[#1367]"
                        >
                          {" "}
                        </path>{" "}
                      </g>{" "}
                    </g>{" "}
                  </g>{" "}
                </g>
              </svg>{" "}
              Stats page.
            </div>
            <br></br>
            <div className="text">
              2. The{" "}
              <svg
                className="directionsPageButtons"
                fill="white"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  {" "}
                  <path
                    d="M9.4 7.53333C9.2 7.26667 8.8 7.26667 8.6 7.53333L6.225 10.7C6.09167 10.8778 6.09167 11.1222 6.225 11.3L8.6 14.4667C8.8 14.7333 9.2 14.7333 9.4 14.4667L11.775 11.3C11.9083 11.1222 11.9083 10.8778 11.775 10.7L9.4 7.53333Z"
                    fill="rgba(255, 255, 255, 0.75)"
                  ></path>{" "}
                  <path
                    d="M4.09245 5.63868C4.03647 5.5547 4.03647 5.4453 4.09245 5.36133L4.79199 4.31202C4.89094 4.16359 5.10906 4.16359 5.20801 4.31202L5.90755 5.36132C5.96353 5.4453 5.96353 5.5547 5.90755 5.63867L5.20801 6.68798C5.10906 6.83641 4.89094 6.83641 4.79199 6.68798L4.09245 5.63868Z"
                    fill="rgba(255, 255, 255, 0.75)"
                  ></path>{" "}
                  <path
                    d="M13.208 15.312C13.1091 15.1636 12.8909 15.1636 12.792 15.312L12.0924 16.3613C12.0365 16.4453 12.0365 16.5547 12.0924 16.6387L12.792 17.688C12.8909 17.8364 13.1091 17.8364 13.208 17.688L13.9075 16.6387C13.9635 16.5547 13.9635 16.4453 13.9075 16.3613L13.208 15.312Z"
                    fill="rgba(255, 255, 255, 0.75)"
                  ></path>{" "}
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M1 4C1 2.34315 2.34315 1 4 1H14C15.1323 1 16.1181 1.62732 16.6288 2.55337L20.839 3.68148C22.4394 4.11031 23.3891 5.75532 22.9603 7.35572L19.3368 20.8787C18.908 22.4791 17.263 23.4288 15.6626 23L8.19849 21H4C2.34315 21 1 19.6569 1 18V4ZM17 18V4.72339L20.3213 5.61334C20.8548 5.75628 21.1714 6.30461 21.0284 6.83808L17.405 20.361C17.262 20.8945 16.7137 21.2111 16.1802 21.0681L15.1198 20.784C16.222 20.3403 17 19.261 17 18ZM4 3C3.44772 3 3 3.44772 3 4V18C3 18.5523 3.44772 19 4 19H14C14.5523 19 15 18.5523 15 18V4C15 3.44772 14.5523 3 14 3H4Z"
                    fill="rgba(255, 255, 255, 0.75)"
                  ></path>{" "}
                </g>
              </svg>{" "}
              Free Play page generates a random player and an unlimited number
              of games can be played. These games don't count towards the user's
              score.
            </div>
          </div>
          <br></br>
          <div className="directionsContainer">
            <h2>Full Rules</h2>
            <div className="text">
              1. The user is initially displayed with nothing but the silhouette
              of the player's image, and their score is set to 101.
            </div>
            <br></br>
            <div className="text">
              2. The user can hit the 'Hint' button at any time to be displayed
              with the next year of the player's statistics.
            </div>
            <br></br>
            <div className="oneTabDirection">
              a. The first press of the 'Hint' button subtracts 1 point from the
              user's score.
            </div>
            <br></br>
            <br></br>
            <div className="oneTabDirection">
              b. Each additional press of the 'Hint' button will subtract 5
              points from the user's score.
            </div>
            <br></br>
            <br></br>
            <div className="oneTabDirection">
              c. An incorrect guess will subtract 15 points from the user's
              score.
            </div>
            <br></br>
            <br></br>
            <div className="text">
              3. If at any point, the user thinks they know which player the
              data belongs to, they can type in the player's name in the search
              bar at the top.
            </div>
            <br></br>
            <div className="text">
              4. If the user is stumped, they can click the 'Reveal', and the
              player's name and image will be shown.
            </div>
            <br></br>
            <div className="oneTabDirection">
              a. Clicking the 'Reveal' button will drop the user's score to 0.
            </div>
          </div>
        </div>
      </div>
    </>,
    document.getElementById("portal")
  );
};

export default Directions;
