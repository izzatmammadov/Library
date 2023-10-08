
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries
  import {
    getDatabase,
    ref,
    set,
    push,
    onValue,
    remove,
  } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-database.js";
  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyBjUeKUH3MpDlxQgfX6FM6lZMXNsvR_Ouk",
    authDomain: "ourproject-e7f72.firebaseapp.com",
    databaseURL: "https://ourproject-e7f72-default-rtdb.firebaseio.com",
    projectId: "ourproject-e7f72",
    storageBucket: "ourproject-e7f72.appspot.com",
    messagingSenderId: "202148445701",
    appId: "1:202148445701:web:45845c3f69709c9ec5e66c"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const db = getDatabase(app);


  const inputSearch=document.querySelector("#inputSearch")
  const inputBtn=document.querySelector("#inputBtn")
  const swiperWrapper=document.querySelector(".swiper-wrapper")
const emptyResult=document.querySelector(".emptyResult")
const books=ref(db,"books")
  onValue(books, (snapshot) => {
    const data = snapshot.val();
    let booksArr=Object.entries(data)
    console.log(booksArr);
inputBtn.addEventListener("click", function () {
if(inputSearch.value.trim()==""){
  emptyResult.classList.add("alert_active")
  setTimeout(()=>{emptyResult.classList.remove("alert_active")},1500)
  return
}

    bookSearchRender(booksArr,inputSearch.value)
    inputSearch.value=""
})

  });
  const notFoundAlert=document.querySelector(".notFound");
  function bookSearchRender(arr,bookName) { 
    // console.log(arr);
 let newBooksArr =arr.filter((book)=>{
 

return book[1].bookTitle.toLowerCase().includes(bookName.toLowerCase())||book[1].authorName.toLowerCase().includes(bookName.toLowerCase());

  
})

if (newBooksArr.length==0) {
  notFoundAlert.classList.add("alert_active")
  setTimeout(()=>{notFoundAlert.classList.remove("alert_active")},1500)
 

  swiperWrapper.innerHTML=`  <div class="swiper-slide">
    <div class="box2">
      <div class="book1">
        <img
          class="book"
          src="../assets/photos/book_1.svg"
          alt="book"
        />
      </div>
      <div class="book_title">
        <h2 class="book_name">Order in Chaos</h2>
        <p class="author">Konstantin Koptelov</p>
        <p class="title">
          We work without holidays and weekends! Residents of Kiev can
          receive an order on the day of its registration. Customers
          from other cities of Ukraine can receive an order within 1-5
          days, depending on the location of the settlement and the
          selected delivery method. Orders over UAH 1000 are delivered
          free of charge *. You can see the available methods, exact
          terms and cost of delivery during checkout in the order
          basket, after selecting the delivery city
        </p>
      </div>
    </div>
  </div>`
return
}


swiperWrapper.innerHTML=newBooksArr.map((item)=>{
    return` <div class="swiper-slide">
    <div class="box2">
      <div class="book1">
        <img
          class="book"
          src="${item[1].bookImageUrl}"
          alt="book"
        />
      </div>
      <div class="book_title">
        <h2 class="book_name">${item[1].bookTitle}</h2>
        <p class="author">${item[1].authorName }</p>
        <p class="title">
      ${item[1].bookDesc}
        </p>
      </div>
    </div>
  </div>`
}).join("")


console.log(newBooksArr);
   }