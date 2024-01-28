import express from "express";
import {
  applyForJob,
  renderJobForm,
  renderApplicantList,
  getApplicantById,
} from "../controllers/applicants.controller.js";
import { auth } from "../middleware/auth.js";
import upload from "../middleware/multer.js";
import applicantValidator from "../middleware/validationMiddleware/applicant.validation.middleware.js";
const Router = express.Router();

Router.get("/apply/jobs/:id", renderJobForm);
Router.post("/apply/jobs/:id",upload.single("resume"), applicantValidator,  applyForJob);
Router.get("/applied/candidates/job/:jobid", renderApplicantList);
Router.get("/applied/candidate/:id", getApplicantById);

const applicantRoutes = Router;
export default applicantRoutes;
