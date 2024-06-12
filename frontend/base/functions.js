export function updateNav(user, loginNav) {
    if (user) {
        loginNav.id = 'logout';
        loginNav.innerHTML = 'Logout';
    } else {
        loginNav.id = 'login';
        loginNav.innerHTML = 'Login';
    }
}



export default updateNav;