import React from "react";
import "./timelineSkeletal.css";

const timelineSkeletal = () => {
  return (
    <div className="timeline-skeletal-wrapper">
      <div className="timeline-skeletal-left-col">
        <div className="timeline-skeletal-left-col-top-header">
          <div className="timeline-skeletal-left-col-top-header-item timeline-skeletal-item"></div>
        </div>
        <div className="timeline-skeletal-left-col-item timeline-skeletal-item"></div>
        <div className="timeline-skeletal-left-col-item timeline-skeletal-item"></div>
        <div className="timeline-skeletal-left-col-item timeline-skeletal-item"></div>
        <div className="timeline-skeletal-left-col-item timeline-skeletal-item"></div>
      </div>
      <div className="timeline-skeletal-right-col">
        <div className="timeline-skeletal-right-col-top-header">
          <div className="timeline-skeletal-right-col-top-header-item timeline-skeletal-item"></div>
        </div>
        <div className="timeline-skeletal-right-col-item timeline-skeletal-item"></div>
        <div className="timeline-skeletal-right-col-item timeline-skeletal-item"></div>
        <div className="timeline-skeletal-right-col-item timeline-skeletal-item"></div>
        <div className="timeline-skeletal-right-col-item timeline-skeletal-item"></div>
      </div>
    </div>
  );
};

export default timelineSkeletal;
