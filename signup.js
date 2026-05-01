// signup.js - Handle signup form submission and validation

document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form');
    const errorBox = document.getElementById('formError');

    function showFormError(message) {
        if (!errorBox) {
            alert(message);
            return;
        }
        errorBox.textContent = message;
        errorBox.style.display = 'block';
    }

    function clearFormError() {
        if (errorBox) {
            errorBox.textContent = '';
            errorBox.style.display = 'none';
        }
    }

    function isValidInternationalPhone(value) {
        const normalized = value.replace(/[\s\-().]/g, '');
        return /^\+?[1-9]\d{7,14}$/.test(normalized);
    }

    function isStrongPassword(value) {
        if (typeof value !== 'string') {
            return false;
        }
        return value.length >= 12 &&
            /[A-Z]/.test(value) &&
            /[a-z]/.test(value) &&
            /[0-9]/.test(value) &&
            /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(value) &&
            !/\s/.test(value);
    }
    
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
        clearFormError();
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

        // Phone validation (international format)
        if (isValid && !isValidInternationalPhone(phone)) {
            isValid = false;
            errorMessage = 'Phone number must be in international format and contain 8 to 15 digits. Use leading + and digits only.';
        }

        // Password strength and match
        if (isValid && !isStrongPassword(password)) {
            isValid = false;
            errorMessage = 'Password must be at least 12 characters and include uppercase, lowercase, number, and symbol.';
        }

        if (isValid && password !== confirmPassword) {
            isValid = false;
            errorMessage = 'Passwords do not match.';
        }

        if (!isValid) {
            showFormError(errorMessage);
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
        
        // Uncomment below to use API instead of localStorage
        /*
        try {
            const response = await fetch('https://floodrelife-web-project-production.up.railway.app/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
            });
            
            const data = await response.json();
            
            if (response.ok) {
                // Signup successful
                localStorage.setItem('token', data.token);
                localStorage.setItem('user', JSON.stringify(data.user));
                localStorage.setItem('isLoggedIn', 'true');
                alert('Signup successful!');
                window.location.href = 'home.html';
            } else {
                // Signup failed
                showFormError(data.message || 'Signup failed');
            }
        } catch (error) {
            console.error('Signup error:', error);
            showFormError('Network error. Please try again.');
        }
        */
    });
});