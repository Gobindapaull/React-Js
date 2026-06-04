import { useState } from "react";
import QRCode from "qrcode";
import "./App.css";

export default function App() {
  const [address, setAddress] = useState("");
  const [qr, setQr] = useState("");

  const generateQR = async () => {
    if (!address.trim()) return;

    try {
      const qrData = await QRCode.toDataURL(`ethereum:${address}`);
      setQr(qrData);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h1>Ethereum QR Generator</h1>

        <input
          type="text"
          placeholder="Enter ETH Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="address-input"
        />

        <button onClick={generateQR} className="generate-btn">
          Generate QR Code
        </button>

        {qr && (
          <div className="qr-wrapper">
            <img src={qr} alt="Ethereum QR Code" className="qr-image" />
          </div>
        )}
      </div>
    </div>
  );
}
