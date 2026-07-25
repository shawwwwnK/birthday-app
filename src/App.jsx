import { BingoBoard } from "./components/BingoBoard.jsx";

export default function App() {
  return (
    <main className="app-shell">
      <section className="app-panel">
        <header className="hero">
          <p className="eyebrow">Shawn's Birthday</p>
          <h1>Birthday Bingo</h1>
        </header>
        <BingoBoard />
      </section>
    </main>
  );
}
