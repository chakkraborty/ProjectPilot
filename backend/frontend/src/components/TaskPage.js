import React, { useEffect } from "react";
import Navbar from "./Navbar";
import { useState, useRef } from "react";
import Description from "./Description";
import { useParams } from "react-router-dom";
import ProjectLeftPanel from "./ProjectLeftPanel.js";
import { useNavigate } from "react-router-dom";
import "./TaskPage.css";
import LoaderScreen from "./LoaderScreen.js";
import SessionError from "./SessionError.js";
import axios from "axios";
const TaskPage = () => {
  const navigate = useNavigate();
  const [showError, setShowError] = useState(false); //session error modal
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
  const [showLoading, setShowLoading] = useState(false);
  const [showTick, setShowTick] = useState(false);

  function triggerSessionError() {
    setShowError(true);
  }

  function loadingTrigger() {
    setShowLoading(true);
    setTimeout(() => {
      localStorage.clear();
      navigate("/login");
    }, 1500);
  }

  let { taskId } = useParams();
  console.log("id is :  " + taskId);

  async function deleteIssueHandler(a) {
    try {
      let token = localStorage.getItem("token");
      if (!token) {
        loadingTrigger();
        return;
      }
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      };

      let x = await axios.post("/api/deleteIssue", { _id: a }, config);
      fetchIssues();
    } catch (error) {
      console.log(error);
      if (error.response.data.type === 2) {
        setShowError(true);
      }
    }
  }

  async function markIssueHandler(a) {
    try {
      let token = localStorage.getItem("token");
      if (!token) {
        loadingTrigger();
        return;
      }
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      };

      let x = await axios.post("/api/issue/markAsResolved", { _id: a }, config);
      fetchIssues();
    } catch (error) {
      console.log(error);

      if (error.response.data.type === 2) {
        setShowError(true);
      }
    }
  }
  async function openIssueHandler(a) {
    try {
      let token = localStorage.getItem("token");
      if (!token) {
        loadingTrigger();
        return;
      }
      const config = {
        headers: {
          Authorizaton: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      };

      let x = await axios.post("/api/issue/openIssue", { _id: a }, config);
      fetchIssues();
    } catch (error) {
      console.log(error);
      if (error.response.data.type === 2) {
        setShowError(true);
      }
    }
  }

  async function fetchIssues() {
    try {
      let token = localStorage.getItem("token");
      if (!token) {
        loadingTrigger();
        return;
      }
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      };
      let a = await axios.post("/api/issue/getIssuesById", { taskId }, config);
      if (a) {
        setIssues(a.data);
      }
    } catch (error) {
      console.log(error);
      if (error.response.data.type === 2) {
        setShowError(true);
      }
    }
  }

  async function fetchTask() {
    try {
      let token = localStorage.getItem("token");
      if (!token) {
        loadingTrigger();
        return;
      }
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      };

      let a = await axios.post("/api/getTaskById", { taskId }, config);
      console.log(a.data);

      setDescription(a.data.description);
      setPrevDesc(a.data.description);
      setSummary(a.data.title);
    } catch (error) {
      console.log(error);
      if (error.response.data.type === 2) {
        setShowError(true);
      }
    }
  }

  async function updateSummaryHandler(a) {
    try {
      setShowTick(true);

      let token = localStorage.getItem("token");
      if (!token) {
        loadingTrigger();
        return;
      }
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
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
      if (error.response.data.type === 2) {
        setShowError(true);
      }
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
      let token = localStorage.getItem("token");
      if (!token) {
        loadingTrigger();
        return;
      }
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
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
      if (error.response.data.type === 2) {
        setShowError(true);
      }
    }
  }

  async function updateDesc() {
    try {
      let token = localStorage.getItem("token");
      if (!token) {
        loadingTrigger();
        return;
      }
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
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
      if (error.response.data.type === 2) {
        setShowError(true);
      }
    }
  }

  function setter() {
    setShowTick(true);
    console.log("loaded");
  }

  useEffect(() => {
    let token = localStorage.getItem("token");
    if (!token) {
      loadingTrigger();
    }
    fetchTask();
    fetchIssues();
    const handleDocumentClick = (event) => {
      if (!event.target.closest("task-page-title-id")) {
        setShowTick(false);
      }
    };

    document.addEventListener("click", handleDocumentClick);
    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, []);

  return (
    <div className="container">
      {showLoading ? <LoaderScreen /> : <></>}
      {showError ? <SessionError /> : <></>}
      <Navbar />

      <div className="content-container">
        <ProjectLeftPanel />

        <div className="middle-col">
          <div className="task-page-right-wrapper">
            <div className="task-page-title">Project / Task</div>

            <div id="task-page-title-id">
              <textarea
                defaultValue={summary}
                className="background-color-dark-theme margin-top-10px task-page-summary-title"
                onChange={(e) => updateSummaryHandler(e.target.value)}
                spellCheck="false"
              ></textarea>
            </div>

            {/* {showTick ? (
              <div className="desc-title-tic-box">
                <div className="desc-title-tic-box-item">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="#b6c2cf
"
                    class="bi bi-check-lg"
                    viewBox="0 0 16 16"
                  >
                    <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425z" />
                  </svg>
                </div>
                <div className="desc-title-tic-box-item">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="#b6c2cf"
                    class="bi bi-x-lg"
                    viewBox="0 0 16 16"
                  >
                    <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
                  </svg>
                </div>
              </div>
            ) : (
              <></>
            )} */}

            <div className=" margin-top-10px task-page-description margin-bottom-5px">
              Description
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
              spellCheck="false"
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
              <p className="task-page-issues-header">
                Comments ({issues.length}){" "}
              </p>
            </div>

            <div className="task-page-add-issue-wrapper">
              <div className="task-page-add-issue-name-icon">N</div>
              <textarea
                placeholder="Add a comment..."
                className="task-page-add-issue-text-area"
                ref={issueTextAreaRef}
                onClick={() => setTriggReport(true)}
                onChange={(e) => setIssueDescription(e.target.value)}
              ></textarea>
            </div>

            {!triggReport ? (
              <></>
            ) : (
              <div className="task-page-create-issue-wrapper">
                <div
                  className="task-page-issue-report-button"
                  onClick={handleReportIssue}
                >
                  Add
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
            <div className="issue-parent-wrapper">
              {issues.map((p) => (
                <div className="issue-wrapper">
                  <div className="display-flex">
                    {/* {p.status === 0 ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="25"
                      height="25"
                      fill="rgb(252, 86, 3)"
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
                      fill="rgb(83, 194, 102)"
                      class="bi bi-check-circle"
                      viewBox="0 0 16 16"
                    >
                      <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                      <path d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z" />
                    </svg>
                  )} */}
                    <div className="task-page-reported-wrapper">
                      <div className="task-page-reported-by-icon">
                        {p.createdByName[0].toUpperCase()}
                      </div>
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
                        {/* {p.status === 0 ? (
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
                        )} */}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="right-col">
          <Description
            taskId={taskId}
            loadingTrigger={loadingTrigger}
            triggerSessionError={triggerSessionError}
          />
        </div>
      </div>
    </div>
  );
};

export default TaskPage;
