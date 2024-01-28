import express from "express";
import {
  createJob,
  renderJobForm,
  getJobById,
  updateJobById,
  deleteJobById,
  renderJobList,
  handleSearch,
  jobUpdateView,
} from "../controllers/job.controller.js";
import { auth } from "../middleware/auth.js";

const Router = express.Router();
Router.get("/jobs/:id", getJobById);
Router.get("/jobs", renderJobList);
Router.post("/jobs", auth, createJob);
Router.get("/jobform", auth, renderJobForm);
Router.get("/jobs/view/update/:id", auth, jobUpdateView);
Router.put("/jobs/:id", auth, updateJobById);
Router.delete("/jobs/:id", auth, deleteJobById);
Router.get("/search", auth, handleSearch);
const jobRoutes = Router;
export default jobRoutes ;
