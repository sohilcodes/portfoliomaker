import { db, storage } from "./firebase.js";
import { doc, setDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js";

// random slug (HTML runner style)
function generateSlug(len = 6){
  return Math.random().toString(36).substring(2, 2 + len);
}

const btn = document.getElementById("createBtn");
const linkBox = document.getElementById("linkBox");

btn.addEventListener("click", async () => {
  const slug = generateSlug(); // 🔥 YAHI LINK KA BASE HAI
  const finalLink = `${location.origin}/p/${slug}`;

  // 🔹 LINK TURANT DIKHA DO (Firebase se pehle)
  linkBox.innerHTML = `
    <div style="word-break:break-all">
      ✅ <b>Portfolio Link Generated</b><br><br>
      <a href="${finalLink}" target="_blank">${finalLink}</a><br><br>
      <button id="copyBtn">📋 Copy Link</button>
    </div>
  `;

  document.getElementById("copyBtn").onclick = () => {
    navigator.clipboard.writeText(finalLink);
    alert("Link copied ✅");
  };

  // 🔹 AB FIREBASE KA KAAM
  try {
    const photo = document.getElementById("photo").files[0];
    if(!photo) return;

    const imgRef = ref(storage, `profiles/${slug}`);
    await uploadBytes(imgRef, photo);
    const photoURL = await getDownloadURL(imgRef);

    const data = {
      slug,
      name: document.getElementById("name").value,
      profession: document.getElementById("profession").value,
      bio: document.getElementById("bio").value,
      photo: photoURL,
      createdAt: Date.now()
    };

    await setDoc(doc(db, "portfolios", slug), data);
  } catch (e) {
    console.log("Firebase save error:", e.message);
  }
});
