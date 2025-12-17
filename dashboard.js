import { db, storage } from "./firebase.js";
import { doc, setDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js";

function randomString(len = 4) {
  return Math.random().toString(36).substring(2, 2 + len);
}

const btn = document.getElementById("createBtn");
const linkBox = document.getElementById("linkBox");

btn.addEventListener("click", async () => {
  try {
    const photo = document.getElementById("photo").files[0];
    if (!photo) {
      alert("Profile photo upload karo");
      return;
    }

    const baseUsername = localStorage.getItem("username");
    if (!baseUsername) {
      alert("Login again");
      location.href = "/";
      return;
    }

    const finalUsername = `${baseUsername}-${randomString()}`;

    // Upload image
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

    if (!data.name || !data.profession) {
      alert("Name aur profession required hai");
      return;
    }

    await setDoc(doc(db, "portfolios", finalUsername), data);

    const link = `${location.origin}/u/${finalUsername}`;

    linkBox.innerHTML = `
      <div style="text-align:center;word-break:break-all">
        ✅ <b>Portfolio Live Ho Gaya</b><br><br>
        <a href="${link}" target="_blank">${link}</a><br><br>
        <button id="copyBtn">📋 Copy Link</button>
      </div>
    `;

    document.getElementById("copyBtn").onclick = () => {
      navigator.clipboard.writeText(link);
      alert("Link copied ✅");
    };

  } catch (err) {
    console.error(err);
    alert("Error: " + err.message);
  }
});
