import React, { useState, useEffect } from "react";
import axiosClient from "../../../axios-client";
import { useStateContext } from "../../contexts/NavigationContext";
import { ChatIcon } from "../../utils/icons";
import TimeAgo from "timeago-react";

const Notifications = () => {
  const { user } = useStateContext();
  const receiverId = user.id;

  const [notifications, setNotifications] = useState([]);
  const [notificationsTableLoading, setNotificationsTableLoading] =
    useState(false);
  const handleLoading = () => setNotificationsTableLoading((pre) => !pre);

  // Fetching notifications from the backend
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axiosClient.get(`Notifications/${receiverId}`);
        setNotifications(response.data);
      } catch (error) {
        console.error("Failed to fetch notifications", error);
      }
    };
    fetchNotifications();
  }, [notificationsTableLoading]);

  console.log(notifications);
  return (
    <section>
      <div className="container bg-white rounded-card p-4 ">
        <div>
          {notifications.length > 0 ? (
            notifications.map((notification, index) => (
              <div key={index} className="bg-light p-3 my-2 rounded-card ">
                <ChatIcon />
                <span className="modal-label theme-text-color ">
                  {" "}
                  &nbsp;&nbsp;&nbsp;&nbsp;{notification.message}
                </span>
                <br />
                <small className="text-muted">
                  <TimeAgo datetime={notification.createdAt} />
                </small>
              </div>
            ))
          ) : (
            <p className="text-center theme-text-color">
              No notifications available
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default Notifications;
