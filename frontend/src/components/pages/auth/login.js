import React, { useState, useEffect } from "react";
import Cookies from 'js-cookie';

export default function SignUp() {
    // Take user input
    // Send a request to API to add user
    // need 2 inputs with event listners tracking inrouted data

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [error, setError] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault();

        if(userName === '' || password === '') {
            setError(true);
            setErrorMessage('Error: All fields must be completed.')
        } else {
            fetch(`http://localhost:5000/user`, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({
                    username: username,
                    password: password
                })
            })
            .then(res => res.json())
            .then(res => {

                if(res === "Error: User NOT verified") {
                    setError(true);
                    setErrorMessage("Error: User NOT verified")
                } else if(res === "User has been verified") {
                    setError(false);
                    setErrorMessage('');
                    Cookies.set('username', username);
                    navigate('/');
                }
            })
        }
    }

    return (
        <div className = "login-container">
            <form onSubmit = { (e) => handleSubmit(e) }>
                <input type = "text" placeholder = "Username" name = "username" value = {username} onChange = {(e) => setUsername(e.target.value)} />
                <input type = "text" placeholder = "Password" name = "password" value = {password} onChange = {(e) => setPassword(e.target.value)} />

                <button className = "btn">
                    Submit
                </button>
            </form>
        </div>
    )
}