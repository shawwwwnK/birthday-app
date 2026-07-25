import { useBingoBoard } from "../hooks/useBingoBoard.js";
import { RULES } from "../data/rules.js";

const BOARD_SIZE = 5;

const WINNING_LINES = [
  [0, 1, 2, 3, 4],
  [5, 6, 7, 8, 9],
  [10, 11, 12, 13, 14],
  [15, 16, 17, 18, 19],
  [20, 21, 22, 23, 24],
  [0, 5, 10, 15, 20],
  [1, 6, 11, 16, 21],
  [2, 7, 12, 17, 22],
  [3, 8, 13, 18, 23],
  [4, 9, 14, 19, 24],
  [0, 6, 12, 18, 24],
  [4, 8, 12, 16, 20],
];

function getLineEndpoints(line) {
  const start = line[0];
  const end = line[line.length - 1];

  return {
    x1: (start % BOARD_SIZE) + 0.5,
    y1: Math.floor(start / BOARD_SIZE) + 0.5,
    x2: (end % BOARD_SIZE) + 0.5,
    y2: Math.floor(end / BOARD_SIZE) + 0.5,
  };
}

export function BingoBoard() {
  const { tiles, crossedCount, toggleTile, resetBoard } = useBingoBoard();
  const completedLines = WINNING_LINES.filter((line) =>
    line.every((index) => tiles[index]?.crossed),
  );

  return (
    <section className="board-stack">
      <div className="rules-card">
        <div>
          <p className="section-label">How to play</p>
          <ul className="rules-list">
            {RULES.map((rule) => (
              <li key={rule}>{rule}</li>
            ))}
          </ul>
        </div>
        <div className="board-toolbar">
          <div className="status-group" aria-live="polite">
            <div className="status-pill">
              {crossedCount} / {tiles.length} crossed
            </div>
            <div className="status-pill status-pill-secondary">
              {completedLines.length} lines completed
            </div>
          </div>
          <button className="reset-button" type="button" onClick={resetBoard}>
            Reshuffle board and reset
          </button>
        </div>
      </div>

      <div className="board-frame">
        <svg
          className="board-lines"
          viewBox={`0 0 ${BOARD_SIZE} ${BOARD_SIZE}`}
          aria-hidden="true"
        >
          {completedLines.map((line) => {
            const { x1, y1, x2, y2 } = getLineEndpoints(line);

            return (
              <line
                key={line.join("-")}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                className="board-line"
              />
            );
          })}
        </svg>
        <div className="bingo-board" role="grid" aria-label="Birthday bingo board">
          {tiles.map((tile, index) => (
            <button
              key={tile.phrase}
              type="button"
              role="gridcell"
              aria-pressed={tile.crossed}
              className={`bingo-tile${tile.crossed ? " is-crossed" : ""}`}
              onClick={() => toggleTile(index)}
            >
              <span>{tile.phrase}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
