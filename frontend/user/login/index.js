import updateNav from "../../base/functions.js"
import logout from "../../base/logout.js"


let email = document.querySelector('.email')
let password = document.querySelector('.pass')
let loginBtn = document.querySelector('#login-btn')
let userNav = document.querySelector('#user')
let loginNav;

//============ FUNCTION CALLED ===========


handleLogoutBtn();


//=========== EVENT LISTENERS ============
// Add event listeners to inputs for validation
email.addEventListener('focusout', () => validateInput(email));
password.addEventListener('focusout', () => validateInput(password));

loginBtn.addEventListener('click',()=>{
    let email_value = email.value
    let password_value = password.value
    
    let data = {
        'email':email_value,
        'password':password_value
    }
    if(data.email==='' || data.password==='')
        {

            alert('Fields Can\'t be empty')
        }
    else{

        login(data, email_value);
    }
})






// ========= FUNCTIONS ================
// CREATE EVENT LISTENER FOR LOGOUT
function handleLogoutBtn() {
    document.addEventListener('click', (event) => {
        console.log(event.target)
        // Check if the clicked element or its parent is the logout button
        if (event.target.id === 'logout' || event.target.closest('#logout')) {
            logout(localStorage);
            setTimeout(() => {
                window.location.reload();
            }, 100); // Delay of 100 milliseconds
        }
    });
}

// LOAD THE NAVBAR USING JS
function loadHTML(selector, file, callback){
    fetch(file)
    .then(response => response.text())
    .then(data => {
        document.querySelector(selector).innerHTML = data;
        loginNav = document.querySelector('#login')
        let user = localStorage.getItem('user')
        updateNav(user, loginNav);
        if (callback){
            callback();
        }
    })
    .catch(error => console.error('Error loading HTML:', error))
}

document.addEventListener('DOMContentLoaded', () => {
    console.log('page loaded')
    loadHTML('#navbar', '../../base/navbar.html', updateUser);

});

// THIS METHOD WILL POST THE DATA TO LOGIN API ENDPOINT
function login(data, email_value){
    fetch("http://127.0.0.1:8000/user/login/",{
        method:'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then((response)=>{
        if(!response.ok){
            throw new Error('Network response was not ok ' + response.statusText);
        }
        console.log(response)
        return response.json();
    
    })
    .then((data)=>{
        localStorage.setItem('refreshToken',data.refresh)
        console.log('refresh: ', data.refresh)
        console.log('access: ', data.access)
        localStorage.setItem('accessToken',data.access)
        localStorage.setItem('user',email_value.split('@')[0])
        console.log(email)
        resetInput(email)
        resetInput(password)
        loginNav.id='logout'
        loginNav.innerHTML = 'Logout'
        window.location.href = '/home/home.html'; 
        return data;
    })
    .catch((e)=>{console.log('error', e)});
}   

function validateInput(input){
    if(input.value===''){
        input = input.parentElement
        input.classList.remove('input-valid');
        input.classList.add('input-error');
    } else {
        
            input = input.parentElement
            input.classList.remove('input-error');
            input.classList.add('input-valid');
    }
}

function resetInput(input){
    input.value = ''
    input = input.parentElement
    input.classList.remove('input-error');
    input.classList.remove('input-valid');
}


function updateUser() {
    const usernameElement = document.getElementById('username');
    const user = localStorage.getItem('user');

    if (user) {
      usernameElement.textContent = user; // Assuming userData has a username property
      // usernameElement.href = '/user/profile.html'; // Update href to user's profile or another appropriate page
    } else {
      usernameElement.textContent = '';
    }


}