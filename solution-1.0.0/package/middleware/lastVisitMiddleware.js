function setLastVisit(req, res, next) {
  if (req.cookies.lastVisit) {
    res.locals.lastVisit = new Date(req.cookies.lastVisit).toLocaleString();
  }

  const currentDate = new Date().toISOString();
  res.cookie("lastVisit", currentDate, {
    maxAge: 2 * 24 * 60 * 60 * 1000,
  });
  next();
}
export default setLastVisit;