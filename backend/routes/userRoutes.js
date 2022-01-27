const express = require("express");
const { signUp, signIn } = require("../controllers/userController");

const router = express.Router();

router.route("/").post(signUp);
router.route("/sign-in").post(signIn);
router.route("/sign-in").get(signIn);

module.exports = router;
