import React, { useState } from "react";
import {ethers} from "ethers";

const provider = new ethers.JsonRpcProvider("https://bsc-dataseed.binance.org");

const Transfer = () => {
  const [privateKey, setPrivateKey] = useState("");
  const [receiverWallet, setReceiverWallet] = useState("");
  const [amountSend, setAmountSend] = useState("");
  const [txHash, setTxHash] = useState("");

  const [signerAddress, setSignerAddress] = useState("");
  const [balanceBNB, setBalanceBNB] = useState("");

  const handleChange = (e) => {
    setPrivateKey(e.target.value);
  };

  const handleChangeWallet = (e) => {
    setReceiverWallet(e.target.value);
  };

  const handleChangeAmount = (e) => {
    setAmountSend(e.target.value);
  }

  const send = async () => {
    const signer = new ethers.Wallet(privateKey, provider);
    setSignerAddress(signer.address);

    // Get the balance
    const balance = await provider.getBalance(signer.address);
    console.log(`Balance of ${signer.address}: ${ethers.formatEther(balance)} BNB`);
    setBalanceBNB(ethers.formatEther(balance));

    const gasLimit = 21001;
    const gasPrice = (await provider.getFeeData()).gasPrice;

    const tx = {
        to: receiverWallet,
        value: ethers.parseEther(amountSend),
        gasPrice: gasPrice,
        gasLimit: gasLimit
    }

    // Send a transaction
    const transactionResponse = await signer.sendTransaction(tx);
    setTxHash(transactionResponse.hash);

    // Wait for the transaction to be mined
    const receipt = await transactionResponse.wait();
    console.log(`Transaction was mined in block: ${receipt.blockNumber}`);

}

  return (
    <div>
      {/* Private key */}
      <h4>Private Key</h4>
      <input
        type="password"
        name="private_key"
        value={privateKey}
        onChange={handleChange}
      />

      {/* Receiver Wallet */}
      <h4>Receiver Wallet</h4>
      <input
        type="text"
        name="receiver_wallet"
        value={receiverWallet}
        onChange={handleChangeWallet}
      />
      {/* Amount */}
      <h4>Amount</h4>
      <input
        type="number"
        name="amount"
        value={amountSend}
        onChange={handleChangeAmount}
      />
      <br /><br />

      {/* Submit */}
      <button onClick={() => send()}>Transfer</button>

      <h4>signer: {signerAddress}</h4>
      <h4>balance : {balanceBNB}</h4>
      <h4>Transaction hash : {txHash}</h4>
    </div>
  );
};

export default Transfer;
// https://bscscan.com/tx/0x7011ef841d7212f2ea32bb4ed9c0d47c90beb902dccf3b17c232e94772ea98be
