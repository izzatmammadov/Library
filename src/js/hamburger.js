const sectionLeft = document.querySelector(".left");
const closeBtn = document.querySelector("#closeBtn");
const hamburgerOn = document.querySelector("#hamburger");

hamburgerOn.addEventListener("click", function () {
  sectionLeft.style.display = "block";
});

closeBtn.addEventListener("click", function () {
  sectionLeft.style.display = "none";
});
