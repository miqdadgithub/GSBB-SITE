(function() {
    // Mobile menu functionality
    const hamburger = document.getElementById('hamburger');
    const mobileNav = document.getElementById('mobileNav');

    function openMenu() {
        mobileNav.style.transform = 'translateX(0)';
        mobileNav.setAttribute('aria-hidden', 'false');
        hamburger.setAttribute('aria-expanded', 'true');
        hamburger.classList.add('is-active');
    }

    function closeMenu() {
        mobileNav.style.transform = 'translateX(100%)';
        mobileNav.setAttribute('aria-hidden', 'true');
        hamburger.setAttribute('aria-expanded', 'false');
        hamburger.classList.remove('is-active');
    }

    hamburger.addEventListener('click', function() {
        if (mobileNav.getAttribute('aria-hidden') === 'false') {
            closeMenu();
        } else {
            openMenu();
        }
    });

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') closeMenu();
    });

    mobileNav.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener('click', closeMenu);
    });

    // Donation chips functionality
    document.querySelectorAll('.amounts').forEach(group => {
        group.addEventListener('click', function(e) {
            const btn = e.target.closest('button[data-amount]');
            if (!btn) return;

            group.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
            btn.classList.add('active');

            const parent = group.closest('.don-card');
            const input = parent.querySelector('input');
            if (input) input.value = btn.getAttribute('data-amount');
        });
    });

    // Simplified volunteer form behavior
    const volunteerForm = document.getElementById('volunteer-form');

    if (volunteerForm) {
        volunteerForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Simple validation
            const name = document.getElementById('full-name').value.trim();
            const email = document.getElementById('contact-email').value.trim();
            const contact = document.getElementById('can-contact').checked;

            if (!name) {
                alert('Please provide your full name.');
                document.getElementById('full-name').focus();
                return;
            }

            if (!email) {
                alert('Please provide your email address.');
                document.getElementById('contact-email').focus();
                return;
            }

            if (!contact) {
                alert('Please agree to be contacted about volunteer opportunities.');
                return;
            }

            // Show success message
            alert('Thank you for your interest in volunteering! We have received your application and will contact you soon.');
            volunteerForm.reset();
        });
    }

    // Lazy loading for images
    document.querySelectorAll('img').forEach(img => {
        if (!img.hasAttribute('loading')) {
            img.setAttribute('loading', 'lazy');
        }
    });

})();