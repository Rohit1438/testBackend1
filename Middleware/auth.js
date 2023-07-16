const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    console.log(token)
    if (!token) res.json({ msg: "Token required , please login" });

    const decoded = jwt.verify(token, "secret7");
//for furthur use in tag or post things
    req.userId=decoded.userId
    req.username=decoded.username
console.log(decoded)
    if (!decoded) {
      res.status(200).json({ msg: "NOT AUTHENTICATED " });
    }

    next();
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = { auth };
