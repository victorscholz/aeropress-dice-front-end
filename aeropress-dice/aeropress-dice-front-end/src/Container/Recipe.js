// import React from "react";
// import RecipeCard from "../Components/RecipeCard.js";
import React, { useState, useEffect } from "react";
import { Text, Plane } from "drei";
import { useSpring } from "@react-spring/core";
import { a } from "@react-spring/three";
import { useScore, useStore } from "../Store/Store.js";

const Recipe = () => {
  // const { possibleScores, currentScores } = useScore();
  const { savePhase } = useStore();
  const diceOne = useStore((state) => state.diceOne);
  const diceTwo = useStore((state) => state.diceTwo);
  const diceThree = useStore((state) => state.diceThree);
  const diceFour = useStore((state) => state.diceFour);
  const diceFive = useStore((state) => state.diceFive);
  // const aDices = [diceOne, diceTwo, diceThree, diceFour, diceFive];
  // const bDices = aDices.join().replaceAll(",", "\n");
  // const newRecipe = useStore((state) => state.newRecipe);
  // const createdRecipe = useStore((state) => state.createdRecipe)
  const [currentRecipes, setCurrentRecipes] = useState([]);
  // console.log(savePhase);
  // console.log(possibleScores, currentScores, totalScores)
  // const [createdRecipes, setCreatedRecipes] = useState([]);
  useEffect(() => {
    setCurrentRecipes(currentRecipes);
    const option = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
      },
    };
    fetch("http://localhost:3000/recipes/", option)
      .then((response) => response.json())
      .then((currentRecipes) => {
        console.log(currentRecipes)
        setCurrentRecipes(currentRecipes);
        // console.log(currentRecipes[currentRecipes.length - 1])
      });
  }, [diceOne]);
  // const list = createdRecipes[0]
  // console.log(list)
  // const list = createdRecipes.map((recipe) => (<li key={recipe.id} dice={recipe}></li>))
  // console.log(list)
  // {dices.map((dice) => (
  //   <Dice key={dice.id} dice={dice} />
  // ))}
  return (
    // console.log(savePhase),
    // console.log(diceOne, diceTwo, diceThree, diceFour, diceFive),
    <group position={[0, -0.17, -0.21]}>
      <Text
        rotation={[-0.5 * Math.PI, 0, 0]}
        position={[-3.9, 0.22, -3]}
        font="https://fonts.gstatic.com/s/raleway/v14/1Ptrg8zYS_SKggPNwK4vaqI.woff"
        fontSize={0.31}
        color="black"
      >
        Recipe Instructions:
      </Text>
      <Text
        rotation={[-0.5 * Math.PI, 0, 0]}
        position={[-5.3, 0.22, -2.6]}
        fontSize={0.2}
        color="black"
      >
        1.
      </Text>
      <ScoreCell
        positionText={[-3, 0.22, -2.6]}
        positionPlane={[-2.89, 0.2, -2.5]}
        name="one"
        // currentScore={currentScores.one}
        possibleScore={diceOne}
      />
      <Text
        rotation={[-0.5 * Math.PI, 0, 0]}
        position={[-5.3, 0.22, -2.3]}
        fontSize={0.2}
        color="black"
      >
        2.
      </Text>
      <ScoreCell
        positionText={[-3, 0.22, -2.3]}
        positionPlane={[-2.89, 0.2, -2.2]}
        name="two"
        // currentScore={currentScores.two}
        possibleScore={diceTwo}
      />
      <Text
        rotation={[-0.5 * Math.PI, 0, 0]}
        position={[-5.3, 0.22, -2.0]}
        fontSize={0.2}
        color="black"
      >
        3.
      </Text>
      <ScoreCell
        positionText={[-3, 0.22, -2.0]}
        positionPlane={[-2.89, 0.2, -1.9]}
        name="three"
        // currentScore={currentScores.three}
        possibleScore={diceThree}
      />
      <Text
        rotation={[-0.5 * Math.PI, 0, 0]}
        position={[-5.3, 0.22, -1.7]}
        fontSize={0.2}
        color="black"
      >
        4.
      </Text>
      <ScoreCell
        positionText={[-3, 0.22, -1.7]}
        positionPlane={[-2.89, 0.2, -1.6]}
        name="four"
        // currentScore={currentScores.four}
        possibleScore={diceFour}
      />
      <Text
        rotation={[-0.5 * Math.PI, 0, 0]}
        position={[-5.3, 0.22, -1.4]}
        fontSize={0.2}
        color="black"
      >
        5.
      </Text>
      <ScoreCell
        positionText={[-3, 0.22, -1.4]}
        positionPlane={[-2.89, 0.2, -1.3]}
        name="five"
        // currentScore={currentScores.five}
        possibleScore={diceFive}
      />
      {/* <Text
        rotation={[-0.5 * Math.PI, 0, 0]}
        position={[-5.3, 0.22, -1.1]}
        fontSize={0.2}
        color="black"
      >
        Six
      </Text>
      <ScoreCell
        positionText={[-3, 0.22, -1.1]}
        positionPlane={[-2.89, 0.2, -1.0]}
        name="six"
        currentScore={currentScores.six}
        possibleScore={possibleScores.six}
      />

      <Text
        rotation={[-0.5 * Math.PI, 0, 0]}
        position={[-5.3, 0.22, -0.4]}
        fontSize={0.2}
        color="black"
      >
        Sum
      </Text>
      <Text
        rotation={[-0.5 * Math.PI, 0, 0]}
        position={[-3, 0.22, -0.4]}
        fontSize={0.2}
        color="black"
      >
        {totalScores.totalUpper}
      </Text>  */}
      ///////////////////////////////////////// Saved Recipe Section
      <Text
        rotation={[-0.5 * Math.PI, 0, 0]}
        position={[-4, 0.22, -0.5]}
        font="https://fonts.gstatic.com/s/raleway/v14/1Ptrg8zYS_SKggPNwK4vaqI.woff"
        fontSize={0.3}
        color="black"
      >
        Last Saved Recipe:
      </Text>
      <Text
        rotation={[-0.5 * Math.PI, 0, 0]}
        position={[-5.3, 0.22, 0.4]}
        fontSize={0.2}
        color="black"
      >
        {/* 1. */}
      </Text>
      <ScoreCell
        positionText={[-3, 0.22, 0.4]}
        positionPlane={[-2.89, 0.2, 0.5]}
        name="first"
        // currentScore={savePhase}
        // if state of store value ? true, render else null
        // possibleScore={currentRecipes}
        possibleScore={savePhase}
        // savePhase={savePhase}
        // currentRecipe={currentRecipe}
      />
      <Text
        rotation={[-0.5 * Math.PI, 0, 0]}
        position={[-5.3, 0.22, 0.7]}
        fontSize={0.2}
        color="black"
      >
        {/* 2. */}
      </Text>
      <ScoreCell
        positionText={[-3, 0.22, 0.7]}
        positionPlane={[-2.89, 0.2, 0.8]}
        name="second"
        // currentScore={currentScores.two}
        // possibleScore={possibleScores.two}
        // possibleScore={savePhase}
      />
      <Text
        rotation={[-0.5 * Math.PI, 0, 0]}
        position={[-5.3, 0.22, 1]}
        fontSize={0.2}
        color="black"
      >
        {/* 3. */}
      </Text>
      <ScoreCell
        positionText={[-3, 0.22, 1]}
        positionPlane={[-2.89, 0.2, 1.1]}
        name="third"
        // currentScore={currentScores.three}
        // possibleScore={possibleScores.three}
        // possibleScore={savePhase}
      />
      <Text
        rotation={[-0.5 * Math.PI, 0, 0]}
        position={[-5.3, 0.22, 1.3]}
        fontSize={0.2}
        color="black"
      >
        {/* 4. */}
      </Text>
      <ScoreCell
        positionText={[-3, 0.22, 1.3]}
        positionPlane={[-2.89, 0.2, 1.4]}
        name="fourth"
        // currentScore={currentScores.four}
        // possibleScore={possibleScores.four}
        // possibleScore={savePhase}
      />
      <Text
        rotation={[-0.5 * Math.PI, 0, 0]}
        position={[-5.3, 0.22, 1.6]}
        fontSize={0.2}
        color="black"
      >
        {/* 5. */}
      </Text>
      <ScoreCell
        positionText={[-3, 0.22, 1.6]}
        positionPlane={[-2.89, 0.2, 1.7]}
        name="fifth"
        // currentScore={currentScores.five}
        // possibleScore={possibleScores.five}
        // possibleScore={savePhase}
      />
      <Text
        rotation={[-0.5 * Math.PI, 0, 0]}
        position={[-5.3, 0.22, 1.9]}
        fontSize={0.2}
        color="black"
      >
        {/* 6. */}
      </Text>
      <ScoreCell
        positionText={[-3, 0.22, 1.9]}
        positionPlane={[-2.89, 0.2, 2.0]}
        name="sixth"
        // currentScore={currentScores.six}
        // possibleScore={possibleScores.six}
        // possibleScore={savePhase}
      />
      <Text
        rotation={[-0.5 * Math.PI, 0, 0]}
        position={[-5.3, 0.22, 2.2]}
        fontSize={0.2}
        color="black"
      >
        {/* 7. */}
      </Text>
      <ScoreCell
        positionText={[-3, 0.22, 2.2]}
        positionPlane={[-2.89, 0.2, 2.3]}
        name="seventh"
        // currentScore={currentScores}
        // possibleScore={possibleScores}
        // possibleScore={savePhase}
      />
    </group>
  );
};

function ScoreCell({
  name,
  possibleScore,
  // currentScore,
  positionText,
  positionPlane,
  // savePhase
}) {
  const [hover, set] = useState(false);
  let {
    setCurrentScore,
    setPossibleScores,
    setScoreCount,
    scoreCount,
    // setSavePhase
  } = useScore();
  const {
    resetRound,
    setPossibleScoresCalculation,
    possibleScoresCalculation,
  } = useStore();

  useEffect(() => {
    document.body.style.cursor = hover ? "pointer" : "auto";
  });

  const props = useSpring({
    color: hover ? "#b0aeae" : "#fff",
  });

  return (
    <>
      <Plane
        onPointerOver={() => set(true)}
        onPointerOut={() => set(false)}
        onClick={() => {
          if (possibleScoresCalculation) {
            if (possibleScore) setCurrentScore(possibleScore, name);
            else setCurrentScore("x", name);
            resetRound(setPossibleScores);
            setPossibleScoresCalculation(false);
            setScoreCount((scoreCount += 1));
          }
        }}
        rotation={[-0.5 * Math.PI, 0, 0]}
        position={positionPlane}
        args={[0.3, 0.3]}
      >
        <a.meshPhysicalMaterial attach="material" color={props.color} />
      </Plane>
      <Text
        rotation={[-0.5 * Math.PI, 0, 0]}
        position={positionText}
        // textAlign="center"
        fontSize={0.2}
        color="black"
      >
        {possibleScore && possibleScore.toString()}{" "}
      </Text>
      {/* <Text
        rotation={[-0.5 * Math.PI, 0, 0]}
        position={positionText}
        fontSize={0.2}
        color="black"
      >
        {savePhase && savePhase.toString()}{" "}
      </Text> */}
      {/* {currentScore === null ? (
        <Text
          rotation={[-0.5 * Math.PI, 0, 0]}
          position={positionText}
          fontSize={0.2}
          color="black"
        >
          {possibleScore && possibleScore.toString()}{" "}
        </Text>
      ) : (
        <Text
          rotation={[-0.5 * Math.PI, 0, 0]}
          position={positionText}
          fontSize={0.2}
          color="black"
        >
          {currentScore.toString()}{" "}
        </Text>
      )} */}
    </>
  );
}

export default Recipe;
