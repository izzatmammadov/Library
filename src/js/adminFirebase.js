// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
import {
  getDatabase,
  ref,
  set,
  push,
  onValue,
  remove,
} from "https://www.gstatic.com/firebasejs/10.4.0/firebase-database.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBjUeKUH3MpDlxQgfX6FM6lZMXNsvR_Ouk",
  authDomain: "ourproject-e7f72.firebaseapp.com",
  databaseURL: "https://ourproject-e7f72-default-rtdb.firebaseio.com",
  projectId: "ourproject-e7f72",
  storageBucket: "ourproject-e7f72.appspot.com",
  messagingSenderId: "202148445701",
  appId: "1:202148445701:web:45845c3f69709c9ec5e66c",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const books = ref(db, "books");
const catalogs = ref(db, "catalogs");
const aboutSite = ref(db, "aboutSite");
const users = ref(db, "users");
const contacts = ref(db, "contacts");

let date = new Date();
let addedTime = `${date.getFullYear()}-${
  date.getMonth()+1 < 10 ? "0" + date.getMonth() : date.getMonth()+1
}-${date.getDate() < 10 ? "0" +date.getDate() :date.getDate()}`;
// console.log(addedTime);

document.addEventListener("DOMContentLoaded", function () {
  bookAddBtn.addEventListener("click", function () {
    let book = {
      bookTitle: bookNameInput.value,
      authorName: authorNameInput.value,
      bookImageUrl: bookImageUrlInput.value,
      bookDesc: bookDescInput.value,
      bookId: id,
      isNew: isNew.checked,
      bookType: admin_dropdown_active_item.innerText,
      bookPublishDate: globalBookDetail.volumeInfo.publishedDate,
      addedTime: addedTime,
    };

    categoriesSorter(admin_dropdown_active_item.innerText);

    push(books, book);

    isNew.checked = false;
    bookNameInput.value = "";
    authorNameInput.value = "";
    bookImageUrlInput.value = "";
    bookDescInput.value = "";
    admin_dropdown_active_item.innerText = "";
  });

  siteInfoAddBtn.addEventListener("click", function () {
    let siteInfo = {
      siteTitle: siteTitle.value,
      siteBookUrl: siteBookUrl.value,
      siteDesc: siteDesc.value,
    };

    set(aboutSite, siteInfo);
    siteTitle.value = "";
    siteBookUrl.value = "";
    siteDesc.value = "";
  });

  function joinUsRender() {
    onValue(users, (snapshot) => {
      const data = snapshot.val();
      let arr = Object.entries(data);
      joinUsInfo.innerHTML = arr
        .map((info, index) => {
          return `  
      <tr>
      <td>${index + 1}</td>
      <td>${info[1].fullname}</td>
      <td>${info[1].email}</td>
    </tr>
      `;
        })
        .join(" ");

    });
  }
  joinUsRender();

  function renderBooksDetail() {
    onValue(books, (snapshot) => {
      const data = snapshot.val();
      if (!data) {
        booksDetailTable.classList.add("d-none");
        return;
      }
      booksDetailTable.classList.remove("d-none");

      let arr = Object.entries(data);

      booksDetailTable.innerHTML = arr
        .map((item, index) => {
          return `  
      <tr class="bg-white">
      <td>${index + 1}</td>
      <td class="customTd">
        <div
          id="bookContent"
          class="d-flex align-items-center ps-2 gap-2"
        >
          <img class="admin_book_img" src="${
            item[1].bookImageUrl
          }" alt="image-book" />
          <p>${item[1].bookTitle}</p>
        </div>
      </td>
      <td><div class="descriptionBody"><p class="descItem"> ${
        item[1].bookDesc
      }</p> </div></td>
      <td>${item[1].bookType}</td>
      <td>${item[1].authorName}</td>
      <td><button class="del" data-id="${
        item[0]
      }" ><i class="material-icons">&#xe872;</i></button></td>
    </tr>
      `;
        })
        .join(" ");

      const bookDelButton = document.querySelectorAll(".del");
      bookDelButton.forEach((btn) => {
        btn.addEventListener("click", function () {
          deleteBookDetail(btn.dataset.id);
        });
      });
    });
  }
  function deleteBookDetail(id) {
    console.log(id);
    let rmv = ref(db, "books/" + id);

    remove(rmv).then(() => console.log("Success"));
  }
  renderBooksDetail();
});
function renderContacts() {
  onValue(contacts, (snapshot) => {
    const data = snapshot.val();
    let contactsArr = Object.entries(data);
    contactDetailTable.innerHTML = contactsArr.map((item, index) => {
      return ` <tr>
  <td>${index + 1}</td>
  <td>${item[1].contactName}</td>
  <td>${item[1].contactAdress}</td>
  <td>${item[1].contactEmail}</td>
  <td>${item[1].contactPhone}</td>
</tr>`;
    }).join("");
  });
}
renderContacts();

function categoriesDropDownRender() {
  onValue(catalogs, (snapshot) => {
    const data = snapshot.val();
    let catagorieArr = Object.entries(data);
    admin_dropdown_item_main.innerHTML = catagorieArr
      .map((item) => {
        return ` <div  class="admin_dropdown_item" id="admin_dropdown_item">
        ${item[1].bookType}
        </div>`;
      })
      .join("");

    const admin_dropdown_item = document.querySelectorAll(
      ".admin_dropdown_item"
    );
    admin_dropdown_item.forEach((item) =>
      item.addEventListener("click", function () {
        admin_dropdown_active_item.innerHTML = item.innerText;
        admin_dropdown_item_main.classList.remove("active");
      })
    );
  });
}

categoriesDropDownRender();

function categoriesSorter(categories) {
  let arr = [];
  onValue(catalogs, (snapshot) => {
    const data = snapshot.val();
    let catagorieArr = Object.entries(data);
    catagorieArr.forEach((item) => {
      arr.push(item[1].bookType);
    });

    if (!arr.includes(categories)) {
      push(catalogs, {
        bookType: admin_dropdown_active_item.innerText,
      });
    }
  });
}
