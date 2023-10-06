import React from "react";
import "./TableX.css";
import { useParams } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import axios from "axios";
import TimeLineComponent from "./TimeLineComponent";
import { useNavigate } from "react-router-dom";
const App = () => {
  const navigate = useNavigate();
  function taskRouting(taskId) {
    navigate(`/task/${taskId}`);
  }
  const divs = Array.from({ length: 20 }, (_, index) => index + 1); // Create an array of 20 elements for demonstration
  let { projectId } = useParams();
  console.log(projectId);

  const [currentDate, setCurrentDate] = useState(new Date());

  console.log(currentDate.getMonth());
  console.log(currentDate.getDay());
  console.log(currentDate.getDate());

  let m = currentDate.getMonth();

  const date = new Date(currentDate.getFullYear() + 1, 0, 1);

  const timelineItems = [];
  let a = [];
  const [c, setC] = useState([]);

  function printMonth(pol) {}
  let monthsArray = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const changeMonth = (delta) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + delta);
    setCurrentDate(newDate);
  };
  function daysInMonth(year, month) {
    return new Date(year, month, 0).getDate();
  }
  let total;
  let x = new Date(currentDate.getFullYear(), m - 2, 0);
  let y = new Date();
  let diff = y - x;
  let lm = diff / (1000 * 60 * 60 * 24);
  lm = lm * 50;
  const divStyle = {
    marginLeft: `${lm}px`,
  };

  useEffect(() => {
    console.log("m is : " + m);
    for (let i = m - 2; i <= m + 2; i++) {
      console.log("month is: " + i);
      const d = new Date(currentDate.getFullYear(), i, 1);
      const tot = daysInMonth(currentDate.getFullYear(), m);

      for (let x = 0; x < tot; x++) {
        const p = new Date(currentDate.getFullYear(), i, x);
        console.log(p);

        a.push(p);
      }
      console.log(a);
    }

    setC([...a]);
    console.log(a);
    console.log(c);
    fetchMembers();
    fetchTasks();
  }, []);
  const [addMembers, setAddMembers] = useState(0);

  console.log(projectId);
  function toggleAddMembers() {
    setAddMembers(!addMembers);
  }

  const [members, setMembers] = useState([]);
  async function fetchMembers() {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    let a = await axios.post("/api/getMembers", { projectId }, config);
    if (a) {
      setMembers(a.data);
      console.log(a.data);
    }
  }

  const [tasks, setTasks] = useState([]);

  async function fetchTasks() {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    let a = await axios.post("/api/fetchTasks", { projectId }, config);
    if (a) {
      await setTasks(a.data);

      console.log(tasks);
      console.log(a.data);
    }
  }

  const [createTaskState, setCreateTaskState] = useState(0);
  const tableData = Array.from({ length: 20 }, (_, index) => ({
    id: index + 1,
    leftColumn: `Row ${index + 1}, Left`,
    rightColumn: `Row ${
      index + 1
    }, Right - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vel nunc et mi ultrices bibendum.`,
  }));
  function closeCreateTask() {
    setCreateTaskState(0);
  }
  function openCreateTask() {
    setCreateTaskState(1);
  }
  const leftColumnData = Array.from(
    { length: 20 },
    (_, index) => `Left Item ${index + 1}`
  );
  const rightColumnData = Array.from(
    { length: 20 },
    (_, index) => `Right Item ${index + 1}`
  );
  function print() {
    console.log(c);
  }
  const div1Ref = useRef(null);
  const div2Ref = useRef(null);

  return (
    <div className="overflow-container" onClick={() => print()}>
      <div className="left-column">
        <div className="left-column-top-x-wrapper"></div>
        {tasks.map((p, index) => (
          <div
            className={
              index % 2 === 0
                ? "left-column-item-light"
                : "left-column-item-dark"
            }
            key={index}
          >
            <div className="table-x-left-col-icon-wrapper">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="12"
                fill="currentColor"
                class="bi bi-shuffle"
                viewBox="0 0 16 16"
              >
                <path
                  fill-rule="evenodd"
                  d="M0 3.5A.5.5 0 0 1 .5 3H1c2.202 0 3.827 1.24 4.874 2.418.49.552.865 1.102 1.126 1.532.26-.43.636-.98 1.126-1.532C9.173 4.24 10.798 3 13 3v1c-1.798 0-3.173 1.01-4.126 2.082A9.624 9.624 0 0 0 7.556 8a9.624 9.624 0 0 0 1.317 1.918C9.828 10.99 11.204 12 13 12v1c-2.202 0-3.827-1.24-4.874-2.418A10.595 10.595 0 0 1 7 9.05c-.26.43-.636.98-1.126 1.532C4.827 11.76 3.202 13 1 13H.5a.5.5 0 0 1 0-1H1c1.798 0 3.173-1.01 4.126-2.082A9.624 9.624 0 0 0 6.444 8a9.624 9.624 0 0 0-1.317-1.918C4.172 5.01 2.796 4 1 4H.5a.5.5 0 0 1-.5-.5z"
                />
                <path d="M13 5.466V1.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384l-2.36 1.966a.25.25 0 0 1-.41-.192zm0 9v-3.932a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384l-2.36 1.966a.25.25 0 0 1-.41-.192z" />
              </svg>
            </div>
            <p
              className="table-x-task-title"
              onClick={() => taskRouting(p._id)}
            >
              {p.title}
            </p>
          </div>
        ))}
        <div className="table-x-create-task-wrapper">+ Create Task</div>
      </div>
      <div className="div-list">
        <div className="div-item">
          <div ref={div1Ref} className="display-flex calender-dates-wrapper">
            {c.map((x) => (
              <div className="calender-timeline-date-item">
                <div className="calender-timeline-date-item-subwrapper">
                  <p>{monthsArray[x.getMonth()]}</p>
                  <p>{x.getDate()}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* {tasks.map((p, index) => {
          <div
            className={
              index % 2
                ? "time-line-wrapper-div-light"
                : "time-line-wrapper-div-dark"
            }
          >
            <TimeLineComponent />
          </div>;
        })} */}
        <div className="timeline-bar-mark" style={divStyle}></div>
        {tasks.map((div, index) => (
          // <div className="div-item" key={index}>
          //   Div {div}
          // </div>
          <div
            ref={div2Ref}
            className={
              index % 2
                ? "time-line-wrapper-div-light"
                : "time-line-wrapper-div-dark"
            }
          >
            <TimeLineComponent s={div.startDate} e={div.dueDate} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
