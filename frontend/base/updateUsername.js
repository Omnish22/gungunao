export function updateUser() {
    console.log('update user')

    console.log('inside')
      const usernameElement = document.getElementById('username');
      const user = localStorage.getItem('user');
  
      if (user) {
        usernameElement.textContent = user; // Assuming userData has a username property
        // usernameElement.href = '/user/profile.html'; // Update href to user's profile or another appropriate page
      } else {
        usernameElement.textContent = '';
      }

  }

export default updateUser;