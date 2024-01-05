import React from "react";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import Notifications from "./Notifications";
import { useState, useEffect } from "react";
import { useRef } from "react";
import Box from "./box.png";
import Logo from "./Logo5.png";
import NavbarSettingsDropdown from "./NavbarSettingsDropdown";
const Navbar = () => {
  const ll = "(@arnikchakraborty2001@gmad.com)";

  const [showNotification, setShowNotification] = useState(false);
  const notifRef = useRef(null);
  const settingRef = useRef(null);
  const [showSettings, setShowSettings] = useState(false);

  const toggleNotification = () => {
    console.log(showNotification);

    setShowNotification(!showNotification);
  };

  const closeNotificationOnClickOutside = (event) => {
    if (notifRef.current && !notifRef.current.contains(event.target)) {
      setShowNotification(false);
    }
  };

  const closeSettingOnClickOutside = (event) => {
    if (settingRef.current && !settingRef.current.contains(event.target)) {
      setShowSettings(false);
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
  useEffect(() => {
    if (showSettings) {
      document.addEventListener("click", closeSettingOnClickOutside);
    } else {
      document.removeEventListener("click", closeSettingOnClickOutside);
    }

    // Clean up the event listener when the component unmounts
    return () => {
      document.removeEventListener("click", closeSettingOnClickOutside);
    };
  }, [showSettings]);

  return (
    <div className="navbar-wrapper" id="navbar">
      <div className="navbar-left-wrapper">
        <img src={Logo} className="navbar-logo-image" />

        <p className="navbar-title-wrapper">Project Pilot</p>

        <div className="navbar-middle-section">
          <div className="navbar-middle-section-item">
            <p>Board</p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="10"
              height="10"
              fill="currentColor"
              class="bi bi-chevron-down"
              viewBox="0 0 16 16"
            >
              <path
                fill-rule="evenodd"
                d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708"
              />
            </svg>
          </div>
          <div className="navbar-middle-section-item">
            <p>Projects</p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="10"
              height="10"
              fill="currentColor"
              class="bi bi-chevron-down"
              viewBox="0 0 16 16"
            >
              <path
                fill-rule="evenodd"
                d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708"
              />
            </svg>
          </div>
          <div className="navbar-middle-section-item">
            <p>Teams</p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="10"
              height="10"
              fill="currentColor"
              class="bi bi-chevron-down"
              viewBox="0 0 16 16"
            >
              <path
                fill-rule="evenodd"
                d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708"
              />
            </svg>
          </div>
          <div className="navbar-middle-section-item">
            <p>More</p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="10"
              height="10"
              fill="currentColor"
              class="bi bi-chevron-down"
              viewBox="0 0 16 16"
            >
              <path
                fill-rule="evenodd"
                d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708"
              />
            </svg>
          </div>
          <div className="navbar-middle-section-create-button">
            <p>Create</p>
          </div>
        </div>
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

        <div className="navbar-settings-wrapper" ref={settingRef}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            fill="currentColor"
            class="bi bi-gear-wide"
            viewBox="0 0 16 16"
            className="notification-icon margin-right-10-px"
            onClick={() => {
              setShowSettings(!showSettings);
            }}
          >
            <path d="M8.932.727c-.243-.97-1.62-.97-1.864 0l-.071.286a.96.96 0 0 1-1.622.434l-.205-.211c-.695-.719-1.888-.03-1.613.931l.08.284a.96.96 0 0 1-1.186 1.187l-.284-.081c-.96-.275-1.65.918-.931 1.613l.211.205a.96.96 0 0 1-.434 1.622l-.286.071c-.97.243-.97 1.62 0 1.864l.286.071a.96.96 0 0 1 .434 1.622l-.211.205c-.719.695-.03 1.888.931 1.613l.284-.08a.96.96 0 0 1 1.187 1.187l-.081.283c-.275.96.918 1.65 1.613.931l.205-.211a.96.96 0 0 1 1.622.434l.071.286c.243.97 1.62.97 1.864 0l.071-.286a.96.96 0 0 1 1.622-.434l.205.211c.695.719 1.888.03 1.613-.931l-.08-.284a.96.96 0 0 1 1.187-1.187l.283.081c.96.275 1.65-.918.931-1.613l-.211-.205a.96.96 0 0 1 .434-1.622l.286-.071c.97-.243.97-1.62 0-1.864l-.286-.071a.96.96 0 0 1-.434-1.622l.211-.205c.719-.695.03-1.888-.931-1.613l-.284.08a.96.96 0 0 1-1.187-1.186l.081-.284c.275-.96-.918-1.65-1.613-.931l-.205.211a.96.96 0 0 1-1.622-.434L8.932.727zM8 12.997a4.998 4.998 0 1 1 0-9.995 4.998 4.998 0 0 1 0 9.996z" />
          </svg>
          <div>
            {showSettings && (
              <div>
                <NavbarSettingsDropdown />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
