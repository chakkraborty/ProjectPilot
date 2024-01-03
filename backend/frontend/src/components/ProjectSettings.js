import React from "react";
import "./ProjectSettings.css";
import TableX from "./TableX";
import ProjectSettingsSkeletal from "../skeletal/projectSettingsSkeletal";
import CircularProgress from "@mui/material/CircularProgress";
import ProjectLeftPanel from "./ProjectLeftPanel";
import Navbar from "./Navbar.js";
import { useState, useEffect } from "react";
import MembersList from "./MembersList";
import { useParams } from "react-router-dom";
import AddPeople from "./AddPeople";
import SuccessToast from "../toast/SuccessToast.js";
import axios from "axios";
import FailureToast from "../toast/FailureToast.js";
const ProjectSettings = () => {
  const [catList, setCatList] = useState(false);
  const [category, setCategory] = useState("");
  const [changesLoader, setChangesLoader] = useState(false);

  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const [showFailureMessage, setShowFailureMessage] = useState(false);
  const [failureMessage, setFailureMessage] = useState("");

  const handleFailureMessageTimeout = () => {
    setTimeout(() => {
      setShowFailureMessage(false);
    }, 2000);
  };

  const handleSuccessMessageTimeout = () => {
    setTimeout(() => {
      setShowSuccessMessage(false);
    }, 2000);
  };

  function triggerMembersAdded() {
    successMessageFunction("Success ! Invitations for joining sent !");
    setShowSuccessMessage(true);
  }

  function successMessageFunction(incomingMessage) {
    setSuccessMessage(incomingMessage);

    setShowSuccessMessage(true);

    handleSuccessMessageTimeout();
  }

  function saveChangesHandler(message) {
    setSuccessMessage(message);
    console.log("save changes handler");

    setShowSuccessMessage(true);

    handleSuccessMessageTimeout();
  }

  function deletedMemberHandler(message) {
    setFailureMessage(message);

    setShowFailureMessage(true);

    handleFailureMessageTimeout();
  }

  function deleteMemberError() {
    deletedMemberHandler("Error! Cannot delete project admin.");
  }

  function toggleList() {
    setCatList(!catList);
  }
  function catSetter(a) {
    setCategory(a);
    toggleList();
  }

  const { projectId } = useParams();
  console.log(projectId);

  const [title, setTitle] = useState("");

  async function updateProject() {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      setChangesLoader(true);
      let a = await axios.post(
        "/api/updateProject",
        { name: title, category, projectId },
        config
      );
      if (a) {
        setChangesLoader(0);
        fetchProjectDetails();
        saveChangesHandler("Success! Changes saved.");
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function fetchProjectDetails() {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      let a = await axios.post("/api/getProjectDetails", { projectId }, config);
      setTitle(a.data.name);
      if (a.data.category) {
        setCategory(a.data.category);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchProjectDetails();
  }, []);

  return (
    <div className="project-settings-page">
      <Navbar />
      {showSuccessMessage ? <SuccessToast message={successMessage} /> : <></>}
      {showFailureMessage ? <FailureToast message={failureMessage} /> : <></>}
      <div className="project-settings-lower-wrapper">
        <ProjectLeftPanel type={4} />
        <div className="project-settings-right-panel">
          <div className="width-95-percent margin-auto">
            <p className="project-settings-top-init">
              Project / Project-Settings
            </p>
            <p className="project-settings-top-title">Project Details</p>
            <p className="project-settings-name-head">Name</p>
            <input
              type="text"
              className="project-settings-name-input-field"
              defaultValue={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <p className="project-settings-category-head">Project Category</p>
            <div
              className="project-category-wrapper"
              onClick={() => toggleList()}
            >
              <p>{category}</p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                fill="#d4d4d4"
                class="bi bi-chevron-down"
                viewBox="0 0 16 16"
              >
                <path
                  fill-rule="evenodd"
                  d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
                />
              </svg>
            </div>
            {catList ? (
              <div className="project-category-list">
                <div
                  className="project-category-list-item"
                  onClick={() => catSetter("Software")}
                >
                  Software :-)
                </div>
                <div
                  className="project-category-list-item"
                  onClick={() => catSetter("Business")}
                >
                  Business :-(
                </div>
                <div
                  className="project-category-list-item"
                  onClick={() => catSetter("Marketing")}
                >
                  Marketing :-(
                </div>
              </div>
            ) : (
              <></>
            )}

            <div
              className="project-settings-save-changes-button"
              onClick={() => updateProject()}
            >
              {changesLoader ? (
                <CircularProgress size={20} />
              ) : (
                <>Save changes</>
              )}
            </div>
            <MembersList
              deletedMemberHandler={deletedMemberHandler}
              triggerMembersAdded={triggerMembersAdded}
              deleteMemberError={deleteMemberError}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectSettings;
