import { useState } from "react";
import confetti from "canvas-confetti";
import { Square } from "./components/Square.jsx";
import { TURNS } from "./constants.js";
import { checkWinnerFrom, checkEndGame } from "./logic/board.js";
import { WinnerModal } from "./components/WinnerModal.jsx";
import {
  saveGameStorage,
  resetGameStorage,
  saveScoreStorage,
  savePointsStorage,
} from "./logic/storage/storage.js";
import { Score } from "./components/Score.jsx";

function App() {
  // primera posición: Valor del estado, Segunda posición: cómo actualizar el estado
  const [board, setBoard] = useState(() => {
    const boardFromStorage = window.localStorage.getItem("board");
    return boardFromStorage
      ? JSON.parse(boardFromStorage)
      : Array(9).fill(null);
  });

  const [turn, setTurn] = useState(() => {
    const turnFromStorage = window.localStorage.getItem("turn");
    return turnFromStorage ?? TURNS.X;
  });

  const [points, setPoints] = useState(() => {
    const pointsFromStorage = window.localStorage.getItem("points");
    return pointsFromStorage ?? 0;
  });

  //null es que no hay ganador y false es que hay empate
  const [winner, setWinner] = useState(null);

  const setPointsCounter = () => {
    setPoints(points + 1);
    savePointsStorage({
      points: points,
    });
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setTurn(TURNS.X);
    setWinner(null);
    setPoints(0);

    resetGameStorage();
  };

  const updateBoard = (index) => {
    if (board[index] || winner) return;
    const newBoard = [...board];
    newBoard[index] = turn;
    setBoard(newBoard);

    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X;
    setTurn(newTurn);

    //guardar partida por medio del local storage
    saveGameStorage({
      board: newBoard,
      turn: newTurn,
    });

    //revisar si hay ganador
    const newWinner = checkWinnerFrom(newBoard);
    if (newWinner) {
      confetti();
      setWinner(newWinner);
    } else if (checkEndGame(newBoard)) {
      setWinner(false);
    }
  };

  return (
    <main className="board">
      <h1>Tic Tac Toe</h1>
      <button onClick={resetGame}>Resetar el juego</button>
      <section className="game">
        {board.map((_, index) => {
          return (
            <Square key={index} index={index} updateBoard={updateBoard}>
              {board[index]}
            </Square>
          );
        })}
      </section>

      <section className="turn">
        <Square isSelected={turn === TURNS.X}>{TURNS.X}</Square>
        <Square isSelected={turn === TURNS.O}>{TURNS.O}</Square>
      </section>

      <h1>Get points: {points}</h1>
      <button onClick={setPointsCounter}>click to get a point</button>

      <Score winner={winner} updateBoard={updateBoard}></Score>

      <WinnerModal resetGame={resetGame} winner={winner}></WinnerModal>
    </main>
  );
}

export default App;
