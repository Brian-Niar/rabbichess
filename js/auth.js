// DOM Elements
const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');
const registerBtn = document.getElementById('registerBtn');
const registerModal = document.getElementById('registerModal');
const goToDashboardBtn = document.getElementById('goToDashboard');
const closeBtns = document.querySelectorAll('.close');

// Event Listeners
if (loginForm) {
    loginForm.addEventListener('submit', handleLogin);
}

if (registerForm) {
    registerForm.addEventListener('submit', handleRegister);
}

if (registerBtn) {
    registerBtn.addEventListener('click', () => {
        registerModal.style.display = 'block';
    });
}

if (goToDashboardBtn) {
    goToDashboardBtn.addEventListener('click', () => {
        // Check if user is logged in
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            window.location.href = 'dashboard.html';
        } else {
            alert('Please login first to access the dashboard.');
        }
    });
}

closeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        registerModal.style.display = 'none';
    });
});

// Close modal when clicking outside
window.addEventListener('click', (event) => {
    if (event.target === registerModal) {
        registerModal.style.display = 'none';
    }
});

// Handle Login
async function handleLogin(event) {
    event.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
        // Here you would typically make an API call to your backend
        // For now, we'll simulate a successful login
        const response = await simulateLogin(username, password);
        
        if (response.success) {
            // Store user data in localStorage
            localStorage.setItem('user', JSON.stringify({
                username: username,
                token: response.token
            }));
            
            // Redirect to dashboard
            window.location.href = 'dashboard.html';
        } else {
            alert('Invalid credentials. Please try again.');
        }
    } catch (error) {
        console.error('Login error:', error);
        alert('An error occurred during login. Please try again.');
    }
}

// Handle Register
async function handleRegister(event) {
    event.preventDefault();
    
    const username = document.getElementById('regUsername').value;
    const email = document.getElementById('regEmail').value;
    const password = document.getElementById('regPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    if (password !== confirmPassword) {
        alert('Passwords do not match!');
        return;
    }

    try {
        // Here you would typically make an API call to your backend
        // For now, we'll simulate a successful registration
        const response = await simulateRegister(username, email, password);
        
        if (response.success) {
            alert('Registration successful! Please login.');
            registerModal.style.display = 'none';
            loginForm.reset();
        } else {
            alert('Registration failed. Please try again.');
        }
    } catch (error) {
        console.error('Registration error:', error);
        alert('An error occurred during registration. Please try again.');
    }
}

// Simulated API calls (replace with actual API calls)
async function simulateLogin(username, password) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // For demo purposes, accept any non-empty credentials
    if (username && password) {
        return {
            success: true,
            token: 'demo-token-' + Date.now()
        };
    }
    
    return {
        success: false,
        error: 'Invalid credentials'
    };
}

async function simulateRegister(username, email, password) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // For demo purposes, accept any non-empty registration
    if (username && email && password) {
        return {
            success: true
        };
    }
    
    return {
        success: false,
        error: 'Registration failed'
    };
} 