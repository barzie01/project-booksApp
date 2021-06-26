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

  const templates = {
    bookTemplate : Handlebars.compile(document.querySelector(select.templateOf.bookTemplate).innerHTML),
  };


  // const booksList = document.querySelector(select.containerOf.booksList);
  // const books = dataSource.books;

  // const form = document.querySelector(select.containerOf.form);

  class BooksList {
    constructor() {
      const thisBooksList = this;

      thisBooksList.initData();
      thisBooksList.getElements();
      thisBooksList.render();
      thisBooksList.initActions();
    }

    initData() {
      const thisBooksList = this;
      thisBooksList.data = dataSource.books;
      thisBooksList.favoriteBooks = [];
      thisBooksList.filters = [];
    }

    getElements() {
      const thisBooksList = this;

      thisBooksList.dom = {};

      thisBooksList.dom.booksList   = document.querySelector(select.containerOf.booksList);
      thisBooksList.dom.form = document.querySelector(select.containerOf.form);
    }

    render() {
      const thisBooksList = this;

      for (const book of this.data){

        const ratingBgc = thisBooksList.determineRatingBgc(book.rating);
        const ratingWidth = book.rating * 10;
        const generatedHTML = templates.bookTemplate({
          id: book.id,
          name: book.name,
          price: book.price,
          image: book.image,
          rating: book.rating,
          ratingBgc,
          ratingWidth,
        });

        const domElement = utils.createDOMFromHTML(generatedHTML);
        thisBooksList.dom.booksList.appendChild(domElement);
      }
    }

    initActions() {
      const thisBooksList = this;

      thisBooksList.dom.booksList.addEventListener('dblclick', function(event) {
        event.preventDefault();

        // console.log(event.target.offsetParent);

        if(!event.target.offsetParent.classList.contains(classNames.books.favoriteBook)){

          event.target.offsetParent.classList.add(classNames.books.favoriteBook);

          // get bookId of data-id
          const bookId = event.target.offsetParent.getAttribute('data-id');

          // add bookId to favoriteBooks
          thisBooksList.favoriteBooks.push(bookId);
        } else {
          const indexOfBookId = thisBooksList.favoriteBooks.indexOf('data-id');
          thisBooksList.favoriteBooks.splice(indexOfBookId, 1);

          event.target.offsetParent.classList.remove(classNames.books.favoriteBook);
        }

      });

      thisBooksList.dom.form.addEventListener('click', function(event){

        // console.log(event.target.tagName);

        if(event.target.tagName == 'INPUT' && event.target.type == 'checkbox' && event.target.name == 'filter'){
          console.log(event.target.value);
        }

        if(event.target.checked == true){
          thisBooksList.filters.push(event.target.value);

        } else {
          const valueIndex = thisBooksList.filters.indexOf(event.target.value);
          thisBooksList.filters.splice(valueIndex, 1);
        }
        thisBooksList.filterBooks();
      });
    }

    filterBooks() {
      const thisBooksList = this;

      for (let book of this.data) {
        let shouldBeHidden = false;

        for (const filter of thisBooksList.filters){

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

    determineRatingBgc(rating) {
      let background = '';

      if(rating < 6) {
        background = 'linear-gradient(to bottom,  #fefcea 0%, #f1da36 100%);';
      }

      else if (rating > 6 && rating <= 8) {
        background = 'linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%);';
      }

      else if (rating > 8 && rating <= 9) {
        background = 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%);';
      }

      else if (rating > 9) {
        background = 'linear-gradient(to bottom, #ff0084 0%, #ff0084 100%);';
      }
      return background;
    }

  }

  // eslint-disable-next-line no-unused-vars
  const app = new BooksList();

  // function render() {


  //   for (const book of this.data){

  //     const ratingBgc = determineRatingBgc(book.rating);
  //     const ratingWidth = book.rating * 10;
  //     const generatedHTML = templates.bookTemplate({
  //       id: book.id,
  //       name: book.name,
  //       price: book.price,
  //       image: book.image,
  //       rating: book.rating,
  //       ratingBgc,
  //       ratingWidth,
  //     });

  //     const domElement = utils.createDOMFromHTML(generatedHTML);
  //     thisBooksList.dom.booksList.appendChild(domElement);
  //   }
  // }

  // function initActions () {

  //   thisBooksList.dom.booksList.addEventListener('dblclick', function(event) {
  //     event.preventDefault();

  //     // console.log(event.target.offsetParent);

  //     if(!event.target.offsetParent.classList.contains(classNames.books.favoriteBook)){

  //       event.target.offsetParent.classList.add(classNames.books.favoriteBook);

  //       // get bookId of data-id
  //       const bookId = event.target.offsetParent.getAttribute('data-id');

  //       // add bookId to favoriteBooks
  //       favoriteBooks.push(bookId);
  //     } else {
  //       const indexOfBookId = favoriteBooks.indexOf('data-id');
  //       favoriteBooks.splice(indexOfBookId, 1);

  //       event.target.offsetParent.classList.remove(classNames.books.favoriteBook);
  //     }

  //   });

  //   thisBooksList.dom.form.addEventListener('click', function(event){

  //     // console.log(event.target.tagName);

  //     if(event.target.tagName == 'INPUT' && event.target.type == 'checkbox' && event.target.name == 'filter'){
  //       console.log(event.target.value);
  //     }

  //     if(event.target.checked == true){
  //       filters.push(event.target.value);

  //     } else {
  //       const valueIndex = filters.indexOf(event.target.value);
  //       filters.splice(valueIndex, 1);
  //     }
  //     filterBooks();
  //   });
  // }

  // function filterBooks() {
  //   for (let book of this.data) {
  //     let shouldBeHidden = false;

  //     for (const filter of filters){

  //       if(!book.details[filter]){
  //         shouldBeHidden = true;
  //         break;
  //       }
  //     }
  //     const bookCover = document.querySelector('.book__image[data-id="' + book.id + '"]');

  //     if(shouldBeHidden) {
  //       bookCover.classList.add(classNames.books.hidden);
  //     } else {
  //       bookCover.classList.remove(classNames.books.hidden);
  //     }
  //   }
  // }

  //   function determineRatingBgc (rating) {
  //     let background = '';

  //     if(rating < 6) {
  //       background = 'linear-gradient(to bottom,  #fefcea 0%, #f1da36 100%);';
  //     }

  //     else if (rating > 6 && rating <= 8) {
  //       background = 'linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%);';
  //     }

  //     else if (rating > 8 && rating <= 9) {
  //       background = 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%);';
  //     }

//     else if (rating > 9) {
//       background = 'linear-gradient(to bottom, #ff0084 0%, #ff0084 100%);';
//     }
//     return background;
//   }
}
