import updateNav from "../base/functions.js"
// LOAD THE NAVBAR USING JS
export function loadHTML(selector, file){
    fetch(file)
    .then(response => response.text())
    .then(data => {
        document.querySelector(selector).innerHTML = data;
        let loginNav = document.querySelector('#login')
        let user = localStorage.getItem('user')
        updateNav(user, loginNav);
    })
    .catch(error => console.error('Error loading HTML:', error))
}

export default loadHTML;