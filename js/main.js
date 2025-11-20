// ============================================
// INVISIBLE BRACES DENTAL & SKIN POLYCLINIC
// Main JavaScript Functionality
// ============================================

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function () {

    // ============================================
    // DOCTOR CAROUSEL AUTO SCROLL
    // ============================================
    const doctorCarousel = document.getElementById('doctorCarousel');
    if (doctorCarousel) {
        let direction = 1;
        let isPaused = false;

        doctorCarousel.addEventListener('mouseenter', () => isPaused = true);
        doctorCarousel.addEventListener('mouseleave', () => isPaused = false);

        const autoScroll = () => {
            if (!isPaused && doctorCarousel.scrollWidth > doctorCarousel.clientWidth) {
                doctorCarousel.scrollLeft += 0.6 * direction;
                const maxScroll = doctorCarousel.scrollWidth - doctorCarousel.clientWidth;

                if (doctorCarousel.scrollLeft >= maxScroll) {
                    direction = -1;
                } else if (doctorCarousel.scrollLeft <= 0) {
                    direction = 1;
                }
            }
            requestAnimationFrame(autoScroll);
        };

        requestAnimationFrame(autoScroll);
    }

    // ============================================
    // MOBILE NAVIGATION TOGGLE
    // ============================================
    const navbarToggle = document.getElementById('navbarToggle');
    const navbarMenu = document.getElementById('navbarMenu');

    console.log('Navbar Toggle:', navbarToggle);
    console.log('Navbar Menu:', navbarMenu);

    if (navbarToggle && navbarMenu) {
        navbarToggle.addEventListener('click', function (e) {
            console.log('Toggle button clicked!');
            e.stopPropagation();
            navbarToggle.classList.toggle('active');
            navbarMenu.classList.toggle('active');
            console.log('Toggle active:', navbarToggle.classList.contains('active'));
            console.log('Menu active:', navbarMenu.classList.contains('active'));
        });

        // Also add touch event for mobile
        navbarToggle.addEventListener('touchstart', function (e) {
            console.log('Toggle button touched!');
            e.preventDefault();
            e.stopPropagation();
            navbarToggle.classList.toggle('active');
            navbarMenu.classList.toggle('active');
        });

        // Close menu when clicking on a link
        const navLinks = navbarMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function () {
                navbarToggle.classList.remove('active');
                navbarMenu.classList.remove('active');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', function (event) {
            const isClickInsideNav = navbarMenu.contains(event.target) || navbarToggle.contains(event.target);
            if (!isClickInsideNav && navbarMenu.classList.contains('active')) {
                navbarToggle.classList.remove('active');
                navbarMenu.classList.remove('active');
            }
        });
    } else {
        console.error('Navbar toggle or menu not found!');
    }

    // ============================================
    // STICKY HEADER ON SCROLL
    // ============================================
    const navbar = document.getElementById('navbar');
    let lastScrollTop = 0;

    window.addEventListener('scroll', function () {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        if (scrollTop > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        lastScrollTop = scrollTop;
    });

    // ============================================
    // SMOOTH SCROLLING FOR ANCHOR LINKS
    // ============================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');

            // Skip if href is just "#"
            if (href === '#') {
                e.preventDefault();
                return;
            }

            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                const offsetTop = target.offsetTop - 80; // Account for fixed navbar

                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ============================================
    // BACK TO TOP BUTTON
    // ============================================
    const backToTop = document.getElementById('backToTop');

    if (backToTop) {
        window.addEventListener('scroll', function () {
            if (window.pageYOffset > 300) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        });

        backToTop.addEventListener('click', function () {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // ============================================
    // FORM VALIDATION
    // ============================================
    const forms = document.querySelectorAll('form');

    forms.forEach(form => {
        form.addEventListener('submit', function (e) {
            e.preventDefault();

            let isValid = true;
            const inputs = form.querySelectorAll('input[required], textarea[required], select[required]');

            // Clear previous error messages
            form.querySelectorAll('.form-error').forEach(error => error.remove());

            inputs.forEach(input => {
                if (!input.value.trim()) {
                    isValid = false;
                    showError(input, 'This field is required');
                } else if (input.type === 'email' && !isValidEmail(input.value)) {
                    isValid = false;
                    showError(input, 'Please enter a valid email address');
                } else if (input.type === 'tel' && !isValidPhone(input.value)) {
                    isValid = false;
                    showError(input, 'Please enter a valid phone number');
                }
            });

            if (isValid) {
                // Form is valid, you can submit it here
                console.log('Form is valid, submitting...');
                showSuccessMessage(form);
                form.reset();
            }
        });
    });

    function showError(input, message) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'form-error';
        errorDiv.textContent = message;
        input.parentNode.appendChild(errorDiv);
        input.style.borderColor = '#EF4444';
    }

    function showSuccessMessage(form) {
        const successDiv = document.createElement('div');
        successDiv.className = 'form-success';
        successDiv.style.padding = '1rem';
        successDiv.style.marginTop = '1rem';
        successDiv.style.backgroundColor = '#D1FAE5';
        successDiv.style.color = '#065F46';
        successDiv.style.borderRadius = '0.5rem';
        successDiv.textContent = 'Thank you! Your message has been sent successfully. We will contact you soon.';
        form.appendChild(successDiv);

        setTimeout(() => {
            successDiv.remove();
        }, 5000);
    }

    function isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    function isValidPhone(phone) {
        const re = /^[\d\s\+\-\(\)]+$/;
        return re.test(phone) && phone.replace(/\D/g, '').length >= 10;
    }

    // ============================================
    // MODAL FUNCTIONALITY
    // ============================================
    const modals = document.querySelectorAll('.modal');
    const modalTriggers = document.querySelectorAll('[data-modal]');
    const modalCloses = document.querySelectorAll('.modal-close');

    modalTriggers.forEach(trigger => {
        trigger.addEventListener('click', function (e) {
            e.preventDefault();
            const modalId = this.getAttribute('data-modal');
            const modal = document.getElementById(modalId);
            if (modal) {
                modal.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });

    modalCloses.forEach(close => {
        close.addEventListener('click', function () {
            const modal = this.closest('.modal');
            if (modal) {
                modal.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    });

    modals.forEach(modal => {
        modal.addEventListener('click', function (e) {
            if (e.target === modal) {
                modal.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    });

    // Close modal on ESC key
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
            modals.forEach(modal => {
                if (modal.classList.contains('active')) {
                    modal.classList.remove('active');
                    document.body.style.overflow = '';
                }
            });
        }
    });

    // ============================================
    // ACTIVE PAGE HIGHLIGHTING
    // ============================================
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.navbar-menu a');

    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    // ============================================
    // LAZY LOADING IMAGES
    // ============================================
    const lazyImages = document.querySelectorAll('img[data-src]');

    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });

    lazyImages.forEach(img => imageObserver.observe(img));

    // ============================================
    // DOCTOR CAROUSEL NAVIGATION
    // ============================================
    const doctorCarousel = document.getElementById('doctorCarousel');
    const prevBtn = document.getElementById('doctorPrevBtn');
    const nextBtn = document.getElementById('doctorNextBtn');

    if (doctorCarousel && prevBtn && nextBtn) {
        const scrollAmount = 350; // Amount to scroll per click

        prevBtn.addEventListener('click', function () {
            doctorCarousel.scrollBy({
                left: -scrollAmount,
                behavior: 'smooth'
            });
        });

        nextBtn.addEventListener('click', function () {
            doctorCarousel.scrollBy({
                left: scrollAmount,
                behavior: 'smooth'
            });
        });

        // Hide/show buttons based on scroll position
        function updateButtonVisibility() {
            const scrollLeft = doctorCarousel.scrollLeft;
            const maxScroll = doctorCarousel.scrollWidth - doctorCarousel.clientWidth;

            prevBtn.style.opacity = scrollLeft > 0 ? '1' : '0.5';
            prevBtn.style.cursor = scrollLeft > 0 ? 'pointer' : 'not-allowed';

            nextBtn.style.opacity = scrollLeft < maxScroll - 10 ? '1' : '0.5';
            nextBtn.style.cursor = scrollLeft < maxScroll - 10 ? 'pointer' : 'not-allowed';
        }

        doctorCarousel.addEventListener('scroll', updateButtonVisibility);
        updateButtonVisibility(); // Initial check
    }

    // ============================================
    // CONSOLE MESSAGE
    // ============================================
    console.log('%c🦷 Invisible Braces Dental & Skin Polyclinic', 'color: #1E40AF; font-size: 20px; font-weight: bold;');
    console.log('%cWebsite loaded successfully!', 'color: #10B981; font-size: 14px;');
});
