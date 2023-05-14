import "./App.css";
import { Message, Button } from "semantic-ui-react";

function App() {
  const account = "0x09ec269360504cA3A0E475dCAe7822B2a77ddd8A97b";
  return (
    <div className="App">
      <header className="App-header">
        <h1>Multisig Wallet</h1>
        <div>Account: {account}</div>
        <Message warning>Metamask is not connected</Message>
        <Button color="green">Connect to Metamask</Button>
      </header>
    </div>
  );
}

export default App;
