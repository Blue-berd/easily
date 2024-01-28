import { body } from "express-validator";

async function userValidator(req, res, next) {
  try {
    const rules = [
      body("name").notEmpty().withMessage("Name is required"),
      body("email").isEmail().withMessage("Invalid email address"),
      body("password").notEmpty().withMessage("Password is required"),
    ];

    await Promise.all(rules.map((rule) => rule.run(req)));
    const validationErrors = validationResult(req);

    if (!validationErrors.isEmpty()) {
      return res.render("signup", {
        title: "Sign Up",
        session: false,
        errorMessage: validationErrors.array()[0].msg,
      });
    }

    next();
  } catch (err) {
    return res.statudCode(500).send("Internal server error");
  }
}
export default userValidator;