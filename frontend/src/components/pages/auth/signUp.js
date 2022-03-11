import React, { useState, useEffect } from "react";
import cookies from 'js-cookie';

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

        if(userName === '' || password === '' || confirmPassword === '') {
            setError(true);
            setErrorMessage('Error: All fields must be completed.')
        } else if(password !== confirmPassword) {
            setError(true);
            setErrorMessage('Error: Passwords must match!')
        } else {
            fetch('http://localhost:3000/user', {
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

                if(res === "Error: the username you've entered has been taken") {
                    setError(true);
                    setErrorMessage("Error: the username you've entered has been taken")
                } else {
                    setError(false);
                    setErrorMessage('');
                    cookies.set('username', username);
                    navigate('/');
                }
            })
        }
    }

    return (
        <div className = "signup-container">
            <form>
                <input type = "text" placeholder = "Username" name = "username" value = {username} onChange = {(e) => setUsername(e.target.value)} />
                <input type = "text" placeholder = "Password" name = "password" value = {password} onChange = {(e) => setPassword(e.target.value)} />
                <input type = "text" placeholder = "Confirm Password" name = "confirmpassword" value = {confirmPassword} onChange = {(e) => setConfirmPassword(e.target.value)} />

                <button className = "btn">
                    Submit
                </button>
            </form>
        </div>
    )
}