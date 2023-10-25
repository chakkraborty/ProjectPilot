import React from "react";
import "./kanbanSkeletal.css";
const kanbanSkeletal = () => {
  return (
    <div className="display-flex kanban-skeletal-top-wrapper">
      <div className="kanban-skeletal-wrapper"></div>

      <div className="kanban-skeletal-wrapper"></div>

      <div className="kanban-skeletal-wrapper"></div>
    </div>
  );
};

export default kanbanSkeletal;
