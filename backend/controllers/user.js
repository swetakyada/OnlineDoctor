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

export const editUser = async (req, res) => {
  console.log(req.body);
  try {
    User.updateOne(
      { _id: req.body.id },
      {
        $set: {
          name: req.body.name,
        },
        $set: {
          email: req.body.email,
        },
      },
      function (err, item) {
        if (err) {
          return res.json({ status: "error", error: "Not Updated!" });
        }
        return res.json({ status: "ok" });
      }
    );
  } catch (er) {
    console.log(er.message);
    return res.json({ status: "error", error: "Not Updated!" });
  }
};

export const changePassword = async (req, res) => {
  console.log(req.body);
  try {
    const user = await User.findOne({
      id: req.body.id,
    });
    if (!user) {
      return { status: "error", error: "Error Occured" };
    }
    const isPasswordValid = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordValid) {
      return { status: "error", error: "Enter valid old password" };
    }
    const newPassword = await bcrypt.hash(req.body.password, 10);
    User.updateOne(
      { _id: req.body.id },
      {
        $set: {
          password: newPassword,
        },
      },
      function (err, item) {
        if (err) {
          return res.json({ status: "error", error: "Not Updated!" });
        }
        console.log("ok");
        return res.json({ status: "ok" });
      }
    );
  } catch (er) {
    console.log(er.message);
    return res.json({ status: "error", error: "Not Updated!" });
  }
};
