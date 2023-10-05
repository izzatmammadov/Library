let commentInput = document.querySelector(".anonimComment");
let commentAdd = document.querySelector(".commentAdd");
let userCommentUl = document.querySelector(".userCommentUl");
let userCommentLi = document.querySelector(".userCommentLi");
let moreDetails = document.querySelector(".moreDetails");
let bookDetails = document.querySelector(".bookDetails");
let points = document.querySelector(".points");
let errorBox = document.querySelector(".errorBox");
let backBtn = document.querySelector("#backBtn");
let commentErrorMessage = document.querySelector("#commentErrorMessage");

const date = new Date();
const hours = date.getHours();
const minut = date.getMinutes();
const day = date.getDate();
const month = date.getMonth() + 1;
const year = date.getFullYear();

// For back location
backBtn.addEventListener("click", function () {
  window.history.back();
});
//

const commentData = {
  comments: [],
  date: new Date(),
};

commentAdd.addEventListener("click", function () {
  event.preventDefault();

  if (commentInput.value == "") {
    commentErrorMessage.style.display = "block";
    setTimeout(() => {
      commentErrorMessage.style.display = "none";
    }, 1500);
    return;
  }
  errorBox.style.opacity = "0";
  addComment(commentInput.value);
});

function addComment(commentText) {
  const timestamp = new Date();
  commentData.comments.push({
    text: commentText,
    timestamp: timestamp,
  });

  showComments();
  commentInput.value = "";
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

function showComments() {
  userCommentUl.innerHTML = "";

  commentData.comments.forEach(function (comment) {
    let newUserCommentLi = document.createElement("li");
    newUserCommentLi.className = "userCommentLi";
    const formattedTimestamp = formatTimestamp(comment.timestamp);

    newUserCommentLi.innerHTML = `<p><span class="anonim">*****</span> <span>${formattedTimestamp}</span></p><p>${comment.text}</p>`;
    userCommentUl.appendChild(newUserCommentLi);
    userCommentUl.lastElementChild.style.marginBottom = "0";
  });
}
