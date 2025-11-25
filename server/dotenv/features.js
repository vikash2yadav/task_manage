const sendToken = (res, user, code, message, token) => {
  console.log('user', user)
  console.log('token', token)
  return res.status(code).cookie("token", token).json({
    success: true,
    user,
    message,
    token,
  });
};

export { sendToken };
