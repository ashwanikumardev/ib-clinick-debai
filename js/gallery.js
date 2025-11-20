// ============================================
// INVISIBLE BRACES DENTAL & SKIN POLYCLINIC
// Gallery Filtering
// ============================================

document.addEventListener('DOMContentLoaded', function () {

    const filterButtons = document.querySelectorAll('#galleryFilters button');
    const galleryItems = document.querySelectorAll('.gallery-item');

    if (filterButtons.length > 0 && galleryItems.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function () {
                const filter = this.getAttribute('data-filter');

                // Update active button
                filterButtons.forEach(btn => {
                    btn.classList.remove('btn-primary', 'active');
                    btn.classList.add('btn-outline');
                });
                this.classList.remove('btn-outline');
                this.classList.add('btn-primary', 'active');

                // Filter gallery items
                galleryItems.forEach(item => {
                    const categories = item.getAttribute('data-category');

                    if (filter === 'all' || categories.includes(filter)) {
                        item.style.display = 'block';
                        item.style.animation = 'fadeIn 0.5s ease-in-out';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });
    }

    // Optional: Lightbox functionality for gallery images
    galleryItems.forEach(item => {
        item.addEventListener('click', function () {
            const img = this.querySelector('img');
            if (img) {
                openLightbox(img.src, img.alt);
            }
        });
    });

    function openLightbox(src, alt) {
        // Create lightbox overlay
        const lightbox = document.createElement('div');
        lightbox.className = 'modal active';
        lightbox.innerHTML = `
            <div class="modal-content" style="max-width: 90%; max-height: 90vh;">
                <button class="modal-close">&times;</button>
                <img src="${src}" alt="${alt}" style="width: 100%; height: auto; border-radius: var(--radius-lg);">
                <p style="text-align: center; margin-top: 1rem; color: var(--color-gray-700);">${alt}</p>
            </div>
        `;

        document.body.appendChild(lightbox);
        document.body.style.overflow = 'hidden';

        // Close lightbox
        const closeBtn = lightbox.querySelector('.modal-close');
        closeBtn.addEventListener('click', () => {
            lightbox.remove();
            document.body.style.overflow = '';
        });

        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                lightbox.remove();
                document.body.style.overflow = '';
            }
        });
    }
});
