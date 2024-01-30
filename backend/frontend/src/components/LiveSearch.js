import React, { useState, useEffect } from "react";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import "./LiveSearch.css";
function LiveSearch({
  taskId,
  onClose,
  fetchTasks,
  changeName,
  tempName,
  handleEnteringPopover,
}) {
  const [currName, setCurrName] = useState("");
  // setCurrName(tempName);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  let token = localStorage.getItem("token");
  function display() {
    // console.log(a + "  |  " + b);
    console.log("temp");
  }

  async function handleAssign(name, email, taskId) {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };
    let a = await axios.post("/api/assignToTask", { email, taskId }, config);
    console.log(a);

    fetchTasks();
    onClose();
    console.log("this");
  }

  async function temp(searchQuery) {
    setCurrName(tempName);
    if (searchQuery) {
      setLoading(true);
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      await axios
        .post("/api/getUsers", { email: searchQuery }, config)
        .then((response) => {
          setSearchResults(response.data);
          console.log(response.data);

          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
          setLoading(false);
        });
    } else {
      setSearchResults([]);
    }
  }

  useEffect(() => {
    setCurrName(tempName);
    if (searchQuery) {
      setLoading(true);
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      axios
        .post("/api/getUsers", { email: searchQuery }, config)
        .then((response) => {
          setSearchResults(response.data);
          console.log(response.data);

          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
          setLoading(false);
        });
      // await temp();
      handleEnteringPopover();
    } else {
      setSearchResults([]);
    }
  }, [searchQuery, handleEnteringPopover]);

  const handleInputChange = (e) => {
    setCurrName("");
    setSearchQuery(e.target.value);
  };

  return (
    <div className="live-search-dummy-wrapper">
      <div className="live-search-kanban-wrapper">
        <div className="kanban-live-search-input-wrapper">
          {currName ? (
            <div className="kanban-live-search-input-icon">
              {currName[0].toUpperCase()}
            </div>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              fill="#8c9bab
"
              class="bi bi-person-circle"
              viewBox="0 0 16 16"
              className="live-search-person-unassigned-icon"
            >
              <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
              <path
                fill-rule="evenodd"
                d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"
              />
            </svg>
          )}

          <input
            type="text"
            placeholder="Search users by name"
            // value={searchQuery}
            className="kanban-live-search-input"
            onChange={handleInputChange}
            defaultValue={tempName ? tempName : "Unassigned"}
          />
        </div>

        {/* {loading && <CircularProgress />} */}
        <ul
          className={
            searchResults.length > 2
              ? "live-search-list-wrapper"
              : "live-search-list-wrapper-fit-content"
          }
        >
          {searchResults.map((user) => (
            <div
              className="flex justify-content-center align-items-center live-search-items-wrapper width-100"
              onClick={() => {
                handleAssign(user.name, user.email, taskId);
                changeName(user.name);
              }}
            >
              <div className="live-search-items-wrapper-icon">
                {user.name[0].toUpperCase()}
              </div>

              <div className=" live-search-list-item">
                <p className="live-search-list-item-name" key={user.id}>
                  {user.name}
                </p>
                <p className=" email-list-item">{user.email}</p>
              </div>
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default LiveSearch;
