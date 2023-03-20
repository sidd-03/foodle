const user_is_authenticated = () => {               // check login, different pages displayed for logged in users
    return localStorage.getItem('token');
}

const user_logout = () => {                         // Delete tokens on logout
    localStorage.removeItem('token');
    localStorage.removeItem('user_type');
}

const user_type = () => {                           // checking whether the user is a buyer or vendor
    return localStorage.getItem('user_type');
}

export { user_is_authenticated, user_type, user_logout };