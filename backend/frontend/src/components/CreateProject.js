import React from "react";
import { useState } from "react";
import axios from "axios";
import "./CreateProject.css";

import CircularProgress from "@mui/material/CircularProgress";
const CreateProject = ({
  isOpen,
  onClose,
  fetchProjects,
  triggerProjectCreated,
}) => {
  let token = localStorage.getItem("token");

  if (!token) {
  }

  let createdBy = localStorage.getItem("_id");
  let leadName = localStorage.getItem("name");

  const [name, setName] = useState("");
  const [loading, setLoading] = useState(0);

  async function createProject() {
    setLoading(1);
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      };
      let a = await axios.post(
        "/api/createProject",
        { createdBy, leadName, name },
        config
      );
      if (a) {
        console.log("the request has been successfully made");
        setLoading(0);
        onClose();
        fetchProjects();
        triggerProjectCreated();
      } else {
        setLoading(0);
      }
    } catch (error) {
      setLoading(0);
    }
  }

  if (!isOpen) return null;
  return (
    <div className="modal-overlay">
      <div className="modal">
        <p className="create-project-title">Create project</p>
        <p className="create-project-upper-title">
          Explore what's possible when you collaborate with your team. Edit
          project details anytime in project settings.
        </p>
        <p className="create-project-name">
          Name <span className="create-project-name-star">*</span>
        </p>
        <input
          type="text"
          placeholder="eg. project target, end product, etc."
          className="create-project-input-field"
          onChange={(e) => setName(e.target.value)}
        />

        <p className="create-project-lower-text">
          <span className="bold-text">Access</span> : Anyone with access to this
          project can access and administer this project. Upgrade your plan to
          customize project permissions
        </p>
        <div className="create-project-bottom-wrapper">
          <div className="create-project-create-button" onClick={createProject}>
            {loading ? <CircularProgress size={20} /> : <p>Create</p>}
          </div>
          <div className="create-project-cancel-button" onClick={onClose}>
            Cancel
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateProject;
