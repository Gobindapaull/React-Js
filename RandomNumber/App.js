import './App.css';

function App() {
  const randomNumber = Math.random().toFixed(9);
  const date = new Date();
  return (
    <div className="App">
     Random Number : {randomNumber}<br /><br />
     Date : {new Date(Date.now()).toString()}
    </div>
  );
}

export default App;
