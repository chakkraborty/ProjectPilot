import React from "react";
import "./ProjectSettings.css";
import ProjectLeftPanel from "./ProjectLeftPanel";
import Navbar from "./Navbar.js";
import { useState } from "react";
const ProjectSettings = () => {
  const [catList, setCatList] = useState(false);
  const [category, setCategory] = useState("Software");
  function toggleList() {
    setCatList(!catList);
  }
  function catSetter(a) {
    setCategory(a);
    toggleList();
  }

  return (
    <div className="project-settings-page">
      <Navbar />
      <div className="project-settings-lower-wrapper">
        <ProjectLeftPanel />
        <div className="project-settings-right-panel">
          <p className="project-settings-top-init">
            Project / Project-Settings
          </p>
          <p className="project-settings-top-title">Project Details</p>
          <p className="project-settings-name-head">Name</p>
          <input type="text" className="project-settings-name-input-field" />
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

          <div className="project-settings-save-changes-button">
            Save changes
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectSettings;
