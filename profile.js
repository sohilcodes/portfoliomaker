import { db } from "./firebase.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const id = location.pathname.split("/").pop();
const box = document.getElementById("portfolio");

const snap = await getDoc(doc(db, "portfolios", id));

if(!snap.exists()){
  box.innerHTML = "Portfolio not found";
} else {
  const p = snap.data();

  box.innerHTML = `
    <img src="${p.photo}" class="avatar">
    <h2>${p.name}</h2>
    <p>${p.about}</p>

    <div class="socials">
      ${p.instagram ? `<a href="${p.instagram}" target="_blank">Instagram</a>` : ""}
      ${p.telegram ? `<a href="${p.telegram}" target="_blank">Telegram</a>` : ""}
      ${p.whatsapp ? `<a href="${p.whatsapp}" target="_blank">WhatsApp</a>` : ""}
      ${p.youtube ? `<a href="${p.youtube}" target="_blank">YouTube</a>` : ""}
      ${p.linkedin ? `<a href="${p.linkedin}" target="_blank">LinkedIn</a>` : ""}
    </div>
  `;
}
