import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./landingPage.js";
import Login from "./Login";
import Register from "./Register";
import Home from "./components/Home.js";
import ProjectPage from "./components/ProjectPage";
import TaskPage from "./components/TaskPage";
import Notifications from "./components/Notifications";
import CalendarTimeline from "./components/CalendarTimeline.js";
import ProjectSettings from "./components/ProjectSettings";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<LandingPage />}></Route>
          <Route exact path="/login" element={<Login />}></Route>
          <Route exact path="/register" element={<Register />}></Route>
          <Route exact path="/home" element={<Home />}></Route>
          <Route path="/project/:projectId" element={<ProjectPage />}></Route>
          <Route path="/task/:taskId" element={<TaskPage />}></Route>
          <Route path="/notifications" element={<Notifications />}></Route>
          <Route
            path="/timeline/:projectId"
            element={<CalendarTimeline />}
          ></Route>
          <Route
            path="/project/settings/:projectId"
            element={<ProjectSettings />}
          ></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
