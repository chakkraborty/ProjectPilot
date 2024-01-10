import React from "react";
import "./AddPeople.css";
import { useState } from "react";
import axios from "axios";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import CircularProgress from "@mui/material/CircularProgress";
const AddPeople = ({ projectId, toggleAddMembers, triggerMembersAdded }) => {
  const [arr, setArr] = useState([]);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(0);
  let token = localStorage.getItem("token");
  async function handleEmail(event) {
    if (event.key === "Enter") {
      if (email) {
        await setArr([...arr, email]);
        event.target.value = "";
      }
    }
  }

  async function inviteHandler() {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      };
      let fromId = localStorage.getItem("_id");
      setLoading(1);

      let a = await axios.post(
        "/api/invite",
        { projectId, arr, fromId },
        config
      );
      if (a) {
        console.log(a);
        setLoading(0);
        toggleAddMembers();
        triggerMembersAdded();
      }
    } catch (error) {
      console.log(error);
      setLoading(0);
      toggleAddMembers();
    }
  }

  function deleteEmailHandler(a) {
    console.log("this is me ");
    console.log(a);

    let temp = [...arr];
    let idx = temp.findIndex((p) => p === a);
    if (idx !== -1) {
      console.log(idx);

      temp.splice(idx, 1);
      setArr(temp);
      console.log(temp);
    }
  }

  return (
    <div className="add-people-main-wrapper">
      <div className="add-people-wrapper">
        <div>
          <p className="add-members-title">Invite members</p>
          <p className="add-members-email-title">Email(s)</p>
          <div className="add-people-email-list-wrapper">
            {arr.map((p) => (
              <div className="add-members-email-items">
                <>{p}</>
                <HighlightOffIcon
                  sx={{ fontSize: 15 }}
                  onClick={() => deleteEmailHandler(p)}
                />
              </div>
            ))}
            <input
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={(event) => handleEmail(event)}
              className="add-people-text-area"
              placeholder="Add email press enter..."
            ></input>
          </div>
        </div>

        <div className="add-members-lower-wrapper">
          <div className="add-members-invite-button" onClick={inviteHandler}>
            {loading ? <CircularProgress size={15} /> : <>Invite</>}
          </div>
          <div className="add-members-cancel-button" onClick={toggleAddMembers}>
            Cancel
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddPeople;
