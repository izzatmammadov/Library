let commentInput = document.querySelector(".anonimComment");
let commentAdd = document.querySelector(".commentAdd");
let userCommentUl = document.querySelector(".userCommentUl");
let userCommentLi = document.querySelector(".userCommentLi");
let moreDetails = document.querySelector(".moreDetails");
let bookDetails = document.querySelector(".bookDetails");
let points = document.querySelector(".points");
let errorBox = document.querySelector(".errorBox");
let backBtn = document.querySelector("#backBtn");

const date = new Date();
const hours = date.getHours();
const minut = date.getMinutes();
const day = date.getDate();
const month = date.getMonth() + 1;
const year = date.getFullYear();


backBtn.addEventListener("click", function(){window.history.back();})
// Add new comment


let commentData = {
  comments: [], 
  date: new Date(), 
};

// Add new comment
commentAdd.addEventListener("click", function (e) {
  e.preventDefault();

  if (commentInput.value) {
    errorBox.style.opacity = "0";
    addComment(commentInput.value);
  } else {
    errorBox.style.opacity = "1";
    errorBox.innerText = "Empty comment";
    errorBox.style.textAlign = "center";
  }
});

function addComment(commentText) {
  commentData.comments.push({
    text: commentText,
    timestamp: new Date(),
  });

  showComments();

  commentInput.value = "";
}

function showComments() {
  commentData.comments.forEach(function (comment) {
    let newUserCommentLi = document.createElement(`li`);
    newUserCommentLi.className = "userCommentLi";
    newUserCommentLi.innerHTML = `<p><span class="anonim">anonim </span><span>${comment.timestamp.getHours()}:${comment.timestamp.getMinutes()} ${comment.timestamp.getDate()}/${
    comment.timestamp.getMonth() + 1
    }/${comment.timestamp.getFullYear()}</span></p><p>${comment.text}</p>`;

    userCommentUl.appendChild(newUserCommentLi);
    userCommentUl.insertBefore(newUserCommentLi, userCommentUl.firstChild);
    userCommentUl.lastElementChild.style.marginBottom = "0";
  });
}

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
console.log(moreDetails.innerText);

console.log();
