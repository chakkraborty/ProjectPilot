import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import CreateProject from "./CreateProject";
import { useState, useEffect } from "react";
import axios from "axios";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import { deepOrange, deepPurple } from "@mui/material/colors";
import "./ProjectList.css";
const PorjectList = () => {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);
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
          "Content-Type": "application/json",
        },
      };
      let userId = await localStorage.getItem("_id");
      console.log(userId);

      let a = await axios.post("/api/getProjects", { userId }, config);
      if (a.data) {
        // console.log(a.data);
        setData([...a.data]);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchProjects();
    console.log(data);
  }, []);

  return (
    <div className="project-list-container">
      <div className="project-list-title">Your Projects</div>
      <div className="project-list-top-wrapper">
        <div className="project-list-search-wrapper">
          <input type="text" className="project-list-input"></input>

          <SearchIcon className="search-icon" sx={{ fontSize: 20 }} />
        </div>
        <div className="add-project-button" onClick={onOpen}>
          Add project
        </div>
      </div>

      <CreateProject
        isOpen={open}
        onClose={onClose}
        fetchProjects={fetchProjects}
      />
      {/* table section */}

      <div className="project-list-table">
        <div className="col1 text-color-1">Name</div>
        <div className="col2 text-color-1">Type</div>
        <div className="col3 text-color-1">Lead</div>
        <div className="col4 text-color-1">Due</div>
      </div>
      {data.map((p) => (
        <div className="project-list-content">
          <div className="col1 project-name-list text-color-blue">{p.name}</div>
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
  );
};

export default PorjectList;
