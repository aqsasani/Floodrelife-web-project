console.log('requests.js loaded');

(function () {
  function callUser() {
    alert("Call the given number");
  }

  function payNow() {
    alert("Send money via JazzCash / EasyPaisa");
  }

  // Handle form submission
  const form = document.getElementById('requestForm');
  if (form) {
    console.log('Request form found');
    form.addEventListener('submit', async function(e) {
      e.preventDefault();
      e.stopPropagation();
      console.log('Request Help form submit handler started');

      const token = localStorage.getItem('token');
      console.log('Token exists:', token ? 'Yes' : 'No');
      if (!token) {
        alert('Please log in first to submit a request.');
        window.location.href = 'login.html';
        return;
      }

      const formData = {
        fullName: document.getElementById('fullName').value.trim(),
        phone: document.getElementById('phone').value.trim(),
        whatsapp: document.getElementById('whatsapp').value.trim(),
        location: document.getElementById('location').value.trim(),
        helpType: document.getElementById('helpType').value,
        image: document.getElementById('image').value.trim(),
        paymentMethod: 'JazzCash/EasyPaisa',
        paymentNumber: document.getElementById('paymentNumber').value.trim(),
        situation: document.getElementById('situation').value.trim()
      };

      console.log('Request Help form data:', formData);

      const loadingMessage = document.getElementById('loadingMessage');
      const submitButton = form.querySelector('button[type="submit"]');
      if (loadingMessage) loadingMessage.style.display = 'block';
      if (submitButton) submitButton.disabled = true;

      try {
        const response = await fetch('https://floodrelife-web-project-production.up.railway.app/api/requests', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(formData)
        });

        const result = await response.json();
        console.log('Request Help response:', response.status, result);

        if (response.ok) {
          alert('Request submitted successfully!');
          window.location.href = 'viewrequests.html';
        } else {
          alert('Error: ' + (result.message || 'Failed to submit request'));
          if (loadingMessage) loadingMessage.style.display = 'none';
          if (submitButton) submitButton.disabled = false;
        }
      } catch (error) {
        console.error('Request submission error:', error);
        alert('Network error. Please try again.');
        if (loadingMessage) loadingMessage.style.display = 'none';
        if (submitButton) submitButton.disabled = false;
      }
    });
  } else {
    console.warn('Request form not found: requestForm id is missing or the script loaded before the form.');
  }

  document.addEventListener("click", function (e) {
    var btn = e.target && e.target.closest ? e.target.closest("button[data-action]") : null;
    if (!btn) return;

    var action = btn.getAttribute("data-action");
    if (action === "call") callUser();
    if (action === "pay") payNow();
  });
})();
