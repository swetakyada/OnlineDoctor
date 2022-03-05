import Doctor from "../models/doctor.js";
// import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export const createDoctor = async (req, res) => {
  console.log(req.body);

  try {
    const newPassword = await bcrypt.hash(req.body.password, 10);

    await Doctor.create({
      name: req.body.name,
      email: req.body.email,
      speciality: req.body.speciality,
      description: req.body.description,
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

export const loginDoctor = async (req, res) => {
  console.log(req.body);

  const doctor = await Doctor.findOne({
    email: req.body.email,
  });

  if (!doctor) {
    return { status: "error", error: "Invalid Email" };
  }

  const isPasswordValid = await bcrypt.compare(
    req.body.password,
    doctor.password
  );

  if (isPasswordValid) {
    // const token = jwt.sign(
    //   {
    //     name: doctor.name,
    //     email: doctor.email,
    //   },
    //   "secret123"
    // );
    console.log("ok");
    return res.json({
      status: "ok",
      id: doctor._id,
      name: doctor.name,
      email: doctor.email,
    });
  } else {
    return res.json({ status: "error", error: "Invalid Password" });
  }
};
