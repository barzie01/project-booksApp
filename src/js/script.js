{
  'use strict';

  const select = {
    templateOf: {
      bookTemplate: '#template-book',
    },
    containerOf: {
      booksList: '.books-list',
    },
    imageOf: {
      bookImage: '.book__image',
    },
  };

  const classNames = {
    books: {
      favoriteBook: 'favorite',
    },
  };


  const bookTemplate = Handlebars.compile(document.querySelector(select.templateOf.bookTemplate).innerHTML);
  const booksList = document.querySelector(select.containerOf.booksList);
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
    const bookImage = booksList.querySelectorAll(select.imageOf.bookImage);
    console.log(bookImage);

    for (let image of bookImage) {

      // book = booksList.querySelector('.book');
      image.addEventListener('dblclick', function(event) {
        event.preventDefault();

        image.classList.add(classNames.books.favoriteBook);

        // get bookId of data-id
        const bookId = image.getAttribute('data-id');

        // add bookId to favoriteBooks
        favoriteBooks.push(bookId);
      });
    }
  }
  initActions();
}
