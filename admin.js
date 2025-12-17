import { db } from "./firebase.js";
import {
  collection,
  getDocs,
  deleteDoc,
  doc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const ADMIN_PASSWORD = "admin123"; // change kar lena

window.login = () => {
  const pass = document.getElementById("adminPass").value;
  if(pass === ADMIN_PASSWORD){
    document.getElementById("loginBox").style.display="none";
    document.getElementById("panel").style.display="block";
    loadUsers();
  } else {
    alert("Wrong password");
  }
};

window.logout = () => location.reload();

async function loadUsers(){
  const box = document.getElementById("users");
  box.innerHTML = "Loading...";

  const snap = await getDocs(collection(db,"portfolios"));
  box.innerHTML = "";

  snap.forEach(docu=>{
    const u = docu.data();
    box.innerHTML += `
      <div class="portfolio">
        <b>${u.username}</b><br>
        ${u.name} – ${u.profession}<br>
        <a href="/u/${u.username}" target="_blank">View</a>
        <button onclick="removeUser('${u.username}')"
          style="background:#ef4444;margin-top:5px">
          Delete
        </button>
      </div>
    `;
  });
}

window.removeUser = async (username)=>{
  if(!confirm("Delete this portfolio?")) return;
  await deleteDoc(doc(db,"portfolios",username));
  loadUsers();
};
