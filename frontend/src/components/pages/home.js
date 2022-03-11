import React, { useState, useEffect } from "react";
import axios from 'axios';
import Book from './books/book';
import Cookies from "js-cookie";

function Home(props) {
    // const [test, setTest] = useState('')
    // const [click, setClick] = useState('false')


    // return <div onClick={() => setClick(ture)}> This is the home Component. {click ? setTest('Click is True') : setTest('Click is False')}</div>
    const [allBooks, setAllBooks ] = useState([])

    useEffect(() => {
        getAllBooks();
    },[])

    const getAllBooks = () => {
        axios
            .get ('http://localhost:5000/books')
            .then(res => {
                console.log(res.data)
                setAllBooks(res.data)
            })
            .catch(error => {
                console.log(`An error has occured with your API 'GET' request --> ${error}`);
            });

    }

    const renderBooks = () => {
        const books = allBooks.map(book => {
            return <div key = {book.id}><Book book={book} /></div>
        })

        return books;
    }



    return (
        <div className = "home-container">
            <h3>Welcome {props.loggedIn ? Cookies.get('username') : ''}</h3>
            <div>{renderBooks()}</div>
        </div>
    )
}

export default Home