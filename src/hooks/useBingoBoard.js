import { useEffect, useState } from "react";
import { TILE_PHRASES } from "../data/tiles.js";

const STORAGE_KEY = "birthday-bingo-board";

function createTile(phrase) {
  return {
    phrase,
    crossed: false,
  };
}

function shuffle(items) {
  const copy = [...items];

  for (let index = copy.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [copy[index], copy[swapIndex]] = [copy[swapIndex], copy[index]];
  }

  return copy;
}

function getInitialBoard() {
  const fallbackBoard = shuffle(TILE_PHRASES.map(createTile));

  if (typeof window === "undefined") {
    return fallbackBoard;
  }

  const savedBoard = window.localStorage.getItem(STORAGE_KEY);

  if (!savedBoard) {
    return fallbackBoard;
  }

  try {
    const parsedBoard = JSON.parse(savedBoard);

    if (
      Array.isArray(parsedBoard) &&
      parsedBoard.length === TILE_PHRASES.length &&
      parsedBoard.every(
        (tile) =>
          typeof tile?.phrase === "string" && typeof tile?.crossed === "boolean",
      )
    ) {
      return parsedBoard;
    }
  } catch {
    return fallbackBoard;
  }

  return fallbackBoard;
}

export function useBingoBoard() {
  const [tiles, setTiles] = useState(getInitialBoard);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(tiles));
  }, [tiles]);

  function toggleTile(tileIndex) {
    setTiles((currentTiles) =>
      currentTiles.map((tile, index) =>
        index === tileIndex ? { ...tile, crossed: !tile.crossed } : tile,
      ),
    );
  }

  function resetBoard() {
    setTiles(shuffle(TILE_PHRASES.map(createTile)));
  }

  const crossedCount = tiles.filter((tile) => tile.crossed).length;

  return {
    tiles,
    crossedCount,
    toggleTile,
    resetBoard,
  };
}
