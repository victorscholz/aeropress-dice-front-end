export const calculatePossibleScores = (dices) => {
  const sortedDices = dices.sort(function (a, b) {
    return a - b;
  });

  const scores = {
    one: addUpDice(sortedDices, 1),
    two: addUpDice(sortedDices, 2),
    three: addUpDice(sortedDices, 3),
    four: addUpDice(sortedDices, 4),
    five: addUpDice(sortedDices, 5),
    six: addUpDice(sortedDices, 6),
  };

  return scores;
};

function addUpDice(sortedDices, diceNumber) {
  let sum = 0;

  for (let i = 0; i < 5; i++) {
    if (sortedDices[i] === diceNumber) sum += diceNumber;
  }

  return sum === 0 ? 0 : sum;
}

export function calculateTotal(currentScores) {
  let totalUpper = 0;
  let total = 0;

  if (currentScores.one !== null && currentScores.one !== "x")
    totalUpper += currentScores.one;
  if (currentScores.two !== null && currentScores.two !== "x")
    totalUpper += currentScores.two;
  if (currentScores.three !== null && currentScores.three !== "x")
    totalUpper += currentScores.three;
  if (currentScores.four !== null && currentScores.four !== "x")
    totalUpper += currentScores.four;
  if (currentScores.five !== null && currentScores.five !== "x")
    totalUpper += currentScores.five;
  if (currentScores.six !== null && currentScores.six !== "x")
    totalUpper += currentScores.six;

  if (totalUpper >= 35) total = totalUpper;

  return {
    totalUpper: totalUpper,
    total: total,
  };
}

export function gameEnd(scoreCount) {
  return scoreCount === 13 ? true : false;
}
