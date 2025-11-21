// ============================================
// INVISIBLE BRACES DENTAL & SKIN POLYCLINIC
// Main JavaScript Functionality
// ============================================

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function () {

    // ============================================
    // VIDEO LOADING AND ERROR HANDLING
    // ============================================
    const heroBackgroundVideo = document.getElementById('heroBackgroundVideo');
    const heroFeatureVideo = document.getElementById('heroFeatureVideo');

    // Function to ensure video plays
    function ensureVideoPlays(video) {
        if (!video) return;

        console.log(`🎥 Initializing video: ${video.id}`);

        // Set video attributes programmatically for better browser support
        video.muted = true;
        video.playsInline = true;
        video.loop = true;
        video.autoplay = true;

        // Handle video loading
        video.addEventListener('loadeddata', function () {
            console.log(`✅ Video loaded successfully: ${video.id}`);
            // Attempt to play
            const playPromise = video.play();

            if (playPromise !== undefined) {
                playPromise
                    .then(() => {
                        console.log(`▶️ Video playing: ${video.id}`);
                    })
                    .catch(error => {
                        console.warn(`⚠️ Autoplay prevented for ${video.id}:`, error);
                        // Try to play on user interaction
                        document.addEventListener('click', function playOnClick() {
                            video.play();
                            document.removeEventListener('click', playOnClick);
                        }, { once: true });
                    });
            }
        });

        // Handle video errors
        video.addEventListener('error', function (e) {
            console.error(`❌ Video error for ${video.id}:`, e);
            // Show poster image as fallback
            if (video.poster) {
                video.style.backgroundImage = `url(${video.poster})`;
                video.style.backgroundSize = 'cover';
                video.style.backgroundPosition = 'center';
            }
        });

        // Handle stalled video
        video.addEventListener('stalled', function () {
            console.warn(`⏸️ Video stalled: ${video.id}, attempting to reload...`);
            video.load();
        });

        // Attempt to load and play
        video.load();

        // Fallback: Try to play after a short delay
        setTimeout(() => {
            if (video.paused) {
                video.play().catch(err => {
                    console.warn(`⚠️ Delayed play failed for ${video.id}:`, err);
                });
            }
        }, 500);
    }

    // Initialize both videos
    if (heroBackgroundVideo) {
        ensureVideoPlays(heroBackgroundVideo);
    }

    if (heroFeatureVideo) {
        ensureVideoPlays(heroFeatureVideo);
    }

    // Ensure videos continue playing after page visibility changes
    document.addEventListener('visibilitychange', function () {
        if (!document.hidden) {
            if (heroBackgroundVideo && heroBackgroundVideo.paused) {
                heroBackgroundVideo.play().catch(err => console.warn('Background video resume failed:', err));
            }
            if (heroFeatureVideo && heroFeatureVideo.paused) {
                heroFeatureVideo.play().catch(err => console.warn('Feature video resume failed:', err));
            }
        }
    });

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
    // MOBILE NAVIGATION TOGGLE - NEW BUTTON
    // ============================================
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navbarMenu = document.getElementById('navbarMenu');

    if (mobileMenuBtn && navbarMenu) {
        console.log('✅ NEW Mobile menu button found!');

        mobileMenuBtn.addEventListener('click', function (e) {
            e.preventDefault();
            console.log('🔘 Mobile menu button clicked!');
            mobileMenuBtn.classList.toggle('active');
            navbarMenu.classList.toggle('active');
        });

        // Close menu when clicking on a link
        const navLinks = navbarMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function () {
                mobileMenuBtn.classList.remove('active');
                navbarMenu.classList.remove('active');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', function (event) {
            const isClickInsideNav = navbarMenu.contains(event.target) || mobileMenuBtn.contains(event.target);
            if (!isClickInsideNav && navbarMenu.classList.contains('active')) {
                mobileMenuBtn.classList.remove('active');
                navbarMenu.classList.remove('active');
            }
        });
    } else {
        console.error('❌ Mobile menu button not found!');
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
    // CONSOLE MESSAGE
    // ============================================
    console.log('%c🦷 Invisible Braces Dental & Skin Polyclinic', 'color: #1E40AF; font-size: 20px; font-weight: bold;');
    console.log('%cWebsite loaded successfully!', 'color: #10B981; font-size: 14px;');
});
