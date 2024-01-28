// Please don't change the pre-written code
// Import the necessary modules here
import session from "express-session";
import express from "express";
import cookieParser from "cookie-parser";
import { renderNotFound } from "./controllers/user.controller.js";
import userRoutes from "./routes/user.routes.js";
import jobRoutes from "./routes/job.routes.js";
import applicantRoutes from "./routes/applicant.routes.js";
import path from "path";
import { auth } from "./middleware/auth.js";
import  setLastVisit  from "./middleware/lastVisitMiddleware.js";

const app = express();

// Implement the necessary Express Session here
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.set("view engine", "ejs");
app.set("views", "./views");

app.use(setLastVisit);
app.use((req, res, next) => {
  res.locals.layout = "layout";
  next();
});

app.use(express.static(path.join(process.cwd(), "public")));

app.use("/", userRoutes);
// no auth routes
app.use("/", applicantRoutes);
app.use("/", jobRoutes);
app.all("/*", renderNotFound);


export default app;
