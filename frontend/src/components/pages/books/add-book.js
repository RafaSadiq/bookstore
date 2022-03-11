import React, { useState, useEffect } from 'react';

export default function AddBook(props) {
    const [ title, setTitle ] = useState('');
    const [ author, setAuthor ] = useState('');
    const [ review, setReview ] = useState('');
    const [ genre, setGenre ] = useState('');
    const [ price, setPrice ] = useState('');
    const [ requestType, setRequestType ] = useState(props.request);
    const [ request, setRequest ] = useState('');
    const [ bookToEdit, setBookToEdit ] = useState('');
    const [ endPoint, setEndPoint ] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        fetch(endPoint, {
            method: request,
            headers: {
                "content-type": "applications/json"
            },

            body: JSON.stringify({
                title: title,
                author: author,
                review: review,
                genre: genre,
                price: price
            })
        }).then(res => {
            if(props.edit === true) {
                props.handleEditSubmit();
            }
        })
    }

    useEffect( () => {
        if(requestType === 'add') {
            setEndPoint('http://localhost:5000/book');
            setRequest('POST');
        } else if (requestType === 'update') {
            // setEndPoint(`http://localhost:5000/book/${bookToEdit.id}`); 
            setRequest('PUT');
                if(bookToEdit) {
                    setTitle(bookToEdit.title);
                    setAuthor(bookToEdit.author);
                    setReview(bookToEdit.review);
                    setGenre(bookToEdit.genre);
                    setPrice(bookToEdit.price)
                }
        }
        
    }, [])

    return (
        <div className = "add-book-container">
            <h3>Add-Book</h3>

            <form className='book-form' onsubmit = {(e) => handleSubmit(e)}>
                <div className='book-form-inputs'>
                    <input type = "text" placeholder = "Title" name = "title" onChange = {(e) => setTitle(e.target.value)} defaultValue = {bookToEdit ? bookToEdit.title : ''} />
                    <input type = "text" placeholder = "Author" name = "password" onChange = {(e) => setAuthor(e.target.value)} defaultValue = {bookToEdit ? bookToEdit.author : ''} />
                    <input type = "text" placeholder = "Review" name = "review" onChange = {(e) => setReview(e.target.value)} defaultValue = {bookToEdit ? bookToEdit.review : ''} />
                    <input type = "text" placeholder = "Genre" name = "genre" onChange = {(e) => setGenre(e.target.value)} defaultValue = {bookToEdit ? bookToEdit.genre : ''} />
                    <input type = "text" placeholder = "Price" name = "price" onChange = {(e) => setPrice(e.target.value)} defaultValue = {bookToEdit ? bookToEdit.price : ''} />
                </div>

                <button className = "btn" >
                    Submit
                </button>
            </form>
        </div>
    )
}