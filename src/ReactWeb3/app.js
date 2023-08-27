import './App.css';

import { useState } from 'react'
import Web3 from 'web3'

function App() {

  const [isConnected, setIsConnected] = useState(false)

  const detectCurrentProvider = () => {
    let provider

    if (window.ethereum) {
      provider = window.ethereum
      console.log('provider: ', provider)
    } else if (window.web3) {
      provider = window.web3.currentProvider
    } else {
      console.log('Please install metamask')
    }

    return provider
  }

  const onConnect = async () => {
    try {
      const currentProvider = detectCurrentProvider()
      if (currentProvider) {
        await currentProvider.request({ method: 'eth_requestAccounts'})
        const web3 = new Web3(currentProvider)
        const userAccount = await web3.eth.getAccounts()
        const account = userAccount[0]
        setIsConnected(true)
        console.log('account: ', account)

      }
    } catch (error) {
      console.log(error)
    }
  }

  const onDisconnect = () => {
    setIsConnected(false)
  }

  return (
    <div className="App">
      <h2>web3.js and Metamask</h2>

      <div className='metamask'>
      {!isConnected && (
        <div>
          <button className='loginBtn' onClick={onConnect}>Login</button>
        </div>
      )}
      </div>
      {isConnected && (
        <div>
          <h2 className='connected'>You are connected to metamask</h2>
          <button className='logoutBtn' onClick={onDisconnect}>Logout</button>
        </div>
      )}
      </div>
  );
}

export default App;
