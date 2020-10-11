import React, { useRef, useEffect, useState } from "react";
import { useLoader, useFrame } from "react-three-fiber";
import { useBox } from "use-cannon";
import { useSpring } from "@react-spring/core";
import { a } from "@react-spring/three";
import { HTML } from "drei";
import { useStore } from "../Store/Store.js";
import shallow from "zustand/shallow";
import { TextureLoader } from "three";

// function Plane(props) {
//   const [ref] = usePlane(() => ({
//     rotation: [-Math.PI / 2, 0, 0],
//     friction: 1,
//     ...props,
//   }));
//   return (
//     <mesh
//       ref={ref}
//       receiveShadow
//       position={[0, -1, 0]}
//       rotation={[-0.5 * Math.PI, 0, 0]}
//     >
//       <planeBufferGeometry attach="geometry" args={[100, 100]} />
//       <shadowMaterial attach="material" color="black" />
//     </mesh>
//   );
// }

export default function Dice({ dice }) {
  ////////////////////////////////////////////////////////////////////////////////////////////////////
  /* file paths to custom textures
    "textures/stir/stir2.jpeg"
    "textures/stir/stir1.jpeg"
    "textures/stir/two-direction.jpeg"
    "textures/stir/no-stir.jpeg"
    "textures/stir/compass.jpeg"
    "textures/your-choice.jpeg"
    "textures/ratio/12-200.jpeg"
    "textures/ratio/15-200.jpeg"
    "textures/ratio/15-250.jpeg"
    "textures/ratio/24-200.jpeg"
    "textures/ratio/30-200.jpeg"
    "textures/your-choice.jpeg"
    "textures/temperature/75C.jpeg"
    "textures/temperature/80C.jpeg"
    "textures/temperature/85C.jpeg"
    "textures/temperature/90C.jpeg"
    "textures/temperature/95C.jpeg"
    "textures/your-choice.jpeg"
    "textures/bloom/inverted-no-bloom.jpeg"
    "textures/bloom/inverted-30-60.jpeg"
    "textures/bloom/standard-no-bloom.jpeg"
    "textures/bloom/inverted-30-30.jpeg"
    "textures/bloom/standard-30-30.jpeg"
    "textures/bloom/standard-30-60.jpeg"
    "textures/grind/fine-60.jpeg"
    "textures/grind/coarse-4.jpeg"
    "textures/grind/very-fine-30.jpeg"
    "textures/grind/med-fine-90.jpeg"
    "textures/grind/medium-120.jpeg"
    "textures/your-choice.jpeg"
    */
  ///////////////////////////////////////////////////////////////////////////////////////////////////////
  const stir1 = React.useMemo(
    () => new TextureLoader().load("textures/stir/stir1.jpeg"),
    []
  );
  const stir2 = React.useMemo(
    () => new TextureLoader().load("textures/stir/stir2.jpeg"),
    []
  );
  const stir3 = React.useMemo(
    () => new TextureLoader().load("textures/stir/two-direction.jpeg"),
    []
  );
  const stir4 = React.useMemo(
    () => new TextureLoader().load("textures/stir/no-stir.jpeg"),
    []
  );
  const stir5 = React.useMemo(
    () => new TextureLoader().load("textures/stir/compass.jpeg"),
    []
  );
  const stir6 = React.useMemo(
    () => new TextureLoader().load("textures/your-choice.jpeg"),
    []
  );
  const [rotation, setRotation] = useState();
  const [diceNumber, setDiceNumber] = useState(0);
  const [currentSlot, setCurrentSlot] = useState();
  const [haveSet, setHaveSet] = useState(false);
  const [hover, set] = useState(false);

  const { slots, setSlot } = useStore(
    (state) => ({ slots: state.slots, setSlot: state.setSlot }),
    shallow
  );
  let setApi = useStore((state) => state.setApi);
  let setDiceOne = useStore((state) => state.setDiceOne);
  let setDiceTwo = useStore((state) => state.setDiceTwo);
  let setDiceThree = useStore((state) => state.setDiceThree);
  let setDiceFour = useStore((state) => state.setDiceFour);
  let setDiceFive = useStore((state) => state.setDiceFive);
  const { roll } = useStore((state) => state.api);
  const velocity = useRef([1, 1, 1]);

  useEffect(() => {
    switch (dice.id) {
      case 1:
        if (diceNumber) setDiceOne(diceNumber);
        break;
      case 2:
        if (diceNumber) setDiceTwo(diceNumber);
        break;
      case 3:
        if (diceNumber) setDiceThree(diceNumber);
        break;
      case 4:
        if (diceNumber) setDiceFour(diceNumber);
        break;
      case 5:
        if (diceNumber) setDiceFive(diceNumber);
        break;
      default:
        break;
    }
  }, [
    diceNumber,
    dice.id,
    setDiceOne,
    setDiceTwo,
    setDiceThree,
    setDiceFour,
    setDiceFive,
  ]);

  const [ref, api] = useBox(() => ({
    mass: 0.1,
    position: [
      slots[dice.id - 1].position[0],
      slots[dice.id - 1].position[1],
      slots[dice.id - 1].position[2],
    ],
    allowSleep: false,
    sleepSpeedLimit: 1,
    args: [0.3, 0.3, 0.3],
    material: {
      friction: 1,
      restitution: 1,
    },
    onCollide: (e) => {
      roll(e.contact.impactVelocity);
    },
  }));

  useEffect(() => {
    setApi(dice.id, api);
  }, [api, dice.id, setApi]);

  useEffect(() => api.velocity.subscribe((v) => (velocity.current = v)), [
    api.velocity,
  ]);

  useEffect(() => {
    if (rotation) {
      if (
        Math.abs(Math.round(velocity.current[0])) === 0 &&
        Math.abs(Math.round(velocity.current[1])) === 0 &&
        Math.abs(Math.round(velocity.current[2])) === 0
      ) {
        if (!haveSet) {
          setDiceNumber(
            getDiceNumber(
              parseFloat(rotation[0].toFixed(2)),
              parseFloat(rotation[1].toFixed(2))
            )
          );
          setHaveSet(true);
          setTimeout(() => {
            setHaveSet(false);
          }, 1000);
        }
      }
    }
  }, [rotation, haveSet]);

  useFrame(() => {
    let velX = Math.floor(Math.abs(velocity.current[0]));
    let velY = Math.floor(Math.abs(velocity.current[1]));
    let velZ = Math.floor(Math.abs(velocity.current[2]));
    let velocities = [velX, velY, velZ].toString();
    if (velocities === [0, 0, 0].toString()) {
      if (
        Math.abs(parseFloat(ref.current.rotation.x.toFixed(1))) === 0 &&
        Math.abs(parseFloat(ref.current.rotation.z.toFixed(1))) === 0
      ) {
        setRotation([0, 0]);
      } else {
        setRotation([
          parseFloat(ref.current.rotation.x.toFixed(2)),
          parseFloat(ref.current.rotation.z.toFixed(2)),
        ]);
      }
    }
  });

  const getDiceNumber = (rotationX, rotationZ) => {
    if (rotationX === 3.14 && rotationZ === 0) return 1;
    if (rotationX === -3.14 && rotationZ === 0) return 1;
    if (rotationX === 0 && rotationZ === 3.14) return 1;
    if (rotationX === 0 && rotationZ === -3.14) return 1;

    if (rotationX === 3.14 && rotationZ === -1.57) return 2;
    if (rotationX === 0 && rotationZ === 1.57) return 2;

    if (rotationX === -1.57) return 3;

    if (rotationX === 1.57) return 4;

    if (rotationX === 0 && rotationZ === -1.57) return 5;
    if (rotationX === 3.14 && rotationZ === 1.57) return 5;

    if (rotationX === 3.14 && rotationZ === 3.14) return 6;
    if (rotationX === 3.14 && rotationZ === -3.14) return 6;
    if (rotationX === -3.14 && rotationZ === 3.14) return 6;
    if (rotationX === 0 && rotationZ === 0) return 6;
  };

  function setDice(dice) {
    if (!dice.set) {
      for (let i = 0; i < slots.length; i++) {
        if (slots[i].open) {
          api.position.set(
            slots[i].position[0],
            slots[i].position[1],
            slots[i].position[2]
          );
          setSlot(i, false);
          setCurrentSlot(i);
          dice.set = true;
          break;
        }
      }
    } else {
      api.position.set(Math.random() * 2 + 1, 0.2, Math.random() * 2 + 0.5);
      dice.set = false;
      setSlot(currentSlot, true);
      setCurrentSlot(null);
    }
  }

  const props = useSpring({ color: hover ? "gray" : "white" });

  useEffect(() => {
    document.body.style.cursor = hover ? "pointer" : "auto";
  }, [hover]);

  return (
    <a.group
      onPointerOver={(e) => {
        e.stopPropagation();
        set(true);
      }}
      onPointerOut={(e) => {
        e.stopPropagation();
        set(false);
      }}
      onClick={(e) => {
        setDice(dice);
        e.stopPropagation();
      }}
      castShadow
      receiveShadow
      scale={[0.4, 0.4, 0.4]}
      ref={ref}
      dispose={null}
    >
      <group castShadow receiveShadow rotation={[-Math.PI / 2, 0, 0]}>
        <group castShadow receiveShadow rotation={[Math.PI / 2, 0, 0]}>
          <group castShadow receiveShadow position={[2.34, 0, 0]}>
            <group
              castShadow
              receiveShadow
              position={[-2.33, -0.01, 0]}
              scale={[0.41, 0.41, 0.41]}
            >
              <mesh castShadow receiveShadow>
                <boxBufferGeometry
                  attach="geometry"
                  args={[1.6, 1.6, 1.6]}
                />
                <a.meshPhysicalMaterial
                  attach="material"
                  // attachArray="material"
                  map={stir1}
                  color={props.color}
                />
              </mesh>
              <mesh castShadow receiveShadow>
                <meshPhysicalMaterial attach="material" color="#fff" />
              </mesh>
            </group>
          </group>
        </group>
      </group>
    </a.group>
  );
}
// const [hovered, setHover] = useState(false);
// const [active, setActive] = useState(false);

// const [ref, api] = useBox(() => ({
//   // mass: 0.1,
//   // position: [0, 5, 0],
//   // rotation: [0.4, 0.2, 0.5],
//   // allowSleep: false,
//   // sleepSpeedLimit: 1,
//   // args: [0.3, 0.3, 0.3],
//   // material: {
//   // 	friction: 1,
//   // 	restitution: 1,
//   // },
//   mass: 0.1,
//   position: [0, 0.2, 0],
//   allowSleep: false,
//   sleepSpeedLimit: 1,
//   args: [0.22, 0.33, 0.22],
//   material: {
//     friction: 1,
//     restitution: 1,
//   },
//   onCollide: (e) => {
//     // roll(e.contact.impactVelocity);
//   },
//   ...props,
// }));

// const rerollDice = () => {
//   api.velocity.set(-5, -0.5, 0);
//   api.angularVelocity.set(
//     Math.floor(Math.random() * 10),
//     Math.floor(Math.random() * 10),
//     Math.floor(Math.random() * 10)
//   );
//   api.rotation.set(0, 0.2, 0.4);
//   api.position.set(2, 1, 0);
// };

//   return (
//     <group
//       onPointerOver={(e) => {
//         /*e.stopPropagation() &&*/ setHover(true);
//       }}
//       onPointerOut={(e) => {
//         /*e.stopPropagation() &&*/ setHover(false);
//       }}
//       onClick={(e) => {
//         /*rerollDice()&&*/ setActive(!active);
//       }}
//       // position={prop.position}
//       castShadow
//       receiveShadow
//       scale={active ? [1.5, 1.5, 1.5] : [1, 1, 1]}
//       ref={ref}
//       dispose={null}
//       {...props}
//     >
//       <group castShadow receiveShadow rotation={[-Math.PI / 2, 0, 0]}>
//         <group castShadow receiveShadow rotation={[Math.PI / 2, 0, 0]}>
//           <group castShadow receiveShadow position={[2.34, 0, 0]}>
//             <group
//               castShadow
//               receiveShadow
//               position={[-2.33, -0.01, 0]}
//               scale={[0.41, 0.41, 0.41]}
//             >
//               <mesh
//                 receiveShadow
//                 castShadow
//                 // scale={[0.3, 0.3, 0.3]}
//                 // ref={mesh}
//                 // onClick={(e) => setActive(!active)}
//               >
//                 <boxBufferGeometry
//                   attach="geometry"
//                   args={[0.75, 0.75, 0.75]}
//                 />
//                 <meshPhysicalMaterial
//                   attachArray="material"
//                   map={stir1}
//                   color={hovered ? "silver" : "white"}
//                 />
//                 <meshPhysicalMaterial
//                   map={stir2}
//                   attachArray="material"
//                   color={hovered ? "silver" : "white"}
//                 />
//                 <meshPhysicalMaterial
//                   map={stir3}
//                   attachArray="material"
//                   color={hovered ? "silver" : "white"}
//                 />
//                 <meshPhysicalMaterial
//                   map={stir4}
//                   attachArray="material"
//                   color={hovered ? "silver" : "white"}
//                 />
//                 <meshPhysicalMaterial
//                   map={stir5}
//                   attachArray="material"
//                   color={hovered ? "silver" : "white"}
//                 />
//                 <meshPhysicalMaterial
//                   map={stir6}
//                   attachArray="material"
//                   color={hovered ? "silver" : "white"}
//                 />
//               </mesh>
//             </group>
//           </group>
//         </group>
//       </group>
//     </group>
//   );
// }

// const dices = useStore((state) => state.dices);

//   return (
//     <>
//       <Canvas
//         style={{ zIndex: 1 }}
//         camera={{ position: [0, 20, 10], fov: 25 }}
//         colorManagement
//         // sRGB
//         shadowMap
//         gl={{ alpha: false }}
//       >
//         <color attach="background" args={["lightblue"]} />
//         <hemisphereLight intensity={0.2} />

//         <directionalLight
//           position={[-8, 20, 10]}
//           shadow-camera-right={6}
//           castShadow
//         />

//         <OrbitControls />
//         <Physics defaultContactMaterial={{ contactEquationStiffness: 1e3 }}>
//           <Suspense fallback={<HTML>Loading...</HTML>}>
//             <Plane />
//             {/* {dices.map((dice) => (
//               <Dice key={dice.id} dice={dice} />
//             ))} */}
//             <Cube position={[2, 0.25, 4]} />
//             <Cube position={[1, 0.25, 4]} />
//             <Cube position={[0, 0.25, 4]} />
//             <Cube position={[-1, 0.25, 4]} />
//             <Cube position={[-2, 0.25, 4]} />
//             <Text
//               rotation={[-0.5 * Math.PI, 0, 0]}
//               // position={[-5.3, 0.22, 1.9]}
//               // positionText={[-3, 0.22, -2.6]}
//               position={[-2.89, 0, -2.5]}
//               fontSize={0.3}
//               color="black"
//             >
//               Aeropress Dice
//             </Text>
//             <Text
//               rotation={[-0.5 * Math.PI, 0, 0]}
//               // position={[-5.3, 0.22, 1.9]}
//               // positionText={[-3, 0.22, -2.6]}
//               position={[-3.54, 0, -2]}
//               fontSize={0.2}
//               color="black"
//             >
//               Recipes
//             </Text>
//           </Suspense>
//         </Physics>
//       </Canvas>
//     </>
//   );
// }
