import React from "react";
import "./notificationSkeletal.css";
const notificationSkeletal = () => {
  return (
    <div>
      <div className="notification-skeletal-wrapper">
        <div className="notification-skeletal-left-col-circle"></div>
        <div className="notification-skeletal-right-col">
          <div className="notification-skeletal-right-col-small-element"></div>
          <div className="notification-skeletal-right-col-small-element"></div>
          <div className="notification-skeletal-right-col-large-element"></div>
        </div>
      </div>
      <div className="notification-skeletal-wrapper">
        <div className="notification-skeletal-left-col-circle"></div>
        <div className="notification-skeletal-right-col">
          <div className="notification-skeletal-right-col-small-element"></div>
          <div className="notification-skeletal-right-col-small-element"></div>
          <div className="notification-skeletal-right-col-large-element"></div>
        </div>
      </div>
      <div className="notification-skeletal-wrapper">
        <div className="notification-skeletal-left-col-circle"></div>
        <div className="notification-skeletal-right-col">
          <div className="notification-skeletal-right-col-small-element"></div>
          <div className="notification-skeletal-right-col-small-element"></div>
          <div className="notification-skeletal-right-col-large-element"></div>
        </div>
      </div>
    </div>
  );
};

export default notificationSkeletal;
