const jwt = require("jsonwebtoken");
const userModel = require("../models/user-model");

module.exports = async function (req, res, next) {
  try {
    // Check if token exists
    const token = req.cookies.token;
    if (!token) {
      req.flash("error", "You need to login first");
      return res.redirect("/");
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_KEY);

    // Find user
    const user = await userModel.findOne({ _id: decoded.id }).select("-password");

    // If no user found
    // if (!user) {
    //   req.flash("error", "User not found. Please login again.");
    //   res.clearCookie("token");
    //   return res.redirect("/");
    // }

    // Attach user to request
    req.user = user;

    next();
  } catch (err) {
    req.flash("error", "Session expired or invalid token. Please login again.");
    res.clearCookie("token");
    return res.redirect("/");
  }
};
