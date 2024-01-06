const jwt = require("jsonwebtoken");
const User = require("../backend/models/UserSchema");
const protect = async (req, res, next) => {
  try {
    console.log(req.body);

    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      console.log("lmao no token");

      res.status(401).json({
        type: 2,
        message: "Invalid user detected! Please Login again",
      });
    }

    const dec = jwt.verify(token, process.env.secret);
    const user = await User.findById(dec._id);
    if (!user) {
      res.status(401).json({ type: 2, message: "User not found using token" });
    }
    console.log("success fully executed the protected route");

    next();
  } catch (error) {
    console.log("error found");

    res
      .status(401)
      .send({ type: 2, message: "Invalid user detected. Please login again!" });
    console.log(error);
  }
};

module.exports = protect;
