import React, { useEffect } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import parse from "html-react-parser";
import { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import CancelIcon from "@mui/icons-material/Cancel";
import "./CreateTask.css";
import StatusSelector from "./StatusSelector";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./ReactQuill.css";
const CreateTask = ({ onClose, onOpen, fetchTasks }) => {
  const [status, setStatus] = React.useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tag, setTag] = useState("");
  const [arr, setArr] = useState([]);
  const [text, setText] = useState("");
  const [htmlContent, setHtmlContent] = useState("");
  const [plainTextContent, setPlainTextContent] = useState("");
  const handleDescription = (value) => {
    setDescription(value);
  };

  function statusHandler(a) {
    setStatus(a);
  }

  async function removeTag(a) {
    let temp = [...arr];
    let idx = temp.findIndex((p) => p === a);
    console.log(arr);

    if (idx !== -1) {
      temp.splice(idx, 1);
      setArr(temp);
    }
    return;
  }

  function pushTag(a) {
    setArr.push(a);
  }
  function handleKeyPress(event) {
    if (event.key === "Enter") {
      if (tag !== "") {
        setArr([...arr, tag]);
        event.target.value = "";
      }
    }
  }

  let { projectId } = useParams();
  console.log("id is -> " + projectId);

  const handleChange = async (event) => {
    await setStatus(event.target.value);
    console.log(status);
  };

  function print() {
    console.log(status);
  }

  const handleText = (content) => {
    setHtmlContent(content);
    const plainText = parse(content).toString();

    setPlainTextContent(plainText);
  };

  async function addTaskHandler() {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    let createdById = await localStorage.getItem("_id");
    let a = await axios.post(
      "/api/createTask",
      {
        projectId,
        status,
        description: description,
        createdById,
        title,
        tags: arr,
      },
      config
    );
    if (a) {
      fetchTasks();
      onClose();
    } else {
      return;
    }
  }

  // useEffect(() => {}, [arr]);

  return (
    <div className="modal-1">
      <div className="modal-content-1">
        <div className="create-task-top-half">
          <div className="create-task-title font-weight-600 font-size-30px">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              fill="currentColor"
              class="bi bi-list-task"
              viewBox="0 0 16 16"
              className="create-task-task-icon"
            >
              <path
                fill-rule="evenodd"
                d="M2 2.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5V3a.5.5 0 0 0-.5-.5H2zM3 3H2v1h1V3z"
              />
              <path d="M5 3.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zM5.5 7a.5.5 0 0 0 0 1h9a.5.5 0 0 0 0-1h-9zm0 4a.5.5 0 0 0 0 1h9a.5.5 0 0 0 0-1h-9z" />
              <path
                fill-rule="evenodd"
                d="M1.5 7a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5H2a.5.5 0 0 1-.5-.5V7zM2 7h1v1H2V7zm0 3.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5H2zm1 .5H2v1h1v-1z"
              />
            </svg>
            <>Create a task </>
          </div>

          <div className="create-task-top-sub-wrapper">
            <p className="create-task-title-top">
              Title<span className="red">*</span>
            </p>
            <input
              type="text"
              className="border-1px-solid-grey create-task-title-input"
              onChange={(e) => setTitle(e.target.value)}
            />
            <p className="create-task-description margin-top-10px">
              Description
            </p>
            <div className="">
              <textarea
                className="create-task-description-area"
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>
            {/* <ReactQuill
              value={htmlContent}
              onChange={handleText}
              className="margin-top-10px quill-editor-wrap"
            /> */}
            <div className="create-task-status-dropdown-wrapper">
              {/* <p
            className="create-task-status margin-top-10px padding-top-20px"
            onClick={print}
          >
            Status
          </p> */}
              <p>Status</p>
              <StatusSelector statusHandler={statusHandler} />
              {/* <FormControl
            sx={{ marginLeft: 8, minWidth: 80, height: 20 }}
            className="status-dropdown create-task-status"
          >
            <InputLabel id="demo-simple-select-autowidth-label">
              Status
            </InputLabel>
            <Select
              labelId="demo-simple-select-autowidth-label"
              id="demo-simple-select-autowidth"
              value={status}
              onChange={handleChange}
              autoWidth
              label="Age"
              className="create-task-status"
            >
              <MenuItem value={"todo"}>
                <p className="text-color-dark-grey">Todo</p>
              </MenuItem>
              <MenuItem value={"inprogress"}>
                <p className="text-color-dark-grey">In progress</p>
              </MenuItem>
              <MenuItem value={"done"}>
                <p className="text-color-dark-grey">Done</p>
              </MenuItem>
            </Select>
          </FormControl> */}
            </div>
            <p className="margin-top-10px create-task-attach-file">
              Attach file
            </p>
            <div className="create-task-upload-file">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-file-earmark-arrow-up"
                viewBox="0 0 16 16"
              >
                <path d="M8.5 11.5a.5.5 0 0 1-1 0V7.707L6.354 8.854a.5.5 0 1 1-.708-.708l2-2a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1-.708.708L8.5 7.707V11.5z" />
                <path d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2zM9.5 3A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5v2z" />
              </svg>
              <p className="create-task-browse-file">Browse file</p>
            </div>

            <div className="create-task-add-tags-wrapper">
              {arr.map((p) => (
                <span className="create-task-tag-wrapper">
                  <div className="tag-sub-wrapper">
                    {" "}
                    {p}
                    <CancelIcon
                      sx={{ fontSize: 15 }}
                      className="tags-cancel-icon"
                      onClick={() => removeTag(p)}
                    />
                  </div>
                </span>
              ))}

              <input
                placeholder="Press enter to add tags"
                onChange={(e) => setTag(e.target.value)}
                onKeyDown={handleKeyPress}
                className="create-task-add-tag-input-area"
              />
            </div>
          </div>
        </div>

        <div className="display-flex margin-top-20px">
          <div className="create-button" onClick={addTaskHandler}>
            Create Task
          </div>
          <div className="close-button" onClick={onClose}>
            Close
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateTask;
