/* global Handlebars, utils, dataSource */ // eslint-disable-line no-unused-vars
{
  'use strict';

  const select = {
    templateOf: {
      bookTemplate: '#template-book',
    },
    containerOf: {
      booksList: '.books-list',
      form: '.filters form',
    },
    imageOf: {
      bookImage: '.book__image',
    },
  };

  const classNames = {
    books: {
      favoriteBook: 'favorite',
      hidden: 'hidden',
    },
  };


  const bookTemplate = Handlebars.compile(document.querySelector(select.templateOf.bookTemplate).innerHTML);
  const booksList = document.querySelector(select.containerOf.booksList);
  const books = dataSource.books;
  const favoriteBooks = [];
  // console.log(booksList);
  const filters = [];
  const form = document.querySelector(select.containerOf.form);

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

    booksList.addEventListener('dblclick', function(event) {
      event.preventDefault();

      // console.log(event.target.offsetParent);

      if(!event.target.offsetParent.classList.contains(classNames.books.favoriteBook)){

        event.target.offsetParent.classList.add(classNames.books.favoriteBook);

        // get bookId of data-id
        const bookId = event.target.offsetParent.getAttribute('data-id');

        // add bookId to favoriteBooks
        favoriteBooks.push(bookId);
      } else {
        const indexOfBookId = favoriteBooks.indexOf('data-id');
        favoriteBooks.splice(indexOfBookId, 1);

        event.target.offsetParent.classList.remove(classNames.books.favoriteBook);
      }

    });

    form.addEventListener('click', function(event){

      // console.log(event.target.tagName);

      if(event.target.tagName == 'INPUT' && event.target.type == 'checkbox' && event.target.name == 'filter'){
        console.log(event.target.value);
      }

      if(event.target.checked == true){
        filters.push(event.target.value);

      } else {
        const valueIndex = filters.indexOf(event.target.value);
        filters.splice(valueIndex, 1);
      }
      filterBooks();
    });
  }
  initActions();

  function filterBooks() {
    for (let book of books) {
      let shouldBeHidden = false;

      for (const filter of filters){

        if(!book.details[filter]){
          shouldBeHidden = true;
          break;
        }
      }
      const bookCover = document.querySelector('.book__image[data-id="' + book.id + '"]');

      if(shouldBeHidden) {
        bookCover.classList.add(classNames.books.hidden);
      } else {
        bookCover.classList.remove(classNames.books.hidden);
      }
    }
  }
}

