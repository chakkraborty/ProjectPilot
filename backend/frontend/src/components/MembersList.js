import React from "react";
import "./MembersList.css";

const MembersList = () => {
  return (
    <div className="members-list">
      <p className="members-list-title">Members</p>
      <div className="members-list-component-wrapper">
        <div className="members-list-top-section-wrapper">
          <div className="members-list-search-wrapper">
            <div className="members-list-search-div">
              <input
                placeholder="Search Name,Emails,etc."
                className="members-list-search-input-area"
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

          <div className="members-list-invite-button">Invite</div>
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
        <div className="members-list-table-items-wrapper">
          <div className="members-list-table-item">
            <div className="members-list-table-col-1 members-list-name-wrapper">
              <div className="members-list-table-icon">A</div>
              <p>Arnik</p>
            </div>
            <div className="members-list-table-col-2">
              arnikchakraborty@gmail.com
            </div>
            <div className="members-list-table-col-3 members-list-item-remove-col">
              <p>Remove</p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-person-x"
                viewBox="0 0 16 16"
              >
                <path d="M11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM8 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm.256 7a4.474 4.474 0 0 1-.229-1.004H3c.001-.246.154-.986.832-1.664C4.484 10.68 5.711 10 8 10c.26 0 .507.009.74.025.226-.341.496-.65.804-.918C9.077 9.038 8.564 9 8 9c-5 0-6 3-6 4s1 1 1 1h5.256Z" />
                <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm-.646-4.854.646.647.646-.647a.5.5 0 0 1 .708.708l-.647.646.647.646a.5.5 0 0 1-.708.708l-.646-.647-.646.647a.5.5 0 0 1-.708-.708l.647-.646-.647-.646a.5.5 0 0 1 .708-.708Z" />
              </svg>
            </div>
          </div>
          <div className="members-list-table-item">
            <div className="members-list-table-col-1 members-list-name-wrapper">
              <div className="members-list-table-icon">A</div>
              <p>Arnik</p>
            </div>
            <div className="members-list-table-col-2">
              arnikchakraborty@gmail.com
            </div>
            <div className="members-list-table-col-3 members-list-item-remove-col">
              <p>Remove</p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-person-x"
                viewBox="0 0 16 16"
              >
                <path d="M11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM8 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm.256 7a4.474 4.474 0 0 1-.229-1.004H3c.001-.246.154-.986.832-1.664C4.484 10.68 5.711 10 8 10c.26 0 .507.009.74.025.226-.341.496-.65.804-.918C9.077 9.038 8.564 9 8 9c-5 0-6 3-6 4s1 1 1 1h5.256Z" />
                <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm-.646-4.854.646.647.646-.647a.5.5 0 0 1 .708.708l-.647.646.647.646a.5.5 0 0 1-.708.708l-.646-.647-.646.647a.5.5 0 0 1-.708-.708l.647-.646-.647-.646a.5.5 0 0 1 .708-.708Z" />
              </svg>
            </div>
          </div>
          <div className="members-list-table-item">
            <div className="members-list-table-col-1 members-list-name-wrapper">
              <div className="members-list-table-icon">A</div>
              <p>Arnik</p>
            </div>
            <div className="members-list-table-col-2">
              arnikchakraborty@gmail.com
            </div>
            <div className="members-list-table-col-3 members-list-item-remove-col">
              <p>Remove</p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-person-x"
                viewBox="0 0 16 16"
              >
                <path d="M11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM8 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm.256 7a4.474 4.474 0 0 1-.229-1.004H3c.001-.246.154-.986.832-1.664C4.484 10.68 5.711 10 8 10c.26 0 .507.009.74.025.226-.341.496-.65.804-.918C9.077 9.038 8.564 9 8 9c-5 0-6 3-6 4s1 1 1 1h5.256Z" />
                <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm-.646-4.854.646.647.646-.647a.5.5 0 0 1 .708.708l-.647.646.647.646a.5.5 0 0 1-.708.708l-.646-.647-.646.647a.5.5 0 0 1-.708-.708l.647-.646-.647-.646a.5.5 0 0 1 .708-.708Z" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MembersList;
