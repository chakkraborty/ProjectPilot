import React from "react";
import { useState } from "react";
import "./TimeLineComponent.css";

const TimeLineComponent = ({ s, e }) => {
  const startDate = new Date(s);
  console.log(startDate);
  const endDate = new Date(e);
  console.log(new Date(null));

  console.log(s);
  console.log(e);

  console.log(endDate);
  const [currentDate, setCurrentDate] = useState(new Date());
  let m = currentDate.getMonth();
  const date2 = new Date(currentDate.getFullYear(), m - 2, 0);

  console.log(date2);

  console.log(startDate - date2);
  const diff = startDate - date2;
  const diff2 = endDate - date2;

  const dist2 = diff2 / (1000 * 60 * 60 * 24);

  console.log("diff is : " + diff);
  const dist = diff / (1000 * 60 * 60 * 24);
  console.log("dist is : " + dist);
  let x = dist * 50;
  console.log(x);

  let y = (dist2 - dist) * 50;
  if (s === null) {
    x = 0;
    y = 0;
  }
  if (e === null) {
    x = 0;
    y = 0;
  }
  const divStyle = {
    marginLeft: `${x}px`,
    width: `${y}px`,
  };

  return (
    <div className="time-line-component-parent-wrapper">
      <div
        style={divStyle}
        id="timeline-item-wrapper-id"
        className="background-color-dark-theme time-line-component-child-wrapper"
      ></div>
    </div>
  );
};

export default TimeLineComponent;
