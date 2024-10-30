import { sendToken } from "../dotenv/features.js";
import { TryCatch } from "../middlewares/error.js";
import { User } from "../models/users.js";
// import { ErrorHandler } from "../dotenv/utility.js";
import { hash, compare } from "bcrypt";

const newUser = async (req, res, next) => {
  const { name, email, password } = req.body;

  if (!name) {
    return res.status(404).json({
      message: "Name Not Found",
    });
  }
  if (!email) {
    return res.status(404).json({
      message: "Email Not Found",
    });
  }
  if (!password) {
    return res.status(404).json({
      message: "Password Not Found",
    });
  }
  const existUser = await User.findOne({ email });

  // if (existUser) return next(new ErrorHandler("Email exists", 504));

  //   const file = req.file;

  //   if (!file) return next(new ErrorHandler("Please Upload Avatar"));

  //   const avatar = {
  //     public_id: "ssd",
  //     url: "asds",
  //   };

  const hashedPassword = await hash(password, 10);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  sendToken(res, user, 200, "User Created");
};

const login = TryCatch(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  // if (!user) return next(new ErrorHandler("Invalid email", 404));

  const isMatch = await compare(password, user.password);

  // if (!isMatch) return next(new ErrorHandler("Invalid Password", 404));

  sendToken(res, user, 200, `Welcome Back, ${user.name}`);
});

const getMyProfile = TryCatch(async (req, res, next) => {
  const user = await User.findById(req.user);

  // if (!user) return next(new ErrorHandler("User not found", 404));

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
