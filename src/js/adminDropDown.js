// selector
let admin_dropdown_active_item = document.querySelector(
  "#admin_dropdown_active_item"
);
let admin_dropdown_item_main = document.querySelector(
  "#admin_dropdown_item_main"
);
let add_book_type = document.querySelector("#add_book_type");
let add_book = document.querySelector(".add_book");
// event
admin_dropdown_active_item.addEventListener("click", function () {
  admin_dropdown_item_main.classList.toggle("active");
});

let admin_book_overlay = document.querySelector("#admin_book_overlay");

add_book_type.addEventListener("click", function (e) {
  e.preventDefault();
  admin_book_overlay.classList.add("show");
});
add_book.addEventListener("click", function () {
  admin_book_overlay.classList.remove("show");
});
