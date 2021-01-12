import React, { Suspense, useState, useEffect } from "react";
import { Canvas, useThree } from "react-three-fiber";
import { Physics, usePlane } from "use-cannon";
import { useSpring, a } from "@react-spring/three";
import { useStore } from "../Store/Store.js";
import { OrbitControls, Text } from "drei";
import { useGLTF } from "@react-three/drei";
import Recipe from "./Recipe";
import Dice from "./Dice";
import { CubeTextureLoader } from "three";
import useSound from "use-sound";
import diceSound from "../Sound/dice_roll.wav";
import writing from "../Sound/writing.wav";

// Creates the ground in my scene
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
      position={[0, 0.04, 0]}
      rotation={[-0.5 * Math.PI, 0, 0]}
    >
      <planeBufferGeometry attach="geometry" args={[100, 100]} />
      <shadowMaterial attach="material" color="black" />
    </mesh>
  );
}

// Creates the roll button
function Button() {
  const [playbackRate, setPlaybackRate] = React.useState(0.55);
  const [play] = useSound(diceSound, { playbackRate, interrupt: true });
  const setReroll = useStore((state) => state.setReroll);
  const setAmountRolled = useStore((state) => state.setAmountRolled);
  const amountRolled = useStore((state) => state.amountRolled);
  const dices = useStore((state) => state.dices);
  const setStartedGame = useStore((state) => state.setStartedGame);
  const gamePhase = useStore((state) => state.gamePhase);
  const setGamePhase = useStore((state) => state.setGamePhase);
  const [hover, set] = useState(false);

  const props = useSpring({
    position: hover ? [1.1, 0.1, 2.9] : [1.1, 0.01, 2.9],
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
        amountRolled <= 30 && set(true);
      }}
      onPointerOut={(e) => {
        e.stopPropagation();
        set(false);
      }}
      onPointerDown={() => {
        setGamePhase("Roll Dice");
        {
          setPlaybackRate(playbackRate);
          play(diceSound);
        }
        if (amountRolled <= 30) {
          reroll(dices, setReroll, amountRolled, setAmountRolled);
          setStartedGame(true);
        }
      }}
      castShadow
      position={props.position}
      rotation={[-0.5 * Math.PI, 0, 0]}
    >
      {gamePhase === "Start" && (
        <Text
          textAlign="center"
          position={[0, 0.03, 0.03]}
          letterSpacing={-0.02}
          font="https://fonts.gstatic.com/s/raleway/v14/1Ptrg8zYS_SKggPNwK4vaqI.woff"
          fontSize={0.3}
        >
          Make Coffee!
        </Text>
      )}
      {gamePhase === "Roll Dice" && (
        <Text
          textAlign="center"
          position={[0, 0.03, 0.03]}
          font="https://fonts.gstatic.com/s/raleway/v14/1Ptrg8zYS_SKggPNwK4vaqI.woff"
          letterSpacing={-0.02}
          color={amountRolled <= 30 ? "white" : "gray"}
          fontSize={0.3}
        >
          Re-Roll Dice
        </Text>
      )}
      <planeBufferGeometry attach="geometry" args={[2, 0.6]} />
      <meshPhysicalMaterial attach="material" color="saddlebrown" />
    </a.mesh>
  );
}

// const YourComponent = () => {
//   // How you setup the state hooks
//   const [yourState, setYourState] = useState(defaultValue);

//   // This will trigger after a state change
//   useEffect(
//     () => {
//       // yourState is the "current state"
//       if (yourState === blahblah) {
//         // someNewValue is the "next state"
//         setYourState(someNewValue);
//       }

//       // the return will only trigger before the component unmounts. most of the time you won't need this.
//       return () => {};
//     },
//     // This is an optional parameter - it tells the effect to only trigger when the following values change (in this case "yourState")
//     [yourState]
//   );
// };

// Creates my save button
function Save() {
  // const [writebackRate, setWritebackRate] = React.useState(0.1)
  const [write] = useSound(writing, { volume: 0.4, interrupt: true });
  const diceOne = useStore((state) => state.diceOne);
  const diceTwo = useStore((state) => state.diceTwo);
  const diceThree = useStore((state) => state.diceThree);
  const diceFour = useStore((state) => state.diceFour);
  const diceFive = useStore((state) => state.diceFive);
  const amountSaved = useStore((state) => state.amountSaved);
  const { savePhase } = useStore();
  const aDices = [diceOne, diceTwo, diceThree, diceFour, diceFive];
  const bDices = aDices.join().replaceAll(",", "\n");
  const setSavePhase = useStore((state) => state.setSavePhase);
  const [hover, set] = useState(false);
  const [createdRecipes, setCreatedRecipes] = useState([]);
  const props = useSpring({
    position: hover ? [3.9, 0.1, 2.9] : [3.9, 0.01, 2.9],
  });

  useEffect(() => {
    document.body.style.cursor = hover ? "pointer" : "auto";
  }, [hover]);

  useEffect(() => {
    const option = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify({ dice: bDices }),
    };
    // console.log(bDices)
    fetch("http://localhost:3000/recipes/", option)
      .then((response) => response.json())
      .then((newRecipe) => {
        console.log(newRecipe);
      });
  }, [savePhase]);

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
      onPointerDown={() => {
        {
          // setWritebackRate(writebackRate)
          write(writing);
        }
        // e.stopPropagation();
        setCreatedRecipes(createdRecipes);
        // setSavePhase("Saved");
        if (amountSaved <= 7) {
          setSavePhase(bDices);
          // console.log(savePhase);
          // console.log(aDices)
        }
        // if POST already happened, don't POST again
        // setGamePhase("Start");

        // if (saveRecipes) {
        // if (dices) {setSaveRecipe(diceOne)};
        // else setSaveRecipes(false);
        // }
        // save recipe
      }}
      castShadow
      position={props.position}
      rotation={[-0.5 * Math.PI, 0, 0]}
    >
      <Text
        textAlign="center"
        position={[0, 0.03, 0.03]}
        letterSpacing={-0.02}
        font="https://fonts.gstatic.com/s/raleway/v14/1Ptrg8zYS_SKggPNwK4vaqI.woff"
        fontSize={0.3}
      >
        Save Recipe
      </Text>
      <planeBufferGeometry attach="geometry" args={[2, 0.6]} />
      <meshPhysicalMaterial attach="material" color="saddlebrown" />
    </a.mesh>
  );
}

// Creates the paper that my recipes render on
function Paper(props) {
  return (
    <mesh
      castShadow
      position={[-3.2, 0.01, -0.3]}
      rotation={[-0.5 * Math.PI, 0, 0]}
    >
      <boxBufferGeometry attach="geometry" args={[5, 7, 0.02]} />
      <meshPhysicalMaterial attach="material" color="white" />
    </mesh>
  );
}

// Creates cube map for scene
function SkyBox() {
  const { scene } = useThree();
  const loader = new CubeTextureLoader();
  // The CubeTextureLoader load method takes an array of urls representing all 6 sides of the cube.
  const texture = loader.load([
    "textures/px.jpeg",
    "textures/nx.jpeg",
    "textures/py.jpeg",
    "textures/ny.jpeg",
    "textures/pz.jpeg",
    "textures/nz.jpeg",
  ]);
  // Set the scene background property to the resulting texture.
  scene.background = texture;
  return null;
}

// Loaded in GLTF model of a coffee mug
function Coffee() {
  const { nodes, materials } = useGLTF("assets/coffee_mug/scene.gltf", true);

  return (
    <group position={[0.5, -19, 2]} scale={[0.75, 0.75, 0.75]}>
      <mesh
        material={materials["Coffee"]}
        geometry={nodes.Mug1_Coffee_0.geometry}
      />
      <mesh
        material={materials["material"]}
        geometry={nodes.Mug1_Mug_0.geometry}
        castShadow={true}
        // receiveShadow={true}
      />
    </group>
  );
}

// Loaded in GLTF model of a table
function Table() {
  const { nodes, materials } = useGLTF("assets/coffee_table/scene.gltf", true);

  return (
    <group
      position={[0.5, -4.88, -0.3]}
      scale={[25, 25, 25]}
      rotation={[-1.571, 0, 0]}
    >
      <mesh
        material={materials["Fjaellbo"]}
        geometry={nodes.FjaellboBodyGameMergedLowPoly_Fjaellbo_0.geometry}
        // castShadow={true}
        // receiveShadow={true}
      />
    </group>
  );
}

// Where everything is rendered in my scene
export default () => {
  const dices = useStore((state) => state.dices);

  return (
    <>
      <Canvas
        className="canvas"
        style={{ zIndex: 1 }}
        camera={{ position: [0, 20, 10], fov: 30 }}
        colorManagement
        shadowMap
      >
        <color attach="background" args={["gray"]} /*#add8e6*/ />
        <fog attach="fog" args={["#bcbec0", 10, 90]} />
        <SkyBox />
        <hemisphereLight intensity={0.2} />
        <directionalLight
          // intensity={0.6}
          position={[-8, 20, 10]}
          // shadow-camera-right={6} // original
          // shadow-camera-near={0.5} // default
          // shadow-camera-far={500} // default
          shadow-camera-top={-8.1}
          shadow-camera-right={8.1}
          shadow-camera-left={-8.1}
          shadow-camera-bottom={8.1}
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
          castShadow
        />
        <OrbitControls />
        <Physics defaultContactMaterial={{ contactEquationStiffness: 1e2 }}>
          <Suspense fallback={null}>
            <Text
              position={[2.6, 0.02, -3.6]}
              font="https://fonts.gstatic.com/s/raleway/v14/1Ptrg8zYS_SKggPNwK4vaqI.woff"
              letterSpacing={-0.02}
              color="white"
              rotation={[-0.5 * Math.PI, 0, 0]}
              fontSize={0.8}
              castShadow
            >
              Aeropress Dice
            </Text>
            <Recipe />
            <Button />
            <Save />
            <Coffee castShadow />
            <Table />
            <Plane />
            <Paper />
            {dices.map((dice) => (
              <Dice key={dice.id} dice={dice} />
            ))}
          </Suspense>
        </Physics>
      </Canvas>
      {/* <Loader /> */}
    </>
  );
};
