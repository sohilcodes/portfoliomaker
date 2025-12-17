import { db } from "./firebase.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const slug = location.pathname.split("/").pop();
const box = document.getElementById("portfolio");

const snap = await getDoc(doc(db, "portfolios", slug));

if(!snap.exists()){
  box.innerHTML = "Portfolio not found";
} else {
  const p = snap.data();
  box.innerHTML = `
    <img src="${p.photo}" class="avatar">
    <h2>${p.name}</h2>
    <h4>${p.profession}</h4>
    <p>${p.bio}</p>
  `;
}
