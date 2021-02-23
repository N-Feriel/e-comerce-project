import { useAuth0 } from '@auth0/auth0-react';
import React from 'react';


function Profile() {

    const { user, isAuthenticated } = useAuth0();

    return (
        <div>
            {JSON.stringify(user, null, 2)}
        </div>
    )
}

export default Profile
