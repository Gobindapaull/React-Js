import { useEffect } from 'react';
import './App.css';
import Greetings from './components/Greetings';

function App() {

  useEffect(() => {
    const fetchAPI = async () => {
      const response = await fetch("https://random.dog/woof.json");
      const data = await response.json();
      console.log(data);
      console.log(data.url);
    }
    fetchAPI();
  }, [])

  return (
    <div className="App">
      <Greetings name="Greetings components" />
      <button onClick={() => console.log("button clicked")}>Single Click</button><br />
      <button onDoubleClick={() => console.log("button double clicked")}>Double Click</button><br />
      <button onMouseEnter={() => console.log("Mouse Entered")}>Mouse Enter</button>
    </div>
  );
}

export default App;
