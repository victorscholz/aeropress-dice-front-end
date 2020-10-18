import create from "zustand";
import { devtools } from "zustand/middleware";

const initial = {
  one: 0,
  two: 0,
  three: 0,
  four: 0,
  five: 0,
  six: 0,
};

const initialCurrent = {
  one: null,
  two: null,
  three: null,
  four: null,
  five: null,
  six: null,
};

export const [useScore] = create((set, get) => ({
  possibleScores: initial,
  currentScores: initialCurrent,
  scoreCount: 0,
  totalScores: undefined,
  // currentRecipe: initial,
  setScoreCount: (scoreCount) => {
    set({ scoreCount: scoreCount });
  },
  setTotalScores: (totalScores) => {
    set({ totalScores: totalScores });
  },
  setPossibleScores: (scores) => {
    set({ possibleScores: scores });
  },
  setCurrentScores: (scores) => {
    set({ currentScores: scores });
  },
  setCurrentScore: (score, name) => {
    let currentScores = get().currentScores;
    currentScores = {
      ...currentScores,
      [name]: score,
    };
    set({ currentScores: currentScores });
  },
  // saveRecipes: false,
  // setSaveRecipes: (bool) => {
  //   set({ saveRecipe: bool })
  // },
  // setSaveRecipe: (side, name) => {
  //   let currentRecipe = get().currentRecipe;
  //   currentRecipe = {
  //     ...currentRecipe,
  //     [name]: side,
  //   };
  //   set({ currentRecipe: currentRecipe });
  // },
}));

export const [useStore, api] = create(
  devtools((set, get) => {
    return {
      diceOne: undefined,
      diceTwo: undefined,
      diceThree: undefined,
      diceFour: undefined,
      diceFive: undefined,
      setDiceOne: (value) => set({ diceOne: value }),
      setDiceTwo: (value) => set({ diceTwo: value }),
      setDiceThree: (value) => set({ diceThree: value }),
      setDiceFour: (value) => set({ diceFour: value }),
      setDiceFive: (value) => set({ diceFive: value }),
      dices: [
        {
          id: 1,
          value: undefined,
          set: false,
          prev: undefined,
          api: undefined,
          name: "diceOne",
          temperature1: undefined,
          temperature2: undefined,
          temperature3: undefined,
          temperature4: undefined,
          temperature5: undefined,
          temperature6: undefined,
        },
        {
          id: 2,
          value: undefined,
          set: false,
          prev: undefined,
          api: undefined,
          name: "diceTwo",
          ratio1: undefined,
          ratio2: undefined,
          ratio3: undefined,
          ratio4: undefined,
          ratio5: undefined,
          ratio6: undefined,
        },
        {
          id: 3,
          value: undefined,
          set: false,
          prev: undefined,
          api: undefined,
          name: "diceThree",
          grind1: undefined,
          grind2: undefined,
          grind3: undefined,
          grind4: undefined,
          grind5: undefined,
          grind6: undefined,
        },
        {
          id: 4,
          value: undefined,
          set: false,
          prev: undefined,
          api: undefined,
          name: "diceFour",
          bloom1: undefined,
          bloom2: undefined,
          bloom3: undefined,
          bloom4: undefined,
          bloom5: undefined,
          bloom6: undefined,
        },
        {
          id: 5,
          value: undefined,
          set: false,
          prev: undefined,
          api: undefined,
          name: "diceFive",
          stir1: undefined,
          stir2: undefined,
          stir3: undefined,
          stir4: undefined,
          stir5: undefined,
          stir6: undefined,
        },
      ],
      slots: [
        { id: 1, position: [2, 0.25, 4], open: true },
        { id: 2, position: [1, 0.25, 4], open: true },
        { id: 3, position: [0, 0.25, 4], open: true },
        { id: 4, position: [-1, 0.25, 4], open: true },
        { id: 5, position: [-2, 0.25, 4], open: true },
      ],
      setDice: (index, bool) => {
        const dices = get().dices;
        const newDices = dices.map((content, i) =>
          i === index ? { ...content, set: bool } : content
        );
        set({ dices: newDices });
      },
      setSlot: (index, bool) => {
        const slots = get().slots;
        const newSlots = slots.map((content, i) =>
          i === index ? { ...content, open: bool } : content
        );
        set({ slots: newSlots });
      },
      api: {
        roll(velocity) {},
      },
      amountRolled: 0,
      setAmountRolled: (number) => {
        set({ amountRolled: number });
      },
      startedGame: 0,
      setStartedGame: (bool) => {
        set({ startedGame: bool });
      },
      reroll: false,
      setReroll: (bool) => {
        set({ reroll: bool });
      },
      possibleScoresCalculation: false,
      setPossibleScoresCalculation: (bool) => {
        set({ possibleScoresCalculation: bool });
      },
      resetRound: (setPossibleScores) => {
        setPossibleScores(initial);
        set({ amountRolled: 0 });

        const dices = get().dices;
        const slots = get().slots;

        for (let i = 0; i < dices.length; i++) {
          dices[i].set = false;
        }

        for (let i = 0; i < slots.length; i++) {
          slots[i].open = true;
        }

        set({ dices: dices });
        set({ slots: slots });
      },
      setApi: (id, api) => {
        const dices = get().dices;
        const newDices = dices.map((content) =>
          content.id === id ? { ...content, api: api } : content
        );
        set({ dices: newDices });
      },
      gamePhase: "Start",
      setGamePhase: (phase) => {
        set({ gamePhase: phase });
      },
      savePhase: "",
      setSavePhase: (phase) => {
        set({ savePhase: phase });
      },
      amountSaved: 0,
      setAmountSaved: (number) => {
        set({ amountSaved: number });
      },
      // setSaveRecipe: (dice, name) => {
      //   let currentRecipe = get().currentRecipe;
      //   currentRecipe = {
      //     ...currentRecipe,
      //     [name]: dice,
      //   };
      //   set({ currentRecipe: name});
      // },

      // useEffect(() => {
      //   const option = {
      //     method: "GET",
      //     headers: {
      //       "Content-Type": "application/json",
      //       accept: "application/json",
      //     },
      //   };
      //   fetch("http://localhost:3000/recipes/", option)
      //     .then((response) => response.json())
      //     .then((newRecipe) => {
      //       setCreatedRecipes(newRecipe);
      //       console.log(newRecipe[newRecipe.length - 1])
      //       console.log(newRecipe)
      //     });
      //   }, [diceOne]);
      // newRecipe: [],
      // fetch: async (recipe) => {
      //   const recipeUrl = "http://localhost:3000/recipes/";
      //   const response = await fetch(recipeUrl);
      //   set({ newRecipe: await response.json() });
      // },
      // savedRecipe: [],
      // fetch: async (recipe) => {
      //   const recipeUrl = "http://localhost:3000/recipes/";
      //   const response = await fetch(recipeUrl);
      //   set({ savedRecipe: await response.json() });
      // },
    };
  })
);
