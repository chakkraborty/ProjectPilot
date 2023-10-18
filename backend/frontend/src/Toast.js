import React, { useState, useEffect } from "react";
import "./Toast.css";

const SlidingDiv = ({ message }) => {
  return (
    <div className="toast-wrapper">
      <div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="25"
          height="25"
          fill="#aab8c2"
          class="bi bi-exclamation-circle"
          viewBox="0 0 16 16"
          className="toast-message-icon-wrapper"
        >
          <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
          <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995z" />
        </svg>
      </div>

      <div className="toast-message-right-wrappper">
        <div className="toast-message-text">{"Error : " + message}</div>
      </div>
    </div>
  );
};

export default SlidingDiv;
