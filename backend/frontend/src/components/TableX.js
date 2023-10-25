import React from "react";
import "./TableX.css";
import { useParams } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import axios from "axios";
import TimeLineComponent from "./TimeLineComponent";
import StarsIcon from "@mui/icons-material/Stars";
import { useNavigate } from "react-router-dom";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import MergeTypeRoundedIcon from "@mui/icons-material/MergeTypeRounded";
const App = () => {
  const tableXRef = useRef(null);
  const scrollDivRef = useRef(null);

  const navigate = useNavigate();
  function taskRouting(taskId) {
    navigate(`/task/${taskId}`);
  }

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
    const resizeTableX = () => {
      const parentHeight = scrollDivRef.current.parentElement.clientHeight;
      const parentWidth = scrollDivRef.current.parentElement.clientWidth;
      scrollDivRef.current.style.height = `${parentHeight}px`;
      scrollDivRef.current.style.width = `${parentWidth}px`;
    };

    // Initial resize
    resizeTableX();
    const setScrollPosition = () => {
      if (scrollDivRef.current) {
        scrollDivRef.current.scrollLeft = lp;
      }
    };

    const timeout = setTimeout(setScrollPosition, 100);

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
    console.log("difference is here :-)");

    let diff = new Date() - new Date(currentDate.getFullYear(), m - 2, 0);
    let lo = diff / (1000 * 24 * 60 * 60);
    const lp = lo * 50 - 100;

    setC([...a]);
    console.log(a);
    console.log(c);
    fetchMembers();
    fetchTasks();
    window.addEventListener("resize", resizeTableX);

    // Cleanup event listener on component unmount

    return () => {
      clearTimeout(timeout);
      window.removeEventListener("resize", resizeTableX);
    };
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
    <div className="t-overflow">
      <div
        className="overflow-container"
        ref={scrollDivRef}
        onClick={() => print()}
      >
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
                {/* <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="rgb(0, 119, 255)"
                  class="bi bi-slash-square-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm9.354 5.354-6 6a.5.5 0 0 1-.708-.708l6-6a.5.5 0 0 1 .708.708z" />
                </svg> */}
                {/* <KeyboardArrowRightIcon sx={{ fontSize: 17 }} /> */}
                <div className="table-x-item-icon-wrapper">
                  {/* <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="12"
                    height="12"
                    fill="currentColor"
                    class="bi bi-bezier2"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M1 2.5A1.5 1.5 0 0 1 2.5 1h1A1.5 1.5 0 0 1 5 2.5h4.134a1 1 0 1 1 0 1h-2.01c.18.18.34.381.484.605.638.992.892 2.354.892 3.895 0 1.993.257 3.092.713 3.7.356.476.895.721 1.787.784A1.5 1.5 0 0 1 12.5 11h1a1.5 1.5 0 0 1 1.5 1.5v1a1.5 1.5 0 0 1-1.5 1.5h-1a1.5 1.5 0 0 1-1.5-1.5H6.866a1 1 0 1 1 0-1h1.711a2.839 2.839 0 0 1-.165-.2C7.743 11.407 7.5 10.007 7.5 8c0-1.46-.246-2.597-.733-3.355-.39-.605-.952-1-1.767-1.112A1.5 1.5 0 0 1 3.5 5h-1A1.5 1.5 0 0 1 1 3.5v-1zM2.5 2a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1zm10 10a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1z"
                    />
                  </svg> */}
                  <MergeTypeRoundedIcon sx={{ fontSize: 15 }} />
                </div>
              </div>
              <p
                className="table-x-task-title"
                onClick={() => taskRouting(p._id)}
              >
                {"[TASK] " + p.title}
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

          <div className="timeline-bar-mark" style={divStyle}></div>
          {tasks.map((div, index) => (
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
    </div>
  );
};

export default App;
