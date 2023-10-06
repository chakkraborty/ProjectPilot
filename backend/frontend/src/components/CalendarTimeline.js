import React, { useEffect, useState } from "react";
import "./CalendarTimeline.css";
import TimeLineComponent from "./TimeLineComponent.js";
import Navbar from "./Navbar.js";
import axios from "axios";
import { useParams } from "react-router-dom";
import AddPeople from "./AddPeople";
import CreateTask from "./CreateTask";
import TableX from "./TableX";
const CalendarTimeline = () => {
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
    }
    setC([...a]);
    console.log(a);
    console.log(c);
  }, []);
  const [addMembers, setAddMembers] = useState(0);
  let { projectId } = useParams();
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

  useEffect(() => {
    fetchMembers();
    fetchTasks();
  }, []);

  return (
    <div className="calender-timeline-main-wrapper">
      <Navbar />
      <div className="project-right-panel-header-top">
        <div className="projects-right-panel-header-wrapper">
          <div className="projects-right-panel-name-wrapper margin-top-10px">
            <p>Project-Euler / Timeline</p>
          </div>
        </div>
        <div className="project-page-search-and-members-wrapper">
          <div className="project-page-search-wrapper">
            <input
              type="text"
              className="project-page-input text-dark"
              placeholder="Search..."
            ></input>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="12"
              fill="currentColor"
              class="bi bi-search"
              viewBox="0 0 16 16"
              className="project-page-right-panel-search-icon"
            >
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
            </svg>
          </div>

          <div className="team-members-wrapper" onClick={toggleAddMembers}>
            {members.map((p) => (
              <div className="team-members-icon">{p.name[0].toUpperCase()}</div>
            ))}
            <div className="project-page-right-panel-add-members-wrapper">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                class="bi bi-person-fill-add"
                viewBox="0 0 16 16"
              >
                <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm.5-5v1h1a.5.5 0 0 1 0 1h-1v1a.5.5 0 0 1-1 0v-1h-1a.5.5 0 0 1 0-1h1v-1a.5.5 0 0 1 1 0Zm-2-6a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                <path d="M2 13c0 1 1 1 1 1h5.256A4.493 4.493 0 0 1 8 12.5a4.49 4.49 0 0 1 1.544-3.393C9.077 9.038 8.564 9 8 9c-5 0-6 3-6 4Z" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      {addMembers ? (
        <AddPeople projectId={projectId} toggleAddMembers={toggleAddMembers} />
      ) : (
        <></>
      )}

      {/* <div className="display-flex calender-timeline-lower-main-wrapper">
        <div className="calender-timeline-left-wrapper">
          {tasks.map((p) => (
            <div className="calender-timeline-task-items">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-list"
                viewBox="0 0 16 16"
                className="calender-timeline-task-item-icon"
              >
                <path
                  fill-rule="evenodd"
                  d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
                />
              </svg>

              <p>{p.title}</p>
            </div>
          ))}
        </div>

        <div className="background-color-dark-theme calender-timeline-date-top-main-wrapper">
          <div className="display-flex">
            {c.map((x) => (
              <div className="calender-timeline-date-item">
                <p>{monthsArray[x.getMonth()]}</p>
                <p>{x.getDate()}</p>
              </div>
            ))}
          </div>
          <div className="calender-timeline-component-overflow">
            {tasks.map((p) => (
              <TimeLineComponent />
            ))}

            <TimeLineComponent />
          </div>
        </div>
      </div> */}

      {/* <TableX /> */}

      {/* <div className="calender-timeline-lower-wrapper">
        <div className="calender-timeline-lower-wrapper-items">
          <div className="calender-timeline-lower-right-col">
            <div className="background-color-dark-theme calender-timeline-date-top-main-wrapper">
              <div className="display-flex">
                {c.map((x) => (
                  <div className="calender-timeline-date-item">
                    <p>{monthsArray[x.getMonth()]}</p>
                    <p>{x.getDate()}</p>
                  </div>
                ))}
              </div>
              <div className="calender-timeline-component-overflow"></div>
            </div>
          </div>
        </div>
      </div> */}
      <TableX />
    </div>
  );
};

export default CalendarTimeline;
