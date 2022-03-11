import React from "react";

export default function Book(props) {
    const {id, author, title, genre, review, price} = props.book;
    
    return (
        <div className = "book-container">
            <h1 className="title">{title}</h1>
            <div className="genre">{genre}</div>
            <div className="review">{review}</div>
            <div className="author">{author}</div>
            <div className="price">{price}</div>
            <br></br>
            <button onClick={() => props.handleEditClick(props.book)}>Edit</button>
        </div>
    ) 
}