import React, { useState, useRef } from "react";
import "./style/main.css";

function padTime(time) {
  return time.toString().padStart(2, "0");
}

function App() {
  const [title, setTitle] = useState("CountDown");
  const [timeLeft, setTimeLeft] = useState(15);
  const [isRunning, setisRunning] = useState(false);
  const intervalRef = useRef(null);

  const min = padTime(Math.floor(timeLeft / 60));
  const sec = padTime(timeLeft - min * 60);

  function startTimer() {
    if (intervalRef.current !== null) return;
    setTitle("You can do it!");
    setisRunning(true);

    intervalRef.current = setInterval(() => {
      setTimeLeft((timeLeft) => {
        if (timeLeft >= 1) return timeLeft - 1;
        return 0;
      });
    }, 1000);
  }

  function stopTimer() {
    if (intervalRef.current == null) return;

    clearInterval(intervalRef.current);
    intervalRef.current = null;
    setisRunning(false);
  }

  function resetTimer() {
    clearInterval(intervalRef.current);
    intervalRef.current = null;
    setTitle("another round");
    setTimeLeft(25 * 60);
    setisRunning(false);
  }

  return (
    <div className="App">
      <h2>{title}</h2>

      <div className="timer">
        <span>{min}</span>
        <span>:</span>
        <span>{sec}</span>
      </div>

      <div className="buttons" style={{'textAlign':'center'}}>
        {!isRunning && <button onClick={startTimer}>Start</button>}
        {isRunning && <button onClick={stopTimer}>Stop</button>}
        <button onClick={resetTimer}>Reset</button>
      </div>
    </div>
  );
}

export default App;
