
const options = document.querySelectorAll(".slider-catagories button");
options.forEach((element) => {
  element.addEventListener("click", function () {
    options.forEach((btn) => {
      btn.style.color = "";
    });
    element.style.color = "#e16a00";
  });
});
setTimeout(() => {
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
  
  
  });},1500)
