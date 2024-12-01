import './App.css';

function App() {
  const randomNumber = Math.random().toFixed(9);
  return (
    <div className="App">
     Random Number : {randomNumber}
    </div>
  );
}

export default App;
