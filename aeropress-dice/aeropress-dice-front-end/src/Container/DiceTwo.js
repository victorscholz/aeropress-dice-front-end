// import React, { useRef, useEffect, useState } from "react";
// import { TextureLoader } from "three";
// import { a } from "@react-spring/three";
// import { useSpring } from "@react-spring/core";

// function DiceTwo() {
//   const ratio1 = React.useMemo(
//     () => new TextureLoader().load("textures/ratio/12-200.jpeg"),
//     []
//   );
//   const ratio2 = React.useMemo(
//     () => new TextureLoader().load("textures/ratio/15-200.jpeg"),
//     []
//   );
//   const ratio3 = React.useMemo(
//     () => new TextureLoader().load("textures/ratio/15-250.jpeg"),
//     []
//   );
//   const ratio4 = React.useMemo(
//     () => new TextureLoader().load("textures/ratio/24-200.jpeg"),
//     []
//   );
//   const ratio5 = React.useMemo(
//     () => new TextureLoader().load("textures/ratio/30-200.jpeg"),
//     []
//   );
//   const yourChoice = React.useMemo(
//     () => new TextureLoader().load("textures/your-choice.jpeg"),
//     []
//   );

//   // const [hover, set] = useState(false);
//   // const props = useSpring({ color: hover ? "gray" : "white" });
//   // useEffect(() => {
//   //   document.body.style.cursor = hover ? "pointer" : "auto";
//   // }, [hover]);

//   return (
//     <mesh castShadow receiveShadow>
//       <boxBufferGeometry attach="geometry" args={[1.6, 1.6, 1.6]} />
//       <meshPhysicalMaterial
//         attachArray="material"
//         map={ratio1}
//         color="white"
//       />
//       <meshPhysicalMaterial
//         attachArray="material"
//         map={ratio2}
//         color="white"
//       />
//       <meshPhysicalMaterial
//         attachArray="material"
//         map={ratio3}
//         color="white"
//       />
//       <meshPhysicalMaterial
//         attachArray="material"
//         map={ratio4}
//         color="white"
//       />
//       <meshPhysicalMaterial
//         attachArray="material"
//         map={ratio5}
//         color="white"
//       />
//       <meshPhysicalMaterial
//         attachArray="material"
//         map={yourChoice}
//         color="white"
//       />
//     </mesh>
//   );
// }
// export default DiceTwo;
// // yourChoice
