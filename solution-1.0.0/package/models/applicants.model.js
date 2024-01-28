let applicants = [
  {
    id: 1,
    jobId: 1,
    name: "jay",
    email: "jay@gmail.com",
    phone: "6900547080",
    resume: "public\\resume\\1706280903975.pdf",
  },
];
export const getApplicants = () => applicants;

export const addApplicant = (req, jobId) => {
  let id = applicants.length + 1;
  const resume = req.file.path;
  applicants.push({ id: id, ...req.body, jobId: jobId, resume: resume });
};

export const filterApplicants = (req) => {
  let filteredCandidate = applicants.filter(
    (applicant) => applicant.jobId == req.params.jobid
  );
  return filteredCandidate;
};
