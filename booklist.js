//working of ui,console and application data
class Books {
    constructor(title, author, isbn) {
      this.title = title;
      this.author = author;
      this.isbn = isbn;
    }
  }
  
  // handling ui tasks
  class ui {
    static showbooks() {
      const books = Bookstore.fetchbooks();
  
      books.forEach((book) => ui.addbooktothelist(book));
    }
  
    static addbooktothelist(book) {
      const list = document.querySelector('#listofbooks');
  
      const row = document.createElement('tr');
  
      row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
      `;
  
      list.appendChild(row);
    }
  
    static deletethisbook(el) {
      if(el.classList.contains('delete')) {
        el.parentElement.parentElement.remove();
      }
    }
  
    static alertuser(message, className) {
      const div = document.createElement('div');
      div.className = `alert alert-${className}`;
      div.appendChild(document.createTextNode(message));
      const container = document.querySelector('.container');
      const form = document.querySelector('#formbook');
      container.insertBefore(div, form);
     
      setTimeout(() => document.querySelector('.alert').remove(), 3000);
    }
  
    static clearinput() {
      document.querySelector('#title').value = '';
      document.querySelector('#author').value = '';
      document.querySelector('#isbn').value = '';
    }
  }
  
  // handling local storage
  class Bookstore{
    static fetchbooks() {
      let books;
      if(localStorage.getItem('books') === null) {
        books = [];
      } else {
        books = JSON.parse(localStorage.getItem('books'));
      }
  
      return books;
    }
  
    static addbook(book) {
      const books = Bookstore.fetchbooks();
      books.push(book);
      localStorage.setItem('books', JSON.stringify(books));
    }
  
    static rmvbookfromapp(isbn) {
      const books = Bookstore.fetchbooks();
  
      books.forEach((book, index) => {
        if(book.isbn === isbn) {
          books.splice(index, 1);
        }
      });
  
      localStorage.setItem('books', JSON.stringify(books));
    }
  }
  
  // show books
  document.addEventListener('DOMContentLoaded', ui.showbooks);
  
  // adding books
  document.querySelector('#formbook').addEventListener('submit', (e) => {
    
    e.preventDefault();

    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const isbn = document.querySelector('#isbn').value;
  
    if(title === '' || author === '' || isbn === '') {
      ui.alertuser('Please fill in all fields', 'danger');
    } else {
    
      const book = new Books(title, author, isbn);
  
      
      ui.addbooktothelist(book);
       Bookstore.addbook(book);
       ui.alertuser('Book Added', 'success');
     ui.clearinput();
    }
  });
  
  // removing book
  document.querySelector('#listofbooks').addEventListener('click', (e) => {
   
    ui.deletethisbook(e.target);
      Bookstore.rmvbookfromapp(e.target.parentElement.previousElementSibling.textContent);
      ui.alertuser('Book Removed', 'success');
  });