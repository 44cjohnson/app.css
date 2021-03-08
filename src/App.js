import React, { useState, useEffect } from "react";
import "./App.css";
import Form from "./components/Form";
import ToDoList from "./components/ToDoList";
import DisplayComponent from "./components/DisplayComponents";
import BtnDisplay from "./components/BtnDisplay";
import Countdown from "./components/Countdown";

function App() {
  // StopWatch Timer
  const [time, setTime] = useState({ ms: 0, s: 0, m: 0, h: 0 });
  const [interv, setInterv] = useState();
  const [statusTimer, setStatusTimer] = useState(0);
  // not started = 0
  // started =1
  // stopped = 2

  const start = () => {
    run();
    setStatusTimer(1);
    setInterv(setInterval(run, 10));
  };

  var updatedMs = time.ms,
    updatedS = time.s,
    updatedM = time.m,
    updatedH = time.h;

  const run = () => {
    if (updatedM === 60) {
      updatedH++;
      updatedM = 0;
    }
    if (updatedS === 60) {
      updatedM++;
      updatedS = 0;
    }
    if (updatedMs === 100) {
      updatedS++;
      updatedMs = 0;
    }
    updatedMs++;
    return setTime({ ms: updatedMs, s: updatedS, m: updatedM, h: updatedH });
  };

  const stop = () => {
    clearInterval(interv);
    setStatusTimer(2);
  };
  const reset = () => {
    clearInterval(interv);
    setStatusTimer(0);
    setTime({ ms: 0, s: 0, m: 0, h: 0 });
  };

  const resume = () => start();

  // To-Do List
  const [inputText, setInputText] = useState("");
  const [todos, setTodos] = useState([]);
  const [status, setStatus] = useState("all");
  const [filteredTodos, setFilteredTodos] = useState([]);

  useEffect(() => {
    getLocalTodos();
  }, []);

  useEffect(() => {
    filterHandler();
  }, [todos, status]);

  const filterHandler = () => {
    switch (status) {
      case "completed":
        setFilteredTodos(todos.filter((todo) => todo.completed === true));
        break;
      case "uncompleted":
        setFilteredTodos(todos.filter((todo) => todo.completed === false));
        break;
      default:
        setFilteredTodos(todos);
        break;
    }
  };

  const saveLocalTodos = () => {
    localStorage.setItem("todos", JSON.stringify(todos));
  };
  const getLocalTodos = () => {
    if (localStorage.getItem("todos") === null) {
      localStorage.setItem("todos", JSON.stringify([]));
    } else {
      let todoLocal = JSON.parse(localStorage.getItem("todos"));
      setTodos(todoLocal);
    }
  };

  return (
    <div className="App">
      <div>
        <h1>Workout List</h1>
        <h2>Popular Exercises:</h2>
        <p className="Exercises">
          <div>
            <a
              href="https://www.coachmag.co.uk/exercises/abs-exercises"
              target="_blank"
            >
              Abs
            </a>
            <br></br>
            <a
              href="https://www.healthline.com/health/fitness-exercise/arm-exercises-no-weights"
              target="_blank"
            >
              Arms
            </a>
            <br></br>
            <a
              href="https://www.shape.com/fitness/workouts/back-workout-6-moves-blast-annoying-bra-bulge"
              target="_blank"
            >
              Back
            </a>
          </div>
        </p>
      </div>
      <div className="stopwatch-holder">
        <div className="stopwatch">
          <div className="Stopwatch-header">Stopwatch</div>
          <DisplayComponent time={time} />
          <BtnDisplay
            statusTimer={statusTimer}
            resume={resume}
            reset={reset}
            stop={stop}
            start={start}
          />
        </div>
      </div>
      <div className="countdown-holder">
        <Countdown />
      </div>
      <Form
        inputText={inputText}
        todos={todos}
        setTodos={setTodos}
        setInputText={setInputText}
        setStatus={setStatus}
      />
      <ToDoList
        filteredTodos={filteredTodos}
        setTodos={setTodos}
        todos={todos}
      />
    </div>
  );
}

export default App;
