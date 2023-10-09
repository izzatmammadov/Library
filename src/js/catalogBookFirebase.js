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
    // console.log(catalogTypeBtn);
    catalogTypeBtn.forEach((element) => {
      element.addEventListener("click", () => {
        sort(globalBooksArr, element.innerText)
        element.addEventListener("click", function () {
          catalogTypeBtn .forEach((btn) => {
            btn.style.color = "";
          });
          element.style.color = "#e16a00";
        });
      });
    });
  });
}

catalogRender();

const sliderCard = document.querySelector(".first-slider");

function detailRender() {
  const swiper = new Swiper('.swiper', {
    // Optional parameters
    direction: 'horizontal',
    loop: true,
    slidesPerView: 1 ,
    grid: {
      rows: 1,
    },
  
    breakpoints: {
      
        640: {
          slidesPerView: 2,
        },
        1024: {
          slidesPerView: 3,
        },
        1280: {
            slidesPerView: 4,
          },
          1300: {
            slidesPerView: 5,
          },
      },
    
    mousewheel: {
      forceToAxis: true,
    },
  
    // Navigation arrows
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  
  
  });




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
  const swiper = new Swiper('.swiper', {
    // Optional parameters
    direction: 'horizontal',
    loop: true,
    slidesPerView: 1 ,
    grid: {
      rows: 1,
    },
  
    breakpoints: {
      
        640: {
          slidesPerView: 2,
        },
        1024: {
          slidesPerView: 3,
        },
        1280: {
            slidesPerView: 4,
          },
          1300: {
            slidesPerView: 5,
          },
      },
    
    mousewheel: {
      forceToAxis: true,
    },
  
    // Navigation arrows
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  
  
  });





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