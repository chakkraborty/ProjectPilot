import React from "react";
import Navbar from "./Navbar";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";
import SuccessToast from "../toast/SuccessToast.js";
import FailureToast from "../toast/FailureToast.js";
import AddPeople from "./AddPeople";
import MembersSkeletal from "../skeletal/membersSkeletal.js";
import { useCallback } from "react";
import CreateTask from "./CreateTask";
import { useState, useEffect } from "react";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { useParams } from "react-router-dom";
import LiveSearch from "./LiveSearch";
import Popover from "@mui/material/Popover";
import DeleteModal from "./DeleteModal";
import "./ProjectPage.css";
import KanbanSkeletal from "../skeletal/kanbanSkeletal.js";
import ProjectLeftPanel from "./ProjectLeftPanel";
const ProjectPage = () => {
  const [addMembers, setAddMembers] = useState(0);
  function toggleAddMembers() {
    setAddMembers(!addMembers);
  }

  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleSuccessMessageTimeout = () => {
    setTimeout(() => {
      setShowSuccessMessage(false);
    }, 2000);
  };
  const handleFailureMessageTimeout = () => {
    setTimeout(() => {
      setShowFailureMessage(false);
    }, 2000);
  };
  function successMessageFunction(incomingMessage) {
    setSuccessMessage(incomingMessage);

    setShowSuccessMessage(true);

    handleSuccessMessageTimeout();
  }

  const [showFailureMessage, setShowFailureMessage] = useState(false);
  const [failureMessage, setFailureMessage] = useState("");

  function failureMessageFunction(incomingMessage) {
    setFailureMessage(incomingMessage);

    if (failureMessage === incomingMessage) {
      setShowFailureMessage(true);
    }
    handleFailureMessageTimeout();
  }

  const [deleteOpen, setDeleteOpen] = useState(false);
  const [open, setOpen] = useState(false);
  function closeDeleteModal() {
    setDeleteOpen(false);
  }

  const popoverStyle = {
    boxShadow: "none", // Remove the box-shadow
    border: "1px solid rgb(160, 195, 255)",
  };

  function openDeleteModal() {
    setDeleteOpen(true);
  }
  let { projectId } = useParams();
  console.log(projectId);

  const onClose = () => {
    setOpen(false);
  };
  const onOpen = () => {
    setOpen(true);
  };

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

  const [deleteTaskId, setDeleteTaskId] = useState("");

  // async function deleteHandler(a) {
  //   setDeleteTaskId(a);
  //   await handleDeleteClose();
  //   setDeleteOpen(true);
  // }
  const [taskLoading, setTaskLoading] = useState(true);

  const [tasks, setTasks] = useState([]);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [taskId, setTaskId] = useState("");

  const handleClick = useCallback((id, event) => {
    // Some code that uses 'id'
    setAnchorEl(event.currentTarget);
    setTaskId(id);
  }, []);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const deleteHandler = () => {
    setDeleteOpen(true);
    handleDeleteClose();
  };
  const [anchorDeleteModal, setAnchorDeleteModal] = useState(null);
  const handleDeleteOpen = (event, a) => {
    setAnchorDeleteModal(event.currentTarget);
    setDeleteTaskId(a);

    console.log(a);
  };
  const handleDeleteClose = () => {
    setAnchorDeleteModal(null);
  };

  const deleteOpener = Boolean(anchorDeleteModal);

  const openn = Boolean(anchorEl);
  const id = openn ? "simple-popover" : undefined;
  async function fetchTasks() {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    let a = await axios.post("/api/fetchTasks", { projectId }, config);
    if (a) {
      await setTasks(a.data);
    }
    setTaskLoading(false);
  }
  function triggerMembersAdded() {
    successMessageFunction("Success ! Invitations for joining sent !");
    setShowSuccessMessage(true);
  }
  useEffect(() => {
    fetchMembers();
    fetchTasks();
  }, []);

  return (
    <div className="project-board-page">
      <Navbar />

      {showSuccessMessage ? <SuccessToast message={successMessage} /> : <></>}
      {showFailureMessage ? <FailureToast message={failureMessage} /> : <></>}
      <div className="project-board-lower-wrapper">
        <ProjectLeftPanel type={2} />
        <div className="project-board-right-panel">
          <div className="project-right-panel-header-top">
            <div className="projects-right-panel-header-wrapper">
              <div className="projects-right-panel-name-wrapper">
                <p className="projects-right-panel-header-top">
                  Project / Kanban board
                </p>
                <p className="projects-right-panel-header-lower">
                  Kanban board
                </p>
              </div>
            </div>
            <div className="project-page-search-and-members-wrapper">
              <div className="project-page-search-wrapper">
                <input
                  type="text"
                  className="project-page-input text-dark"
                  placeholder=""
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

              {!members.length ? (
                <MembersSkeletal />
              ) : (
                <div
                  className="team-members-wrapper"
                  onClick={toggleAddMembers}
                >
                  {members.map((p) => (
                    <div className="team-members-icon">
                      {p.name[0].toUpperCase()}
                    </div>
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
              )}
            </div>
          </div>
          {!open ? (
            <></>
          ) : (
            <CreateTask
              onClose={onClose}
              onOpen={onOpen}
              fetchTasks={fetchTasks}
            />
          )}
          {addMembers ? (
            <AddPeople
              projectId={projectId}
              toggleAddMembers={toggleAddMembers}
              triggerMembersAdded={triggerMembersAdded}
            />
          ) : (
            <></>
          )}

          {taskLoading ? (
            <KanbanSkeletal />
          ) : (
            <div className="project-page-lower-wrapper">
              <div className="text-color-grey kanban-board-wrapper">
                <div className="kanban-board-title">
                  <p className="task-card-top-text-color">TO DO</p>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="30"
                    height="30"
                    fill="#8c9bab"
                    class="bi bi-plus"
                    viewBox="0 0 16 16"
                    className="kanban-board-header-add-icon"
                    onClick={onOpen}
                  >
                    <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                  </svg>
                </div>
                <div className="kanban-board-overflow-wrapper">
                  {tasks.map((p) => {
                    if (p.status === "todo") {
                      return (
                        <div className="task-card" key={p._id}>
                          <div className="task-card-top-wrapper">
                            <div className="task-card-left task-card-title-text">
                              {p.title}
                            </div>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="18"
                              height="18"
                              class="bi bi-three-dots-vertical"
                              viewBox="0 0 16 16"
                              fill="#8c9bab"
                              className="task-card-right"
                              onClick={(event) =>
                                handleDeleteOpen(event, p._id)
                              }
                            >
                              <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
                            </svg>
                            <Popover
                              id={id}
                              open={deleteOpener}
                              anchorEl={anchorDeleteModal}
                              onClose={handleDeleteClose}
                              anchorOrigin={{
                                vertical: "bottom",
                                horizontal: "left",
                              }}
                              className="delete-popover-wrapper"
                              PaperProps={{ style: popoverStyle }}
                              onClick={deleteHandler}
                            >
                              <div
                                className="delete-popover"
                                onClick={deleteHandler}
                              >
                                Delete
                              </div>
                            </Popover>
                          </div>

                          {deleteOpen ? (
                            <DeleteModal
                              openDeleteModal={openDeleteModal}
                              closeDeleteModal={closeDeleteModal}
                              deleteTaskId={deleteTaskId}
                              fetchTasks={fetchTasks}
                              failureMessageFunction={failureMessageFunction}
                            />
                          ) : (
                            <></>
                          )}

                          <div className="task-card-tags-wrapper">
                            {p.tags.map((tag) => (
                              <div className="task-card-tag-wrapper text-color-off-white">
                                {tag}
                              </div>
                            ))}
                          </div>

                          <div className="task-card-assigned-to-wrapper">
                            {p.assignedToName ? (
                              <div
                                onClick={(event) => handleClick(p._id, event)}
                                className="task-card-assigned-to cbdc text-color-off-white"
                              >
                                {p.assignedToName[0].toUpperCase()}
                              </div>
                            ) : (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="23"
                                height="23"
                                fill="rgb(57, 57, 57)"
                                className="bi bi-person-circle margin-top-10px card-icon-project-page cbdc"
                                viewBox="0 0 16 16"
                                aria-describedby={id}
                                variant="contained"
                                onClick={(event) => handleClick(p._id, event)}
                              >
                                <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                                <path
                                  fill-rule="evenodd"
                                  d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"
                                />
                              </svg>
                            )}

                            {p.assignedToName ? (
                              <p className="abcdd">{p.assignedToName}</p>
                            ) : (
                              <p className="abcdd">Unassigned</p>
                            )}
                          </div>

                          <Popover
                            id={id}
                            open={openn}
                            anchorEl={anchorEl}
                            onClose={handleClose}
                            anchorOrigin={{
                              vertical: "bottom",
                              horizontal: "left",
                            }}
                            className="padding-10-px"
                          >
                            <LiveSearch
                              className="live-search-main-wrapper"
                              taskId={taskId}
                              onClose={handleClose}
                              fetchTasks={fetchTasks}
                            />
                          </Popover>
                        </div>
                      );
                    } else {
                      return null;
                    }
                  })}
                </div>
              </div>
              <div className="text-color-grey kanban-board-wrapper">
                <div className="kanban-board-title">
                  <p className="task-card-top-text-color">IN PROGRESS</p>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="30"
                    height="30"
                    fill="#8c9bab"
                    class="bi bi-plus"
                    viewBox="0 0 16 16"
                    className="kanban-board-header-add-icon"
                    onClick={onOpen}
                  >
                    <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                  </svg>
                </div>
                <div className="kanban-board-overflow-wrapper">
                  {tasks.map((p) => {
                    if (p.status === "inprogress") {
                      return (
                        <div className="task-card" key={p._id}>
                          <div className="task-card-top-wrapper">
                            <div className="task-card-left task-card-title-text">
                              {p.title}
                            </div>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="18"
                              height="18"
                              class="bi bi-three-dots-vertical"
                              viewBox="0 0 16 16"
                              fill="#8c9bab"
                              className="task-card-right"
                              onClick={(event) =>
                                handleDeleteOpen(event, p._id)
                              }
                            >
                              <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
                            </svg>
                            <Popover
                              id={id}
                              open={deleteOpener}
                              anchorEl={anchorDeleteModal}
                              onClose={handleDeleteClose}
                              anchorOrigin={{
                                vertical: "bottom",
                                horizontal: "left",
                              }}
                              className="delete-popover-wrapper"
                              PaperProps={{ style: popoverStyle }}
                              onClick={deleteHandler}
                            >
                              <div
                                className="delete-popover"
                                onClick={deleteHandler}
                              >
                                Delete
                              </div>
                            </Popover>
                          </div>

                          {deleteOpen ? (
                            <DeleteModal
                              openDeleteModal={openDeleteModal}
                              closeDeleteModal={closeDeleteModal}
                              deleteTaskId={deleteTaskId}
                              fetchTasks={fetchTasks}
                            />
                          ) : (
                            <></>
                          )}

                          <div className="task-card-tags-wrapper">
                            {p.tags.map((tag) => (
                              <div className="task-card-tag-wrapper text-color-off-white">
                                {tag}
                              </div>
                            ))}
                          </div>

                          <div className="task-card-assigned-to-wrapper">
                            {p.assignedToName ? (
                              <div
                                onClick={(event) => handleClick(p._id, event)}
                                className="task-card-assigned-to cbdc text-color-off-white"
                              >
                                {p.assignedToName[0].toUpperCase()}
                              </div>
                            ) : (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="23"
                                height="23"
                                fill="rgb(57, 57, 57)"
                                className="bi bi-person-circle margin-top-10px card-icon-project-page cbdc"
                                viewBox="0 0 16 16"
                                aria-describedby={id}
                                variant="contained"
                                onClick={(event) => handleClick(p._id, event)}
                              >
                                <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                                <path
                                  fill-rule="evenodd"
                                  d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"
                                />
                              </svg>
                            )}

                            {p.assignedToName ? (
                              <p className="abcdd">{p.assignedToName}</p>
                            ) : (
                              <p className="abcdd">Unassigned</p>
                            )}
                          </div>

                          <Popover
                            id={id}
                            open={openn}
                            anchorEl={anchorEl}
                            onClose={handleClose}
                            anchorOrigin={{
                              vertical: "bottom",
                              horizontal: "left",
                            }}
                            className="padding-10-px"
                          >
                            <LiveSearch
                              className="live-search-main-wrapper"
                              taskId={taskId}
                              onClose={handleClose}
                              fetchTasks={fetchTasks}
                            />
                          </Popover>
                        </div>
                      );
                    } else {
                      return null;
                    }
                  })}
                </div>
              </div>
              <div className="text-color-grey kanban-board-wrapper">
                <div className="kanban-board-title">
                  <p className="task-card-top-text-color">DONE</p>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="30"
                    height="30"
                    fill="#8c9bab"
                    class="bi bi-plus"
                    viewBox="0 0 16 16"
                    className="kanban-board-header-add-icon"
                    onClick={onOpen}
                  >
                    <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                  </svg>
                </div>
                <div className="kanban-board-overflow-wrapper">
                  {tasks.map((p) => {
                    if (p.status === "done") {
                      return (
                        <div className="task-card" key={p._id}>
                          <div className="task-card-top-wrapper">
                            <div className="task-card-left task-card-title-text">
                              {p.title}
                            </div>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="18"
                              height="18"
                              class="bi bi-three-dots-vertical"
                              viewBox="0 0 16 16"
                              fill="#8c9bab"
                              className="task-card-right"
                              onClick={(event) =>
                                handleDeleteOpen(event, p._id)
                              }
                            >
                              <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
                            </svg>
                            <Popover
                              id={id}
                              open={deleteOpener}
                              anchorEl={anchorDeleteModal}
                              onClose={handleDeleteClose}
                              anchorOrigin={{
                                vertical: "bottom",
                                horizontal: "left",
                              }}
                              className="delete-popover-wrapper"
                              PaperProps={{ style: popoverStyle }}
                              onClick={deleteHandler}
                            >
                              <div
                                className="delete-popover"
                                onClick={deleteHandler}
                              >
                                Delete
                              </div>
                            </Popover>
                          </div>

                          {deleteOpen ? (
                            <DeleteModal
                              openDeleteModal={openDeleteModal}
                              closeDeleteModal={closeDeleteModal}
                              deleteTaskId={deleteTaskId}
                              fetchTasks={fetchTasks}
                            />
                          ) : (
                            <></>
                          )}

                          <div className="task-card-tags-wrapper">
                            {p.tags.map((tag) => (
                              <div className="task-card-tag-wrapper text-color-off-white">
                                {tag}
                              </div>
                            ))}
                          </div>

                          <div className="task-card-assigned-to-wrapper">
                            {p.assignedToName ? (
                              <div
                                onClick={(event) => handleClick(p._id, event)}
                                className="task-card-assigned-to cbdc text-color-off-white"
                              >
                                {p.assignedToName[0].toUpperCase()}
                              </div>
                            ) : (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="23"
                                height="23"
                                fill="#b8a899"
                                className="bi bi-person-circle margin-top-10px card-icon-project-page cbdc"
                                viewBox="0 0 16 16"
                                aria-describedby={id}
                                variant="contained"
                                onClick={(event) => handleClick(p._id, event)}
                              >
                                <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                                <path
                                  fill-rule="evenodd"
                                  d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"
                                />
                              </svg>
                            )}

                            {p.assignedToName ? (
                              <p className="abcdd">{p.assignedToName}</p>
                            ) : (
                              <p className="abcdd">Unassigned</p>
                            )}
                          </div>

                          <Popover
                            id={id}
                            open={openn}
                            anchorEl={anchorEl}
                            onClose={handleClose}
                            anchorOrigin={{
                              vertical: "bottom",
                              horizontal: "left",
                            }}
                            className="padding-10-px"
                          >
                            <LiveSearch
                              className="live-search-main-wrapper"
                              taskId={taskId}
                              onClose={handleClose}
                              fetchTasks={fetchTasks}
                            />
                          </Popover>
                        </div>
                      );
                    } else {
                      return null;
                    }
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectPage;
