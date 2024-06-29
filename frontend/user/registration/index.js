import updateNav from '../../base/functions.js';
import logout from '../../base/logout.js';

let email = document.querySelector('.email')
let password = document.querySelector('.pass')
let password2 = document.querySelector('.pass2')
let signup = document.querySelector('#signup-btn')

handleLogoutBtn();

// ============= EVENT LISTENERS ====================
// Add event listeners to inputs for validation
email.addEventListener('focusout', () => validateInput(email));
password.addEventListener('focusout', () => validateInput(password));
password2.addEventListener('focusout', () => validateInput(password2));

// -------------------------------------------------------
signup.addEventListener('click',()=>{
    let data = {
        'email':email.value,
        'password':password.value,
        'password2':password2.value
    }
    if(data.email==='' || data.password==='' || data.password2==='')
        {
            alert('Fields Can\'t be empty')
        }
    else{
        postData(data);
        window.location.href = '../login/index.html'; 

    }
})

// -------------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
    loadHTML('#navbar', '../../base/navbar.html', updateUser, updateNav);
});


// ============= FUNCTIONS ====================

function listenerLoginLogout(){
    let logoutBtn = document.querySelector('#logout');
    console.log('logout btn clicked')
    if(logoutBtn){
        logoutBtn.addEventListener('click',()=>{
            logout(localStorage);
            logoutBtn.id='login'
            logoutBtn.innerHTML='Login'
        })
    }

    let loginBtn = document.querySelector('#login');
    if(loginBtn){
        loginBtn.addEventListener('click',()=>{
            window.location.href = '/user/login/index.html'; 
        })
    }
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
// -------------------------------------------------------
function postData(data){
    fetch('http://127.0.0.1:8000/user/register/',{
        method:'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })  
    .then((response)=>{
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
    })
    .then((data)=>{
        return data;
    })
    .catch((e)=>{console.log('error', e)});
}

// -------------------------------------------------------
// Load HTML file
function loadHTML(selector, file, callback, updatenav) {
    fetch(file)
      .then(response => response.text())
      .then(data => {
        document.querySelector(selector).innerHTML = data;
        let loginLogoutBtn =  document.querySelector('.btn');
        console.log(loginLogoutBtn)
        if (callback) {
          callback();
        }
        if(updatenav)
        {
            let loginNav = document.querySelector('#login')
            let user = localStorage.getItem('user')
            updateNav(user, loginNav);
        }
      })
      .catch(error => console.error('Error loading HTML:', error));
  }


// -------------------------------------------------------
function validateInput(input){
    if(input.value===''){
        input = input.parentElement
        input.classList.remove('input-valid');
        input.classList.add('input-error');
    } else {
        if(input.classList.contains('pass2'))
        {
            let pass1 = password.value 
            let pass2 = input.value
            if(pass1!=pass2)
            {
                input = input.parentElement;
                input.classList.remove('input-valid');
                input.classList.add('input-error');
            }
            else{
                input = input.parentElement
                input.classList.remove('input-error');
                input.classList.add('input-valid');
            }
        }
        else{
            input = input.parentElement
            input.classList.remove('input-error');
            input.classList.add('input-valid');
        }
    }
}
// -------------------------------------------------------

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