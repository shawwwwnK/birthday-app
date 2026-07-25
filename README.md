# Birthday Bingo

A small React + Vite web app for running a birthday-party bingo board.

## What It Does

- Renders a 5x5 bingo board from tile data in [`src/data/tiles.js`](./src/data/tiles.js)
- Stores board progress in `localStorage`
- Detects completed rows, columns, and diagonals
- Draws connector lines behind completed 5-tile lines
- Tracks both crossed tiles and completed lines

## Project Structure

- [`src/data/tiles.js`](./src/data/tiles.js): bingo tile phrases
- [`src/data/rules.js`](./src/data/rules.js): "How to play" bullet points
- [`src/components/BingoBoard.jsx`](./src/components/BingoBoard.jsx): main board UI
- [`src/hooks/useBingoBoard.js`](./src/hooks/useBingoBoard.js): board state and persistence
- [`src/styles.css`](./src/styles.css): app styling
- [`docs/`](./docs): built static output for GitHub Pages

## Local Development

Requirements:

- Node.js
- npm

Install dependencies:

```bash
npm install
```

Start the local dev server:

```bash
npm run dev
```

Create a production build:

```bash
npm run build
```

## Hosting on GitHub Pages

This repository is set up to publish with **GitHub Pages** from the `gh-pages` branch and the `/docs` folder.

The Vite config writes production output to `docs/`:

- [`vite.config.js`](./vite.config.js)

### GitHub Pages Settings

In the GitHub repository:

1. Open `Settings`
2. Open `Pages`
3. Under `Build and deployment`
4. Set `Source` to `Deploy from a branch`
5. Set `Branch` to `gh-pages`
6. Set the folder to `/docs`
7. Save

### Deploy Updated Changes

Whenever you change the app:

1. Rebuild the site:

```bash
npm run build
```

2. Commit both the source changes and the updated `docs/` output
3. Push to `gh-pages`

GitHub Pages will then publish the contents of `docs/`.

### Expected Site URL

For this repository, the published URL is:

`https://shawwwwnk.github.io/birthday-app/`

## Notes

- The app uses `localStorage`, so if tile text changes but the board looks old, clear saved board state or use the reset button.
- `dist/` is a local build artifact. `docs/` is the folder used for GitHub Pages publishing in this repo.
