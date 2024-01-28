let jobs = [
  {
    id: 1,
    category: "IT",
    designation: "backend developer",
    location: "silicon valley",
    applyBy: "2025-02-28",
    salary: "$150000",
    companyName: "Apple",
    skills: "Node, C++",
    jobPosted: "2023-02-29",
    openings: 13,
    createdBy: "a@a",
  },
];
export const getJobs = () => jobs;

export const addJob = (job) => {
  let id = jobs.length + 1;
  let jobPosted = new Date().toISOString().split("T")[0]; // Get current date in yyyy-mm-dd format
  let createdBy = req.session.userEmail;
  jobs.push({ ...job, id: id, jobPosted: jobPosted, createdBy: createdBy });
};
export const searchJob = (str, field) => {
  switch (field) {
    case "company":
      if (str == "" || str == null) {
        return getJobs();
      }
      return jobs.filter((job) =>
        job.companyName.toLowerCase().startsWith(str.toLowerCase())
      );

    case "createdBy":
      return jobs.filter((job) => job.createdBy == str);

    case "id":
      const job = jobs.find((job) => job.id == str);
      return job;
    case "index":
      return jobs.findIndex((job) => job.id == str);

    default:
      return;
  }
};
export const deleteJob = (id) => {
  // Use filter to create a new array with jobs excluding the one to be deleted
  jobs = jobs.filter((job) => job.id !== id);
  return jobs;
};
