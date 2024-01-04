class Book {
  constructor(code, title, publisher, publicationYear, author) {
    this.code = code;
    this.title = title;
    this.publisher = publisher;
    this.publicationYear = publicationYear;
    this.author = author;
  }
}

class Response {
  constructor(status, message, data) {
    this.status = status;
    this.message = message;
    this.data = data;
  }
}

class Validate {
  constructor() {}
  bookIsExist(listBook = [], book) {
    for (const tempBook of listBook) {
      if (tempBook.title == book.title) {
        return true;
      }
    }
    return false;
  }
  listBookIsEmpty(listBook = []) {
    if (listBook.length == 0) {
      return true;
    }
    return false;
  }
}

class BookService extends Validate {
  constructor() {
    super();
    this.listBook = [];
  }
  addBook(book) {
    if (this.bookIsExist(this.listBook, book)) {
      return console.log(new Response("403", "Book already exists", {}));
    } else {
      this.listBook.push(book);
      return console.log(
        new Response("Success", "Successfully added book", book)
      );
    }
  }
  getAllBook() {
    if (!this.listBookIsEmpty(this.listBook)) {
      return new Response("200", "Success Get All Book", this.listBook);
    } else {
      return new Response("200", "List is empty", {});
    }
  }
  searchByTitle(title) {
    let found = false;
    for (let i = 0; i < this.listBook.length; i++) {
      if (this.listBook[i].title.toLowerCase() === title.toLowerCase()) {
        console.log(
          new Response(
            "200",
            "Successfully search book by title",
            this.listBook[i]
          )
        );
        found = true;
        break;
      }
    }
    if (!found) {
      console.log(new Response("200", "Book not found", {}));
    }
  }
  deleteByTitle(title) {
    let deleted = false;
    for (let i = 0; i < this.listBook.length; i++) {
      if (this.listBook[i].title.toLowerCase() === title.toLowerCase()) {
        this.listBook.splice(i, 1);
        console.log(new Response("200", "Successfully delete book", {}));
        deleted = true;
        break;
      }
    }
    if (!deleted) {
      console.log(new Response("404", "Book not found for deletion", {}));
    }
  }
}

const main = () => {
  const bookService = new BookService();
  const novelA = new Book("A1", "Novel A", "Gramedia", 2022, "Septiar");
  const novelB = new Book("B1", "Novel B", "Gramedia", 2023, "Andre");
  const novelC = new Book("C1", "Novel C", "Gramedia", 2023, "Fab");
  const novelD = new Book("D1", "Novel D", "Gramedia", 2023, "Ryan");
  const novelE = new Book("E1", "Buku", "Gramedia", 2023, "Sendy");

  bookService.addBook(novelA);
  bookService.addBook(novelA);
  bookService.addBook(novelB);
  bookService.addBook(novelC);
  bookService.addBook(novelD);
  bookService.addBook(novelE);
  bookService.searchByTitle("Novel d");
  bookService.deleteByTitle("buku");
  console.log(bookService.getAllBook());
};

main();
