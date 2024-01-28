import {
  handleLoginModel,
  handleSingUpModel,
  isLoggedIn,
} from "../models/user.model.js";

export const renderLogin = (req, res) => {
  if (req.session.userEmail) {
    return res.redirect("/jobs");
  }
  res.render("login", { title: "Login", session: false });
};
export const renderSignUp = (req, res) => {
  res.render("signup", {
    title: "SignUp",
    session: false,
  });
};
export const handleSignUp = (req, res) => {
  handleSingUpModel(req.body);
  res.render("login", {
    title: "Login",
    session: false,
  });
};
export const handleLogin = (req, res) => {
  const status = handleLoginModel(req.body);
  if (status) {
    req.session.userEmail = req.body.email;
    res.redirect("/");
  } else res.json({ success: false, message: "Invalid Credentials!!" });
};
export const renderHome = (req, res) => {
  if (isLoggedIn(req)) {
    return res.redirect("/jobs");
  }
  return res.render("home", {
    session: isLoggedIn(req),
    title: "Home page",
  });
};
export const renderNotFound = (req, res) => {
  return res.render("notFound", {
    title: "home",
    session: isLoggedIn(req),
  });
};

export const handleLogout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.log(err);
    } else {
      return res.redirect("/");
    }
  });
};
