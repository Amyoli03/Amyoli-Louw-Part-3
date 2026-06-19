// 1. LOGOUT FUNCTION - add this at very top
function logout() {
    localStorage.clear();
    alert('Logged out successfully');
    window.location.href = 'login.html';
}

// 2. GATE FOR PROTECTED PAGES - add this at very top
(function() {
    const currentPage = window.location.pathname.split('/').pop().toLowerCase();
    
    // Only run gate if NOT on login.html
    if (currentPage !== 'login.html') {
        if (localStorage.getItem('loggedIn') !== 'true') {
            window.location.href = 'login.html';
        }
    }
})();

document.addEventListener('DOMContentLoaded', function() {

 // If already logged in, skip login page - add toLowerCase here too
const page = window.location.pathname.split('/').pop().toLowerCase();
if(page === 'login.html' && localStorage.getItem('loggedIn') === 'true') {
    window.location.href = 'index.html';
    return;
}

  // Show/hide forms
  window.showSignup = function() {
    document.getElementById('loginForm').style.display = 'none';
    document.getElementById('signupForm').style.display = 'block';
  }

  window.showLogin = function() {
    document.getElementById('signupForm').style.display = 'none';
    document.getElementById('loginForm').style.display = 'block';
  }

  let users = JSON.parse(localStorage.getItem('users')) || [];

  // SIGNUP
  const signupForm = document.querySelector('#signupForm form');
  if(signupForm) {
    signupForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const name = this.querySelector('input[type="text"]').value;
      const email = this.querySelector('input[type="email"]').value;
      const pass = this.querySelectorAll('input[type="password"]')[0].value;
      const pass2 = this.querySelectorAll('input[type="password"]')[1].value;

      if(pass!== pass2) { alert("Passwords don't match!"); return; }
      if(users.find(u => u.email === email)) { alert("Email already registered!"); return; }

      users.push({name, email, password: pass});
      localStorage.setItem('users', JSON.stringify(users));
      alert("Account created! You can login now.");
      showLogin();
    });
  }

  // LOGIN - straight to index
  const loginForm = document.querySelector('#loginForm form');
  if(loginForm) {
    loginForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const email = this.querySelector('input[type="email"]').value;
      const pass = this.querySelector('input[type="password"]').value;

      const user = users.find(u => u.email === email && u.password === pass);
      if(user) {
        localStorage.setItem('loggedIn', 'true');
        localStorage.setItem('userName', user.name);
        window.location.href = 'index.html';
      } else {
        alert("Wrong email or password");
      }
    });
  }

  // ===== CONTACT FORM VALIDATION =====
  const contactForm = document.getElementById('contactForm');
  if(contactForm) {
    const inputs = contactForm.querySelectorAll('input, textarea');
    const feedback = document.getElementById('form-feedback');

    inputs.forEach(input => {
      const error = document.createElement('small');
      error.classList.add('error-msg');
      input.insertAdjacentElement('afterend', error);

      input.addEventListener('input', () => {
        if(input.type === 'email' && input.value &&!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value)) {
          error.textContent = 'Please enter a valid email like name@example.com';
        } else if(input.required && input.value.trim() === '') {
          error.textContent = 'This field is required';
        } else {
          error.textContent = '';
        }
      });
    });

    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      let valid = true;
      inputs.forEach(input => {
        if(!input.value.trim()) valid = false;
        if(input.type === 'email' &&!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value)) valid = false;
      });

      if(valid) {
        feedback.textContent = 'Message sent! We will get back to you soon.';
        feedback.style.color = '#2e7d32';
        contactForm.reset();
        inputs.forEach(input => input.nextElementSibling.textContent = '');
      } else {
        feedback.textContent = 'Please fix the errors above before submitting.';
        feedback.style.color = '#d32f2f';
      }
    });
  }

  // ===== GALLERY SEARCH - only 1 copy now =====
  const searchInput = document.getElementById('search');
  if(searchInput) {
    searchInput.addEventListener('input', e => {
      const term = e.target.value.toLowerCase();
      document.querySelectorAll('.flip-card').forEach(card => {
        const text = card.textContent.toLowerCase();
        card.style.display = text.includes(term)? 'block' : 'none';
      });
    });
  }

  // Gallery lightbox
  document.querySelectorAll('.flip-card img').forEach(img => {
    img.style.cursor = 'pointer';
    img.addEventListener('click', () => {
      const lightbox = document.createElement('div');
      lightbox.className = 'lightbox';
      lightbox.innerHTML = `<img src="${img.src}" alt="${img.alt}">`;
      lightbox.onclick = () => lightbox.remove();
      document.body.appendChild(lightbox);
    });
  });

  // Mobile tap to flip
  document.querySelectorAll('.flip-card').forEach(card => {
    card.addEventListener('click', () => {
      card.querySelector('.flip-card-inner').classList.toggle('flipped');
    });
  });
});

// Show/Hide Password
function togglePassword(id){
    const input = document.getElementById(id);
    input.type = input.type === 'password' ? 'text' : 'password';
}

// Show/Hide Forms
function showSignup(){
    document.getElementById('loginForm').style.display = 'none';
    document.getElementById('signupForm').style.display = 'block';
    document.getElementById('forgotForm').style.display = 'none';
}
function showLogin(){
    document.getElementById('loginForm').style.display = 'block';
    document.getElementById('signupForm').style.display = 'none';
    document.getElementById('forgotForm').style.display = 'none';
}
function showForgot(){
    document.getElementById('loginForm').style.display = 'none';
    document.getElementById('signupForm').style.display = 'none';
    document.getElementById('forgotForm').style.display = 'block';
}

// Fake reset handler
document.addEventListener('DOMContentLoaded', function(){
    const forgotForm = document.getElementById('forgotFormSubmit');
    if(forgotForm){
        forgotForm.addEventListener('submit', function(e){
            e.preventDefault();
            document.getElementById('resetMsg').style.display = 'block';
            this.reset();
        });
    }
});