// "use strict";
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

let books = ref(db, "books");
const bookAbout = document.querySelector(".bookAbout");
let currentId = window.location.hash.split("=")[1];
renderBookDetail(currentId);

// console.log(currentId);
function renderBookDetail(booksId) {
  // console.log(booksId);
  onValue(books, (snapshot) => {
    const data = snapshot.val();
    let newArr = Object.entries(data);
    // console.log(newArr);
    newArr.forEach((item) => {
      let bookYear = item[1].bookPublishDate.split("-")[0];
      const today = new Date();
      const year = today.getFullYear();
      const month =
        String(today.getMonth() + 1) < 10
          ? "0" + String(today.getMonth() + 1)
          : String(today.getMonth() + 1);
      // console.log(month);
      const day =
        String(today.getDate()) < 10
          ? "0" + String(today.getDate())
          : String(today.getDate());
      // console.log(day);
      const formattedDate = `${year}-${month}-${day}`;

      // console.log(formattedDate);

      // console.log(formattedDate);
      // console.log(item[1].addedTime);
      let dateDifference = calculateDateDifference(
        item[1].addedTime,
        formattedDate
      );
      // console.log(bookYear);
      if (item[0] == booksId) {
        bookAbout.innerHTML = ` <div class="bookAbout">
<div class="container">
  <a href="./catalog.html"> <button id="backBtn" class="btnBack">
    <i class="fa-solid fa-angle-left"></i> back
  </button></a>
  <div class="box d-flex justify-content-between">
    <div class="bookProduct">
      <div class="bookInfo"> <!--firebase info-->
        <p class="bookYear">${bookYear}</p>
        <h2 class="bookName">${item[1].bookTitle}</h2>
        <p class="bookDateOfAdded">${dateDifference}  ago added</p>
        <h3 class="authorSName">${item[1].authorName}</h3>
        <p class="bookDetails">
          ${item[1].bookDesc}
        </p>
        <button class="moreDetails"></button>
      </div>
      <div class="bookComment">
        
          <div class="form">
            <input
              class="anonimComment"
              type="text"
              placeholder="Your anonim comment..."
            />
            <button class="commentAdd">
              <img
                class="commentAddIcon"
                src="../assets/photos/send.svg"
                alt=""
              />
            </button>
            <p id="commentErrorMessage">Fill in the fields corectly!</p>

            <div class="errorBox"></div>
            <div class="userComment">
              <ul id="userCommentUl"  class="userCommentUl"></ul> 
            </div>
          </div>
       
      </div>
    </div>
    <div class="bookImg"> 
      <img
        class="book"
        src="${item[1].bookImageUrl}"
        alt=""
      />
     ${item[1].isNew === true ? `<span class="new">new</span>` : ""}
    </div>
  </div>
</div>
</div>`;
      }
    });
  
    
    let backBtn = document.querySelector("#backBtn");
    let moreDetails = document.querySelector(".moreDetails");
    let bookDetails = document.querySelector(".bookDetails");
    let points = document.querySelector(".points");
    let commentErrorMessage = document.querySelector("#commentErrorMessage");
    let commentAdd = document.querySelector(".commentAdd");
    let commentInput = document.querySelector(".anonimComment");
    let errorBox = document.querySelector(".errorBox");
    let userCommentUl = document.querySelector(".userCommentUl");
    backBtn.addEventListener("click", function () {
      // window.history.back();
      window.location.href = "../pages/book.html";
      // console.log(backBtn);
    });

    commentAdd.addEventListener("click", async function () {
      if (commentInput.value.trim() == "") {
        commentErrorMessage.style.display = "block";
        setTimeout(() => {
          commentErrorMessage.style.display = "none";
        }, 1500);
        return;
      }
    

      errorBox.style.opacity = "0";

      const timestamp = new Date();
      let commentData = {
        text: commentInput.value,
        timestamp: formatTimestamp(timestamp),
        bookId: currentId,
      };
      commentInput.value = "";
      await post(commentData);
      renderComments();  
  
    });

    //  console.log(userCommentUl);
     async function renderComments() {
    // console.log(userCommentUl);
      let comments = await get();
      console.log(comments);
      if (comments[comments.length - 1].id <= 100) {
        // console.log("false");
        userCommentUl.classList.add("d-none");
      } else {
        userCommentUl.classList.remove("d-none");
    
        userCommentUl.innerHTML = comments.filter((item)=>item.id>100).filter((item)=>item.bookId==currentId).reverse().map((item) => {
          return `<li class="userCommentLi" style="margin-bottom: 0px;">
          <p><span class="anonim">*****</span> <span>${item.timestamp}</span></p>
          <p>${item.text}</p>
          </li>`;
        }).join("");
    
        console.log(comments);
      }
    }
    renderComments()



// More Details
let bookDetailsHeight = bookDetails.style.maxHeight;
bookDetailsHeight = "262px";
if (bookDetails.clientHeight < 262) {
  moreDetails.style.display = "none";
} else {
  if (bookDetailsHeight) {
    moreDetails.textContent = "Show More";
  } else {
    moreDetails.textContent = "Show Less";
  }
}
moreDetails.addEventListener("click", function () {
  if (bookDetails.style.maxHeight) {
    bookDetails.style.maxHeight = null;
    moreDetails.textContent = "Show More";
  } else {
    bookDetails.style.maxHeight = bookDetails.scrollHeight + "px";
    moreDetails.textContent = "Show Less";
  }
});




  });
}

function calculateDateDifference(date1, date2) {
  const startDate = new Date(date1);
  const endDate = new Date(date2);

  const timeDifference = endDate - startDate;

  const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

  if (daysDifference >= 30) {
    const yearsDifference = Math.floor(daysDifference / 365);
    const monthsDifference = Math.floor((daysDifference % 365) / 30);
    
    if (yearsDifference > 0) {
      return `${yearsDifference} years and ${monthsDifference} months`;
    } else {
      return `${monthsDifference} months`;
    }
  } else {
    return `${daysDifference} days`;
  }
}


function formatTimestamp(timestamp) {
  const now = new Date();
  const diffInDays = Math.floor((now - timestamp) / (24 * 60 * 60 * 1000));
  if (diffInDays === 0) {
    // Comment was posted today
    const hours = timestamp.getHours();
    const minutes = timestamp.getMinutes();
    return `${hours < 10 ? "0" + hours : hours}:${
      minutes < 10 ? "0" + minutes : minutes
    } today`;
  } else if (diffInDays === 1) {
    const hours = timestamp.getHours();
    const minutes = timestamp.getMinutes();
    return `${hours}:${minutes} yesterday`;
  } else {
    const day = timestamp.getDate();
    const month = timestamp.getMonth() + 1;
    const year = timestamp.getFullYear();
    return `${day}/${month}/${year}`;
  }
}

const url = "https://blog-api-t6u0.onrender.com/posts/";
//-----API methods-----
//GET func()
async function get() {
  try {
    let respons = await fetch(url, {
      method: "GET",
    });
    let data = await respons.json();

    return data;
  } catch (error) {
    console.log("Error: " + error);
  }
}
//POST func()
async function post(form) {
  try {
    let respons = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });
    let data = await respons.json();

    return data;
  } catch (error) {
    console.log("Error: " + error);
  }
}
