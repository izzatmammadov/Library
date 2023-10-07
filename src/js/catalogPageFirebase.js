import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
import {
  getDatabase,
  ref,
  set,
  push,
  onValue,
  remove,
} from "https://www.gstatic.com/firebasejs/10.4.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyBjUeKUH3MpDlxQgfX6FM6lZMXNsvR_Ouk",
  authDomain: "ourproject-e7f72.firebaseapp.com",
  databaseURL: "https://ourproject-e7f72-default-rtdb.firebaseio.com",
  projectId: "ourproject-e7f72",
  storageBucket: "ourproject-e7f72.appspot.com",
  messagingSenderId: "202148445701",
  appId: "1:202148445701:web:45845c3f69709c9ec5e66c",
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const catalogs = ref(db, "catalogs");

function catalogRender() {
  const slider_catagories = document.querySelector(".slider-catagories");
  onValue(catalogs, (snapshot) => {
    const catalogData = snapshot.val();
    let catalogDataToArr = Object.entries(catalogData);
    let catalogItem = catalogDataToArr
    .map(
        (item) =>
          `
          <button>${item[1].bookType}</button>
            `
      )
      .join("");

      slider_catagories.innerHTML = catalogItem;
  });
}

catalogRender();
