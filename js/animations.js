// ============================================
// INVISIBLE BRACES DENTAL & SKIN POLYCLINIC
// Animations & Scroll Effects
// ============================================

document.addEventListener('DOMContentLoaded', function () {

    // ============================================
    // SCROLL ANIMATIONS
    // ============================================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const animateOnScroll = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Animate cards
    const cards = document.querySelectorAll('.card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(40px)';
        card.style.transition = `all 0.8s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.15}s`;
        animateOnScroll.observe(card);
    });

    // Animate sections
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        const elements = section.querySelectorAll('h2, h3, p, .btn');
        elements.forEach((element, index) => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            element.style.transition = `all 0.8s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.12}s`;
            animateOnScroll.observe(element);
        });
    });

    // ============================================
    // COUNTER ANIMATION
    // ============================================
    const counters = document.querySelectorAll('.stat-number');
    let hasAnimated = false;

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !hasAnimated) {
                hasAnimated = true;
                counters.forEach(counter => {
                    animateCounter(counter);
                });
            }
        });
    }, { threshold: 0.5 });

    if (counters.length > 0) {
        counterObserver.observe(counters[0].parentElement.parentElement);
    }

    function animateCounter(counter) {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2500; // 2.5 seconds for smoother count
        const increment = target / (duration / 16); // 60fps
        let current = 0;

        const updateCounter = () => {
            current += increment;
            if (current < target) {
                counter.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };

        updateCounter();
    }

    // ============================================
    // PARALLAX EFFECT ON HERO
    // ============================================
    const hero = document.querySelector('.hero');

    if (hero) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallaxSpeed = 0.5;

            if (scrolled < window.innerHeight) {
                hero.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
            }
        });
    }

    // ============================================
    // FADE IN ON LOAD
    // ============================================
    const fadeElements = document.querySelectorAll('.animate-fade-in');
    fadeElements.forEach((element, index) => {
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, index * 200);
    });

    // ============================================
    // HOVER EFFECTS FOR CARDS
    // ============================================
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';

        card.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-12px) scale(1.03)';
        });

        card.addEventListener('mouseleave', function () {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // ============================================
    // TESTIMONIAL CAROUSEL (if multiple testimonials)
    // ============================================
    const testimonialContainer = document.querySelector('.testimonials-carousel');

    if (testimonialContainer) {
        let currentSlide = 0;
        const slides = testimonialContainer.querySelectorAll('.testimonial-card');
        const totalSlides = slides.length;

        function showSlide(index) {
            slides.forEach((slide, i) => {
                slide.style.display = i === index ? 'block' : 'none';
            });
        }

        function nextSlide() {
            currentSlide = (currentSlide + 1) % totalSlides;
            showSlide(currentSlide);
        }

        function prevSlide() {
            currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
            showSlide(currentSlide);
        }

        // Auto-play carousel
        setInterval(nextSlide, 5000);

        // Show first slide
        showSlide(0);
    }

    // ============================================
    // SMOOTH REVEAL FOR IMAGES
    // ============================================
    const images = document.querySelectorAll('img');

    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.filter = 'blur(0)';
            }
        });
    }, observerOptions);

    images.forEach(img => {
        img.style.opacity = '0';
        img.style.filter = 'blur(8px)';
        img.style.transition = 'opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1), filter 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
        imageObserver.observe(img);
    });

    // ============================================
    // TYPING EFFECT FOR HERO TITLE (Optional)
    // ============================================
    const heroTitle = document.querySelector('.hero-title');

    if (heroTitle && heroTitle.hasAttribute('data-typing')) {
        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        let i = 0;

        function typeWriter() {
            if (i < text.length) {
                heroTitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 50);
            }
        }

        typeWriter();
    }

    // ============================================
    // SCROLL PROGRESS INDICATOR
    // ============================================
    const progressBar = document.createElement('div');
    progressBar.style.position = 'fixed';
    progressBar.style.top = '0';
    progressBar.style.left = '0';
    progressBar.style.height = '3px';
    progressBar.style.background = 'linear-gradient(90deg, #0D9488, #14B8A6, #2DD4BF)';
    progressBar.style.zIndex = '9999';
    progressBar.style.transition = 'width 0.15s cubic-bezier(0.4, 0, 0.2, 1)';
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.pageYOffset / windowHeight) * 100;
        progressBar.style.width = scrolled + '%';
    });

    // ============================================
    // STAGGER ANIMATION FOR GRID ITEMS
    // ============================================
    const grids = document.querySelectorAll('.grid');

    grids.forEach(grid => {
        const gridItems = grid.children;

        const gridObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    Array.from(gridItems).forEach((item, index) => {
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'translateY(0)';
                        }, index * 120);
                    });
                    gridObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });

        Array.from(gridItems).forEach(item => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(40px)';
            item.style.transition = 'all 0.7s cubic-bezier(0.4, 0, 0.2, 1)';
        });

        gridObserver.observe(grid);
    });
});
