const joinUsBtn = document.querySelector("#joinUsBtn");
const hamburgerMenu = document.querySelector("#hamburgerMenu");
const joinUsIcon = document.querySelector("#joinUsIcon");
const joinUsModal = document.querySelector("#joinUsModal");
const responsiveModal = document.querySelector("#responsiveModal");
const modalErrorMessage = document.querySelector("#modalErrorMessage");
const modalSuccessMessage = document.querySelector("#modalSuccessMessage");
const joinUsFullname = document.querySelector("#joinUsFullname");
const joinUsEmail = document.querySelector("#joinUsEmail");
const join = document.querySelector("#join");
const close_join_us = document.querySelector(".close_join_us");
const close = document.querySelector(".close");

function openJoinModal() {
  joinUsModal.style.display = "block";
  setTimeout(function () {
    joinUsModal.style.opacity = "1";
    joinUsModal.style.pointerEvents = "auto";
    joinUsModal.querySelector(".modal_content").style.transform =
      "translateY(0)";
  }, 50);
}

function closeJoinModal() {
  joinUsModal.style.opacity = "0";
  joinUsModal.style.pointerEvents = "none";
  joinUsModal.querySelector(".modal_content").style.transform =
    "translateY(-50px)";
  setTimeout(function () {
    joinUsModal.style.display = "none";
  }, 400);
}

joinUsIcon.addEventListener("click", openJoinModal);

joinUsBtn.addEventListener("click", openJoinModal);

hamburgerMenu.addEventListener("click", function () {
  responsiveModal.style.display = "block";
  setTimeout(function () {
    responsiveModal.style.right = "0";
    responsiveModal.style.opacity = "1";
  }, 10);
});

close.addEventListener("click", function () {
  responsiveModal.style.right = "0";
  responsiveModal.style.opacity = "0";
  setTimeout(function () {
    responsiveModal.style.display = "none";
  }, 300);
});

close_join_us.addEventListener("click", closeJoinModal);

window.addEventListener("click", function (e) {
  if (e.target == joinUsModal) {
    closeJoinModal();
  }
});
