// // Import the functions you need from the SDKs you need
// import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
// import {
//   getDatabase,
//   ref,
//   set,
//   push,
//   onValue,
//   remove,
// } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-database.js";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyBjUeKUH3MpDlxQgfX6FM6lZMXNsvR_Ouk",
//   authDomain: "ourproject-e7f72.firebaseapp.com",
//   databaseURL: "https://ourproject-e7f72-default-rtdb.firebaseio.com",
//   projectId: "ourproject-e7f72",
//   storageBucket: "ourproject-e7f72.appspot.com",
//   messagingSenderId: "202148445701",
//   appId: "1:202148445701:web:45845c3f69709c9ec5e66c",
// };

// const app = initializeApp(firebaseConfig);
// const db = getDatabase(app);
// const books = ref(db, "books");

// function detailRender() {
//   const sliderCard = document.querySelector(".slider-1");
//   onValue(books, (snapshot) => {
//     const bookData = snapshot.val();
//     let bookDataToArr = Object.entries(bookData);
//     let bookItem = bookDataToArr
//       .map(
//         (item) =>
//           `
//         <div class="slider_main_card">
//           <div class="slider-card">
//             <img class="books-img" src="${item[1].bookImageUrl}" alt="" />
//             <p>${item[1].bookTitle}</p>
//             <p>${item[1].bookDesc}</p>
//             <button>Read more</button>
//           </div>
//         </div>
//             `
//       )

//       sliderCard.innerHTML = bookItem.join("");
//   });
// }

// detailRender()
