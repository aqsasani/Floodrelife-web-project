// signup.js - Handle signup form submission and validation

document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form');
    
    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent default form submission
        
        // Get form values
        const fullName = document.getElementById('fullName').value.trim();
        const email = document.getElementById('email').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const location = document.getElementById('location').value.trim();
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        
        // Validation
        let isValid = true;
        let errorMessage = '';
        
        // Check required fields
        if (!fullName || !email || !phone || !password || !confirmPassword) {
            isValid = false;
            errorMessage = 'All fields are required.';
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (isValid && !emailRegex.test(email)) {
            isValid = false;
            errorMessage = 'Please enter a valid email address.';
        }
        
        // Phone validation (numeric)
        if (isValid && !/^\d+$/.test(phone)) {
            isValid = false;
            errorMessage = 'Phone number must be numeric.';
        }
        
        // Password match
        if (isValid && password !== confirmPassword) {
            isValid = false;
            errorMessage = 'Passwords do not match.';
        }
        
        if (!isValid) {
            alert(errorMessage);
            return;
        }
        
        // Create user object
        const user = {
            fullName: fullName,
            email: email,
            phone: phone,
            location: location,
            password: password
        };
        
        // Store in localStorage
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('isLoggedIn', 'true');
        
        // Redirect to home
        window.location.href = 'home.html';
    });
});