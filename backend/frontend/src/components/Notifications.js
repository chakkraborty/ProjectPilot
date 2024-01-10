import React, { useEffect, useState } from "react";
import "./Notifications.css";
import Navbar from "./Navbar";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import EmailIcon from "./EmailIcon";
import Box from "./box.png";
import axios from "axios";
import NotificationSkeletal from "../skeletal/notificationSkeletal";
const Notifications = () => {
  const ll = "(@arnikchakraborty2001@gmad.com)";
  const [loading, setLoading] = useState(true);
  let token = localStorage.getItem("token");
  const [p, setP] = useState([]);

  async function fetchNotifications() {
    try {
      setLoading(true);

      let userId = localStorage.getItem("_id");
      console.log(userId);
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      };
      let a = await axios.post("/api/getNotifications", { userId }, config);
      if (a.data) {
        setP([]);

        setP([...a.data]);
        setLoading(false);
      }
      console.log(p);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  async function rejectInvitation(notifId) {
    try {
      console.log("holla");

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      };
      let a = await axios.post("/api/rejectInvitation", { notifId }, config);
      if (a) {
        await fetchNotifications();
        console.log("Notification fetched");
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function acceptInvitation(notifId) {
    try {
      console.log(notifId);

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      };
      let a = await axios.post("/api/acceptInvitation", { notifId }, config);
      if (a) {
        await fetchNotifications();
        console.log("notif fetched");
      }
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
        <div className="notifications-top-wrapper">
          <p className="notifications-title color-off-white" onClick={testFunc}>
            Notifications
          </p>
          <p className="notifications-decline-all">Decline all</p>
        </div>

        {loading ? (
          <NotificationSkeletal />
        ) : (
          <div className="notifications-overflow-wrapper">
            {p.map((notif) => (
              <div className="notifications-item-wrapper">
                <div className="notifications-sender-details-wrapper">
                  <div className="notifications-sender-icon">
                    {notif.fromName[0].toUpperCase()}
                  </div>
                  <p className="notifications-top-content">{notif.fromName}</p>
                </div>
                {/* <div className="notifications-email-span">
                  {notif.fromEmail}
                </div> */}

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
                  <div
                    className="notifications-cancel-button"
                    onClick={() => rejectInvitation(notif._id)}
                  >
                    Decline
                  </div>
                </div>
              </div>
            ))}

            <div className="notifications-lower-message-wrapper">
              <p className="color-off-white notifications-lower-message-text">
                No more notifications for you!
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Notifications;
