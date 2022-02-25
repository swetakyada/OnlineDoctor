import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import userRoutes from "./routes/user.js";
import doctorRoutes from "./routes/doctor.js";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/user", userRoutes);
app.use("/doctor", doctorRoutes);

const CONNECTION_URL =
  "mongodb+srv://onlinedoctor:onlinedoctor@cluster0.2cjnd.mongodb.net/AppData?retryWrites=true&w=majority";
const PORT = process.env.PORT || 5000;

mongoose
  .connect(CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(PORT, () => console.log(`Server Running on port ${PORT}`))
  )
  .catch((error) => console.log(error.message));