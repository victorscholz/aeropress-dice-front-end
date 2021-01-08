import React, { useRef, useEffect, useState } from "react";
import { useFrame } from "react-three-fiber";
import { useBox } from "use-cannon";
// import { useSpring } from "@react-spring/core";
import { a } from "@react-spring/three";
import { useStore } from "../Store/Store.js";
import shallow from "zustand/shallow";
import { useTexture } from "@react-three/drei";

// Where my dice receive their assigned number, id, and location in the scene.
export default function Dice({ dice }) {
  const [rotation, setRotation] = useState();
  const [diceNumber, setDiceNumber] = useState(0);
  const [diceNumberTwo, setDiceNumberTwo] = useState(0);
  const [diceNumberThree, setDiceNumberThree] = useState(0);
  const [diceNumberFour, setDiceNumberFour] = useState(0);
  const [diceNumberFive, setDiceNumberFive] = useState(0);
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
        if (diceNumberTwo) setDiceTwo(diceNumberTwo);
        break;
      case 3:
        if (diceNumberThree) setDiceThree(diceNumberThree);
        break;
      case 4:
        if (diceNumberFour) setDiceFour(diceNumberFour);
        break;
      case 5:
        if (diceNumberFive) setDiceFive(diceNumberFive);
        break;
      default:
        break;
    }
  }, [
    diceNumber,
    // diceNumberTwo,
    // diceNumberThree,
    // diceNumberFour,
    // diceNumberFive,
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
          setDiceNumberTwo(
            getDiceNumberTwo(
              parseFloat(rotation[0].toFixed(2)),
              parseFloat(rotation[1].toFixed(2))
            )
          );
          setDiceNumberThree(
            getDiceNumberThree(
              parseFloat(rotation[0].toFixed(2)),
              parseFloat(rotation[1].toFixed(2))
            )
          );
          setDiceNumberFour(
            getDiceNumberFour(
              parseFloat(rotation[0].toFixed(2)),
              parseFloat(rotation[1].toFixed(2))
            )
          );
          setDiceNumberFive(
            getDiceNumberFive(
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

  // getDiceNumberOne - Five tell application what has been rolled based on rotation.
  const getDiceNumberFive = (rotationX, rotationZ) => {
    if (rotationX === 3.14 && rotationZ === 0)
      return "Do not stir before pressing.";
    if (rotationX === -3.14 && rotationZ === 0)
      return "Do not stir before pressing.";
    if (rotationX === 0 && rotationZ === 3.14)
      return "Do not stir before pressing.";
    if (rotationX === 0 && rotationZ === -3.14)
      return "Do not stir before pressing.";

    if (rotationX === 3.14 && rotationZ === -1.57)
      return "Stir once in one direction before pressing.";
    if (rotationX === 0 && rotationZ === 1.57)
      return "Stir once in one direction before pressing.";

    if (rotationX === -1.57)
      return "Stir in a N/E/S/W pattern before pressing.";

    if (rotationX === 1.57)
      return "Stir clockwise/counterclockwise before pressing.";

    if (rotationX === 0 && rotationZ === -1.57)
      return "Stir twice in one direction before pressing.";
    if (rotationX === 3.14 && rotationZ === 1.57)
      return "Stir twice in one direction before pressing.";

    if (rotationX === 3.14 && rotationZ === 3.14)
      return "Your choice of stir technique before pressing.";
    if (rotationX === 3.14 && rotationZ === -3.14)
      return "Your choice of stir technique before pressing.";
    if (rotationX === -3.14 && rotationZ === 3.14)
      return "Your choice of stir technique before pressing.";
    if (rotationX === 0 && rotationZ === 0)
      return "Your choice of stir technique before pressing.";
  };

  const getDiceNumberFour = (rotationX, rotationZ) => {
    if (rotationX === 3.14 && rotationZ === 0)
      return "Inverted position 30s Bloom with 30g water.";
    if (rotationX === -3.14 && rotationZ === 0)
      return "Inverted position 30s Bloom with 30g water.";
    if (rotationX === 0 && rotationZ === 3.14)
      return "Inverted position 30s Bloom with 30g water.";
    if (rotationX === 0 && rotationZ === -3.14)
      return "Inverted position 30s Bloom/30g water.";

    if (rotationX === 3.14 && rotationZ === -1.57)
      return "Inverted position 30s Bloom with 60g water.";
    if (rotationX === 0 && rotationZ === 1.57)
      return "Inverted position 30s Bloom with 60g water.";

    if (rotationX === -1.57) return "Inverted position with no bloom.";

    if (rotationX === 1.57)
      return "Standard position 30s Bloom with 30g water.";

    if (rotationX === 0 && rotationZ === -1.57)
      return "Standard position 30s Bloom with 60g water.";
    if (rotationX === 3.14 && rotationZ === 1.57)
      return "Standard position 30s Bloom with 60g water.";

    if (rotationX === 3.14 && rotationZ === 3.14)
      return "Standard position with no bloom.";
    if (rotationX === 3.14 && rotationZ === -3.14)
      return "Standard position with no bloom.";
    if (rotationX === -3.14 && rotationZ === 3.14)
      return "Standard position with no bloom.";
    if (rotationX === 0 && rotationZ === 0)
      return "Standard position with no bloom.";
  };

  const getDiceNumberThree = (rotationX, rotationZ) => {
    if (rotationX === 3.14 && rotationZ === 0)
      return "Coarse grind with a 4 min brew time.";
    if (rotationX === -3.14 && rotationZ === 0)
      return "Coarse grind with a 4 min brew time.";
    if (rotationX === 0 && rotationZ === 3.14)
      return "Coarse grind with a 4 min brew time.";
    if (rotationX === 0 && rotationZ === -3.14)
      return "Coarse grind with a 4 min brew time.";

    if (rotationX === 3.14 && rotationZ === -1.57)
      return "Fine grind with a 60 sec brew time.";
    if (rotationX === 0 && rotationZ === 1.57)
      return "Fine grind with a 60 sec brew time.";

    if (rotationX === -1.57)
      return "Medium fine grind with a 90 sec brew time.";

    if (rotationX === 1.57) return "Medium grind with a 120 sec brew time.";

    if (rotationX === 0 && rotationZ === -1.57)
      return "Very fine grind with a 30 sec brew time.";
    if (rotationX === 3.14 && rotationZ === 1.57)
      return "Very fine grind with a 30 sec brew time.";

    if (rotationX === 3.14 && rotationZ === 3.14)
      return "Your choice of grind and brew time.";
    if (rotationX === 3.14 && rotationZ === -3.14)
      return "Your choice of grind and brew time.";
    if (rotationX === -3.14 && rotationZ === 3.14)
      return "Your choice of grind and brew time.";
    if (rotationX === 0 && rotationZ === 0)
      return "Your choice of grind and brew time.";
  };

  const getDiceNumberTwo = (rotationX, rotationZ) => {
    if (rotationX === 3.14 && rotationZ === 0)
      return "12g of coffee to 200g of water.";
    if (rotationX === -3.14 && rotationZ === 0)
      return "12g of coffee to 200g of water.";
    if (rotationX === 0 && rotationZ === 3.14)
      return "12g of coffee to 200g of water.";
    if (rotationX === 0 && rotationZ === -3.14)
      return "12g of coffee to 200g of water.";

    if (rotationX === 3.14 && rotationZ === -1.57)
      return "15g of coffee to 200g of water.";
    if (rotationX === 0 && rotationZ === 1.57)
      return "15g of coffee to 200g of water.";

    if (rotationX === -1.57) return "15g of coffee to 250g of water";

    if (rotationX === 1.57)
      return "24g of coffee to 200g of water (dilute to share).";

    if (rotationX === 0 && rotationZ === -1.57)
      return "30g of coffee to 200g of water (dilute to share).";
    if (rotationX === 3.14 && rotationZ === 1.57)
      return "30g of coffee to 200g of water (dilute to share).";

    if (rotationX === 3.14 && rotationZ === 3.14)
      return "Your choice of coffee to water ratio.";
    if (rotationX === 3.14 && rotationZ === -3.14)
      return "Your choice of coffee to water ratio.";
    if (rotationX === -3.14 && rotationZ === 3.14)
      return "Your choice of coffee to water ratio.";
    if (rotationX === 0 && rotationZ === 0)
      return "Your choice of coffee to water ratio.";
  };

  const getDiceNumber = (rotationX, rotationZ) => {
    if (rotationX === 3.14 && rotationZ === 0) return "Heat water to 167F/75C.";
    if (rotationX === -3.14 && rotationZ === 0)
      return "Heat water to 167F/75C.";
    if (rotationX === 0 && rotationZ === 3.14) return "Heat water to 167F/75C.";
    if (rotationX === 0 && rotationZ === -3.14)
      return "Heat water to 167F/75C.";

    if (rotationX === 3.14 && rotationZ === -1.57)
      return "Heat water to 176F/80C.";
    if (rotationX === 0 && rotationZ === 1.57) return "Heat water to 176F/80C.";

    if (rotationX === -1.57) return "Heat water to 185F/85C.";

    if (rotationX === 1.57) return "Heat water to 194F/90C.";

    if (rotationX === 0 && rotationZ === -1.57)
      return "Heat water to 203F/95C.";
    if (rotationX === 3.14 && rotationZ === 1.57)
      return "Heat water to 203F/95C.";

    if (rotationX === 3.14 && rotationZ === 3.14)
      return "Your choice of water temperature.";
    if (rotationX === 3.14 && rotationZ === -3.14)
      return "Your choice of water temperature.";
    if (rotationX === -3.14 && rotationZ === 3.14)
      return "Your choice of water temperature.";
    if (rotationX === 0 && rotationZ === 0)
      return "Your choice of water temperature.";
  };

  // Sets the dice in their position
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

  // const props = useSpring({ color: hover ? "gray" : "white" });

  useEffect(() => {
    document.body.style.cursor = hover ? "pointer" : "auto";
  }, [hover]);

  // Texture loader for all dice textures with related file paths.
  // Takes in array of const variables and array of file paths and matches them
  const [
    // temperature75C,
    // temperature80C,
    // temperature85C,
    // temperature90C,
    // temperature95C,
    yourChoice,
    // ratio12200,
    // ratio15200,
    // ratio15250,
    // ratio24200,
    // ratio30200,
    stirCompass,
    noStir,
    stirOnce,
    stirTwice,
    twoDirection,
    // coarse4,
    // fine60,
    // medFine90,
    // med120,
    // veryFine30,
    // inverted3030,
    // inverted3060,
    // invertedNoBloom,
    // standard3030,
    // standard3060,
    // standardNoBloom,
  ] = useTexture([
    // "textures/temperature/75C.jpeg",
    // "textures/temperature/80C.jpeg",
    // "textures/temperature/85C.jpeg",
    // "textures/temperature/90C.jpeg",
    // "textures/temperature/95C.jpeg",
    "textures/your-choice.jpeg",
    // "textures/ratio/12-200.jpeg",
    // "textures/ratio/15-200.jpeg",
    // "textures/ratio/15-250.jpeg",
    // "textures/ratio/24-200.jpeg",
    // "textures/ratio/30-200.jpeg",
    "textures/stir/compass.jpeg",
    "textures/stir/no-stir.jpeg",
    "textures/stir/stir1.jpeg",
    "textures/stir/stir2.jpeg",
    "textures/stir/two-direction.jpeg",
    // "textures/grind/coarse-4.jpeg",
    // "textures/grind/fine-60.jpeg",
    // "textures/grind/med-fine-90.jpeg",
    // "textures/grind/medium-120.jpeg",
    // "textures/grind/very-fine-30.jpeg",
    // "textures/bloom/inverted-30-30.jpeg",
    // "textures/bloom/inverted-30-60.jpeg",
    // "textures/bloom/inverted-no-bloom.jpeg",
    // "textures/bloom/standard-30-30.jpeg",
    // "textures/bloom/standard-30-60.jpeg",
    // "textures/bloom/standard-no-bloom.jpeg",
  ]);

  // Where my dice are physically created
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
      scale={[0.4, 0.4, 0.4]}
      ref={ref}
      dispose={null}
    >
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <group rotation={[Math.PI / 2, 0, 0]}>
          <group position={[2.34, 0.04, 0]}>
            <group position={[-2.33, 0.04, 0]} scale={[0.41, 0.41, 0.41]}>
              <mesh castShadow /*receiveShadow*/>
                <boxBufferGeometry
                  attach="geometry"
                  args={[2.11, 2.11, 2.11]}
                />
                <a.meshStandardMaterial
                  attachArray="material"
                  // map={temperature80C}
                  // map={ratio15200}
                  map={stirOnce}
                  // map={fine60}
                  // map={inverted3060}
                  color={white}
                />
                <a.meshStandardMaterial
                  attachArray="material"
                  // map={temperature95C}
                  // map={ratio30200}
                  map={stirTwice}
                  // map={veryFine30}
                  // map={standard3060}
                  color={white}
                />
                <a.meshStandardMaterial
                  attachArray="material"
                  map={yourChoice}
                  // map={standardNoBloom}
                  color={white}
                />
                <a.meshStandardMaterial
                  attachArray="material"
                  // map={temperature75C}
                  // map={ratio12200}
                  map={noStir}
                  // map={coarse4}
                  // map={inverted3030}
                  color={white}
                />
                <a.meshStandardMaterial
                  attachArray="material"
                  // map={temperature85C}
                  // map={ratio15250}
                  map={stirCompass}
                  // map={medFine90}
                  // map={invertedNoBloom}
                  color={white}
                />
                <a.meshStandardMaterial
                  attachArray="material"
                  // map={temperature90C}
                  // map={ratio24200}
                  map={twoDirection}
                  // map={med120}
                  // map={standard3030}
                  color={white}
                />
              </mesh>
            </group>
          </group>
        </group>
      </group>
    </a.group>
  );
}
