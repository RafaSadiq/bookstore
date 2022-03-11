import React from "react";
import { A } from 'hookrouter';

export default function NavBar() {
    return ( 
        <div className = 'nav-container'>
            <div className = 'nav-link-container'>
                <div className = 'nav-link'>
                    <A className = 'link' href = '/'>
                        Home
                    </A>
                </div>

                <div className = 'nav-link'>
                    <A className = 'link' href = '/addBook'>
                        Add-Book
                    </A>
                </div>

                <div className = 'nav-link'>
                    
                        <A className = 'link' href = '/signup'>
                            Signup
                        </A>
                </div>

                <div className = 'nav-link'>
                    <A onClick = {() => props.logout()} className = 'link' href = '/login'>
                        Login
                    </A>
                </div>
            </div>
        </div>
    )
}