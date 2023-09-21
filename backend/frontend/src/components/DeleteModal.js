import React from "react";
import { CSSTransition } from "react-transition-group";
import "./DeleteModal.css";

import axios from "axios";
const DeleteModal = ({
  openDeleteModal,
  closeDeleteModal,
  deleteTaskId,
  fetchTasks,
}) => {
  async function deleteTaskHandler() {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    console.log(deleteTaskId);
    let a = await axios.post("/api/abc", { taskId: deleteTaskId }, config);

    if (a) {
      fetchTasks();
    }
    closeDeleteModal();
    //let a = await axios.post("/api/deleteTask");
    // if (a) {
    //   fetchTasks();
    // }
    // closeDeleteModal();
  }

  return (
    <div className="delete-modal-wrapper">
      <div className="delete-modal">
        <div>
          <div className="delete-modal-top-wrapper">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="25"
              fill="rgb(175, 31, 31)"
              class="bi bi-exclamation-triangle"
              viewBox="0 0 16 16"
            >
              <path d="M7.938 2.016A.13.13 0 0 1 8.002 2a.13.13 0 0 1 .063.016.146.146 0 0 1 .054.057l6.857 11.667c.036.06.035.124.002.183a.163.163 0 0 1-.054.06.116.116 0 0 1-.066.017H1.146a.115.115 0 0 1-.066-.017.163.163 0 0 1-.054-.06.176.176 0 0 1 .002-.183L7.884 2.073a.147.147 0 0 1 .054-.057zm1.044-.45a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566z" />
              <path d="M7.002 12a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 5.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995z" />
            </svg>

            <p className="delete-modal-title">Delete Task 1 ?</p>
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
