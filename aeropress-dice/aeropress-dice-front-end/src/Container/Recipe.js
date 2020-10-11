// import React from "react";
// import RecipeCard from "../Components/RecipeCard.js";
import React, { useState, useEffect } from "react";
import { Text, Plane } from "drei";
import { useSpring } from "@react-spring/core";
import { a } from "@react-spring/three";
import { useScore, useStore } from "../Store/Store.js";

function Recipe() {
  return (
    <>
      <group position={[2.2, .02, -0.2]}>
        <Text
          rotation={[-0.5 * Math.PI, 0, 0]}
          position={[-5.3, 0.02, -3]}
          fontSize={0.3}
          color="black"
        >
          My Recipes
        </Text>
      </group>
    </>
  );
}

export default Recipe;
