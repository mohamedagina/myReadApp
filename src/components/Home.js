import React, { Component } from 'react';
import BookCard from './BookCard';

export default class Home extends Component {
  shelfs = [
    { id: 'sh0', name: 'Currently Reading', value: 'currentlyReading' },
    { id: 'sh1', name: 'Want to Read', value: 'wantToRead' },
    { id: 'sh2', name: 'Read', value: 'read' }
  ];

  render() {
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        {this.shelfs.map(shelf => {
          const filteredBooks = this.props.books.filter(
            book => book.shelf.toLowerCase() === shelf.value.toLowerCase()
          );
          return (
            <div key={shelf.id} className="list-books-content">
              <div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">{shelf.name}</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                      {filteredBooks.map(book => (
                        <BookCard
                          handleChangeShelf={this.props.handleChangeShelf}
                          key={book.id}
                          book={book}
                        />
                      ))}
                    </ol>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
        <div className="open-search">
          <button onClick={() => this.props.history.push('/search')}>
            Add a book
          </button>
        </div>
      </div>
    );
  }
}
