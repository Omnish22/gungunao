export function logout(localStorage){
    console.log('logout refresh token :',localStorage.getItem('refreshToken'))
    console.log('logout access token :',localStorage.getItem('accessToken'))
    logoutRequest(localStorage)
    
}

// THIS METHOD WILL POST THE DATA TO LOGIN API ENDPOINT
function logoutRequest(localStorage){
    fetch("http://127.0.0.1:8000/user/logout/", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        },
        body: JSON.stringify({ 'refresh': localStorage.getItem('refreshToken') })
    })
    .then(response => {
        if (!response.ok) {
            return response.json().then(errData => { throw new Error(`Network response was not ok: ${errData.detail}`); });
        }
    })
    .then(data => {
        console.log('Removing tokens from localStorage');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('accessToken');
        localStorage.removeItem('user');
        console.log(data);
    })
    .catch(e => {
        console.log('error', e);
    });
}
export default logout;