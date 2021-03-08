import React from "react";

function BtnDisplay(props) {
  return (
    <div>
      {props.statusTimer === 0 ? (
        <button
          className="stopwatch-btn stopwatch-btn-gre"
          onClick={props.start}
        >
          Start
        </button>
      ) : (
        ""
      )}

      {props.statusTimer === 1 ? (
        <div>
          <button
            className="stopwatch-btn stopwatch-btn-red"
            onClick={props.stop}
          >
            Stop
          </button>
          <button
            className="stopwatch-btn stopwatch-btn-yel"
            onClick={props.reset}
          >
            Reset
          </button>
        </div>
      ) : (
        ""
      )}

      {props.statusTimer === 2 ? (
        <div>
          <button
            className="stopwatch-btn stopwatch-btn-gre"
            onClick={props.resume}
          >
            Resume
          </button>
          <button
            className="stopwatch-btn stopwatch-btn-yel"
            onClick={props.reset}
          >
            Reset
          </button>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default BtnDisplay;
