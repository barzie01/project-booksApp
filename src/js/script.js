'use strict';
const bookTemplate = Handlebars.compile(document.querySelector('#template-book').innerHTML);
const booksList = document.querySelector('.books-list');
const books = dataSource.books;
const favoriteBooks = [];
console.log(booksList);
function render() {


  for (const book of books){
    // console.log(book);
    const generatedHTML = bookTemplate(book);
    // console.log(generatedHTML);
    const domElement = utils.createDOMFromHTML(generatedHTML);
    // console.log(thisBookList.element);
    booksList.appendChild(domElement);
  }
}
render();

function initActions () {
  const bookImage = booksList.querySelectorAll('.book__image');

  for (const book of bookImage) {
    book.addEventListener('dblclick', function(event) {
      event.preventDefault();

      book.classList.add('favorite');

      // get bookId of data-id
      const bookId = bookImage.getAttribute('data-id');

      // add bookId to favoriteBooks
      favoriteBooks.push(bookId);
    });
  }
}
initActions();
