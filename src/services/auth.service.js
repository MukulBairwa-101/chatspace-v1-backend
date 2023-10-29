const jwt = require("jsonwebtoken");
exports.generateAccessToken = async (tokenAsset, next, callback) => {
  try {
    const jwtSecret = process.env.JWT_SECRET_KEY;
    let accessToken = jwt.sign({ tokenAsset }, jwtSecret, { expiresIn: "1h" });
    if (!accessToken) {
      console.log("error");
    }
    callback(null, accessToken);
  } catch (err) {
    callback(err);
  }
};
