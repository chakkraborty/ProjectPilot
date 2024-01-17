import React from "react";
import "./TableX.css";
import { useParams } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import axios from "axios";
import TimelineSkeletal from "../skeletal/timelineSkeletal";
import TimeLineComponent from "./TimeLineComponent";
import StarsIcon from "@mui/icons-material/Stars";
import { useNavigate } from "react-router-dom";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import MergeTypeRoundedIcon from "@mui/icons-material/MergeTypeRounded";
const App = ({ toggleLoading, showLoadingTrigger, triggerSessionError }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  let token = localStorage.getItem("token");

  let m = currentDate.getMonth();

  let diff = new Date() - new Date(currentDate.getFullYear(), m - 2, 0);
  let lo = diff / (1000 * 24 * 60 * 60);
  const lp = lo * 50 - 100;
  const tableXRef = useRef(null);
  const scrollDivRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  function taskRouting(taskId) {
    navigate(`/task/${projectId}/${taskId}`);
  }

  let { projectId } = useParams();
  console.log(projectId);

  console.log(currentDate.getMonth());
  console.log(currentDate.getDay());
  console.log(currentDate.getDate());

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
  let diff2 = y - x;
  let lm = diff2 / (1000 * 60 * 60 * 24);
  lm = lm * 50;
  const divStyle = {
    marginLeft: `${lm}px`,
  };

  useEffect(() => {
    // const resizeTableX = () => {
    //   const parentHeight = scrollDivRef.current.parentElement.clientHeight;
    //   const parentWidth = scrollDivRef.current.parentElement.clientWidth;
    //   scrollDivRef.current.style.height = `${parentHeight}px`;
    //   scrollDivRef.current.style.width = `${parentWidth}px`;
    // };

    // Initial resize
    // resizeTableX();
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

    setC([...a]);
    console.log(a);
    console.log(c);

    fetchTasks();
    // window.addEventListener("resize", resizeTableX);

    // Cleanup event listener on component unmount

    return () => {
      clearTimeout(timeout);
      // window.removeEventListener("resize", resizeTableX);
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
    try {
      if (!token) {
        showLoadingTrigger();
        return;
      }
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      };
      let a = await axios.post("/api/fetchTasks", { projectId }, config);
      if (a) {
        await setTasks(a.data);

        console.log(tasks);
        console.log(a.data);
        setLoading(false);
        const setScrollPosition = () => {
          if (scrollDivRef.current) {
            scrollDivRef.current.scrollLeft = lp;
          }
        };

        const timeout = setTimeout(setScrollPosition, 100);
        console.log("loading is : ");
        return () => {
          clearTimeout(timeout);
          // window.removeEventListener("resize", resizeTableX);
        };
      }
    } catch (error) {
      console.log(error);
      toggleLoading();
      if (error.response.data.type === 2) {
        triggerSessionError();
      }
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
    <>
      {loading ? (
        <TimelineSkeletal />
      ) : (
        <div className="t-overflow margin-top-0px">
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
                    <div className="table-x-item-icon-wrapper">
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
                <div
                  ref={div1Ref}
                  className="display-flex calender-dates-wrapper"
                >
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
      )}
    </>
  );
};

export default App;
