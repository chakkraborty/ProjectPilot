import React from "react";
import { CSSTransition } from "react-transition-group";
import "./DeleteModal.css";

import axios from "axios";
const DeleteModal = ({
  openDeleteModal,
  closeDeleteModal,
  deleteTaskId,
  fetchTasks,
  failureMessageFunction,
  showLoadingTrigger,
  showErrorTrigger,
}) => {
  async function deleteTaskHandler() {
    try {
      let token = localStorage.getItem("token");
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
      console.log(deleteTaskId);
      let a = await axios.post("/api/abc", { taskId: deleteTaskId }, config);

      if (a) {
        fetchTasks();
      }

      closeDeleteModal();
      failureMessageFunction("Task deleted !");
      //let a = await axios.post("/api/deleteTask");
      // if (a) {
      //   fetchTasks();
      // }
      // closeDeleteModal();
    } catch (error) {
      console.log(error);
      if (error.response.data.type === 2) {
        showErrorTrigger();
      }
    }
  }

  return (
    <div className="delete-modal-wrapper">
      <div className="delete-modal">
        <div>
          <div className="delete-modal-top-wrapper">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="#f15b50
"
              class="bi bi-exclamation-octagon-fill"
              viewBox="0 0 16 16"
            >
              <path d="M11.46.146A.5.5 0 0 0 11.107 0H4.893a.5.5 0 0 0-.353.146L.146 4.54A.5.5 0 0 0 0 4.893v6.214a.5.5 0 0 0 .146.353l4.394 4.394a.5.5 0 0 0 .353.146h6.214a.5.5 0 0 0 .353-.146l4.394-4.394a.5.5 0 0 0 .146-.353V4.893a.5.5 0 0 0-.146-.353zM8 4c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995A.905.905 0 0 1 8 4m.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
            </svg>

            <p className="delete-modal-title">Delete Task ?</p>
          </div>
          <p className="delete-modal-description">
            Once deleted, the contents of this task cannot be rolled back !
            Instead of deleting this task you may consider going back and
            resolving the issues.
          </p>
        </div>

        <div className="delete-modal-lower-wrapper">
          <div
            className="delete-modal-delete-button"
            onClick={() => deleteTaskHandler()}
          >
            Delete
          </div>
          <div
            className="delete-modal-cancel-button"
            onClick={closeDeleteModal}
          >
            Cancel
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
