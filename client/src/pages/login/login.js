import React from "react";
import LoginButton from './../../components/LoginButton/LoginButton';

export default function Login(){
    return(
        <div>
            <h1 className="login-title">Welcome to linguini</h1>
            <p>The language learning app</p>
            <LoginButton />
        </div>
    )
}


