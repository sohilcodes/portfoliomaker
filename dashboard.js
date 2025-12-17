import { db, storage } from "./firebase.js";
import {
  doc,
  setDoc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import {
  ref,
  uploadBytes,
  getDownloadURL
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js";

// random chars
function randomString(len = 4){
  return Math.random().toString(36).substring(2, 2 + len);
}

window.savePortfolio = async () => {
  try {
    const photo = document.getElementById("photo").files[0];
    if(!photo){
      alert("Profile photo upload karo");
      return;
    }

    const baseUsername = localStorage.getItem("username");
    if(!baseUsername){
      alert("Session expired. Login again.");
      location.href = "/";
      return;
    }

    const finalUsername = `${baseUsername}-${randomString()}`;

    // upload image
    const imgRef = ref(storage, `profiles/${finalUsername}`);
    await uploadBytes(imgRef, photo);
    const photoURL = await getDownloadURL(imgRef);

    const data = {
      username: finalUsername,
      name: document.getElementById("name").value.trim(),
      profession: document.getElementById("profession").value.trim(),
      bio: document.getElementById("bio").value.trim(),
      instagram: document.getElementById("instagram").value.trim(),
      github: document.getElementById("github").value.trim(),
      linkedin: document.getElementById("linkedin").value.trim(),
      photo: photoURL,
      createdAt: Date.now()
    };

    if(!data.name || !data.profession){
      alert("Name aur profession required hai");
      return;
    }

    await setDoc(doc(db, "portfolios", finalUsername), data);

    const link = `${location.origin}/u/${finalUsername}`;

    document.getElementById("linkBox").innerHTML = `
      <div style="word-break:break-all;text-align:center">
        ✅ Portfolio created successfully<br><br>
        <a href="${link}" target="_blank">${link}</a><br><br>
        <button onclick="navigator.clipboard.writeText('${link}')">
          📋 Copy Portfolio Link
        </button>
      </div>
    `;

  } catch (err) {
    alert("Error: " + err.message);
    console.error(err);
  }
};
