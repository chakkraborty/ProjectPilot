console.log("hello this is arnik");
const dotenv = require("dotenv");
const express = require("express");
const app = express();

app.use(express.json());
const PORT = 5000;
dotenv.config();
const mongoose = require("mongoose");

const User = require("./backend/models/UserSchema");
const Project = require("./backend/models/ProjectSchema");
const Task = require("./backend/models/TaskSchema");
const Issue = require("./backend/models/IssueSchema");
const Notification = require("./backend/models/Notification");
dotenv.config();

const x = process.env.mongoURI;
mongoose
  .connect(x, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB.");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

app.get("/rendering", (req, res) => {
  res.send("this is your server");
});
class CustomError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.name = "CustomError";
  }
}
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  res
    .status(statusCode)
    .json({ error: err.message || "Internal Server Error" });
});
app.post("/api/login", async (req, res) => {
  console.log(req.body);
  let { email, password } = req.body;
  const a = await User.findOne({ email });
  if (a) {
    if (a.password === password)
      res.status(201).json({ _id: a._id, name: a.name, email: a.email });
    else res.status(401).json({ message: "Invalid credentials !" });
  } else {
    res.status(401).json({ message: "Invalid credentials !" });
  }

  //res.status(401).json({ message: "this is the message from the server" });
});

app.listen(PORT, console.log(`serving is running on PORT no. ${PORT}`));

app.post("/api/register", async (req, res) => {
  console.log(req.body);
  let { name, email, password } = req.body;

  const a = await User.findOne({ email });
  if (a) {
    res.status(401).json({ message: "This email id is already in use !" });
  } else {
    const obj = await User.create({ name, email, password });
    if (obj) {
      res.status(201).json({ _id: obj._id, name: obj.name, email: obj.email });
    } else {
      res.status(201).json({ message: "An error occured !" });
    }
  }
});

app.post("/api/createProject", async (req, res) => {
  let { createdBy, name, leadName } = req.body;
  let a = await Project.create({ createdBy, name, leadName });
  if (a) {
    a.list.push(createdBy);
    a = await a.save();
    res.status(201).json({ a });
  } else {
    res.status(401).json({ message: "Failed to create this project !" });
  }
});

// fetch all projects that the current user is participating in

app.post("/api/getProjects", async (req, res) => {
  let { userId } = req.body;
  console.log(userId);

  let ans = await Project.find({ list: userId });
  if (ans) {
    console.log(ans);
    console.log(typeof ans);

    res.status(201).json(ans);
  } else {
    res
      .status(401)
      .json({ message: "No projects foudn for this particular userId" });
  }
});

app.post("/api/getMembers", async (req, res) => {
  let { projectId } = req.body;

  let a = await Project.findOne({ _id: projectId });
  let b = a.list;
  let ans = [];
  for (let i = 0; i < b.length; i++) {
    let currId = b[i];
    let x = await User.findOne({ _id: currId });
    ans.push({ name: x.name, email: x.email });
  }
  res.status(201).json(ans);
});

app.post("/api/createTask", async (req, res) => {
  let {
    createdById,
    projectId,
    title,
    description,
    status,
    tags,
    startDate,
    dueDate,
  } = req.body;
  //console.log(req.body);
  let a = await Task.create({
    createdById,
    projectId,
    title,
    description,
    status,
    tags,
    startDate,
    dueDate,
  });
  if (a) res.status(201).json(a);
  else {
    res
      .status(401)
      .json({ message: "There was an error creating this task !" });
  }
});

app.post("/api/fetchTasks", async (req, res) => {
  let { projectId } = req.body;
  let a = await Task.find({ projectId });
  if (a) res.status(201).json(a);
  else {
    res.status(401).json({ message: "There was an error fetching the tasks" });
  }
});

app.post("/api/getUsers", async (req, res) => {
  let { email } = req.body;
  let substring = email;
  const query = { email: { $regex: substring, $options: "i" } };
  let response = [];
  const result = await User.find(query);
  for (let i = 0; i < result.length; i++) {
    response.push({ email: result[i].email, name: result[i].name });
  }
  res.status(201).json(response);
});

app.post("/api/searchProjects", async (req, res) => {
  try {
    let { userId, substr } = req.body;
    const query = { name: { $regex: substr, $options: "i" }, list: userId };
    const result = await Project.find(query);
    if (result) {
      console.log("-------");
      console.log(result);
      console.log("-------");

      res.status(201).json(result);
    } else {
      res.status(401).json({ message: "Couldn't find any project !" });
    }
  } catch (error) {
    console.log(error);
  }
});

app.post("/api/assignToTask", async (req, res) => {
  let { taskId, email } = req.body;
  console.log(req.body);

  let a = await User.findOne({ email });
  let b = await Task.findOne({ _id: taskId });
  if (b) {
    b.assignedToName = a.name;
    b.assignedToId = a._id;
    b = await b.save();
    console.log(b);
  }
  if (b) {
    res.status(201).json("Successfully assigned it !");
  }
});

app.post("api/deleteTask", async (req, res) => {
  let { taskId } = req.body;
  console.log(req.body);

  // let a = await Task.findByIdAndDelete({ taskId });
  // if (a) {
  //   res.status(201).json("successfully delete");
  // } else {
  //   res.status(401).json("Error occured while deleting this task!");
  // }
});

app.post("/api/abc", async (req, res) => {
  let { taskId } = req.body;
  console.log(req.body);

  let a = await Task.findByIdAndDelete({ _id: taskId });
  if (a) {
    res.status(201).json("successfully deleted");
  } else {
    res.status(401).json("Error occured while deleting this task!");
  }
});

app.post("/api/getTaskById", async (req, res) => {
  try {
    let { taskId } = req.body;
    let a = await Task.findOne({ _id: taskId });
    if (a) {
      res.status(201).json(a);
      console.log(a);
    } else {
      res.status(401).json("naj");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/api/task/updateDescription/", async (req, res) => {
  try {
    let { taskId, description } = req.body;
    let a = await Task.findOne({ _id: taskId });
    if (a) {
      a.description = description;
      a = await a.save();
      res.status(201).json(a);
    } else {
      res.status(403).json("Can't update the description");
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Interval server error !");
  }
});

app.post("/api/issue/createIssue", async (req, res) => {
  try {
    let { taskId, createdByName, comment } = req.body;
    let a = await Issue.create({ taskId, createdByName, comment });
    console.log(a);

    if (a) res.status(201).send(a);
    else res.status(401).json("Creating this issue failed !");
  } catch (error) {
    console.log(error);
    res.status(500).send("Creating this issue failed !");
  }
});

app.post("/api/issue/getIssuesById", async (req, res) => {
  try {
    let { taskId } = req.body;
    let a = await Issue.find({ taskId });
    if (a) res.status(201).send(a);
    else res.status(401).json("Can't fetch Issue!");
  } catch (error) {
    console.log(error);
  }
});

app.post("/api/deleteIssue", async (req, res) => {
  try {
    let { _id } = req.body;
    let a = await Issue.findByIdAndDelete({ _id });
    console.log(a);
    res.status(201).json("Deleted the issue !");
  } catch (error) {
    console.log(error);
  }
});

app.post("/api/issue/markAsResolved", async (req, res) => {
  try {
    let { _id } = req.body;
    let a = await Issue.findOne({ _id });
    a.status = 1;
    a = await a.save();
    res.status(201).json("Marked as resolved !");
    console.log(a);
  } catch (error) {
    console.log(error);
  }
});
app.post("/api/issue/openIssue", async (req, res) => {
  try {
    let { _id } = req.body;
    let a = await Issue.findOne({ _id });
    a.status = 0;
    a = await a.save();
    res.status(201).json("Issue Opened !");
    console.log(a);
  } catch (error) {
    console.log(error);
  }
});

app.post("/api/fetchDescriptionDetails", async (req, res) => {
  try {
    let { taskId } = req.body;
    let a = await Task.findOne({ _id: taskId });

    if (a) {
      let uid = a.createdById;
      let c = await User.findOne({ _id: uid });

      let b = {
        tags: a.tags,
        assignedToName: a.assignedToName,
        createdByName: c.name,
        status: a.status,
        startDate: a.startDate,
        dueDate: a.dueDate,
      };
      res.status(201).json(b);
    } else {
      res.status(401).json({ meesage: "Cannot fetch description !" });
    }
  } catch (error) {
    console.log(error);
  }
});

app.post("/api/task/updateTags", async (req, res) => {
  try {
    let { taskId, tags } = req.body;
    let a = await Task.findOne({ _id: taskId });
    a.tags = tags;
    a = await a.save();
    console.log(a);

    if (a) res.status(201).json("successfully updated");
    else res.status(401).json("Error occured!");
  } catch (error) {
    console.log(error);
  }
});

app.post("/api/task/updateStatus", async (req, res) => {
  try {
    let { taskId, status } = req.body;
    let a = await Task.findOne({ _id: taskId });
    if (a) {
      a.status = status;
      a = await a.save();
      console.log("--------------");

      console.log(a);

      res.status(201).json("Task status has been updated !");
    } else {
      res.status(401).json("Couldn't update the task status !");
    }
  } catch (error) {
    console.log(error);
  }
});

app.post("/api/task/updateSummary", async (req, res) => {
  try {
    let { taskId, summary } = req.body;
    let a = await Task.findOne({ _id: taskId });
    if (a) {
      a.title = summary;
      a = await a.save();
      res.status(201).json("Succcessfully update");
    } else res.status(401).json("Can't update the summary!");
  } catch (error) {
    console.log(error);
  }
});

app.post("/api/invite", async (req, res) => {
  try {
    let { fromId, arr, projectId } = req.body;
    for (let i = 0; i < arr.length; i++) {
      let currEmail = arr[i];
      let a = await User.findOne({ email: currEmail });
      let b = await User.findOne({ _id: fromId });
      let c = await Project.findOne({ _id: projectId });
      if (a) {
        let to = a._id.toString();
        console.log(to);

        let idx = await c.list.findIndex((p) => p === to);
        console.log(idx);

        if (idx === -1) {
          let x = await Notification.create({
            fromName: b.name,
            fromEmail: b.email,
            toId: a._id,
            projectName: c.name,
            projectId,
          });
          console.log(x);
        }
      } else {
        continue;
      }
    }
    res.status(201).json("All queries resolved!");
  } catch (error) {
    console.log(error);
  }
});

app.post("/api/getNotifications", async (req, res) => {
  try {
    const { userId } = req.body;
    let a = await Notification.find({ toId: userId });

    if (a) {
      console.log(a);
      console.log(typeof a);

      res.status(201).send(a);
    } else {
      res.status(201).json({ message: "No invitations found!" });
    }
  } catch (error) {
    console.log(error);
  }
});

app.post("/api/acceptInvitation", async (req, res) => {
  try {
    const { notifId } = req.body;
    let a = await Notification.findOne({ _id: notifId });
    console.log("accept invitation called");
    console.log("notif id : " + notifId);

    if (a) {
      console.log(a);

      let projectId = a.projectId;
      let proj = await Project.findOne({ _id: projectId });
      console.log("projid is " + projectId);
      if (proj) {
        console.log(proj);
        console.log(a.toId);

        let idx = await proj.list.findIndex((p) => p === a.toId);
        if (idx == -1) {
          await proj.list.push(a.toId);
          proj = await proj.save();
        }
        let x = await Notification.findByIdAndDelete({ _id: notifId });
      }
    } else {
      console.log("not found");
    }
  } catch (error) {
    console.log(error);
  }
});

app.post("/api/setStartDate", async (req, res) => {
  try {
    let taskId = req.body.taskId;
    let date = req.body.stDate;
    let a = await Task.findOne({ _id: taskId });
    a.startDate = date;
    console.log("date is : " + date);
    a = await a.save();
  } catch (error) {
    console.log(error);
  }
});
app.post("/api/setDueDate", async (req, res) => {
  try {
    let taskId = req.body.taskId;
    let date = req.body.dueDate;
    let a = await Task.findOne({ _id: taskId });
    a.dueDate = date;
    console.log("date is : " + date);
    a = await a.save();
  } catch (error) {
    console.log(error);
  }
});
