import React from 'react'

const Logout = () => {
    //remove the data from localstorage on logout
    localStorage.removeItem('user');
    window.location = '/';
    return (
        <div>

        </div>
    )
}

export default Logout
