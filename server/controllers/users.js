import { sendToken } from "../dotenv/features.js";
import { TryCatch } from "../middlewares/error.js";
import { User } from "../models/users.js";
import { ErrorHandler } from "../dotenv/utility.js";
import { hash, compare } from "bcrypt";
import jwt from "jsonwebtoken";
import { UserToken } from "../models/users_token.js";

const newUser = async (req, res, next) => {
  const { name, email, password } = req.body;

  if (!name) {
    return res.status(404).json({
      message: "Please enter name",
    });
  }
  if (!email) {
    return res.status(404).json({
      message: "Please enter email",
    });
  }
  if (!password) {
    return res.status(404).json({
      message: "Please enter password",
    });
  }
  const existUser = await User.findOne({ email });

  if (existUser) return res.status(208).json({
    success: false,
    message: 'This Email is already registered',
  });

  //   const file = req.file;

  //   if (!file) return next(new ErrorHandler("Please Upload Avatar"));

  //   const avatar = {
  //     public_id: "ssd",
  //     url: "a",
  //   };

  const hashedPassword = await hash(password, 10);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    status: 1,
  });

  sendToken(res, user, 200, "Account Created Successfully");
};

const login = TryCatch(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  // if (!user) return next(new ErrorHandler("Invalid email", 404));
  if (!email) return res.status(200).json({
    success: false,
    message: 'Please enter email',
  });

  if (!password) return res.status(200).json({
    success: false,
    message: 'Please enter password',
  });

  if (!user) return res.status(200).json({
    success: false,
    message: 'Email is not registered',
  });

  const isMatch = await compare(password, user.password);

  // if (!isMatch) return next(new ErrorHandler("Invalid Password", 404));
  if (!isMatch) return res.status(200).json({
    success: false,
    message: 'Invalid password or email',
  });

  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

  await UserToken.create({
    token,
    user_id: user?._id,
    status: 1,
  });

  sendToken(res, user, 200, `You have login successfully, ${user?.name}`, token);
});

const getMyProfile = TryCatch(async (req, res, next) => {
  const user = await User.findById(req.user);

  if (!user) return next(new ErrorHandler("Account not found", 404));

  res.status(200).json({
    success: true,
    user,
  });
});

const logout = TryCatch(async (req, res) => {
  return res
    .status(200)
    .cookie("token", "", { ...cookieOptions, maxAge: 0 })
    .json({
      success: true,
      message: "Logout successfully",
    });
});

export { login, newUser, getMyProfile, logout };

