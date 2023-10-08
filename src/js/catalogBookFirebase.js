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

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const books = ref(db, "books");
const catalogs = ref(db, "catalogs");

let globalBooksArr;

function catalogRender() {
  const slider_catagories = document.querySelector(".slider-catagories");
  onValue(catalogs, (snapshot) => {
    const catalogData = snapshot.val();
    let catalogDataToArr = Object.entries(catalogData);
    let catalogItem = catalogDataToArr
    .map(
        (item) =>
          `
          <button class="catalogTypeBtn">${item[1].bookType}</button>
            `
      )
      .join("");

      slider_catagories.innerHTML = catalogItem;


      const catalogTypeBtn=document.querySelectorAll(".catalogTypeBtn");
      console.log(catalogTypeBtn);
      catalogTypeBtn.forEach(element => {
          element.addEventListener("click", () =>{
           
           setTimeout(() => {
            sort(globalBooksArr,element.innerText)
           }, 2000);
          })
      });

  });
}


catalogRender();



const sliderCard = document.querySelector(".swiper-wrapper");
function detailRender() {
  onValue(books, (snapshot) => {
    const bookData = snapshot.val();
    let bookDataToArr = Object.entries(bookData);
    globalBooksArr=bookDataToArr
    sliderCard.innerHTML = bookDataToArr
      .map(
        (item) =>   ` <div class="swiper-slide">
        <div class="slider_main_card">
          <div class="slider-card">
            <img class="books-img" src="${item[1].bookImageUrl}" alt="" />
            <p>${item[1].bookTitle}</p>
            <p>${item[1].bookDesc}</p>
            <button>Read more</button>
          </div>
        </div>
        </div>
            `
      )
      .join("");
     
  });
  
}
detailRender();
function sort(arr,type) {
if(type=="All"){
  sliderCard.innerHTML = arr
  .map(
    (item) =>` <div class="swiper-slide">
    <div class="slider_main_card">
      <div class="slider-card">
        <img class="books-img" src="${item[1].bookImageUrl}" alt="" />
        <p>${item[1].bookTitle}</p>
        <p>${item[1].bookDesc}</p>
        <button>Read more</button>
      </div>
    </div>
    </div>
        `
  )
  .join("");



  return
}


 let newarr= arr.filter((item)=>{
   return item[1].bookType==type
  })
console.log(newarr);
  sliderCard.innerHTML = newarr
  .map(
    (item) => `<div class="swiper-slide">
    <div class="slider_main_card">
      <div class="slider-card">
        <img class="books-img" src="${item[1].bookImageUrl}" alt="" />
        <p>${item[1].bookTitle}</p>
        <p>${item[1].bookDesc}</p>
        <button>Read more</button>
      </div>
    </div>
    </div>
        `
  )
  .join("");
  }
