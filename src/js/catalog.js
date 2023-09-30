// Slider
const options = document.querySelectorAll(".slider-catagories button");
options.forEach((element) => {
  element.addEventListener("click", function () {
    options.forEach((btn) => {
      btn.style.color = "";
    });
    element.style.color = "orange";
  });
});
const swiper = new Swiper(".swiper", {
  // Optional parameters
  direction: "horizontal",
  slidesPerView: 1,
  loop: true,
  grid: {
    rows: 1,
  },
  breakpoints: {
    300: {
      slidesPerView: 1,
    },
    640: {
      slidesPerView: 2,
    },
    960: {
      slidesPerView: 3,
    },
    1024: {
      slidesPerView: 4,
    },
  },

  // If we need pagination
  pagination: {
    el: ".swiper-pagination",
  },

  // Navigation arrows
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },

  // And if we need scrollbar
  // scrollbar: {
  //   el: ".swiper-scrollbar",
  // },
  mousewheel: {
    forceToAxis: true,
  },
});
