import React from "react";
import { useState } from "react";
import "./StatusSelector.css";

const StatusSelector = ({ statusHandler }) => {
  const [status, setStatus] = useState(0);
  const [value, setValue] = useState("todo");
  function statusSetter(a) {
    setValue(a);
    setStatus(!status);
    statusHandler(a);
  }

  function toggle() {
    setStatus(!status);
  }
  return (
    <div className="status-selector-main-wrapper">
      {value === "todo" ? (
        <div className="status-selector-wrapper" onClick={() => toggle()}>
          To Do
        </div>
      ) : (
        <></>
      )}
      {value === "inprogress" ? (
        <div
          className="status-selector-wrapper orange"
          onClick={() => toggle()}
        >
          In Progress
        </div>
      ) : (
        <></>
      )}
      {value === "done" ? (
        <div className="status-selector-wrapper green" onClick={() => toggle()}>
          Done
        </div>
      ) : (
        <></>
      )}
      {status ? (
        <div className="status-selector-list-item-wrapper">
          <div
            className="status-selector-list-item"
            onClick={() => statusSetter("todo")}
          >
            To Do
          </div>
          <div
            className="status-selector-list-item"
            onClick={() => statusSetter("inprogress")}
          >
            In Progress
          </div>
          <div
            className="status-selector-list-item"
            onClick={() => statusSetter("done")}
          >
            Done
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default StatusSelector;
