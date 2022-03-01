import User from "../models/user.js";
import bcrypt from "bcryptjs";

export const createUser = async (req, res) => {
  console.log(req.body);

  try {
    const newPassword = await bcrypt.hash(req.body.password, 10);

    await User.create({
      name: req.body.name,
      email: req.body.email,
      password: newPassword,
    });

    res.json({ status: "ok" });
  } catch (err) {
    res.json({
      status: "error",
      error: err,
    });
  }
};

export const loginUser = async (req, res) => {
  console.log(req.body);

  const user = await User.findOne({
    email: req.body.email,
  });

  if (!user) {
    return { status: "error", error: "Invalid Email" };
  }

  const isPasswordValid = await bcrypt.compare(
    req.body.password,
    user.password
  );

  if (isPasswordValid) {
    // const token = jwt.sign(
    //   {
    //     name: user.name,
    //     email: user.email,
    //   },
    //   "secret123"
    // );

    return res.json({
      status: "ok",
      id: user._id,
      name: user.name,
      email: user.email,
    });
  } else {
    return res.json({ status: "error", error: "Invalid Password" });
  }
};
