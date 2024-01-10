import React, { useState, useEffect } from "react";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";

function LiveSearch({ taskId, onClose, fetchTasks }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  let token = localStorage.getItem("token");
  function display() {
    // console.log(a + "  |  " + b);
    console.log("temp");
  }

  async function handleAssign(email, taskId) {
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

  useEffect(() => {
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
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search users by name"
        value={searchQuery}
        className="text-color-dark-grey live-search-input"
        onChange={handleInputChange}
      />
      {/* {loading && <CircularProgress />} */}
      <ul className="text-color-dark-grey live-search-list-wrapper">
        {searchResults.map((user) => (
          <div
            className="flex justify-content-center align-items-center live-search-items-wrapper width-100"
            onClick={() => handleAssign(user.email, taskId)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="rgb(12,12,12)"
              class="bi bi-person-circle"
              viewBox="0 0 16 16"
            >
              <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
              <path
                fill-rule="evenodd"
                d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"
              />
            </svg>

            <div className=" live-search-list-item">
              <li className="text-color-dark-grey" key={user.id}>
                {user.name}
              </li>
              <li className="text-color-dark-grey email-list-item">
                {user.email}
              </li>
            </div>
          </div>
        ))}
      </ul>
    </div>
  );
}

export default LiveSearch;
