import React, { Suspense, useState, useEffect } from "react";
import { Canvas } from "react-three-fiber";
import { Physics, usePlane } from "use-cannon";
import { useSpring, a } from "@react-spring/three";
import { useStore /*useScore*/ } from "../Store/Store.js";
import { OrbitControls, Text, HTML } from "drei";
import Recipe from "./Recipe";
import Dice from "./Dice";

function Plane(props) {
  const [ref] = usePlane(() => ({
    rotation: [-Math.PI / 2, 0, 0],
    friction: 1,
    ...props,
  }));
  return (
    <mesh
      ref={ref}
      receiveShadow
      position={[0, -1, 0]}
      rotation={[-0.5 * Math.PI, 0, 0]}
    >
      <planeBufferGeometry attach="geometry" args={[100, 100]} />
      <shadowMaterial attach="material" color="black" />
    </mesh>
  );
}

function Button() {
  const setReroll = useStore((state) => state.setReroll);
  const setAmountRolled = useStore((state) => state.setAmountRolled);
  const amountRolled = useStore((state) => state.amountRolled);
  const dices = useStore((state) => state.dices);
  const setStartedGame = useStore((state) => state.setStartedGame);
  const gamePhase = useStore((state) => state.gamePhase);
  const setGamePhase = useStore((state) => state.setGamePhase);
  const [hover, set] = useState(false);

  // const initial = {
  //   one: null,
  //   two: null,
  //   three: null,
  //   four: null,
  //   five: null,
  //   six: null,
  // };

  let props = useSpring({
    position: hover ? [1.1, 0.1, 2.9] : [1.1, 0, 2.9],
  });

  useEffect(() => {
    document.body.style.cursor = hover ? "pointer" : "auto";
  }, [hover]);

  function reroll(dices, setReroll, amountRolled, setAmountRolled) {
    setReroll(true);
    for (let i = 0; i < dices.length; i++) {
      if (!dices[i].set) {
        dices[i].api.velocity.set(-6, -0.6, 0);
        dices[i].api.angularVelocity.set(
          Math.floor(Math.random() * 10),
          Math.floor(Math.random() * 10),
          Math.floor(Math.random() * 10)
        );
        dices[i].api.rotation.set(0, 0.2, 0.4);
        dices[i].api.position.set(
          Math.floor(Math.random() * 4) + 5,
          0.7,
          Math.floor(Math.random() * 4 - 2)
        );
        setTimeout(() => {
          setReroll(false);
        }, 500);
      }
    }
    setAmountRolled((amountRolled += 1));
  }
  return (
    <a.mesh
      onPointerOver={(e) => {
        e.stopPropagation();
        amountRolled <= 25 && set(true);
      }}
      onPointerOut={(e) => {
        e.stopPropagation();
        set(false);
      }}
      onClick={() => {
        setGamePhase("Roll Dice");
        if (amountRolled <= 25) {
          reroll(dices, setReroll, amountRolled, setAmountRolled);
          setStartedGame(true);
        }
      }}
      receiveShadow
      castShadow
      position={props.position}
      rotation={[-0.5 * Math.PI, 0, 0]}
    >
      {gamePhase === "Start" && (
        <Text
          textAlign="center"
          position={[0, 0.03, 0.03]}
          letterSpacing={-0.02}
          // font="https://fonts.gstatic.com/s/raleway/v14/1Ptrg8zYS_SKggPNwK4vaqI.woff"
          fontSize={0.3}
        >
          Make Coffee!
        </Text>
      )}
      {gamePhase === "Roll Dice" && (
        <Text
          textAlign="center"
          position={[0, 0.03, 0.03]}
          // font="https://fonts.gstatic.com/s/raleway/v14/1Ptrg8zYS_SKggPNwK4vaqI.woff"
          letterSpacing={-0.02}
          color={amountRolled <= 20 ? "white" : "gray"}
          fontSize={0.3}
        >
          Re-Roll Dice
        </Text>
      )}
      <planeBufferGeometry attach="geometry" args={[2, 0.6]} />
      <meshPhysicalMaterial attach="material" color="black" />
    </a.mesh>
  );
}

function Save() {
  // save state of current dice
  // const diceOne = useStore((state) => state.diceOne);
  // const diceTwo = useStore((state) => state.diceTwo);
  // const diceThree = useStore((state) => state.diceThree);
  // const diceFour = useStore((state) => state.diceFour);
  // const diceFive = useStore((state) => state.diceFive);
  const saveRecipe = useStore((state) => state.saveRecipe)
  const setSaveRecipe = useStore((state) => state.setSaveRecipe);
  const [hover, set] = useState(false);

  let props = useSpring({
    position: hover ? [3.9, 0.1, 2.9] : [3.9, 0, 2.9],
  });

  useEffect(() => {
    document.body.style.cursor = hover ? "pointer" : "auto";
  }, [hover]);

  return (
    <a.mesh
      onPointerOver={(e) => {
        e.stopPropagation();
        set(true);
      }}
      onPointerOut={(e) => {
        e.stopPropagation();
        set(false);
      }}
      onClick={() => {
        // save recipe
      }}
      receiveShadow
      castShadow
      position={props.position}
      rotation={[-0.5 * Math.PI, 0, 0]}
    >
      <Text
        textAlign="center"
        position={[0, 0.03, 0.03]}
        letterSpacing={-0.02}
        fontSize={0.3}
      >
        Save Recipe
      </Text>
      <planeBufferGeometry attach="geometry" args={[2, 0.6]} />
      <meshPhysicalMaterial attach="material" color="black" />
    </a.mesh>
  );
}

function Paper(props) {
  return (
    <mesh
      receiveShadow
      castShadow
      position={[-3.2, 0.01, -0.3]}
      rotation={[-0.5 * Math.PI, 0, 0]}
    >
      <boxBufferGeometry attach="geometry" args={[5, 7, 0.02]} />
      <meshPhysicalMaterial attach="material" color="white" />
    </mesh>
  );
}

export default () => {
  const dices = useStore((state) => state.dices);
  // const gamePhase = useStore((state) => state.gamePhase);
  return (
    <>
      <Canvas
        style={{ zIndex: 1 }}
        camera={{ position: [0, 20, 10], fov: 30 }}
        colorManagement
        shadowMap
      >
        <color attach="background" args={["lightblue"]} /*#add8e6*/ />
        <hemisphereLight intensity={0.1} />
        <directionalLight
          position={[-8, 20, 10]}
          shadow-camera-right={6}
          castShadow
        />
        <OrbitControls />
        <Physics defaultContactMaterial={{ contactEquationStiffness: 1e2 }}>
          <Suspense fallback={<HTML>Loading...</HTML>}>
            <Text
              position={[2.6, 0.02, -3.6]}
              // font={}
              letterSpacing={-0.02}
              color="black"
              rotation={[-0.5 * Math.PI, 0, 0]}
              fontSize={0.8}
            >
              Aeropress Dice
            </Text>
            <Recipe />
            <Button />
            <Save />
            <Plane />
            <Paper />
            {dices.map((dice) => (
              <Dice key={dice.id} dice={dice} />
            ))}
          </Suspense>
        </Physics>
      </Canvas>
    </>
  );
};
