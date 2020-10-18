// import React, { useRef, useEffect, useState } from "react";
// import { TextureLoader } from "three";
// import { a } from "@react-spring/three";
// import { useSpring } from "@react-spring/core";

// function DiceOne() {
//   const temperature1 = React.useMemo(
//     () => new TextureLoader().load("textures/temperature/75C.jpeg"),
//     []
//   );
//   const temperature2 = React.useMemo(
//     () => new TextureLoader().load("textures/temperature/80C.jpeg"),
//     []
//   );
//   const temperature3 = React.useMemo(
//     () => new TextureLoader().load("textures/temperature/85C.jpeg"),
//     []
//   );
//   const temperature4 = React.useMemo(
//     () => new TextureLoader().load("textures/temperature/90C.jpeg"),
//     []
//   );
//   const temperature5 = React.useMemo(
//     () => new TextureLoader().load("textures/temperature/95C.jpeg"),
//     []
//   );
//   const yourChoice = React.useMemo(
//     () => new TextureLoader().load("textures/your-choice.jpeg"),
//     []
//   );

//   const [hover, set] = useState(false);
//   const props = useSpring({ color: hover ? "gray" : "white" });
//   useEffect(() => {
//     document.body.style.cursor = hover ? "pointer" : "auto";
//   }, [hover]);

//   return (
    
//     <mesh castShadow receiveShadow>
//       <boxBufferGeometry attach="geometry" args={[1.6, 1.6, 1.6]} />
//       <a.meshPhysicalMaterial
//         attachArray="material"
//         map={temperature1}
//         color={props.color}
//       />
//       <a.meshPhysicalMaterial
//         attachArray="material"
//         map={temperature2}
//         color={props.color}
//       />
//       <a.meshPhysicalMaterial
//         attachArray="material"
//         map={temperature3}
//         color={props.color}
//       />
//       <a.meshPhysicalMaterial
//         attachArray="material"
//         map={temperature4}
//         color={props.color}
//       />
//       <a.meshPhysicalMaterial
//         attachArray="material"
//         map={temperature5}
//         color={props.color}
//       />
//       <a.meshPhysicalMaterial
//         attachArray="material"
//         map={yourChoice}
//         color={props.color}
//       />
//     </mesh>
//   );
// }
// export default DiceOne;
