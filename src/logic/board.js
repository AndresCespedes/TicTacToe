import { WINNER_COMBOS } from "../constants";

export const checkWinnerFrom = (boardToCheck) => {
  //se revisan todas las combinaciones ganadoras
  //Para ver ai X u O ganó
  for (const combos of WINNER_COMBOS) {
    const [a, b, c] = combos;
    if (
      boardToCheck[a] &&
      boardToCheck[a] === boardToCheck[b] &&
      boardToCheck[a] === boardToCheck[c]
    ) {
      return boardToCheck[a];
    }
  }
  //si no hay ningún ganador
  return null;
};

export const checkEndGame = (newBoard) => {
  return newBoard.every((square) => square !== null);
};
