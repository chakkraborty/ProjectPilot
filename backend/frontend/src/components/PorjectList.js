import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import CreateProject from "./CreateProject";
import { useState, useEffect } from "react";
import ProjectListSkeletal from "../skeletal/projectSettingsSkeletal.js";
import SessionError from "./SessionError";
import axios from "axios";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import { deepOrange, deepPurple } from "@mui/material/colors";
import Box from "./box.png";
import { useNavigate } from "react-router-dom";
import "./ProjectList.css";
import SuccessToast from "../toast/SuccessToast.js";
import NavbarSettingsDropdown from "./NavbarSettingsDropdown";
import Pagination from "./Pagination";
const PorjectList = ({ triggerProjectCreated }) => {
  let token = localStorage.getItem("token");

  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  function projectRouting(projId) {
    navigate(`/project/${projId}`);
  }
  const onClose = () => {
    setOpen(false);
  };
  const onOpen = () => {
    setOpen(true);
  };

  async function fetchProjects() {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      };
      let userId = await localStorage.getItem("_id");
      console.log(userId);

      let a = await axios.post(
        "/api/getProjects",
        { userId, token: localStorage.getItem("token") },
        config
      );
      console.log("this occured");

      if (a.data) {
        // console.log(a.data);
        setData([...a.data]);
        setLoading(false);
      }
      if (a) {
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      console.log(error.response.data.message);

      setLoading(false);
    }
  }

  async function searchProject(a) {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const userId = localStorage.getItem("_id");
      let b = await axios.post(
        "/api/searchProjects",
        { substr: a, userId },
        config
      );
      if (a) {
        setData([...b.data]);
        console.log(b.data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    console.log("in use effect !");
    console.log(searchQuery);

    // fetchProjects();
    if (searchQuery) {
      searchProject(searchQuery);
    } else {
      fetchProjects();
    }
  }, [searchQuery]);

  return (
    <div className="project-list-container">
      <div className="project-list-title">Projects</div>
      <div className="project-list-top-wrapper">
        <div className="project-list-search-wrapper">
          <input
            type="text"
            className="project-list-input"
            onChange={(e) => {
              setSearchQuery(e.target.value);
            }}
          ></input>

          <SearchIcon className="search-icon" sx={{ fontSize: 20 }} />
        </div>
        <div className="add-project-button" onClick={onOpen}>
          Create Project
        </div>
      </div>

      <CreateProject
        isOpen={open}
        onClose={onClose}
        fetchProjects={fetchProjects}
        triggerProjectCreated={triggerProjectCreated}
      />
      {/* table section */}

      <div className="project-list-table">
        <div className="col1 text-color-1">Name</div>
        <div className="col2 text-color-1">Type</div>
        <div className="col3 text-color-1">Lead</div>
        <div className="col4 text-color-1">Due</div>
      </div>

      {loading ? (
        <ProjectListSkeletal />
      ) : (
        <div className="project-list-content-wrapper">
          {data.map((p) => (
            <div className="project-list-content">
              <div
                className="col1 project-name-list text-color-blue"
                onClick={() => projectRouting(p._id)}
              >
                {p.name}
              </div>
              <div className="col2">Team Managed</div>
              <div className="flex-jus-align col3 ">
                {/* <Avatar sx={{ bgcolor: deepOrange[500] }}>
              {p.leadName[0].toUpperCase()}
            </Avatar> */}
                <div className="circle">{p.leadName[0].toUpperCase()}</div>
                <div className="project-list-lead-name">{p.leadName}</div>
              </div>
              <div className="col4">--</div>
            </div>
          ))}
        </div>
      )}

      <Pagination />
    </div>
  );
};

export default PorjectList;
