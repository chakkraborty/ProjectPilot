import React from "react";
import "./MembersList.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AddPeople from "./AddPeople";
import axios from "axios";
import SuccessToast from "../toast/SuccessToast";
import SessionError from "./SessionError";
import ProjectSettingsSkeletal from "../skeletal/projectSettingsSkeletal";
import FailureToast from "../toast/FailureToast";
const MembersList = ({
  deletedMemberHandler,
  triggerMembersAdded,
  deleteMemberError,
}) => {
  let token = localStorage.getItem("token");
  const [showError, setShowError] = useState(false);

  let { projectId } = useParams();
  const [addPeopleState, setAddPeopleState] = useState(false);

  function toggleAddMembers() {
    setAddPeopleState(!addPeopleState);
  }

  const [membersLoading, setMembersLoading] = useState(true);

  const [members, setMembers] = useState([]);
  const [membersInit, setMembersInit] = useState([]);

  async function handleMemberSearch(str) {
    const searchResults = await membersInit.filter((item) =>
      item.name.toLowerCase().includes(str.toLowerCase())
    );

    await setMembers(searchResults);
  }

  async function deleteMember(emailId) {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      };
      console.log("deleting member");

      let a = await axios.post(
        "/api/deleteMember",
        { emailId, projectId },
        config
      );
      console.log(a);

      if (a) {
        deletedMemberHandler("Success! Member removed.");
        fetchMembers();
      }
    } catch (error) {
      console.log(error);
      console.log(error.response.data);
      if (error.response.data.type === 102) {
        deleteMemberError();
      }
      if (error.response.data.type === 2) {
        setShowError(true);
      }
    }
  }

  async function fetchMembers() {
    try {
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
        setMembersInit(a.data);
        setMembersLoading(false);
      }
    } catch (error) {
      console.log(error);
      if (error.response.data.type === 2) {
        setShowError(true);
      }
    }
  }

  useEffect(() => {
    fetchMembers();
  }, []);

  return (
    <div className="members-list">
      {showError ? <SessionError /> : <></>}
      <p className="members-list-title">Members</p>
      <div className="members-list-component-wrapper">
        <div className="members-list-top-section-wrapper">
          <div className="members-list-search-wrapper">
            <div className="members-list-search-div">
              <input
                placeholder="Search Name,Emails,etc."
                className="members-list-search-input-area"
                onChange={(e) => handleMemberSearch(e.target.value)}
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-search"
                viewBox="0 0 16 16"
              >
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
              </svg>
            </div>
          </div>

          <div
            className="members-list-invite-button"
            onClick={() => setAddPeopleState(1)}
          >
            Invite
          </div>
        </div>

        <div className="members-list-table-top">
          <div className="members-list-table-col-1 members-list-table-title">
            Name
          </div>
          <div className="members-list-table-col-2 members-list-table-title">
            Email
          </div>
          <div className="members-list-table-col-3 members-list-table-title">
            Action
          </div>
        </div>
        {membersLoading ? (
          <ProjectSettingsSkeletal />
        ) : (
          <div className="members-list-table-items-wrapper">
            {members.map((p) => (
              <div className="members-list-table-item">
                <div className="members-list-table-col-1 members-list-name-wrapper">
                  <div className="members-list-table-icon">
                    {p.name[0].toUpperCase()}
                  </div>
                  <p>{p.name}</p>
                </div>
                <div className="members-list-table-col-2">{p.email}</div>
                <div
                  className="members-list-table-col-3 members-list-item-remove-col"
                  onClick={() => deleteMember(p.email)}
                >
                  <p>Remove</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {addPeopleState ? (
          <AddPeople
            projectId={projectId}
            toggleAddMembers={toggleAddMembers}
            triggerMembersAdded={triggerMembersAdded}
          />
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default MembersList;
