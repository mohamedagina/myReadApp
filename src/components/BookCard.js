import React, { useState } from 'react';

const BookCard = ({ book, handleChangeShelf }) => {
  const { shelf, imageLinks, title, authors } = book;
  const [currentShelf, setShelf] = useState(shelf);

  const changeShelf = e => {
    e.preventDefault();
    setShelf(e.target.value);
    handleChangeShelf(e.target.value, book);
  };
  return (
    <div className="book">
      <div className="book-top">
        <div
          className="book-cover"
          style={{
            width: 128,
            height: 193,
            backgroundImage: `url(${
              (imageLinks &&
                (imageLinks.smallThumbnail || imageLinks.thumbnail)) ||
              ''
            })`
          }}
        ></div>
        <div className="book-shelf-changer">
          <select value={currentShelf || 'none'} onChange={changeShelf}>
            <option value="move" disabled>
              Move to...
            </option>
            <option value="currentlyReading">Currently Reading</option>
            <option value="wantToRead">Want to Read</option>
            <option value="read">Read</option>
            <option value="none">None</option>
          </select>
        </div>
      </div>
      <div className="book-title">{title}</div>
      <div className="book-authors">
        {authors && authors.map(author => `${author}\n`)}
      </div>
    </div>
  );
};

export default BookCard;
