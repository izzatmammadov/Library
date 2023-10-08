const swiper = new Swiper(".swiper", {
    direction: "horizontal",
    loop: true,
   
    slidesPerView: 1,
    speed:800,
    // slidesPerGroup: 1,
    grid: {
        rows: 1,
      },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },

  });
