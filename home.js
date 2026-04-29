// home.js - Handle auth state, display user info, and logout

document.addEventListener('DOMContentLoaded', function() {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const loggedOutPrompt = document.getElementById('loggedOutPrompt');
    const loggedInContent = document.getElementById('loggedInContent');
    const logoutButton = document.getElementById('logoutButton');

    if (!isLoggedIn) {
        // Show login/signup prompt and hide user content
        if (loggedOutPrompt) loggedOutPrompt.style.display = 'block';
        if (loggedInContent) loggedInContent.style.display = 'none';
        if (logoutButton) logoutButton.style.display = 'none';

        // Disable protected navigation links on home page when logged out
        disableProtectedLinks();
        return;
    }

    // Show user content when logged in
    if (loggedOutPrompt) loggedOutPrompt.style.display = 'none';
    if (loggedInContent) loggedInContent.style.display = 'block';
    if (logoutButton) logoutButton.style.display = 'inline-flex';

    const userData = localStorage.getItem('user');
    if (userData) {
        const user = JSON.parse(userData);
        document.getElementById('userName').textContent = user.fullName;
        document.getElementById('userEmail').textContent = user.email;
    }
});

function disableProtectedLinks() {
    var protectedPages = ['request.html', 'viewrequests.html', 'chat.html', 'reviews.html'];
    var links = document.querySelectorAll('a.nav__link, a.btn');

    links.forEach(function(link) {
        var href = link.getAttribute('href');
        if (href && protectedPages.indexOf(href) !== -1) {
            link.removeAttribute('href');
            link.style.pointerEvents = 'none';
            link.style.opacity = '0.5';
            link.style.cursor = 'default';
        }
    });
}

// Logout function
function logout() {
    localStorage.removeItem('isLoggedIn');
    window.location.href = 'home.html';
}