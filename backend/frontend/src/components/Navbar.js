import React from "react";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import Notifications from "./Notifications";
import { useState, useEffect } from "react";
import { useRef } from "react";
import Box from "./box.png";
const Navbar = () => {
  const ll = "(@arnikchakraborty2001@gmad.com)";

  const [showNotification, setShowNotification] = useState(false);
  const notifRef = useRef(null);

  const toggleNotification = () => {
    console.log(showNotification);

    setShowNotification(!showNotification);
  };

  const closeNotificationOnClickOutside = (event) => {
    if (notifRef.current && !notifRef.current.contains(event.target)) {
      setShowNotification(false);
    }
  };

  // Attach click event listener when the notification is shown
  useEffect(() => {
    if (showNotification) {
      document.addEventListener("click", closeNotificationOnClickOutside);
    } else {
      document.removeEventListener("click", closeNotificationOnClickOutside);
    }

    // Clean up the event listener when the component unmounts
    return () => {
      document.removeEventListener("click", closeNotificationOnClickOutside);
    };
  }, [showNotification]);

  return (
    <div className="navbar-wrapper" id="navbar">
      <div className="navbar-left-wrapper">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="25"
          height="25"
          fill="#F5F8FA"
          class="bi bi-opencollective"
          viewBox="0 0 16 16"
          className="margin-left-10px"
        >
          <path
            fill-opacity=".4"
            d="M12.995 8.195c0 .937-.312 1.912-.78 2.693l1.99 1.99c.976-1.327 1.6-2.966 1.6-4.683 0-1.795-.624-3.434-1.561-4.76l-2.068 2.028c.468.781.78 1.679.78 2.732h.04Z"
          />
          <path d="M8 13.151a4.995 4.995 0 1 1 0-9.99c1.015 0 1.951.273 2.732.82l1.95-2.03a7.805 7.805 0 1 0 .04 12.449l-1.951-2.03a5.072 5.072 0 0 1-2.732.781H8Z" />
        </svg>
        <p className="navbar-title-wrapper">Collaborator</p>
        <div className="projects-button">
          <p className="text-color-1">Projects</p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="#aab8c2"
            class="bi bi-caret-down-fill"
            viewBox="0 0 16 16"
            className="navbar-projects-down-icon"
          >
            <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
          </svg>
        </div>
        <div className="create-project-button">Create</div>
      </div>
      <div className="display-flex">
        <div className="navbar-notification-wrapper" ref={notifRef}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            fill="currentColor"
            class="bi bi-bell-fill"
            viewBox="0 0 16 16"
            className="notification-icon"
            onClick={() => {
              toggleNotification();
            }}
          >
            <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zm.995-14.901a1 1 0 1 0-1.99 0A5.002 5.002 0 0 0 3 6c0 1.098-.5 6-2 7h14c-1.5-1-2-5.902-2-7 0-2.42-1.72-4.44-4.005-4.901z" />
          </svg>
          <div className="navbar-notifications">
            {showNotification && (
              <div>
                <Notifications />
              </div>
            )}
          </div>
        </div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          fill="currentColor"
          class="bi bi-gear-wide"
          viewBox="0 0 16 16"
          className="notification-icon margin-right-10-px"
        >
          <path d="M8.932.727c-.243-.97-1.62-.97-1.864 0l-.071.286a.96.96 0 0 1-1.622.434l-.205-.211c-.695-.719-1.888-.03-1.613.931l.08.284a.96.96 0 0 1-1.186 1.187l-.284-.081c-.96-.275-1.65.918-.931 1.613l.211.205a.96.96 0 0 1-.434 1.622l-.286.071c-.97.243-.97 1.62 0 1.864l.286.071a.96.96 0 0 1 .434 1.622l-.211.205c-.719.695-.03 1.888.931 1.613l.284-.08a.96.96 0 0 1 1.187 1.187l-.081.283c-.275.96.918 1.65 1.613.931l.205-.211a.96.96 0 0 1 1.622.434l.071.286c.243.97 1.62.97 1.864 0l.071-.286a.96.96 0 0 1 1.622-.434l.205.211c.695.719 1.888.03 1.613-.931l-.08-.284a.96.96 0 0 1 1.187-1.187l.283.081c.96.275 1.65-.918.931-1.613l-.211-.205a.96.96 0 0 1 .434-1.622l.286-.071c.97-.243.97-1.62 0-1.864l-.286-.071a.96.96 0 0 1-.434-1.622l.211-.205c.719-.695.03-1.888-.931-1.613l-.284.08a.96.96 0 0 1-1.187-1.186l.081-.284c.275-.96-.918-1.65-1.613-.931l-.205.211a.96.96 0 0 1-1.622-.434L8.932.727zM8 12.997a4.998 4.998 0 1 1 0-9.995 4.998 4.998 0 0 1 0 9.996z" />
        </svg>
      </div>
    </div>
  );
};

export default Navbar;
