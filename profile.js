import { db } from "./firebase.js";
import {
  doc, getDoc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const username = location.pathname.split("/").pop();

const docRef = doc(db, "portfolios", username);
const snap = await getDoc(docRef);

if(!snap.exists()){
  document.getElementById("portfolio").innerHTML = "Portfolio not found";
} else {
  const p = snap.data();
  document.getElementById("portfolio").innerHTML = `
    <img src="${p.photo}" class="avatar">
    <h2>${p.name}</h2>
    <h4>${p.profession}</h4>
    <p>${p.bio}</p>

    <div class="socials">
      <a href="${p.instagram}" target="_blank">Instagram</a>
      <a href="${p.github}" target="_blank">GitHub</a>
      <a href="${p.linkedin}" target="_blank">LinkedIn</a>
    </div>
  `;
}
