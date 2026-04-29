// login.js - Handle login form submission and authentication

document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form');
    
    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent default form submission
        
        // Get form values
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value;
        
        // Retrieve user from localStorage
        const userData = localStorage.getItem('user');
        
        if (!userData) {
            alert('No user found. Please sign up first.');
            return;
        }
        
        const user = JSON.parse(userData);
        
        // Check credentials
        if (user.email === email && user.password === password) {
            // Login successful
            localStorage.setItem('isLoggedIn', 'true');
            window.location.href = 'home.html';
        } else {
            // Login failed
            alert('Invalid email or password.');
        }
    });
});