import React from 'react'
import './Login.css'
import { Button } from '@material-ui/core';

// importing auth, provider from local file firebase
import { auth, provider } from "../firebase"

function Login() {
    const signIn = () => {
        // to get window pop up of sign in with google
        // if user cancel that popup window.
        // and now need to handle redirect 
        auth.signInWithPopup(provider).catch((error) => alert(error.message));
    }
    return (
        <div className="login">
            <div className="login_logo">
                <img
                    src="https://www.nicepng.com/png/full/26-264048_discord.png"
                    alt="discord-logo"
                />
            </div>

            <Button onClick={signIn}>Sign In</Button>
        </div>
    )
}

export default Login
