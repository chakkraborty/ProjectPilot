import React, { useEffect } from "react";
import Navbar from "./Navbar";
import { useState, useRef } from "react";
import Description from "./Description";
import { useParams } from "react-router-dom";
import ProjectLeftPanel from "./ProjectLeftPanel.js";
import "./TaskPage.css";

import axios from "axios";
const TaskPage = () => {
  const [trigger, setTrigger] = useState(false);
  const [triggReport, setTriggReport] = useState(false);
  const [summary, setSummary] = useState("");
  const [description, setDescription] = useState("");
  const [prevDesc, setPrevDesc] = useState("");
  const textareaRef = useRef();
  const issueTextAreaRef = useRef();
  const [issueDescription, setIssueDescription] = useState("");
  const [issues, setIssues] = useState([]);
  const [descriptionTextAreaStatus, setDescriptionTextAreaStatus] = useState(0);

  let { taskId } = useParams();
  console.log("id is :  " + taskId);

  async function deleteIssueHandler(a) {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      let x = await axios.post("/api/deleteIssue", { _id: a }, config);
      fetchIssues();
    } catch (error) {
      console.log(error);
    }
  }

  async function markIssueHandler(a) {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      let x = await axios.post("/api/issue/markAsResolved", { _id: a }, config);
      fetchIssues();
    } catch (error) {
      console.log(error);
    }
  }
  async function openIssueHandler(a) {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      let x = await axios.post("/api/issue/openIssue", { _id: a }, config);
      fetchIssues();
    } catch (error) {
      console.log(error);
    }
  }

  async function fetchIssues() {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      let a = await axios.post("/api/issue/getIssuesById", { taskId }, config);
      if (a) {
        setIssues(a.data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function fetchTask() {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      let a = await axios.post("/api/getTaskById", { taskId }, config);

      setDescription(a.data.description);
      setPrevDesc(a.data.description);
      setSummary(a.data.title);
    } catch (error) {
      console.log(error);
    }
  }

  async function updateSummaryHandler(a) {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      let summary = a;
      let x = await axios.post(
        "/api/task/updateSummary",
        { taskId, summary },
        config
      );
    } catch (error) {
      console.log(error);
    }
  }

  function handleDescriptionReset() {
    setDescription(prevDesc);
    textareaRef.current.value = prevDesc;

    setTrigger(false);
  }
  async function handleReportIssue() {
    let name = localStorage.getItem("name");
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      let a = await axios.post(
        "/api/issue/createIssue",
        {
          taskId,
          createdByName: name,
          comment: issueDescription,
        },
        config
      );
      if (a) console.log(a.data);
      else console.log("failed");
      fetchIssues();
      issueTextAreaRef.current.value = "";
      setTriggReport(false);
    } catch (error) {
      console.log(error);
    }
  }

  async function updateDesc() {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      let a = await axios.post(
        "/api/task/updateDescription/",
        { description, taskId },
        config
      );
      if (a) {
        textareaRef.current.value = a.data.description;
        setDescription(a.data.description);
        setPrevDesc(a.data.description);
      }
      setTrigger(false);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchTask();
    fetchIssues();
  }, []);

  return (
    // <div>
    //   <Navbar />
    // </div>
    <div className="container">
      {/* Navbar */}
      <Navbar />

      {/* Content Container */}
      <div className="content-container">
        {/* Left Column */}
        {/* <div className="left-col"> */}
        <ProjectLeftPanel />
        {/* </div> */}

        {/* Middle Column */}
        <div className="middle-col">
          <div className="task-page-right-wrapper">
            <div className="color-off-white">
              Project / Project-Euler / Task 9
            </div>

            <textarea
              defaultValue={summary}
              className="color-off-white background-color-dark-theme margin-top-10px task-page-summary-title"
              onChange={(e) => updateSummaryHandler(e.target.value)}
            ></textarea>

            {/* <div className="text-color-grey margin-top-10px task-page-summary-title">
              {summary}
            </div> */}
            <div className="color-off-white margin-top-10px task-page-description margin-bottom-5px">
              Description :
            </div>
            <textarea
              className={`task-page-text-area color-off-white ${
                descriptionTextAreaStatus ? "task-page-text-area-focus" : ""
              }`}
              defaultValue={description}
              ref={textareaRef}
              onClick={(e) => {
                setDescription(e.target.value);
                setTrigger(true);
                setDescriptionTextAreaStatus(1);
              }}
              onChange={(e) => setDescription(e.target.value)}
              id="descriptionTextArea"
            ></textarea>
            {!trigger ? (
              <></>
            ) : (
              <div className="task-page-save-changes-wrapper">
                <div
                  className="task-page-text-area-save-button"
                  onClick={() => {
                    updateDesc();
                    setDescriptionTextAreaStatus(0);
                  }}
                >
                  Save
                </div>
                <div
                  className="task-page-text-area-cancel-button color-off-white"
                  onClick={() => {
                    handleDescriptionReset();
                    setDescriptionTextAreaStatus(0);
                  }}
                >
                  Cancel
                </div>
              </div>
            )}
            <div className="main-col-description">
              <Description taskId={taskId} />
            </div>

            <div className="task-page-issues-title text-color-dark-grey display-flex">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="25"
                height="25"
                fill="rgb(255, 63, 5)"
                class="bi bi-bug"
                viewBox="0 0 16 16"
              >
                <path d="M4.355.522a.5.5 0 0 1 .623.333l.291.956A4.979 4.979 0 0 1 8 1c1.007 0 1.946.298 2.731.811l.29-.956a.5.5 0 1 1 .957.29l-.41 1.352A4.985 4.985 0 0 1 13 6h.5a.5.5 0 0 0 .5-.5V5a.5.5 0 0 1 1 0v.5A1.5 1.5 0 0 1 13.5 7H13v1h1.5a.5.5 0 0 1 0 1H13v1h.5a1.5 1.5 0 0 1 1.5 1.5v.5a.5.5 0 1 1-1 0v-.5a.5.5 0 0 0-.5-.5H13a5 5 0 0 1-10 0h-.5a.5.5 0 0 0-.5.5v.5a.5.5 0 1 1-1 0v-.5A1.5 1.5 0 0 1 2.5 10H3V9H1.5a.5.5 0 0 1 0-1H3V7h-.5A1.5 1.5 0 0 1 1 5.5V5a.5.5 0 0 1 1 0v.5a.5.5 0 0 0 .5.5H3c0-1.364.547-2.601 1.432-3.503l-.41-1.352a.5.5 0 0 1 .333-.623zM4 7v4a4 4 0 0 0 3.5 3.97V7H4zm4.5 0v7.97A4 4 0 0 0 12 11V7H8.5zM12 6a3.989 3.989 0 0 0-1.334-2.982A3.983 3.983 0 0 0 8 2a3.983 3.983 0 0 0-2.667 1.018A3.989 3.989 0 0 0 4 6h8z" />
              </svg>
              <p className="color-off-white margin-left-10px">
                Issues({issues.length}){" "}
              </p>
            </div>

            <textarea
              placeholder="Report an issue..."
              className="task-page-add-issue-text-area background-color-dark-theme"
              ref={issueTextAreaRef}
              onClick={() => setTriggReport(true)}
              onChange={(e) => setIssueDescription(e.target.value)}
            ></textarea>
            {!triggReport ? (
              <></>
            ) : (
              <div className="task-page-create-issue-wrapper">
                <div
                  className="task-page-issue-report-button"
                  onClick={handleReportIssue}
                >
                  Report
                </div>
                <div
                  className="task-page-issue-cancel-button color-off-white"
                  onClick={() => {
                    setTriggReport(false);
                    issueTextAreaRef.current.value = "";
                  }}
                >
                  Cancel
                </div>
              </div>
            )}

            {issues.map((p) => (
              <div className="issue-wrapper">
                <div className="display-flex">
                  {p.status === 0 ? (
                    // <svg
                    //   xmlns="http://www.w3.org/2000/svg"
                    //   width="25"
                    //   height="25"
                    //   fill="rgb(255, 63, 5)"
                    //   class="bi bi-exclamation-triangle"
                    //   viewBox="0 0 16 16"
                    //   className="issue-wrapper-icon"
                    // >
                    //   <path d="M7.938 2.016A.13.13 0 0 1 8.002 2a.13.13 0 0 1 .063.016.146.146 0 0 1 .054.057l6.857 11.667c.036.06.035.124.002.183a.163.163 0 0 1-.054.06.116.116 0 0 1-.066.017H1.146a.115.115 0 0 1-.066-.017.163.163 0 0 1-.054-.06.176.176 0 0 1 .002-.183L7.884 2.073a.147.147 0 0 1 .054-.057zm1.044-.45a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566z" />
                    //   <path d="M7.002 12a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 5.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995z" />
                    // </svg>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="25"
                      height="25"
                      fill="rgb(255, 63, 5)"
                      class="bi bi-exclamation-circle"
                      viewBox="0 0 16 16"
                    >
                      <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                      <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995z" />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="25"
                      height="25"
                      fill="#04cd2d"
                      class="bi bi-patch-check-fill"
                      viewBox="0 0 16 16"
                      className="issue-wrapper-icon"
                    >
                      <path d="M10.067.87a2.89 2.89 0 0 0-4.134 0l-.622.638-.89-.011a2.89 2.89 0 0 0-2.924 2.924l.01.89-.636.622a2.89 2.89 0 0 0 0 4.134l.637.622-.011.89a2.89 2.89 0 0 0 2.924 2.924l.89-.01.622.636a2.89 2.89 0 0 0 4.134 0l.622-.637.89.011a2.89 2.89 0 0 0 2.924-2.924l-.01-.89.636-.622a2.89 2.89 0 0 0 0-4.134l-.637-.622.011-.89a2.89 2.89 0 0 0-2.924-2.924l-.89.01-.622-.636zm.287 5.984-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7 8.793l2.646-2.647a.5.5 0 0 1 .708.708z" />
                    </svg>
                  )}
                  <div className="task-page-reported-wrapper">
                    <div className="task-page-reported-by-icon">
                      {p.createdByName[0].toUpperCase()}
                    </div>
                    {/* <div className="task-page-reported-by-name">
                      @{p.createdByName}
                    </div> */}
                  </div>
                  <div className="task-page-issue-summary">
                    <p className="task-page-issue-createdBy">
                      {p.createdByName}
                    </p>
                    <p className="task-page-issue-comment">{p.comment}</p>
                    <div className="margin-top-10px task-issue-lower-text">
                      <span
                        className="task-issue-delete-wrapper"
                        onClick={() => deleteIssueHandler(p._id)}
                      >
                        Delete
                      </span>
                      {p.status === 0 ? (
                        <span
                          className="task-issue-delete-wrapper margin-left-10px"
                          onClick={() => markIssueHandler(p._id)}
                        >
                          Mark as Resolved
                        </span>
                      ) : (
                        <span
                          className="text-color-dark-grey task-issue-delete-wrapper margin-left-10px"
                          onClick={() => openIssueHandler(p._id)}
                        >
                          Open Issue
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column */}
        <div className="right-col">
          <Description taskId={taskId} />
        </div>
      </div>
    </div>
  );
};

export default TaskPage;
