import React from "react";
import "./t.css";
import TableX from "./TableX";
import ProjectLeftPanel from "./ProjectLeftPanel";
import Navbar from "./Navbar";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import AddPeople from "./AddPeople";
import { useState, useEffect } from "react";
import MembersSkeletal from "../skeletal/membersSkeletal";
import TimelineSkeletal from "../skeletal/timelineSkeletal";
import SuccessToast from "../toast/SuccessToast";
import SessionError from "./SessionError";
import LoaderScreen from "./LoaderScreen";
const TimeLine = () => {
  const [showError, setShowError] = useState(false);
  const navigate = useNavigate();
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  let token = localStorage.getItem("token");
  const handleSuccessMessageTimeout = () => {
    setTimeout(() => {
      setShowSuccessMessage(false);
    }, 2000);
  };
  const [showLoading, setShowLoading] = useState(false);
  function showLoadingTrigger() {
    setShowLoading(true);
    localStorage.clear();
    setTimeout(() => {
      navigate("/login");
    }, 1500);
  }
  function triggerSessionError() {
    setShowError(true);
  }
  function successMessageFunction(incomingMessage) {
    setSuccessMessage(incomingMessage);

    setShowSuccessMessage(true);

    handleSuccessMessageTimeout();
  }

  function triggerMembersAdded() {
    successMessageFunction("Success ! Invitations for joining sent !");
  }

  const [loading, setLoading] = useState(true);
  function toggleLoading() {
    setLoading(false);
    console.log("toggleLoadingCalled");
  }
  const [addMembers, setAddMembers] = useState(0);
  let { projectId } = useParams();
  console.log(projectId);
  function toggleAddMembers() {
    setAddMembers(!addMembers);
  }

  const [members, setMembers] = useState([]);
  async function fetchMembers() {
    try {
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
  useEffect(() => {
    if (!token) {
      showLoadingTrigger();
    }
    fetchMembers();
  }, []);
  return (
    <div className="t-wrapper">
      {showError ? <SessionError /> : <></>}
      {showLoading ? <LoaderScreen /> : <></>}
      <Navbar />

      <div className="t-lower-wrapper">
        <div className="t-left">
          <ProjectLeftPanel type={3} />
        </div>

        <div className="t-right-panel">
          <div className="project-right-panel-header-top">
            <div className="projects-right-panel-header-wrapper">
              <div className="projects-right-panel-name-wrapper margin-top-10px">
                {showSuccessMessage ? (
                  <SuccessToast message={successMessage} />
                ) : (
                  <></>
                )}
                <p className="projects-right-panel-header-top">
                  Project / Timeline
                </p>
                <p className="projects-right-panel-header-lower">Timeline</p>
              </div>
            </div>
            <div className="project-page-search-and-members-wrapper">
              <div className="project-page-search-wrapper">
                <input
                  type="text"
                  className="project-page-input text-dark"
                  placeholder=""
                ></input>

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="12"
                  height="12"
                  fill="currentColor"
                  class="bi bi-search"
                  viewBox="0 0 16 16"
                  className="project-page-right-panel-search-icon"
                >
                  <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                </svg>
              </div>

              {!members.length ? (
                <MembersSkeletal />
              ) : (
                <div
                  className="team-members-wrapper"
                  onClick={toggleAddMembers}
                >
                  {members.map((p) => (
                    <div className="team-members-icon">
                      {p.name[0].toUpperCase()}
                    </div>
                  ))}
                  <div className="project-page-right-panel-add-members-wrapper">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      fill="currentColor"
                      class="bi bi-person-fill-add"
                      viewBox="0 0 16 16"
                    >
                      <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm.5-5v1h1a.5.5 0 0 1 0 1h-1v1a.5.5 0 0 1-1 0v-1h-1a.5.5 0 0 1 0-1h1v-1a.5.5 0 0 1 1 0Zm-2-6a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                      <path d="M2 13c0 1 1 1 1 1h5.256A4.493 4.493 0 0 1 8 12.5a4.49 4.49 0 0 1 1.544-3.393C9.077 9.038 8.564 9 8 9c-5 0-6 3-6 4Z" />
                    </svg>
                  </div>
                </div>
              )}
            </div>
          </div>
          {addMembers ? (
            <AddPeople
              projectId={projectId}
              toggleAddMembers={toggleAddMembers}
              triggerMembersAdded={triggerMembersAdded}
            />
          ) : (
            <></>
          )}

          <TableX
            toggleLoading={toggleLoading}
            showLoadingTrigger={showLoadingTrigger}
            triggerSessionError={triggerSessionError}
          />
        </div>
      </div>
    </div>
  );
};

export default TimeLine;
