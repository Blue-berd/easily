import { addJob, searchJob, deleteJob } from "../models/job.model.js";
import { isLoggedIn } from "../models/user.model.js";
export const renderJobForm = (req, res) => {
  res.render("jobForm", {
    isUpdate: false,
    title: "Job form",
    session: isLoggedIn(req),
  });
};
export const createJob = (req, res) => {
  const job = req.body;
  addJob(job);
  res.render("jobForm", {title:"Job Form", isUpdate: false, session: isLoggedIn(req) ,  
});
};

export const renderJobList = (req, res) => {
  const user = req.session.userEmail;
  res.render("jobList", {
    title: "Job List",
    user: { role: isLoggedIn(req)? "recruiter":"jobseeker" },
    session: isLoggedIn(req),
    jobs:isLoggedIn(req)? searchJob(user, "createdBy") : searchJob("", "company"),
  });
};
export const getJobById = (req, res) => {
  const isRecruiter = req.session.userEmail ? true : false;
  const job = req.params.id ? searchJob(req.params.id, "id"): searchJob("", "company");
  return res.render("jobView", {
    title: "Job Details",
    recruiter: isRecruiter,
    session: isLoggedIn(req),
    job: job,
  });
};
export const jobUpdateView = (req, res) => {
  const job = searchJob(req.params.id, "id");
  return res.render("jobForm", {
    title: "Job Details",
    isUpdate: true,
    session: isLoggedIn(req),
    job: job,
  });
};
export const updateJobById = (req, res) => {
  let jobIndex = searchJob(req.params.id, "index");
  const job = { ...req.body };
  jobs[jobIndex] == job;
  return res.render("jobList", {
    title: "Job List",
    user: { role: "recruiter" },
    session: isLoggedIn(req),
    jobs: searchJob(user, "createdBy"),
  });
};
export const deleteJobById = (req, res) => {
  const jobId = parseInt(req.params.id);
  jobs = deleteJob(jobId);
  res.render("jobList", {
    title: "Job List",
    jobs: jobs,
    session: isLoggedIn(req),
  });
};
export const handleSearch = (req, res) => {
  const jobs = searchJob();
  return res.render("jobList", {
    title: "Job List",
    user: { role: "jobseeker" },
    jobs: jobs,
    session: isLoggedIn(req),
  });

};
