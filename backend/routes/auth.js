const express = require("express");
const { auth } = require("../firebase.js");
const {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} = require("firebase/auth");
const router = express.Router();

// Sign up
router.post("/signup", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!email || !password || !username) {
      return res.status(400).send({
        message: "Missing required fields: username, email, or password",
      });
    }

    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    if (auth.currentUser) {
      await updateProfile(auth.currentUser, { displayName: username });
    }
    const user = userCredential.user;
    res.status(201).send({
      status: "success",
      message: "User created successfully",
      uid: user.uid,
      username: user.providerData[0].displayName,
      email: user.email,
    });
  } catch (error) {
    console.error("Error during signup:", error);

    const errorMessage = error.message || "Failed to sign up";
    let statusCode = 500;

    if (error.code === "auth/email-already-in-use") {
      statusCode = 409;
    } else if (error.code === "auth/invalid-email") {
      statusCode = 400;
    } else if (error.code === "auth/weak-password") {
      statusCode = 400;
    }

    res.status(statusCode).send({
      message: errorMessage,
      error: error.message,
    });
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).send({ message: "Missing email or password" });
    }

    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    res.status(200).send({
      status: "success",
      message: "Login successful",
      uid: user.uid,
      username: user.providerData[0].displayName,
      email: user.email,
    });
  } catch (error) {
    if (error.code === "auth/user-not-found") {
      return res.status(404).send({ message: "User not found" });
    } else if (error.code === "auth/wrong-password") {
      return res.status(401).send({ message: "Incorrect password" });
    }

    return res
      .status(500)
      .send({ message: "Failed to log in", error: error.message });
  }
});

module.exports = router;
