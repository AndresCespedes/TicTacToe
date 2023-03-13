import { TURNS } from "../constants";
import { saveScoreStorage } from "../logic/storage/storage";

export const Score = ({ winner }) => {
  let counter = 0;
  const setWinnerX = winner === TURNS.X ? (counter += 1) : (counter = 0);
  const setWinnerO = winner === TURNS.O ? (counter += 1) : (counter = 0);

  saveScoreStorage({
    scoreX: setWinnerX,
    scoreO: setWinnerO,
  });

  return (
    <section className="score">
      <div>
        <p>
          El puntaje del jugador ({TURNS.X}) es: {setWinnerX}
        </p>
        <p>
          El puntaje del jugador ({TURNS.O}) es: {setWinnerO}
        </p>
      </div>
    </section>
  );
};
