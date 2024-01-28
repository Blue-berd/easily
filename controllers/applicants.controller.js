import session from "express-session";
import { filterApplicants, addApplicant, getApplicants } from "../models/applicants.model.js";
import { addJob, searchJob, deleteJob } from "../models/job.model.js";
import { isLoggedIn } from "../models/user.model.js";

export const applyForJob = (req, res) => {
  const job = req.params.id;
  addApplicant(req, job);  
  return res.redirect("/jobs");
};
export const renderJobForm = (req, res) => {
  const job = searchJob(req.params.id, "id");
  // const jobs = filterJobs(req);
  return res.render("applicationForm", {
    title: "Job Application",
    session: false,
    id: job.id,
    job:job,
  });
};
export const getApplicantById = (req, res) => {
  const job = req.params.id;
  addApplicant(job);
  const jobs = filterJobs(req);
  return res.redirect("/jobs");
};
export const renderApplicantList = (req, res) => {
  const applicants = filterApplicants(req);
  const job = searchJob(req.params.jobid, "id");
  return res.render("applicantList", {
    title: "Job Application",
    session: false,
    job: job,
    applicants: applicants,
  });
};
