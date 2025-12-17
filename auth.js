import { auth } from "./firebase.js";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

// SIGN UP
window.signup = async () => {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  if (!email || !password) {
    alert("Email aur password required hai");
    return;
  }

  try {
    const userCred = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    // username = gmail ke @ se pehle wala part
    const username = email.split("@")[0].toLowerCase();

    localStorage.setItem("username", username);
    localStorage.setItem("uid", userCred.user.uid);

    // dashboard par redirect
    window.location.href = "/dashboard.html";
  } catch (err) {
    alert(err.message);
  }
};

// LOGIN
window.login = async () => {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  if (!email || !password) {
    alert("Email aur password required hai");
    return;
  }

  try {
    const userCred = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

    const username = email.split("@")[0].toLowerCase();
    localStorage.setItem("username", username);
    localStorage.setItem("uid", userCred.user.uid);

    window.location.href = "/dashboard.html";
  } catch (err) {
    alert("Login failed: " + err.message);
  }
};
