import { useState } from 'react'
import { ethers } from 'ethers'
import './App.css'

function App() {
  const [connected, setConnected] = useState(false)
  const [id, setId] = useState(null)

  const connect = async () => {
    try {
      if(!connected) {
        const provider = new ethers.BrowserProvider(window.ethereum)
        const signer = await provider.getSigner()
        const address = await signer.getAddress()
        const displayAddress = address?.substr(0, 6) + "..."
        const message = "Hello Solidity 👋"
        const sig = await signer.signMessage(message)
        ethers.verifyMessage(message, sig)
        setId(displayAddress)
        setConnected(true)
      } else {
        window.ethereum.selectedAddress = null
        setConnected(false)
      }
    } catch (error) {
      console.log(error.message)
    }
  }

  const disconnect = async () => {
    try {
      setId(null)
      setConnected(false)
    } catch (error) {
      console.log(error.message)
    }
  }

  return (
    <>
        <h2>REACT + ETHERS</h2>
        <button onClick={connect}>Connect Wallet</button>
        <button onClick={disconnect}>Disconnect Wallet</button>
        <h2>you wallet : {id}</h2>
    </>
  )
}

export default App
