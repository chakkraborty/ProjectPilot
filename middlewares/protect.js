const jwt = require("jsonwebtoken");
const User = require("../backend/models/UserSchema");
const protect = async (req, res, next) => {
  try {
    let { token } = req.body;
    if (!token) {
      console.log("lmao no token");

      res
        .status(401)
        .json({ message: "Invalid user detected! Please Login again" });
    }
    const dec = jwt.verify(token, process.env.secret);
    const user = await User.findById(dec._id);
    if (!user) {
      res.status(401).json({ message: "User not found using token" });
    }
    console.log("success fully executed the protected route");

    next();
  } catch (error) {
    res
      .status(401)
      .send({ message: "Invalid user detected. Please login again!" });
    console.log(error);
  }
};

module.exports = protect;
