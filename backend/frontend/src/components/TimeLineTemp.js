<div className="calender-timeline-main-wrapper">
  <Navbar />
  <div className="display-flex calender-timeline-lower-wrapper">
    <ProjectLeftPanel />
    <div className="calender-timeline-timeline-right-panel-wrapper">
      <div className="project-right-panel-header-top">
        <div className="projects-right-panel-header-wrapper">
          <div className="projects-right-panel-name-wrapper margin-top-10px">
            <p>Project-Euler / Timeline</p>
          </div>
        </div>
        <div className="project-page-search-and-members-wrapper">
          <div className="project-page-search-wrapper">
            <input
              type="text"
              className="project-page-input text-dark"
              placeholder="Search..."
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

          <div className="team-members-wrapper" onClick={toggleAddMembers}>
            {members.map((p) => (
              <div className="team-members-icon">{p.name[0].toUpperCase()}</div>
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
        </div>
      </div>
      {addMembers ? (
        <AddPeople projectId={projectId} toggleAddMembers={toggleAddMembers} />
      ) : (
        <></>
      )}
      <div className="test-div-timeline">
        <TableX />
      </div>
    </div>
  </div>
</div>;
