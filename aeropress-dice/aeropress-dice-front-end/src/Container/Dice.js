import React, { useRef, useEffect, useState } from "react";
import { useFrame } from "react-three-fiber";
import { useBox } from "use-cannon";
import { useSpring } from "@react-spring/core";
import { a } from "@react-spring/three";
// import { HTML } from "drei";
import { useStore } from "../Store/Store.js";
import shallow from "zustand/shallow";
import { TextureLoader } from "three";

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
    if (rotationX === 3.14 && rotationZ === 0) return "Do not stir.";
    if (rotationX === -3.14 && rotationZ === 0) return "Do not stir.";
    if (rotationX === 0 && rotationZ === 3.14) return "Do not stir.";
    if (rotationX === 0 && rotationZ === -3.14) return "Do not stir.";

    if (rotationX === 3.14 && rotationZ === -1.57)
      return "Stir once in one direction.";
    if (rotationX === 0 && rotationZ === 1.57)
      return "Stir once in one direction.";

    if (rotationX === -1.57)
      return "Stir in a North, South, East, West pattern";

    if (rotationX === 1.57) return "Your choice of stir technique.";

    if (rotationX === 0 && rotationZ === -1.57)
      return "Stir twice in one direction.";
    if (rotationX === 3.14 && rotationZ === 1.57)
      return "Stir twice in one direction.";

    if (rotationX === 3.14 && rotationZ === 3.14)
      return "Stir once clockwise and once counterclockwise.";
    if (rotationX === 3.14 && rotationZ === -3.14)
      return "Stir once clockwise and once counterclockwise.";
    if (rotationX === -3.14 && rotationZ === 3.14)
      return "Stir once clockwise and once counterclockwise.";
    if (rotationX === 0 && rotationZ === 0)
      return "Stir once clockwise and once counterclockwise.";
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
                <boxBufferGeometry attach="geometry" args={[1.6, 1.6, 1.6]} />
                <a.meshPhysicalMaterial
                  attachArray="material"
                  map={stir1}
                  color={props.color}
                />
                <a.meshPhysicalMaterial
                  attachArray="material"
                  map={stir2}
                  color={props.color}
                />
                <a.meshPhysicalMaterial
                  attachArray="material"
                  map={stir3}
                  color={props.color}
                />
                <a.meshPhysicalMaterial
                  attachArray="material"
                  map={stir4}
                  color={props.color}
                />
                <a.meshPhysicalMaterial
                  attachArray="material"
                  map={stir5}
                  color={props.color}
                />
                <a.meshPhysicalMaterial
                  attachArray="material"
                  map={stir6}
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
