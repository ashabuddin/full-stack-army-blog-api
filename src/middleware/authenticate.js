const tokenService = require("../lib/token");
const { authenticationError } = require("../utils/error");
const userService = require("../lib/user");

const authenticate = async (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  try {
    const decoded = tokenService.verifyToken({ token });
    const user = await userService.findUserByEmail(decoded.email);
    if (!user) {
      next(authenticationError());
    }
    if (user.status !== "approved") {
      next(authenticationError(`Your account is ${user.status}`));
    }
    req.user = { ...user._doc, id: user.id };
    next();
  } catch (e) {
    next(authenticationError());
  }
};

module.exports = authenticate;
