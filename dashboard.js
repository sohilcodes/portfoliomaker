import { auth, db, storage } from "./firebase.js";
import {
  doc, setDoc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import {
  ref, uploadBytes, getDownloadURL
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js";

const username = localStorage.getItem("username");

window.savePortfolio = async () => {
  const file = document.getElementById("photo").files[0];
  if(!file) return alert("Profile photo required");

  const storageRef = ref(storage, `profiles/${username}`);
  await uploadBytes(storageRef, file);
  const photoURL = await getDownloadURL(storageRef);

  const data = {
    username,
    name: name.value,
    profession: profession.value,
    bio: bio.value,
    instagram: instagram.value,
    github: github.value,
    linkedin: linkedin.value,
    photo: photoURL
  };

  await setDoc(doc(db, "portfolios", username), data);

  const link = `${location.origin}/u/${username}`;
  document.getElementById("linkBox").innerHTML =
    `✅ Portfolio created:<br><a href="${link}" target="_blank">${link}</a>`;
};
