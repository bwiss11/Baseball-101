import React from "react";
import { useState, useEffect } from "react";
import StatsPlayer from "../components/StatsPlayer";
import StatsTableHeader from "../components/StatsTableHeader";
import { getFormattedDate } from "../Functions/Functions";

const Stats = () => {
  const [hits, setHits] = useState("");
  const [outs, setOuts] = useState("");
  const [numberHits, setNumberHits] = useState(0);
  const [numberOuts, setNumberOuts] = useState(0);
  const [hitStreak, setHitStreak] = useState(0);
  const [maxHitStreak, setMaxHitStreak] = useState(0);

  let curDate = getFormattedDate();

  useEffect(() => {
    let retrievedHits = JSON.parse(localStorage.getItem("hits"));
    let hitsArray = [];
    console.log("got hits", retrievedHits);
    if (retrievedHits) {
      for (let i = 0; i < retrievedHits.length; i++) {
        // console.log("item is", retrievedHits[i]);
        // console.log("date: ", Object.keys(retrievedHits[i])[0]);
        console.log(
          "date",
          Object.keys(retrievedHits[i])[0],
          "player",
          retrievedHits[i][Object.keys(retrievedHits[i])[0]].player,
          "score",
          retrievedHits[i][Object.keys(retrievedHits[i])[0]].score,
          "imageUrl",
          retrievedHits[i][Object.keys(retrievedHits[i])[0]].imageUrl
        );
        hitsArray.push({
          date: Object.keys(retrievedHits[i])[0],
          player: retrievedHits[i][Object.keys(retrievedHits[i])[0]].player,
          score: retrievedHits[i][Object.keys(retrievedHits[i])[0]].score,
          imageUrl: retrievedHits[i][Object.keys(retrievedHits[i])[0]].imageUrl,
        });
      }
      setHits(hitsArray);
      setNumberHits(hitsArray.length);

      let retrievedCurrentHitStreak = JSON.parse(
        localStorage.getItem("hitStreak")
      );
      let retrievedMaxHitStreak = JSON.parse(
        localStorage.getItem("maxHitStreak")
      );
      setHitStreak(retrievedCurrentHitStreak);
      setMaxHitStreak(retrievedMaxHitStreak);
    }

    let retrievedOuts = JSON.parse(localStorage.getItem("outs"));
    let outsArray = [];

    if (retrievedOuts) {
      for (let i = 0; i < retrievedOuts.length; i++) {
        console.log("item is", retrievedOuts[i]);
        console.log(retrievedOuts[i][Object.keys(retrievedOuts[i])[0]]);
        outsArray.push({
          date: [Object.keys(retrievedOuts[i])[0]],
          player: retrievedOuts[i][Object.keys(retrievedOuts[i])[0]].player,
          score: retrievedOuts[i][Object.keys(retrievedOuts[i])[0]].score,
          imageUrl: retrievedOuts[i][Object.keys(retrievedOuts[i])[0]].imageUrl,
        });
      }
      setOuts(outsArray);
      setNumberOuts(outsArray.length);
    }
  }, []);

  if (hits) {
    console.log("hits is", hits);
    return (
      <>
        <div>Current Hit Streak: {hitStreak}</div>
        <div>Max Hit Streak: {maxHitStreak}</div>
        <div>At Bats: {numberHits + numberOuts}</div>
        <div>
          Average: {(numberHits / (numberHits + numberOuts)).toFixed(3)}
        </div>
        <div className="statsPlayerHolder">
          <table>
            <tbody>
              <StatsTableHeader></StatsTableHeader>

              {hits.map((day, index) => (
                <StatsPlayer
                  key={index}
                  date={day.date}
                  player={day.player}
                  score={day.score}
                  imageUrl={day.imageUrl}
                ></StatsPlayer>
              ))}
            </tbody>
          </table>
        </div>
      </>
    );
  }

  //   localStorage.setItem("tableData", JSON.stringify(tableData));
};

export default Stats;

/* <tr key={index}>
/* <td>{day.imageUrl}</td> */
/* <td>{day.date}</td>
<td>
  {day.player} ({day.score})
</td>
</tr> */

{
  /* <div>Outs</div>
        <div className="statsPlayerHolder">
          {/* <table>
          <thead>Hits</thead>
          <tbody> */
}
//   {outs.map((day, index) => (
//     <StatsPlayer
//       key={index}
//       date={day.date}
//       player={day.player}
//       score={day.score}
//       imageUrl={day.imageUrl}
//     ></StatsPlayer>
//   ))}
//   {/* </tbody>
// </table> */}
// </div>
