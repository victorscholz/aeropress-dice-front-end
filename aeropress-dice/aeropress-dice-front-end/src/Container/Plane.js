import React, { Suspense, useState, useEffect, useRef } from "react";
import { Canvas, useThree, useLoader } from "react-three-fiber";
import { Physics, usePlane } from "use-cannon";
import { useSpring, a } from "@react-spring/three";
import { useStore /*useScore*/ } from "../Store/Store.js";
import { OrbitControls, Text, HTML, Stars, Sky } from "drei";
import Recipe from "./Recipe";
import Dice from "./Dice";
// import { CubeTextureLoader, TextureLoader } from "three";
// import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

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

  const props = useSpring({
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
        amountRolled <= 30 && set(true);
      }}
      onPointerOut={(e) => {
        e.stopPropagation();
        set(false);
      }}
      onClick={() => {
        setGamePhase("Roll Dice");
        if (amountRolled <= 30) {
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

function Save() {
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
    position: hover ? [3.9, 0.1, 2.9] : [3.9, 0, 2.9],
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
      onClick={() => {
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
      receiveShadow
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

// function SkyBox() {
//   const { scene } = useThree();
//   const loader = new CubeTextureLoader();
//   // The CubeTextureLoader load method takes an array of urls representing all 6 sides of the cube.
//   const texture = loader.load([
//     "textures/px.png",
//     "textures/nx.png",
//     "textures/py.png",
//     "textures/ny.png",
//     "textures/pz.png",
//     "textures/nz.png",
//   ]);
//   // Set the scene background property to the resulting texture.
//   scene.background = texture;
//   return null;
// }

// function Table() {
//   const group = useRef();
//   // const material = React.useMemo(
//   //   () => new TextureLoader().load("assets/uploads_files_1875799_Textures.rar"),
//   //   []
//   // );
//   const tableMaterial = React.useMemo(
//     () => new TextureLoader().load("assets/workshop_table_industrial/textures/wood_diffuse.jpeg"),
//     []
//   );
//   const { nodes, materials } = useLoader(
//     GLTFLoader,
//     // "assets/uploads_files_1875799_abciuppa_table_w_m_01.gltf"
//     "assets/workshop_table_industrial/scene.gltf"
//   );
//   console.log(nodes);
//   console.log(materials)
//   return (
//     <group ref={group}>
//       <mesh visible geometry={nodes.Box001_wood_0.geometry}>
//         <meshStandardMaterial
//           attach="material"
//           // map={materials}
//           color="white"
//           // roughness={0.3}
//           // metalness={0.3}
//         />
//       </mesh>
//       {/* <mesh material={materials.SceneRoot} geometry={nodes.Plane001.geometry} />
//       <mesh
//         material={materials.SceneRoot}
//         geometry={nodes.Plane005_Plane011.geometry}
//       />
//       <mesh material={materials.SceneRoot} geometry={nodes.Plane006.geometry} />
//       <mesh
//         material={materials.SceneRoot}
//         geometry={nodes.Plane_Plane008.geometry}
//       /> */}
//     </group>
//   );
// }

export default () => {
  const dices = useStore((state) => state.dices);

  return (
    <>
      <Canvas
        style={{ zIndex: 1 }}
        camera={{ position: [0, 20, 10], fov: 30 }}
        colorManagement
        shadowMap
      >
        <color attach="background" args={["lightblue"]} /*#add8e6*/ />
        {/* <SkyBox /> */}
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
              font="https://fonts.gstatic.com/s/raleway/v14/1Ptrg8zYS_SKggPNwK4vaqI.woff"
              letterSpacing={-0.02}
              color="black"
              rotation={[-0.5 * Math.PI, 0, 0]}
              fontSize={0.8}
            >
              Aeropress Dice
            </Text>
            {/* onClick{function}  to function(){ setState} to <ChildComponent props={this.state}/> */}
            <Recipe />
            <Button />
            <Save />
            {/* <Stars /> */}
            {/* <Sky /> */}
            <Plane />
            {/* <Table /> */}
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
