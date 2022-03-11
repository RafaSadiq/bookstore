import React, { useState, useEffect } from "react";
import axios from 'axios';
import Book from './books/book';
import Cookies from "js-cookie";
import AddBook from "./books/add-book";

function Home(props) {
    const [allBooks, setAllBooks ] = useState([]);
    const [bookToEdit, setBookToEdit ] = useState([]);
    const [editMode, setEditMode ] = useState(false);
    
    const getAllBooks = () => {
        axios.get ('http://localhost:5000/books')
            .then(res => {
                console.log(res.data)
                setAllBooks(res.data)
            })
            .catch(error => {
                console.log(`An error has occured with your API 'GET' request --> ${error}`);
            });
    }

    const handleEditClick = (book) => {
        setBookToEdit(book);
        setEditMode(true);
    }

    const handleEditSubmit = () => {
        setEditMode(false);
        setAllBooks();
    }

    const renderBooks = () => {
        const books = allBooks.map(book => {
            return <div key = {book.id}><Book book={book} handleEditClick = {handleEditClick}/></div>
        })

        return books;
    }

    useEffect(() => {
        getAllBooks();
    },[])

    return (
        <div className = "home-container">
            <h3>{props.loggedIn ? `${Cookies.get("username")}, Welcome to our bookstore!` : 'Welcome'}</h3>
            <div>{editMode ? <AddBook book={bookToEdit} edit={editMode} request={'update'} handleEditSubmit={handleEditSubmit}/> : renderBooks()}</div>
        </div>
    )
}

export default Home