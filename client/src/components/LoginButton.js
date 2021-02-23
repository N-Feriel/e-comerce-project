import React from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import {HiOutlineUser} from 'react-icons/hi';
import { themeVars } from "../GlobalStyles";

const LoginButton = () => {

    const { loginWithRedirect } = useAuth0();

    return (
        <button
            onClick={() => loginWithRedirect()}
        >
            <HiOutlineUser size='20px' style={{color: `${themeVars.lavender}`}}/>

        </button>
    )
}


export default LoginButton;
