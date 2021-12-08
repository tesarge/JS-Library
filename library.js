

// Whole library will be stored as objects in an array
let myLibrary = [];

// object constructor to create books
class Book {
    constructor(title, author, pages){
    this.title = title
    this.author = author
    this.pages = pages
    }
};

//Class for user interaction
class bookshelf {
    static displayBooks() {
       
        const books = Store.getBooks();
        //Populates preloaded books to bookshelf
        books.forEach((book) => bookshelf.addBookToLibrary(book));
    }
    
    static addBookToLibrary(book) {
        const bookshelf = document.querySelector("#bookshelf");

        const bookcard = document.createElement("div");
        bookcard.setAttribute("class","book-card");
        //Applies input to client side cards
        bookcard.innerHTML = `
        <h2>${book.title}</h2>
        <p>${book.author}</p>
        <p>${book.pages} pages</p>
        <button type="button" class="btn btn-warning delete">Remove</button>
        `;

        bookshelf.appendChild(bookcard);
    }
    // Removes book card by removing parent element of remove button
    static deleteBook(element) {
        if(element.classList.contains('delete')) {
            element.parentElement.remove();
        }
    }
    //Clears input fields after user submits entry
    static clearInput() {
        document.querySelector("#input-title").value = '';
        document.querySelector("#input-author").value = '';
        document.querySelector("#input-pages").value = '';
    }
}
//Displays books when page is loaded
document.addEventListener('DOMContentLoaded', bookshelf.displayBooks)

//Add book from client with user input
document.querySelector("#form").addEventListener('submit', (i) => {
    i.preventDefault();
    const title =document.querySelector('#input-title').value;
    const author = document.querySelector('#input-author').value;
    const pages = document.querySelector('#input-pages').value;

    //User input is required through HTML

    // Create object from user input
    const book = new Book(title, author, pages)

    // Adds book object to bookshelf 
    bookshelf.addBookToLibrary(book);

    //Add book to storage
    Store.addBook(book);

    bookshelf.clearInput();
})

//Remove book card by targeting bookshelf div
document.querySelector("#bookshelf").addEventListener('click', (i) => {
    bookshelf.deleteBook(i.target);

    Store.removeBook(i.target.parentElement.previousElementSibling.textContent);
});

//Local Storage options
class Store {
    static getBooks() {
        let books;
        if(localStorage.getItem('books') === null) {
            books = [];
        } else {
            books = JSON.parse(localStorage.getItem('books'));
        }

        return books;
    }

    static addBook(book) {
        const books = Store.getBooks();

        books.push(book);

        localStorage.setItem('books', JSON.stringify(books))
    }

    static removeBook(title) {
        const books = getBooks();

        books.forEach((book, index) => {
            if(book.title === title){
                books.splice(index, 1)
            }
        });

        localStorage.setItem('books', JSON.stringify(books));
    }
}


