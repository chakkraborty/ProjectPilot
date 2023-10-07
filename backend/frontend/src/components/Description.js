import React from "react";
import DatePicker from "react-datepicker";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import CancelIcon from "@mui/icons-material/Cancel";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useParams } from "react-router-dom";
import "./Description.css";
const Description = ({ taskId }) => {
  console.log(taskId);

  const [selectedStartDate, setSelectedStartDate] = useState(null);

  const handleStartDateChange = async (date) => {
    try {
      setSelectedStartDate(date);
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      let stDate = new Date(date);
      let a = await axios.post("/api/setStartDate", { taskId, stDate }, config);
    } catch (error) {
      console.log(error);
    }
  };

  function print() {
    console.log(selectedStartDate);
  }

  const [selectedDueDate, setSelectedDueDate] = useState(null);

  const handleDueDateChange = async (date) => {
    try {
      setSelectedDueDate(date);
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      let dueDate = new Date(date);
      let a = await axios.post("/api/setDueDate", { taskId, dueDate }, config);
    } catch (error) {
      console.log(error);
    }
  };

  const [users, setUsers] = useState([]);
  const [show, setShow] = useState(0);
  const [outLine, setOutLine] = useState(0);
  const [updateTag, setUpdateTag] = useState(0);
  const [tags, setTags] = useState([]);
  const [displayList, setDisplayList] = useState(0);
  const [assignedTo, setAssignedTo] = useState("Unassigned");
  const assignToRef = useRef();
  const [status, setStatus] = useState("todo");
  const [createdByName, setCreatedByName] = useState("");
  const [tagValue, setTagValue] = useState("");

  let temp = [];
  //   setTags(temp);

  function removeTag(p) {
    let temp = [...tags];
    let idx = temp.findIndex((x) => x === p);
    if (idx) {
      temp.splice(idx, 1);
      setTags(temp);
    }
  }

  async function handleKeyPress(event) {
    if (event.key === "Enter") {
      if (tagValue) {
        await setTags([...tags, tagValue]);
        event.target.value = "";
        await console.log(tags);
      }
    }
  }

  async function updateTagsDescription() {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    let a = await axios.post("/api/task/updateTags", { taskId, tags }, config);
    if (a) {
      fetchDescriptionDetails();
    }
  }

  async function updateStatus(a) {
    try {
      setStatus(a);
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      let x = await axios.post(
        "/api/task/updateStatus",
        { taskId, status: a },
        config
      );
      setDisplayList(0);
    } catch (error) {
      console.log(error);
    }
  }

  const [tagsUpdate, setTagsUpdate] = useState([]);

  async function fetchUsers(email) {
    console.log(email);

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    let a = await axios.post("/api/getUsers", { email }, config);

    setUsers(a.data);
    console.log(users);
  }
  const moment = require("moment");

  async function fetchDescriptionDetails() {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    let a = await axios.post(
      "/api/fetchDescriptionDetails",
      { taskId },
      config
    );
    console.log(a.data);
    setTags(a.data.tags);
    setAssignedTo(a.data.assignedToName);
    console.log(typeof a.data.startDate);
    console.log(a.data.startDate);
    if (a.data.startDate) {
      let x = a.data.startDate.substring(0, 10);
      console.log("x is :");
      console.log(x);
      setSelectedStartDate(new Date(x));
    }
    if (a.data.dueDate) {
      let y = a.data.dueDate.substring(0, 10);
      setSelectedDueDate(new Date(y));
    }

    // setSelectedStartDate(a.data.startDate.substring(0, 10));

    if (!assignedTo) {
      setAssignedTo("Unassigned");
    }
    setCreatedByName(a.data.createdByName);
    setStatus(a.data.status);

    console.log(a.data);
    assignToRef.current.value = a.data.assignedToName;
    if (assignToRef.current.value === "") {
      assignToRef.current.value = "Unassigned";
      setAssignedTo("Unassigned");
    }
  }

  async function handleAssignToUpdate(email) {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      let a = await axios.post("/api/assignToTask", { email, taskId }, config);
      if (a) {
        await fetchDescriptionDetails();
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function handler(email) {
    await fetchUsers(email);
    setShow(1);
  }

  useEffect(() => {
    setTags(temp);
    fetchDescriptionDetails();

    const handleDocumentClick = (event) => {
      if (!event.target.closest("description-user-list-id")) {
        setShow(0);
      }
    };

    document.addEventListener("click", handleDocumentClick);
    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, []);

  return (
    <div className="display-flex-column">
      <div
        className="description-status-top-wrapper"
        id="description-status-top-id"
      >
        {status === "todo" ? (
          <div
            className="description-status-wrapper-todo"
            id="description-status-wrapper"
            onClick={() => setDisplayList(!displayList)}
          >
            <p className="">To Do</p>

            {displayList ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </div>
        ) : (
          <></>
        )}

        {status === "inprogress" ? (
          <div
            className="description-status-wrapper-inprogress"
            id="description-status-wrapper"
            onClick={() => setDisplayList(!displayList)}
          >
            <p className="">In Progress</p>

            {displayList ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </div>
        ) : (
          <></>
        )}

        {status === "done" ? (
          <div
            className="description-status-wrapper-done"
            id="description-status-wrapper"
            onClick={() => setDisplayList(!displayList)}
          >
            <p className="">Done</p>

            {displayList ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </div>
        ) : (
          <></>
        )}

        {displayList ? (
          <div className="description-status-items-wrapper">
            <div
              className="description-status-item desc-to-do"
              onClick={() => updateStatus("todo")}
            >
              <p className="text-color-dark-grey description-status-list-text-1">
                To Do
              </p>
            </div>
            <div
              className="description-status-item desc-progress"
              onClick={() => updateStatus("inprogress")}
            >
              <p className="text-color-dark-grey description-status-list-text-2">
                In Progress
              </p>
            </div>
            <div
              className="description-status-item desc-done"
              onClick={() => updateStatus("done")}
            >
              <p className="text-color-dark-grey description-status-list-text-3">
                Done
              </p>
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>

      <div className="text-color-dark-grey yy description-content-wrapper">
        <h3 className="description-title">Task details</h3>
        <p className="text-color-light-dark description-assign-to">
          Assigned to :
        </p>
        <div className="description-text-area-top-wrapper">
          <div
            tabindex="0"
            className={
              !outLine
                ? "description-text-area-wrapper display-flex"
                : "description-text-area-wrapper display-flex"
            }
            onClick={() => console.log(outLine)}
          >
            {/* {assignedTo === "Unassigned" ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="25"
                height="25"
                fill="currentColor"
                class="bi bi-person-circle"
                viewBox="0 0 16 16"
              >
                <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                <path
                  fill-rule="evenodd"
                  d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"
                />
              </svg>
            ) : (
              <></>
            )} */}
            {assignedTo === "Unassigned" ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="25"
                height="25"
                fill="#d4d4d4"
                class="bi bi-person-circle"
                viewBox="0 0 16 16"
              >
                <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                <path
                  fill-rule="evenodd"
                  d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"
                />
              </svg>
            ) : (
              <div className="description-text-area-icon">
                {assignedTo ? <>{assignedTo[0].toUpperCase()}</> : <></>}
              </div>
            )}

            <input
              defaultValue={assignedTo}
              className="description-text-area description-list-width"
              onChange={(e) => handler(e.target.value)}
              ref={assignToRef}
              onClick={() => setOutLine(1)}
              id="description-user-list-id"
            />
          </div>
          {!show ? (
            <></>
          ) : (
            <div
              className="description-list-wrapper"
              id="description-user-list-id"
            >
              <div className="description-user-list-map-wrapper">
                {users.map((p) => (
                  <div
                    className="description-user-list-item description-list-width"
                    onClick={(e) => handleAssignToUpdate(p.email)}
                  >
                    <div className="description-user-list-icon">
                      {p.email[0].toUpperCase()}
                    </div>
                    <div>
                      <div className="text-color-dark-grey description-user-list-name">
                        {p.name}
                      </div>
                      <div className="text-color-grey description-user-list-email">
                        {p.email}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="description-select-start-date-wrapper">
          <p className="description-date-title" onClick={() => print()}>
            Start Date :
          </p>
        </div>
        <div className="display-flex align-items-center margin-top-5px margin-left-20px">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="15"
            height="15"
            fill="#d4d4d4"
            class="bi bi-calendar"
            viewBox="0 0 16 16"
          >
            <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z" />
          </svg>
          <DatePicker
            selected={selectedStartDate}
            onChange={handleStartDateChange}
            dateFormat="yyyy/MM/dd"
            placeholderText="Select a date"
            className="date-picker-start-date margin-left-10px"
          />
        </div>

        <div className="description-select-start-date-wrapper">
          <p className="description-date-title">Due Date :</p>
        </div>
        <div className="display-flex align-items-center margin-top-5px margin-bottom-10px margin-left-20px">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="15"
            height="15"
            fill="#d4d4d4"
            class="bi bi-calendar"
            viewBox="0 0 16 16"
          >
            <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z" />
          </svg>

          <DatePicker
            selected={selectedDueDate}
            onChange={handleDueDateChange}
            dateFormat="yyyy/MM/dd"
            placeholderText="Select a date"
            className="date-picker-start-date margin-left-10px"
          />
        </div>

        <div className="margin-left-20px margin-top-15px task-page-tags-title">
          Tags :
        </div>
        {updateTag ? (
          <></>
        ) : (
          <div
            className="description-tags-wrapper description-tags-wrapper-outline-border-none"
            onClick={() => setUpdateTag(1)}
          >
            {tags.map((p) => (
              <div className="description-tags-item">{p}</div>
            ))}
            {/* <input
          className="description-task-tags"
          placeholder="Press enter to add a tag..."
        ></input> */}
          </div>
        )}

        {updateTag ? (
          <>
            <div tabindex="0" className="description-tags-wrapper poui">
              {tags.map((p) => (
                <div className="description-tags-item display-flex description-tags-item-wrapper">
                  <p className="description-tags-items">{p}</p>
                  <CancelIcon
                    sx={{ fontSize: 15 }}
                    className="tags-cancel-icon"
                    onClick={() => removeTag(p)}
                  />
                </div>
              ))}
              <input
                className="description-task-tags"
                placeholder="Press enter to add a tag..."
                onChange={(e) => setTagValue(e.target.value)}
                onKeyDown={handleKeyPress}
              ></input>
            </div>
            <div className="display-flex">
              <div
                className="description-tags-save-button"
                onClick={() => updateTagsDescription()}
              >
                Save
              </div>
              <div
                className="description-tags-cancel-button"
                onClick={() => setUpdateTag(0)}
              >
                Cancel
              </div>
            </div>
          </>
        ) : (
          <></>
        )}

        <div className="description-created-by">Created by :</div>
        <div className="description-created-by-wrapper display-flex">
          <div className="description-created-by-icon">
            {createdByName ? <>{createdByName[0].toUpperCase()}</> : <></>}

            {}
          </div>
          <div className="description-created-by-name">{createdByName}</div>
        </div>
      </div>
    </div>
  );
};

export default Description;
