import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import {FaUserAlt} from 'react-icons/fa';
import { themeVars } from "../GlobalStyles";


function LogoutButton() {

    const {logout}= useAuth0();

    return (
        <button
            onClick={()=> logout(
                {
                    returnTo: window.location.origin,
                }
            )}
        >
            <FaUserAlt size='20px' style={{color: `${themeVars.lavender}`}}/>
        </button>
    )
}

export default LogoutButton
