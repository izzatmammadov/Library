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
// const mainSection=document.querySelector(".mainSection");
// const bookDetailPage=document.querySelector(".bookDetailPage")

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

    const catalogTypeBtn = document.querySelectorAll(".catalogTypeBtn");
    console.log(catalogTypeBtn);
    catalogTypeBtn.forEach((element) => {
      element.addEventListener("click", () => {
        sort(globalBooksArr, element.innerText);
      });
    });
  });
}

catalogRender();

const sliderCard = document.querySelector(".first-slider");
function detailRender() {
  onValue(books, (snapshot) => {
    const bookData = snapshot.val();
    let bookDataToArr = Object.entries(bookData);
    globalBooksArr = bookDataToArr;
    sliderCard.innerHTML = bookDataToArr
      .map((item) => {
        if (item[1].isNew == true) {
          return `  <div class="swiper-slide">
  <div class="slider_main_card">
      <div class="slider-card new-book">
        <img class="new-icon" src="../assets/icons/new-icon.svg" alt="" />
        <img class="books-img" src="${item[1].bookImageUrl}" alt="" />
        <p>${item[1].bookTitle}</p>
        <p>${item[1].bookDesc}</p>
        <button class="readMoreBtn" data-id="${item[0]}">Read more</button>
      </div>
    </div>
</div>`;
        }
        return ` <div class="swiper-slide">
          <div class="slider_main_card">
            <div class="slider-card">
              <img class="books-img" src="${item[1].bookImageUrl}" alt="" />
              <p>${item[1].bookTitle}</p>
              <p>${item[1].bookDesc}</p>
              <button class="readMoreBtn" data-id="${item[0]}" >Read more</button>
            </div>
          </div>
          </div>
              `;
      })
      .join("");

    const readMoreBtn = document.querySelectorAll(".readMoreBtn");
    readMoreBtn.forEach((i) => {
      i.addEventListener("click", function (e) {
        // console.log(e.target.dataset.id);
        renderDetailPage(e.target.dataset.id);
      });
    });
  });
}

detailRender();
function sort(arr, type) {
  if (type == "All") {
    sliderCard.innerHTML = arr
      .map((item) => {
        return ` <div class="swiper-slide">
        <div class="slider_main_card">
          <div class="slider-card">
            <img class="books-img" src="${item[1].bookImageUrl}" alt="" />
            <p>${item[1].bookTitle}</p>
            <p>${item[1].bookDesc}</p>
            <button class="readMoreBtn" data-id="${item[0]}">Read more</button>
          </div>
        </div>
        </div>
            `;
      })
      .join("");
    const readMoreBtn = document.querySelectorAll(".readMoreBtn");
    readMoreBtn.forEach((i) => {
      i.addEventListener("click", function (e) {
        // console.log(e.target.dataset.id);
        renderDetailPage(e.target.dataset.id);
      });
    });
    return;
  }

  let newarr = arr.filter((item) => {
    return item[1].bookType == type;
  });
  console.log(newarr);
  sliderCard.innerHTML = newarr
    .map((item) => {
      if (item[1].isNew == true) {
        return `  <div class="swiper-slide">
            <div class="slider_main_card">
                <div class="slider-card new-book">
                  <img class="new-icon" src="../assets/icons/new-icon.svg" alt="" />
                  <img class="books-img" src="${item[1].bookImageUrl}" alt="" />
                  <p>${item[1].bookTitle}</p>
                  <p>${item[1].bookDesc}</p>
                  <button class="readMoreBtn" data-id="${item[0]}">Read more</button>
                </div>
              </div>
          </div>`;
      }
      return `<div class="swiper-slide">
          <div class="slider_main_card">
            <div class="slider-card">
              <img class="books-img" src="${item[1].bookImageUrl}" alt="" />
              <p>${item[1].bookTitle}</p>
              <p>${item[1].bookDesc}</p>
              <button class="readMoreBtn" data-id="${item[0]}">Read more</button>
            </div>
          </div>
          </div>
              `;
    })
    .join("");
  const readMoreBtn = document.querySelectorAll(".readMoreBtn");
  readMoreBtn.forEach((i) => {
    i.addEventListener("click", function (e) {
      // console.log(e.target.dataset.id);
      renderDetailPage(e.target.dataset.id);
    });
  });
  //   if(newarr.length <= 5){
  //     document.querySelector(".admin_slider_class").classList.add("no_active")
  // }else{
  //     document.querySelector(".admin_slider_class").classList.remove("no_active")
  // }
}

const secondSlider = document.querySelector(".second-slider");
function detailRenderSecondSlider() {
  onValue(books, (snapshot) => {
    const bookData = snapshot.val();
    let bookDataToArr = Object.entries(bookData);
    secondSlider.innerHTML = bookDataToArr
      .map((item) => {
        if (item[1].isNew == true) {
          return `  <div class="swiper-slide">
  <div class="slider_main_card">
      <div class="slider-card new-book">
        <img class="new-icon" src="../assets/icons/new-icon.svg" alt="" />
        <img class="books-img" src="${item[1].bookImageUrl}" alt="" />
        <p>${item[1].bookTitle}</p>
        <p>${item[1].bookDesc}</p>
        <button class="readMoreBtn" data-id="${item[0]}">Read more</button>
      </div>
    </div>
</div>`;
        }
        return ` <div class="swiper-slide">
          <div class="slider_main_card">
            <div class="slider-card">
              <img class="books-img" src="${item[1].bookImageUrl}" alt="" />
              <p>${item[1].bookTitle}</p>
              <p>${item[1].bookDesc}</p>
              <button class="readMoreBtn" data-id="${item[0]}">Read more</button>
            </div>
          </div>
          </div>
              `;
      })
      .join("");
    const readMoreBtn = document.querySelectorAll(".readMoreBtn");
    readMoreBtn.forEach((i) => {
      i.addEventListener("click", function (e) {
        // console.log(e.target.dataset.id);
        renderDetailPage(e.target.dataset.id);
      });
    });
  });
}
detailRenderSecondSlider();
const sliderfornew = document.querySelector(".sliderfornew");
function detailRenderNewsSlider() {
  onValue(books, (snapshot) => {
    const bookData = snapshot.val();
    let bookDataToArr = Object.entries(bookData);
    sliderfornew.innerHTML = bookDataToArr
      .map((item) => {
        if (item[1].isNew == true) {
          return `  <div class="swiper-slide">
  <div class="slider_main_card">
      <div class="slider-card new-book">
        <img class="new-icon" src="../assets/icons/new-icon.svg" alt="" />
        <img class="books-img" src="${item[1].bookImageUrl}" alt="" />
        <p>${item[1].bookTitle}</p>
        <p>${item[1].bookDesc}</p>
        <button class="readMoreBtn" data-id="${item[0]}">Read more</button>
      </div>
    </div>
</div>`;
        }
      })
      .join("");
    const readMoreBtn = document.querySelectorAll(".readMoreBtn");
    readMoreBtn.forEach((i) => {
      i.addEventListener("click", function (e) {
        // console.log(e.target.dataset.id);
        renderDetailPage(e.target.dataset.id);
      });
    });
  });
}
detailRenderNewsSlider();
function renderDetailPage(id) {
  window.location.href = `../pages/book.html#id=${id}`;
}

// function renderDetailPage(booksId){
// console.log(booksId);
// onValue(books, (snapshot) => {
//   const data = snapshot.val();
//   let newArr=Object.entries(data)
//  console.log(newArr);
// newArr.forEach((item) => {
//   let bookYear=item[1].bookPublishDate.split("-")[0]
//   const today = new Date();
//   const year = today.getFullYear();
//   const month = String(today.getMonth() + 1)<10?"0"+String(today.getMonth() + 1):String(today.getMonth() + 1);
//   // console.log(month);
//   const day = String(today.getDate())<10?"0"+String(today.getDate()):String(today.getDate());
//   // console.log(day);
//   const formattedDate = `${year}-${month}-${day}`;

//   // console.log(formattedDate);

// // console.log(formattedDate);
// console.log(item[1].addedTime);
//   let dateDifference=calculateDateDifference(item[1].addedTime, formattedDate);
//   // console.log(bookYear);
//   if (item[0]==booksId){
// mainSection.classList.add("d-none")
// bookDetailPage.classList.remove("d-none")
// bookDetailPage.innerHTML=` <div class="bookAbout">
// <div class="container">
//   <button id="backBtn" class="btnBack">
//     <i class="fa-solid fa-angle-left"></i> back
//   </button>
//   <div class="box d-flex justify-content-between">
//     <div class="bookProduct">
//       <div class="bookInfo"> <!--firebase info-->
//         <p class="bookYear">${bookYear}</p>
//         <h2 class="bookName">${item[1].bookTitle}</h2>
//         <p class="bookDateOfAdded">${dateDifference}  ago added</p>
//         <h3 class="authorSName">${item[1].authorName}</h3>
//         <p class="bookDetails">
//           ${item[1].bookDesc}
//         </p>
//         <button class="moreDetails"></button>
//       </div>
//       <div class="bookComment">
//         <form action="">
//           <div class="form">
//             <input
//               class="anonimComment"
//               type="text"
//               placeholder="Your anonim comment..."
//             />
//             <button class="commentAdd">
//               <img
//                 class="commentAddIcon"
//                 src="../assets/photos/send.svg"
//                 alt=""
//               />
//             </button>
//             <p id="commentErrorMessage">Fill in the fields corectly!</p>

//             <div class="errorBox"></div>
//             <div class="userComment">
//               <ul class="userCommentUl"></ul>
//             </div>
//           </div>
//         </form>
//       </div>
//     </div>
//     <div class="bookImg">
//       <img
//         class="book"
//         src="${item[1].bookImageUrl}"
//         alt=""
//       />
//      ${item[1].isNew===true? `<span class="new">new</span>`:""}
//     </div>
//   </div>
// </div>
// </div>`

// }})
// const backBtn=document.querySelector("#backBtn")
// backBtn.addEventListener("click",function(){
//   mainSection.classList.remove("d-none")
// bookDetailPage.classList.add("d-none")
// location.reload()
// })
// });
// }
// function calculateDateDifference(date1, date2) {

//   const startDate = new Date(date1);
//   const endDate = new Date(date2);

//   const timeDifference = endDate - startDate;

//   const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

//   if (daysDifference >= 30) {
//     if (daysDifference >= 365) {

//       const yearsDifference = Math.floor(daysDifference / 365);
//       return `${yearsDifference}years`; ;
//     } else {

//       const monthsDifference = Math.floor(daysDifference / 30);
//       return `${monthsDifference}months`;
//     }
//   } else {

//     return daysDifference;
//   }
// }
