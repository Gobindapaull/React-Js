import "./App.css";
import { ethers } from "ethers";
import ABI from "./ABI.json";

function App() {

  const address = "";
  const provider = new ethers.JsonRpcProvider(
    "https://sepolia.infura.io/v3/"
  );
  const wallet = new ethers.Wallet("");
  const signer = wallet.connect(provider);
  const tokenContract = new ethers.Contract(address, ABI, signer);

  const nameBtn = async (e) => {
    e.preventDefault();
    const name = await tokenContract.name();
    document.getElementById("name").innerText = name;
  };
  const symbolBtn = async (e) => {
    e.preventDefault();
    const symbol = await tokenContract.symbol();
    document.getElementById("symbol").innerText = symbol;
  };
  const supplyBtn = async (e) => {
    e.preventDefault();
    const totalSupply = await tokenContract.totalSupply();
    document.getElementById("totalSupply").innerText = totalSupply;
  };

  const transferBtn = async (e) => {
    e.preventDefault();
    const receiver = "";
    const amount = 10000000000000000000n;
    const transfe = await tokenContract.transfer(receiver, amount);
    const transfer = await transfe.wait();

    document.getElementById("transfer").innerText = transfer.hash;
  };
  return (
    <div className="App">
      <h2 id="name"></h2>
      <button onClick={nameBtn} className="name">
        Name
      </button>

      <h2 id="symbol"></h2>
      <button onClick={symbolBtn} className="symbol">
        Symbol
      </button>

      <h2 id="totalSupply"></h2>
      <button onClick={supplyBtn} className="supply">
        Total Supply
      </button>

      <h2 id="transfer">Tx hash</h2>
      <button onClick={transferBtn} className="transfer">
        Transfer
      </button>
    </div>
  );
}

export default App;
