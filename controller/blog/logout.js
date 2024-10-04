const logout = (req, res, next) => {
  res.clearCookie("token");
  res.redirect("/");
};

export default logout;
