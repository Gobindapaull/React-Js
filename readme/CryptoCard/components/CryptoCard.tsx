import type { Coin } from "../interfaces/Coin";
import "./CryptoCard.css";

type Props = {
  coin: Coin;
};

function CryptoCard({ coin }: Props) {
  return (
    <article className="crypto-card">
      <header className="crypto-card__header">
        <div>
          <h2>{coin.name}</h2>
          <p>{coin.symbol}</p>
        </div>

        <span className="status">Live</span>
      </header>

      <section className="crypto-card__price">
        <h1>{coin.price}</h1>
      </section>

      <hr />

      <dl className="crypto-card__stats">
        <div>
          <dt>Market Cap</dt>
          <dd>{coin.marketCap}</dd>
        </div>

        <div>
          <dt>Volume</dt>
          <dd>{coin.volume}</dd>
        </div>
      </dl>

      <footer className="crypto-card__footer">
        <button>Trade</button>
      </footer>
    </article>
  );
}

export default CryptoCard;
