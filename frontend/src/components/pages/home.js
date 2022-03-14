import React, { useState, useEffect } from "react";
import axios from 'axios';
import Book from './books/book';
import Cookies from "js-cookie";
import AddBook from "./addbook";

function Home(props) {
    const [allBooks, setAllBooks ] = useState([]);
    const [loggedIn, setLoggedIn] = useState(false);
    const [bookToEdit, setBookToEdit ] = useState([]);
    const [editMode, setEditMode ] = useState(false);
    
    const getAllBooks = () => {
        axios.get ('http://127.0.0.1:5000/books')
            .then(res => {
                // console.log(res.data)
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

    const handleDeleteClick = (id) => {

        axios.delete(`http://127.0.0.1:5000/books/delete/${id}`)
        .then(res => {
            setAllBooks(allBooks.filter(book => {
                return book.id !== id;
            }))
        })
        .catch(error => {
            console.log('An error has occured while trying to delete your book.', error);
        })
    }

    const renderBooks = () => {
        const books = allBooks.map(book => {
            return <div key = {book.id}><Book book={book} handleEditClick = {handleEditClick}/></div>
        })

        return books;
    }

    useEffect(() => {
        getAllBooks();
        if(Cookies.get('username')) {
            setLoggedIn(true);
        }
    },[]);

    return (
        <div className = "home-container">
            <h3>{props.loggedIn ? `${Cookies.get("username")}, Welcome to our bookstore!` : 'Welcome'}</h3>
            <div>{editMode ? <AddBook book={bookToEdit} edit={editMode} request={'update'} handleEditSubmit={handleEditSubmit}/> : renderBooks()}</div>
        </div>
    )
}

export default Home