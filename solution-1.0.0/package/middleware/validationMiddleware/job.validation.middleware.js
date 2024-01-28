import { body } from "express-validator";
import { isLoggedIn } from "../../models/user.model.js";
async function jobValidator(req, res, next) {
  try {
    const rules = [
      body("category").notEmpty().withMessage("Category is required"),
      body("designation").notEmpty().withMessage("Designation is required"),
      body("location").notEmpty().withMessage("Location is required"),
      body("applyBy")
        .isISO8601()
        .withMessage("Invalid date format for Apply By field. Use YYYY-MM-DD"),
      body("salary").notEmpty().withMessage("Salary is required"),
      body("companyName").notEmpty().withMessage("Company Name is required"),
      body("skills").notEmpty().withMessage("Skills are required"),
      body("jobPosted")
        .isISO8601()
        .withMessage(
          "Invalid date format for Job Posted field. Use YYYY-MM-DD"
        ),
      body("openings")
        .isInt({ min: 1 })
        .withMessage("Number of openings should be a positive integer"),
    ];

    await Promise.all(rules.map((rule) => rule.run(req)));
    const validationErrors = validationResult(req);

    if (!validationErrors.isEmpty()) {
      return res.render("jobForm", {
        title: "Job Form",
        isUpdate: false,
        session: isLoggedIn(req),
        errorMessage: validationErrors.array()[0].msg,
      });
    }

    next();
  } catch (err) {
    return res.statudCode(500).send("Internal server error");
  }
}
export default jobValidator;