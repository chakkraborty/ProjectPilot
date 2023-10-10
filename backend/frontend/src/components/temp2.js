<div className="project-page-wrapper">
  <Navbar />

  <div className="display-flex project-page-container">
    <ProjectLeftPanel />

    <div className="text-color-grey right-panel-wrapper">
      <div className="project-right-panel-header-top">
        <div className="projects-right-panel-header-wrapper">
          <div className="projects-right-panel-name-wrapper">
            {/* <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="30"
                    height="30"
                    fill="orange"
                    class="bi bi-dropbox"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8.01 4.555 4.005 7.11 8.01 9.665 4.005 12.22 0 9.651l4.005-2.555L0 4.555 4.005 2 8.01 4.555Zm-4.026 8.487 4.006-2.555 4.005 2.555-4.005 2.555-4.006-2.555Zm4.026-3.39 4.005-2.556L8.01 4.555 11.995 2 16 4.555 11.995 7.11 16 9.665l-4.005 2.555L8.01 9.651Z" />
                  </svg> */}
            <p>Project-Euler / Kanban</p>
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

      {!open ? (
        <></>
      ) : (
        <CreateTask onClose={onClose} onOpen={onOpen} fetchTasks={fetchTasks} />
      )}

      {addMembers ? (
        <AddPeople projectId={projectId} toggleAddMembers={toggleAddMembers} />
      ) : (
        <></>
      )}
      <div className="project-page-lower-wrapper">
        <div className="text-color-grey kanban-board-wrapper">
          <div className="kanban-board-title">
            <p className="">TO DO</p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              fill="currentColor"
              class="bi bi-plus"
              viewBox="0 0 16 16"
              className="kanban-board-header-add-icon"
              onClick={onOpen}
            >
              <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
            </svg>
          </div>
          <div className="kanban-board-overflow-wrapper">
            {tasks.map((p) => {
              if (p.status === "todo") {
                return (
                  <div className="task-card" key={p._id}>
                    <div className="task-card-top-wrapper">
                      <div className="task-card-left text-color-off-white">
                        {p.title}
                      </div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        class="bi bi-three-dots-vertical"
                        viewBox="0 0 16 16"
                        fill="white"
                        className="task-card-right"
                        onClick={(event) => handleDeleteOpen(event, p._id)}
                      >
                        <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
                      </svg>
                      <Popover
                        id={id}
                        open={deleteOpener}
                        anchorEl={anchorDeleteModal}
                        onClose={handleDeleteClose}
                        anchorOrigin={{
                          vertical: "bottom",
                          horizontal: "left",
                        }}
                        className="delete-popover-wrapper"
                        PaperProps={{ style: popoverStyle }}
                        onClick={deleteHandler}
                      >
                        <div className="delete-popover" onClick={deleteHandler}>
                          Delete
                        </div>
                      </Popover>
                    </div>

                    {deleteOpen ? (
                      <DeleteModal
                        openDeleteModal={openDeleteModal}
                        closeDeleteModal={closeDeleteModal}
                        deleteTaskId={deleteTaskId}
                        fetchTasks={fetchTasks}
                      />
                    ) : (
                      <></>
                    )}

                    <div className="task-card-tags-wrapper">
                      {p.tags.map((tag) => (
                        <div className="task-card-tag-wrapper text-color-off-white">
                          {tag}
                        </div>
                      ))}
                    </div>

                    <div className="task-card-assigned-to-wrapper">
                      {p.assignedToName ? (
                        <div
                          onClick={(event) => handleClick(p._id, event)}
                          className="task-card-assigned-to cbdc text-color-off-white"
                        >
                          {p.assignedToName[0].toUpperCase()}
                        </div>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="23"
                          height="23"
                          fill="rgb(57, 57, 57)"
                          className="bi bi-person-circle margin-top-10px card-icon-project-page cbdc"
                          viewBox="0 0 16 16"
                          aria-describedby={id}
                          variant="contained"
                          onClick={(event) => handleClick(p._id, event)}
                        >
                          <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                          <path
                            fill-rule="evenodd"
                            d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"
                          />
                        </svg>
                      )}

                      {p.assignedToName ? (
                        <p className="abcdd">{p.assignedToName}</p>
                      ) : (
                        <p className="abcdd">Unassigned</p>
                      )}
                    </div>
                    {/* <Button>Open Popover</Button> */}
                    <Popover
                      id={id}
                      open={openn}
                      anchorEl={anchorEl}
                      onClose={handleClose}
                      anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "left",
                      }}
                      className="padding-10-px"
                    >
                      <LiveSearch
                        className="live-search-main-wrapper"
                        taskId={taskId}
                        onClose={handleClose}
                        fetchTasks={fetchTasks}
                      />
                    </Popover>
                  </div>
                );
              } else {
                return null;
              }
            })}
          </div>
        </div>
        <div className="text-color-grey kanban-board-wrapper">
          <div className="kanban-board-title">
            <p className="">IN PROGRESS</p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              fill="currentColor"
              class="bi bi-plus"
              viewBox="0 0 16 16"
              className="kanban-board-header-add-icon"
              onClick={onOpen}
            >
              <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
            </svg>
          </div>
          <div className="kanban-board-overflow-wrapper">
            {tasks.map((p) => {
              if (p.status === "inprogress") {
                return (
                  <div className="task-card" key={p._id}>
                    <div className="task-card-top-wrapper">
                      <div className="task-card-left text-color-off-white">
                        {p.title}
                      </div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        class="bi bi-three-dots-vertical"
                        viewBox="0 0 16 16"
                        fill="white"
                        className="task-card-right"
                        onClick={(event) => handleDeleteOpen(event, p._id)}
                      >
                        <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
                      </svg>
                      <Popover
                        id={id}
                        open={deleteOpener}
                        anchorEl={anchorDeleteModal}
                        onClose={handleDeleteClose}
                        anchorOrigin={{
                          vertical: "bottom",
                          horizontal: "left",
                        }}
                        className="delete-popover-wrapper"
                        PaperProps={{ style: popoverStyle }}
                        onClick={deleteHandler}
                      >
                        <div className="delete-popover" onClick={deleteHandler}>
                          Delete
                        </div>
                      </Popover>
                    </div>

                    {deleteOpen ? (
                      <DeleteModal
                        openDeleteModal={openDeleteModal}
                        closeDeleteModal={closeDeleteModal}
                        deleteTaskId={deleteTaskId}
                        fetchTasks={fetchTasks}
                      />
                    ) : (
                      <></>
                    )}

                    <div className="task-card-tags-wrapper">
                      {p.tags.map((tag) => (
                        <div className="task-card-tag-wrapper text-color-off-white">
                          {tag}
                        </div>
                      ))}
                    </div>

                    <div className="task-card-assigned-to-wrapper">
                      {p.assignedToName ? (
                        <div
                          onClick={(event) => handleClick(p._id, event)}
                          className="task-card-assigned-to cbdc text-color-off-white"
                        >
                          {p.assignedToName[0].toUpperCase()}
                        </div>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="23"
                          height="23"
                          fill="rgb(57, 57, 57)"
                          className="bi bi-person-circle margin-top-10px card-icon-project-page cbdc"
                          viewBox="0 0 16 16"
                          aria-describedby={id}
                          variant="contained"
                          onClick={(event) => handleClick(p._id, event)}
                        >
                          <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                          <path
                            fill-rule="evenodd"
                            d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"
                          />
                        </svg>
                      )}

                      {p.assignedToName ? (
                        <p className="abcdd">{p.assignedToName}</p>
                      ) : (
                        <p className="abcdd">Unassigned</p>
                      )}
                    </div>
                    {/* <Button>Open Popover</Button> */}
                    <Popover
                      id={id}
                      open={openn}
                      anchorEl={anchorEl}
                      onClose={handleClose}
                      anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "left",
                      }}
                      className="padding-10-px"
                    >
                      <LiveSearch
                        className="live-search-main-wrapper"
                        taskId={taskId}
                        onClose={handleClose}
                        fetchTasks={fetchTasks}
                      />
                    </Popover>
                  </div>
                );
              } else {
                return null;
              }
            })}
          </div>
        </div>
        <div className="text-color-grey kanban-board-wrapper">
          <div className="kanban-board-title">
            <p className="">DONE</p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              fill="currentColor"
              class="bi bi-plus"
              viewBox="0 0 16 16"
              className="kanban-board-header-add-icon"
              onClick={onOpen}
            >
              <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
            </svg>
          </div>
          <div className="kanban-board-overflow-wrapper">
            {tasks.map((p) => {
              if (p.status === "done") {
                return (
                  <div className="task-card" key={p._id}>
                    <div className="task-card-top-wrapper">
                      <div className="task-card-left text-color-off-white">
                        {p.title}
                      </div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        class="bi bi-three-dots-vertical"
                        viewBox="0 0 16 16"
                        fill="white"
                        className="task-card-right"
                        onClick={(event) => handleDeleteOpen(event, p._id)}
                      >
                        <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
                      </svg>
                      <Popover
                        id={id}
                        open={deleteOpener}
                        anchorEl={anchorDeleteModal}
                        onClose={handleDeleteClose}
                        anchorOrigin={{
                          vertical: "bottom",
                          horizontal: "left",
                        }}
                        className="delete-popover-wrapper"
                        PaperProps={{ style: popoverStyle }}
                        onClick={deleteHandler}
                      >
                        <div className="delete-popover" onClick={deleteHandler}>
                          Delete
                        </div>
                      </Popover>
                    </div>

                    {deleteOpen ? (
                      <DeleteModal
                        openDeleteModal={openDeleteModal}
                        closeDeleteModal={closeDeleteModal}
                        deleteTaskId={deleteTaskId}
                        fetchTasks={fetchTasks}
                      />
                    ) : (
                      <></>
                    )}

                    <div className="task-card-tags-wrapper">
                      {p.tags.map((tag) => (
                        <div className="task-card-tag-wrapper text-color-off-white">
                          {tag}
                        </div>
                      ))}
                    </div>

                    <div className="task-card-assigned-to-wrapper">
                      {p.assignedToName ? (
                        <div
                          onClick={(event) => handleClick(p._id, event)}
                          className="task-card-assigned-to cbdc text-color-off-white"
                        >
                          {p.assignedToName[0].toUpperCase()}
                        </div>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="23"
                          height="23"
                          fill="rgb(57, 57, 57)"
                          className="bi bi-person-circle margin-top-10px card-icon-project-page cbdc"
                          viewBox="0 0 16 16"
                          aria-describedby={id}
                          variant="contained"
                          onClick={(event) => handleClick(p._id, event)}
                        >
                          <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                          <path
                            fill-rule="evenodd"
                            d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"
                          />
                        </svg>
                      )}

                      {p.assignedToName ? (
                        <p className="abcdd">{p.assignedToName}</p>
                      ) : (
                        <p className="abcdd">Unassigned</p>
                      )}
                    </div>
                    {/* <Button>Open Popover</Button> */}
                    <Popover
                      id={id}
                      open={openn}
                      anchorEl={anchorEl}
                      onClose={handleClose}
                      anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "left",
                      }}
                      className="padding-10-px"
                    >
                      <LiveSearch
                        className="live-search-main-wrapper"
                        taskId={taskId}
                        onClose={handleClose}
                        fetchTasks={fetchTasks}
                      />
                    </Popover>
                  </div>
                );
              } else {
                return null;
              }
            })}
          </div>
        </div>
      </div>
    </div>
  </div>
</div>;
