(function () {
  async function loadRequests() {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Please log in to view requests.');
      window.location.href = 'login.html';
      return;
    }

    try {
      const response = await fetch('https://floodrelife-web-project-production.up.railway.app/api/requests', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const requests = await response.json();
        displayRequests(requests);
      } else {
        console.error('Failed to load requests');
        // Show some default requests if API fails
        showDefaultRequests();
      }
    } catch (error) {
      console.error('Error loading requests:', error);
      showDefaultRequests();
    }
  }

  function displayRequests(requests) {
    const container = document.querySelector('.cards');
    if (!container) return;

    container.innerHTML = '';

    if (requests.length === 0) {
      container.innerHTML = '<p>No requests found.</p>';
      return;
    }

    requests.forEach(request => {
      const card = document.createElement('article');
      card.className = 'card';

      card.innerHTML = `
        <img src="${request.image || '/images/ali.jpeg'}" class="request-img" alt="${request.fullName}" onerror="this.src='/images/ali.jpeg'">
        <h3>${request.fullName}</h3>
        <div class="request-meta">
          <span class="badge"><strong>Need:</strong> ${request.helpType}</span>
          <span class="badge"><strong>Location:</strong> ${request.location}</span>
          <span class="badge"><strong>Phone:</strong> ${request.phone}</span>
          <span class="badge"><strong>Payment:</strong> ${request.paymentMethod || 'JazzCash/EasyPaisa'}</span>
        </div>
        <div class="actions">
          <div class="actions-row">
            <button class="btn" type="button" data-action="call" data-phone="${request.phone}"><i class="bi bi-telephone btn__icon" aria-hidden="true"></i>Call</button>
            <a class="btn btn--primary" href="https://wa.me/${request.whatsapp || request.phone}" target="_blank" rel="noopener noreferrer"><i class="bi bi-whatsapp btn__icon" aria-hidden="true"></i>WhatsApp</a>
          </div>
          <button class="btn btn--success" type="button" data-action="pay"><i class="bi bi-cash-coin btn__icon" aria-hidden="true"></i>Send Money</button>
        </div>
      `;

      container.appendChild(card);
    });
  }

  function showDefaultRequests() {
    // Fallback to hardcoded requests if API fails
    const defaultRequests = [
      {
        fullName: 'Ali',
        phone: '03001234567',
        location: 'Lahore',
        helpType: 'Food',
        image: '/images/ali.jpeg',
        paymentMethod: 'JazzCash - 03001234567'
      },
      {
        fullName: 'Sara',
        phone: '03001112222',
        location: 'Karachi',
        helpType: 'Clothes',
        image: '/images/ali.jpeg',
        paymentMethod: 'EasyPaisa - 03001112222'
      }
    ];
    displayRequests(defaultRequests);
  }

  function callUser(phone) {
    window.location.href = `tel:${phone}`;
  }

  function payNow() {
    alert("Send money via JazzCash / EasyPaisa");
  }

  // Load requests when page loads
  document.addEventListener('DOMContentLoaded', loadRequests);

  document.addEventListener("click", function (e) {
    var btn = e.target && e.target.closest ? e.target.closest("button[data-action]") : null;
    if (!btn) return;

    var action = btn.getAttribute("data-action");
    if (action === "call") {
      const phone = btn.getAttribute('data-phone');
      callUser(phone);
    }
    if (action === "pay") payNow();
  });
})();