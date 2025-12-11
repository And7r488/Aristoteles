(function() {
    'use strict';
    
    // DOM Elements
    const modalOverlay = document.getElementById('modal-overlay');
    const modalClose = document.getElementById('modal-close');
    const modalOk = document.getElementById('modal-ok');
    
    const loginModalOverlay = document.getElementById('login-modal-overlay');
    const loginModalClose = document.getElementById('login-modal-close');
    const loginSubmit = document.getElementById('login-submit');
    
    const loginForm = document.getElementById('login-form');
    const loginEmail = document.getElementById('login-email');
    const loginFullname = document.getElementById('login-fullname');
    const loginPassword = document.getElementById('login-password');
    
    // Initialize Modals
    function initModals() {
        if (modalClose) {
            modalClose.addEventListener('click', closeAristotleModal);
        }
        
        if (modalOk) {
            modalOk.addEventListener('click', closeAristotleModal);
        }
        
        if (modalOverlay) {
            modalOverlay.addEventListener('click', function(e) {
                if (e.target === modalOverlay) {
                    closeAristotleModal();
                }
            });
        }
        
        if (loginModalClose) {
            loginModalClose.addEventListener('click', closeLoginModal);
        }
        
        if (loginSubmit) {
            loginSubmit.addEventListener('click', submitLoginForm);
        }
        
        if (loginModalOverlay) {
            loginModalOverlay.addEventListener('click', function(e) {
                if (e.target === loginModalOverlay) {
                    closeLoginModal();
                }
            });
        }
    }
    
    // Aristotle Modal Functions
    function openAristotleModal() {
        if (modalOverlay) {
            modalOverlay.classList.add('active');
            modalOverlay.setAttribute('aria-hidden', 'false');
        }
    }
    
    function closeAristotleModal() {
        if (modalOverlay) {
            modalOverlay.classList.remove('active');
            modalOverlay.setAttribute('aria-hidden', 'true');
        }
    }
    
    // Login Modal Functions
    function openLoginModal() {
        if (loginModalOverlay) {
            loginModalOverlay.classList.add('active');
            loginModalOverlay.setAttribute('aria-hidden', 'false');
            if (loginEmail) {
                loginEmail.focus();
            }
        }
    }
    
    function closeLoginModal() {
        if (loginModalOverlay) {
            loginModalOverlay.classList.remove('active');
            loginModalOverlay.setAttribute('aria-hidden', 'true');
        }
        // Clear form
        if (loginForm) {
            loginForm.reset();
        }
    }
    
    function submitLoginForm() {
        if (!loginForm) return;
        
        // Basic validation
        if (!loginEmail || !loginEmail.value.includes('@')) {
            showToast('Sláðu inn gilt netfang');
            return;
        }
        
        if (!loginFullname || loginFullname.value.trim().length < 2) {
            showToast('Sláðu inn fullt nafn');
            return;
        }
        
        if (!loginPassword || loginPassword.value.length < 6) {
            showToast('Lykilorð verður að vera að minnsta kosti 6 stafir');
            return;
        }
        
        // Success - store login data in session storage
        const email = loginEmail.value;
        const fullname = loginFullname.value;
        
        // Store user session
        sessionStorage.setItem('aristotleUser', JSON.stringify({
            email: email,
            fullname: fullname,
            loggedIn: true,
            timestamp: new Date().getTime()
        }));
        
        closeLoginModal();
        showToast('Innskráning tókst fyrir ' + fullname);
        
        // Wait a moment for toast to show, then redirect
        setTimeout(function() {
            window.location.href = 'myndir-gallery.html';
        }, 1500);
    }
    
    // Toast Notification
    function showToast(message, duration = 3000) {
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.textContent = message;
        toast.setAttribute('role', 'status');
        toast.setAttribute('aria-live', 'polite');
        
        document.body.appendChild(toast);
        
        setTimeout(function() {
            toast.classList.add('hide');
            setTimeout(function() {
                document.body.removeChild(toast);
            }, 300);
        }, duration);
    }
    
    // Global Functions
    window.openAristotleModal = openAristotleModal;
    window.closeAristotleModal = closeAristotleModal;
    window.openLoginModal = openLoginModal;
    window.closeLoginModal = closeLoginModal;
    window.showToast = showToast;
    
    // Session Management Functions
    function isLoggedIn() {
        const user = sessionStorage.getItem('aristotleUser');
        return user !== null && JSON.parse(user).loggedIn === true;
    }
    
    function checkLoginStatus() {
        const currentPage = window.location.pathname;
        const isIndexPage = currentPage.includes('index.html') || currentPage.endsWith('/');
        
        // On non-index pages, check if user is logged in
        if (!isIndexPage && !isLoggedIn()) {
            // Redirect to home and open login modal
            window.location.href = 'index.html';
        }
    }
    
    function logout() {
        sessionStorage.removeItem('aristotleUser');
        window.location.href = 'index.html';
    }
    
    window.isLoggedIn = isLoggedIn;
    window.checkLoginStatus = checkLoginStatus;
    window.logout = logout;
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initModals);
    } else {
        initModals();
    }
    
    // Fallback: Always bind login button click after DOM is ready
    document.addEventListener('DOMContentLoaded', function() {
        var loginBtn = document.querySelector('button[onclick="openLoginModal()"]');
        if (loginBtn) {
            loginBtn.addEventListener('click', function(e) {
                e.preventDefault();
                openLoginModal();
            });
        }
    });
    
    document.addEventListener('DOMContentLoaded', function () {
        var loginLink = document.getElementById('login-link');
        var loginModal = document.getElementById('login-modal');
        var closeLoginModalBtn = document.getElementById('close-login-modal');
        var loginForm = document.getElementById('login-form');
    
        if (loginLink && loginModal) {
            loginLink.addEventListener('click', function (e) {
                e.preventDefault();
                loginModal.classList.add('active');
                loginModal.setAttribute('aria-hidden', 'false');
            });
        }
        if (closeLoginModalBtn && loginModal) {
            closeLoginModalBtn.addEventListener('click', function () {
                loginModal.classList.remove('active');
                loginModal.setAttribute('aria-hidden', 'true');
            });
        }
        if (loginModal) {
            loginModal.addEventListener('click', function (e) {
                if (e.target === loginModal) {
                    loginModal.classList.remove('active');
                    loginModal.setAttribute('aria-hidden', 'true');
                }
            });
        }
        if (loginForm) {
            loginForm.addEventListener('submit', function (e) {
                e.preventDefault();
                var email = document.getElementById('login-email').value;
                var fullname = document.getElementById('login-fullname').value;
                var password = document.getElementById('login-password').value;
                if (!email || !email.includes('@')) {
                    showToast('Sláðu inn gilt netfang');
                    return;
                }
                if (!fullname || fullname.trim().length < 2) {
                    showToast('Sláðu inn fullt nafn');
                    return;
                }
                if (!password || password.length < 6) {
                    showToast('Lykilorð verður að vera að minnsta kosti 6 stafir');
                    return;
                }
                sessionStorage.setItem('aristotleUser', JSON.stringify({
                    email: email,
                    fullname: fullname,
                    loggedIn: true,
                    timestamp: new Date().getTime()
                }));
                loginModal.classList.remove('active');
                loginModal.setAttribute('aria-hidden', 'true');
                showToast('Innskráning tókst fyrir ' + fullname);
                setTimeout(function () {
                    window.location.href = 'myndir-gallery.html';
                }, 1500);
            });
        }
    });
})();