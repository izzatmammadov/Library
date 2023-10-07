// https://www.googleapis.com/books/v1/volumes?q=qaraqan

searchBtn.addEventListener("click", async function () {
  let bookName = searchInput.value;
  searchInput.value = "";
  let bookData = await getBooks(bookName);
  renderSearchResults(bookData);
});

let id;

async function getBooks(bookName) {
  try {
    let response = await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=${bookName}`
    );
    let bookData = await response.json();
    return bookData;
  } catch (error) {
    console.log(error);
  }
}

async function renderSearchResults(bookData) {
  console.log(bookData.items);
  if (bookData.items === undefined) {
    document.querySelector(".alert").classList.add("alertActive");
    setTimeout(function () {
      document.querySelector(".alert").classList.remove("alertActive");
    }, 2000);

    return;
  }
  let renderData = bookData.items.map((book) => {
    return ` <div>
            <img src="../assets/photos/clock.svg" alt="clock">
            <p onclick="getBookDetail('${book.id}')"> ${
      book.volumeInfo?.authors?.[0] == undefined
        ? " "
        : book.volumeInfo?.authors?.[0]
    } ${
      book.volumeInfo.title == undefined
        ? " "
        : book.volumeInfo?.title?.slice(0, 15)
    }...</p>
            
        </div>`;
  });

  searchHistory.classList.remove("d-none");
  searchHistory.innerHTML = renderData.join("");
}

function upperCase(str) {
  return str[0].toUpperCase() + str.slice(1);
}
addTypeBtn.addEventListener("click", function () {
  admin_dropdown_active_item.innerText = upperCase(addTypeInput.value);
  addTypeInput.value = "";
});
let globalBookDetail;
async function getBookDetail(bookId) {
  searchHistory.classList.add("d-none");
  id = bookId;
  let res = await fetch(
    `https://www.googleapis.com/books/v1/volumes/${bookId}`
  );
  let bookDetail = await res.json();
  globalBookDetail = bookDetail;
  bookNameInput.value =
    bookDetail.volumeInfo?.title == undefined
      ? " "
      : bookDetail.volumeInfo?.title;
  authorNameInput.value =
    bookDetail.volumeInfo?.authors[0] == undefined
      ? " "
      : bookDetail.volumeInfo?.authors[0];
  bookImageUrlInput.value =
    bookDetail.volumeInfo?.imageLinks?.thumbnail == undefined
      ? " "
      : bookDetail.volumeInfo?.imageLinks?.thumbnail;
  bookDescInput.value =
    bookDetail.volumeInfo?.description == undefined
      ? " "
      : removeTags(bookDetail.volumeInfo?.description);
  console.log(bookDetail);
}
function removeTags(str) {
  if (str === null || str === "") return " ";
  else str = str.toString();
  return str.replace(/(<([^>]+)>)/gi, "");
}
imgUrlInput.addEventListener("change", function (e) {
  const url = URL.createObjectURL(e.target.files[0]);
  bookImageUrlInput.value = url;
});
