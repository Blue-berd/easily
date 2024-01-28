import { body, validationResult } from "express-validator";
import { isLoggedIn } from "../../models/user.model.js";
import { searchJob } from "../../models/job.model.js";
async function applicantValidator(req, res, next) {
  try {
    const rules = [
      body("jobId").notEmpty().withMessage("Job Id is Required"),
      body("name").notEmpty().withMessage("Name is required"),
      body("email").isEmail().withMessage("Email is required"),
      body("phone")
        .isDecimal({ decimal_digits: "10" })
        .withMessage("Phone should be numeric with 10 digits"),
        body("resume").custom((value, {req, })=>{
            if(!req.file){
                throw new Error("Resume is required")
            }
            return true
        })  
    ];
    
    await Promise.all(rules.map((rule) => rule.run(req)));
    const validationErrors = validationResult(req);

    if (!validationErrors.isEmpty()) {
      if (!req.params.id) {
        return res.render("jobList", {
          title: "Job List",
          user: { role: isLoggedIn(req) ? "recruiter" : "jobseeker" },
          session: isLoggedIn(req),
          jobs: isLoggedIn(req)
            ? searchJob(user, "createdBy")
            : searchJob("", "company"),
        });
      } else {
        return res.render("applicationForm", {
          title: "Job Application",
          session: false,
          errorMessage: validationErrors.array()[0].msg,
          id: req.params.id,
          job:searchJob(req.params.id, "id")
        });
      }
    }
    next();
  } catch (err) {
    return res.statudCode(500).send("Internal server error");
  }
}

export default applicantValidator;