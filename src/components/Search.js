import React, { Component } from 'react';
import { search } from '../BooksAPI';
import BookCard from './BookCard';

export default class Search extends Component {
  state = {
    query: [],
    searchRes: []
  };

  handleChangeQuery = e => {
    e.preventDefault();
    this.setState({ query: e.target.value }, () => {
      if (this.state.query) {
        search(this.state.query).then(res => {
          if (!res.error) {
            res = res.map(book => {
              const shelfedBook = this.props.shelfedBooks.find(
                item => item.id === book.id
              );
              if (shelfedBook) book = shelfedBook;
              return book;
            });
            this.setState({ searchRes: res });
          } else this.setState({ searchRes: [] });
        });
      } else this.setState({ searchRes: [] });
    });
  };
  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <button
            className="close-search"
            onClick={() => this.props.history.push('/')}
          >
            Close
          </button>
          <div className="search-books-input-wrapper">
            {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
            <input
              value={this.state.query}
              onChange={this.handleChangeQuery}
              type="text"
              placeholder="Search by title or author"
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {this.state.searchRes &&
              this.state.searchRes.map(book => (
                <BookCard
                  key={book.id}
                  book={book}
                  handleChangeShelf={this.props.handleChangeShelf}
                />
              ))}
          </ol>
        </div>
      </div>
    );
  }
}
