import React, { useEffect, useState } from "react";
import "./Notifications.css";
import Navbar from "./Navbar";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import EmailIcon from "./EmailIcon";
import Box from "./box.png";
import axios from "axios";
const Notifications = () => {
  const ll = "(@arnikchakraborty2001@gmad.com)";

  const [p, setP] = useState([]);

  async function acceptInvitation(notifId) {
    try {
      console.log(notifId);

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      let a = await axios.post("/api/acceptInvitation", { notifId }, config);
      fetchNotifications();
    } catch (error) {
      console.log(error);
    }
  }

  async function fetchNotifications() {
    try {
      let userId = localStorage.getItem("_id");
      console.log(userId);
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      let a = await axios.post("/api/getNotifications", { userId }, config);
      if (a.data) {
        setP([...a.data]);
      }
      console.log(p);
    } catch (error) {
      console.log(error);
    }
  }

  function testFunc() {
    console.log(p);
    console.log(typeof p);
  }

  useEffect(() => {
    fetchNotifications();
  }, []);

  return (
    <div>
      <div className="notifications-wrapper">
        <p className="notifications-title color-off-white" onClick={testFunc}>
          Notifications
        </p>

        <div className="notifications-overflow-wrapper">
          {p.map((notif) => (
            <div className="notifications-item-wrapper">
              <div className="notifications-sender-details-wrapper">
                <div className="notifications-sender-icon">A</div>
                <p className="notifications-top-content">{notif.fromName}</p>
              </div>
              <div className="notifications-email-span">{notif.fromEmail}</div>

              <p className="notifications-invited">
                Invited you to join a project.
              </p>
              <p className="notification-proect-join">
                Join{" "}
                <span className="notification-project-name">
                  {notif.projectName}
                </span>{" "}
                ?
              </p>
              <div className="notifications-lower-wrapper">
                <div
                  className="notifications-accept-button"
                  onClick={() => acceptInvitation(notif._id)}
                >
                  Accept
                </div>
                <div className="notifications-cancel-button">Cancel</div>
              </div>
            </div>
          ))}

          {/* <div className="notifications-item-wrapper">
            <div className="notifications-sender-details-wrapper">
              <div className="notifications-sender-icon">A</div>
              <p className="notifications-top-content">Arnik</p>
            </div>
            <div className="notifications-email-span">{ll}</div>

            <p className="notifications-invited">
              Invited you to join a project.
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
            <div className="notifications-sender-details-wrapper">
              <div className="notifications-sender-icon">A</div>
              <p className="notifications-top-content">Arnik</p>
            </div>
            <div className="notifications-email-span">{ll}</div>

            <p className="notifications-invited">
              Invited you to join a project.
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
            <div className="notifications-sender-details-wrapper">
              <div className="notifications-sender-icon">A</div>
              <p className="notifications-top-content">Arnik</p>
            </div>
            <div className="notifications-email-span">{ll}</div>

            <p className="notifications-invited">
              Invited you to join a project.
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
            <div className="notifications-sender-details-wrapper">
              <div className="notifications-sender-icon">A</div>
              <p className="notifications-top-content">Arnik</p>
            </div>
            <div className="notifications-email-span">{ll}</div>

            <p className="notifications-invited">
              Invited you to join a project.
            </p>
            <p className="notification-proect-join">
              Join{" "}
              <span className="notification-project-name">Project-Euler</span> ?
            </p>
            <div className="notifications-lower-wrapper">
              <div className="notifications-accept-button">Accept</div>
              <div className="notifications-cancel-button">Cancel</div>
            </div>
          </div> */}

          <div className="notifications-lower-message-wrapper">
            {/* <img src={Box} className="notifications-box-image" /> */}
            <p className="color-off-white notifications-lower-message-text">
              No more notifications for you!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notifications;