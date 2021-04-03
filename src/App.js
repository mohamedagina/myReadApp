import React from 'react';
import * as BooksAPI from './BooksAPI';
import './App.css';
import { Switch, Route } from 'react-router-dom';

import Home from './components/Home';
import Search from './components/Search';

class BooksApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: []
    };
  }

  componentDidMount() {
    BooksAPI.getAll().then(res => this.setState({ books: res }));
  }

  handleChangeShelf = (shelf, book) => {
    const newShelf = shelf;
    const modBook = { ...book, shelf: newShelf };
    let modBooks = this.state.books;
    modBooks.find(item => item.id === book.id)
      ? (modBooks[modBooks.indexOf(book)] = modBook)
      : modBooks.push(modBook);

    BooksAPI.update(book, newShelf);
    this.setState({ books: modBooks });
  };

  render() {
    return (
      <>
        <Switch>
          <Route
            exact
            path="/"
            render={props => (
              <Home
                {...props}
                books={this.state.books}
                handleChangeShelf={this.handleChangeShelf}
              />
            )}
          />
          <Route
            exact
            path="/search"
            render={props => (
              <Search
                {...props}
                shelfedBooks={this.state.books}
                handleChangeShelf={this.handleChangeShelf}
              />
            )}
          />
        </Switch>
        <div className="app"></div>
      </>
    );
  }
}

export default BooksApp;
