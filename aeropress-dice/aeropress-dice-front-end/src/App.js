import React, { Suspense, useEffect } from "react";
import { useStore, useScore } from "./Store/Store";
import {
  calculatePossibleScores,
  calculateTotal,
  gameEnd,
} from "./Calculate/Calculate.js";
import Plane from "./Container/Plane.js";
import "./App.css";

function App() {
  const setPossibleScores = useScore((state) => state.setPossibleScores);

  const diceOne = useStore((state) => state.diceOne);
  const diceTwo = useStore((state) => state.diceTwo);
  const diceThree = useStore((state) => state.diceThree);
  const diceFour = useStore((state) => state.diceFour);
  const diceFive = useStore((state) => state.diceFive);
  const setGamePhase = useStore((state) => state.setGamePhase);
  const currentScores = useScore((state) => state.currentScores);
  const possibleScoresCalculation = useStore(
    (state) => state.possibleScoresCalculation
  );
  const setTotalScores = useScore((state) => state.setTotalScores);
  const scoreCount = useScore((state) => state.scoreCount);

  useEffect(() => {
    const goodDices = [diceOne, diceTwo, diceThree, diceFour, diceFive];
    if (possibleScoresCalculation)
      setPossibleScores(calculatePossibleScores(goodDices));
    setTotalScores(calculateTotal(currentScores));
    console.log(calculatePossibleScores(goodDices));
    if (gameEnd(scoreCount)) setGamePhase("Restart");
  });

  return (
    <>
      <Suspense fallback={<h1>loading</h1>}>
        <Plane />
      </Suspense>
    </>
  );
}

export default App;
