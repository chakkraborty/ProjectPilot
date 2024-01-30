import React from "react";
import Navbar from "./Navbar.js";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";
import SuccessToast from "../toast/SuccessToast.js";
import FailureToast from "../toast/FailureToast.js";
import AddPeople from "./AddPeople.js";
import MembersSkeletal from "../skeletal/membersSkeletal.js";
import { useCallback } from "react";
import CreateTask from "./CreateTask.js";
import { useState, useEffect } from "react";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { useNavigate, useParams } from "react-router-dom";
import LiveSearch from "./LiveSearch.js";
import LoaderScreen from "./LoaderScreen.js";
import Popover from "@mui/material/Popover";
import DeleteModal from "./DeleteModal.js";
import "./ProjectPage.css";
import SessionError from "./SessionError.js";
import KanbanSkeletal from "../skeletal/kanbanSkeletal.js";
import ProjectLeftPanel from "./ProjectLeftPanel.js";

const KanbanCard = ({ title, tags, assignedToName, _id }) => {
  let tkn = localStorage.getItem("token");
  const [showError, setShowError] = useState(false);
  const [showLoading, setShowLoading] = useState(false);
  function showLoadingTrigger() {
    setShowLoading(true);
    localStorage.clear();
    setTimeout(() => {
      navigate("/login");
    }, 1500);
  }
  function showErrorTrigger() {
    setShowError(true);
  }

  // showLoadingTrigger={showLoadingTrigger}
  // showErrorTrigger={showErrorTrigger}

  const navigate = useNavigate();

  const [tasks, setTasks] = useState([]);
  const [tasksInit, setTasksInit] = useState([]);

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

  async function handleTaskSearchKanban(str) {
    const searchResults = await tasksInit.filter((item) =>
      item.title.toLowerCase().includes(str.toLowerCase())
    );

    console.log("str");

    await setTasks(searchResults);
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
    try {
      let token = localStorage.getItem("token");
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

      let a = await axios.post("/api/getMembers", { projectId }, config);
      if (a) {
        setMembers(a.data);
        console.log(a.data);
      }
    } catch (error) {
      console.log(error);
      if (error.response.data.type === 2) {
        setShowError(true);
      }
    }
  }

  const [deleteTaskId, setDeleteTaskId] = useState("");

  // async function deleteHandler(a) {
  //   setDeleteTaskId(a);
  //   await handleDeleteClose();
  //   setDeleteOpen(true);
  // }
  const [taskLoading, setTaskLoading] = useState(true);

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
  const delOpen = Boolean(anchorEl);

  const openn = Boolean(anchorEl);
  const id = openn ? "simple-popover" : undefined;
  async function fetchTasks() {
    try {
      let token = localStorage.getItem("token");
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
        await setTasksInit(a.data);
      }
      setTaskLoading(false);
    } catch (error) {
      console.log(error);
      if (error.response.data.type === 2) {
        setShowError(true);
      }
    }
  }
  function triggerMembersAdded() {
    successMessageFunction("Success ! Invitations for joining sent !");
    setShowSuccessMessage(true);
  }
  return (
    <div className="task-card">
      <div className="task-card-top-wrapper">
        <div className="task-card-left task-card-title-text">{title}</div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          class="bi bi-three-dots-vertical"
          viewBox="0 0 16 16"
          fill="#8c9bab"
          className="task-card-right"
          onClick={(event) => handleDeleteOpen(event, _id)}
        >
          <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
        </svg>
        <Popover
          id={_id}
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
          <div className="delete-popover" onClick={deleteHandler}>
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
          showLoadingTrigger={showLoadingTrigger}
          showErrorTrigger={showErrorTrigger}
        />
      ) : (
        <></>
      )}

      <div className="task-card-tags-wrapper">
        {tags.map((tag) => (
          <div className="task-card-tag-wrapper text-color-off-white">
            {tag}
          </div>
        ))}
      </div>

      <div className="task-card-assigned-to-wrapper">
        {assignedToName ? (
          <div
            onClick={(event) => handleClick(_id, event)}
            className="task-card-assigned-to cbdc text-color-off-white"
          >
            {assignedToName[0].toUpperCase()}
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
            onClick={(event) => handleClick(_id, event)}
          >
            <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
            <path
              fill-rule="evenodd"
              d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"
            />
          </svg>
        )}

        {assignedToName ? (
          <p className="abcdd">{assignedToName}</p>
        ) : (
          <p className="abcdd">Unassigned</p>
        )}
      </div>

      <Popover
        id={_id}
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
};

export default KanbanCard;
