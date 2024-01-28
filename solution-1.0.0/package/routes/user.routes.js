import express from "express";
import {
  handleLogin,
  handleSignUp,
  renderHome,
  renderLogin,
  renderSignUp,
  
  handleLogout,
} from "../controllers/user.controller.js";
import { auth } from "../middleware/auth.js";
const Router = express.Router();

Router.get("/", renderHome);
Router.get("/logout", handleLogout);
Router.get("/login", renderLogin);
Router.get("/signup", renderSignUp);
Router.post("/signup", handleSignUp);
Router.post("/login", handleLogin);

const userRoutes = Router;
export default userRoutes ;
