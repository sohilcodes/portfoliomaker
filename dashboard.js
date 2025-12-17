import { db, storage } from "./firebase.js";
import { doc, setDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js";

// random slug
function slug(len = 6){
  return Math.random().toString(36).substring(2, 2 + len);
}

const btn = document.getElementById("createBtn");
const linkBox = document.getElementById("linkBox");

btn.addEventListener("click", async () => {
  try {
    const file = document.getElementById("photo").files[0];
    if(!file) return alert("Profile photo upload karo");

    const id = slug();
    const link = `${location.origin}/p/${id}`;

    // upload image
    const imgRef = ref(storage, `profiles/${id}`);
    await uploadBytes(imgRef, file);
    const photoURL = await getDownloadURL(imgRef);

    const data = {
      id,
      name: name.value,
      about: about.value,
      photo: photoURL,
      instagram: instagram.value,
      telegram: telegram.value,
      whatsapp: whatsapp.value,
      youtube: youtube.value,
      linkedin: linkedin.value,
      createdAt: Date.now()
    };

    await setDoc(doc(db, "portfolios", id), data);

    linkBox.innerHTML = `
      ✅ <b>Portfolio Live</b><br><br>
      <a href="${link}" target="_blank">${link}</a><br><br>
      <button onclick="navigator.clipboard.writeText('${link}')">
        📋 Copy Link
      </button>
    `;
  } catch(e){
    alert("Error: " + e.message);
  }
});
