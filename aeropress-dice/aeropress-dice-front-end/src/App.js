import React from "react";
import Dice from "./Container/Dice.js";
import Recipe from "./Container/Recipe.js";
import { useStore } from "./Store/Store";
import Plane from "./Container/Plane.js";
import "./App.css";

function App() {
	const diceOne = useStore((state) => state.diceOne);
	const diceTwo = useStore((state) => state.diceTwo);
	const diceThree = useStore((state) => state.diceThree);
	const diceFour = useStore((state) => state.diceFour);
	const diceFive = useStore((state) => state.diceFive);
	return (
		<>
			{/* <Dice /> */}
			<Plane />
		</>
	);
}

export default App;
