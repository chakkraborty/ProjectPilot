import React from "react";
import "./Notifications.css";
import Navbar from "./Navbar";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import EmailIcon from "./EmailIcon";
const Notifications = () => {
  return (
    <div>
      <Navbar />

      <div className="notifications-wrapper">
        <p className="notifications-title">Notifications</p>
        <div className="notifications-item-wrapper">
          <p className="notifications-top-content">
            Arnik
            <span className="notifications-email-span">
              (
              <EmailIcon />
              @arnikchakraborty2001@gmail.com )
            </span>
            invited you to join a project.
          </p>
          <p className="notification-proect-join">
            Join{" "}
            <span className="notification-project-name">Project-Euler</span> ?
          </p>
          <div className="notifications-lower-wrapper">
            <div className="notifications-accept-button">Accept</div>
            <div className="notifications-cancel-button">Cancel</div>
          </div>
        </div>
        <div className="notifications-item-wrapper">
          <p className="notifications-top-content">
            Arnik
            <span className="notifications-email-span">
              (
              <EmailIcon />
              @arnikchakraborty2001@gmail.com )
            </span>
            invited you to join a project.
          </p>
          <p className="notification-proect-join">
            Join{" "}
            <span className="notification-project-name">Project-Euler</span> ?
          </p>
          <div className="notifications-lower-wrapper">
            <div className="notifications-accept-button">Accept</div>
            <div className="notifications-cancel-button">Cancel</div>
          </div>
        </div>
        <div className="notifications-item-wrapper">
          <p className="notifications-top-content">
            Arnik
            <span className="notifications-email-span">
              (
              <EmailIcon />
              @arnikchakraborty2001@gmail.com )
            </span>
            invited you to join a project.
          </p>
          <p className="notification-proect-join">
            Join{" "}
            <span className="notification-project-name">Project-Euler</span> ?
          </p>
          <div className="notifications-lower-wrapper">
            <div className="notifications-accept-button">Accept</div>
            <div className="notifications-cancel-button">Cancel</div>
          </div>
        </div>
        <div className="notifications-item-wrapper">
          <p className="notifications-top-content">
            Arnik
            <span className="notifications-email-span">
              (
              <EmailIcon />
              @arnikchakraborty2001@gmail.com )
            </span>
            invited you to join a project.
          </p>
          <p className="notification-proect-join">
            Join{" "}
            <span className="notification-project-name">Project-Euler</span> ?
          </p>
          <div className="notifications-lower-wrapper">
            <div className="notifications-accept-button">Accept</div>
            <div className="notifications-cancel-button">Cancel</div>
          </div>
        </div>
        <div className="notifications-item-wrapper">
          <p className="notifications-top-content">
            Arnik
            <span className="notifications-email-span">
              (
              <EmailIcon />
              @arnikchakraborty2001@gmail.com )
            </span>
            invited you to join a project.
          </p>
          <p className="notification-proect-join">
            Join{" "}
            <span className="notification-project-name">Project-Euler</span> ?
          </p>
          <div className="notifications-lower-wrapper">
            <div className="notifications-accept-button">Accept</div>
            <div className="notifications-cancel-button">Cancel</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notifications;
