import jwt from "jsonwebtoken";

const sendToken = (res, user, code, message) => {
  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

  return res.status(code).cookie("token", token).json({
    success: true,
    user,
    message,
  });
};

export { sendToken };
