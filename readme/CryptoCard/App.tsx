import CryptoCard from "./components/CryptoCard";
import { coins } from "./data/coins";

function App() {
  return (
    <div>
      {coins.map((coin) => (
        <CryptoCard key={coin.id} coin={coin} />
      ))}
    </div>
  );
}

export default App;
