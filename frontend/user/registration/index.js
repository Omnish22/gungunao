let email = document.querySelector('.email')
let password = document.querySelector('.pass')
let password2 = document.querySelector('.pass2')
let signup = document.querySelector('#signup-btn')
let login = document.querySelector('#login-btn')

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
        console.log('data\n', data);
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
        if(input.classList.contains('pass2'))
        {
            pass1 = password.value 
            pass2 = input.value
            if(pass1!=pass2)
            {
                console.log('pass1 not equal to pass2')
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


// Add event listeners to inputs for validation
email.addEventListener('focusout', () => validateInput(email));
password.addEventListener('focusout', () => validateInput(password));
password2.addEventListener('focusout', () => validateInput(password2));

signup.addEventListener('click',()=>{
    data = {
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
    }
})


// Load HTML file
function loadHTML(selector, file) {
    fetch(file)
        .then(response => response.text())
        .then(data => {
            document.querySelector(selector).innerHTML = data;
        })
        .catch(error => console.error('Error loading HTML:', error));
}

document.addEventListener('DOMContentLoaded', () => {
    loadHTML('#navbar', '../../base/navbar.html');
});

