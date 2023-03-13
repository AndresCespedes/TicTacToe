export const saveGameStorage = ({ board, turn }) => {
  window.localStorage.setItem("board", JSON.stringify(board));
  window.localStorage.setItem("turn", turn);
};

export const resetGameStorage = () => {
  window.localStorage.removeItem("board");
  window.localStorage.removeItem("turn");
  window.localStorage.removeItem("points");
  window.localStorage.removeItem("count");
};

export const saveScoreStorage = ({ scoreX, scoreO }) => {
  window.localStorage.setItem("count", JSON.stringify(scoreX));
  window.localStorage.setItem("count", JSON.stringify(scoreO));
};

export const savePointsStorage = ({ points }) => {
  window.localStorage.setItem("points", points);
};
