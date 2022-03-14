import React, { useState, useEffect } from 'react';
import { useRoutes } from 'hookrouter';
import Home from "./pages/home";
import NavBar from './navigation/navBar';
import AddBook from './pages/addbook';
import SignUp from './pages/auth/signUp';
import LogIn from './pages/auth/login';
import Cookies from 'js-cookie';

export default function App() {
    const [ loggedIn, setLoggedIn ] = useState(false)

    useEffect(() => {
        if(Cookies.get('username')) {
           setLoggedIn(true) 
        }
    })

    const logout = () => {
        Cookies.remove('username')
        setLoggedIn(false)
    }

    const routes = {
        '/': () => <Home loggedIn = { loggedIn } />,
        '/addbook': () => <AddBook request = {'add'} />,
        '/signup': () => <SignUp />,
        '/login': () => <LogIn />

    }

    const routeResult = useRoutes(routes)

        return (
            <div className = 'app'>
                <NavBar logout = { logout } />
                {routeResult}
                
            </div>
        );
}

