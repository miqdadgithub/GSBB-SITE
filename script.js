(function () {
    // Mobile menu functionality
    const hamburger = document.getElementById('hamburger');
    const mobileNav = document.getElementById('mobileNav');

    function openMenu() {
        mobileNav.style.transform = 'translateX(0)';
        mobileNav.setAttribute('aria-hidden', 'false');
        hamburger.setAttribute('aria-expanded', 'true');
    }

    function closeMenu() {
        mobileNav.style.transform = 'translateX(100%)';
        mobileNav.setAttribute('aria-hidden', 'true');
        hamburger.setAttribute('aria-expanded', 'false');
    }

    hamburger.addEventListener('click', function () {
        if (mobileNav.getAttribute('aria-hidden') === 'false') {
            closeMenu();
        } else {
            openMenu();
        }
    });

    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') closeMenu();
    });

    mobileNav.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener('click', closeMenu);
    });

    // Donation chips functionality
    document.querySelectorAll('.amounts').forEach(group => {
        group.addEventListener('click', function (e) {
            const btn = e.target.closest('button[data-amount]');
            if (!btn) return;

            group.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
            btn.classList.add('active');

            const parent = group.closest('.don-card');
            const input = parent.querySelector('input');
            if (input) input.value = btn.getAttribute('data-amount');
        });
    });

    // Volunteer form behavior
    const volunteerForm = document.getElementById('volunteer-form');
    const details = document.getElementById('hosting-details');

    function refreshDetails() {
        const checked = document.querySelector('input[name="is_family"]:checked');
        if (checked && checked.value === 'yes') {
            details.style.display = 'block';
        } else {
            details.style.display = 'none';
        }
    }

    document.querySelectorAll('input[name="is_family"]').forEach(r => {
        r.addEventListener('change', refreshDetails);
    });

    refreshDetails();

    if (volunteerForm) {
        volunteerForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // Simple client-side validation
            const name = document.getElementById('full-name').value.trim();
            const email = document.getElementById('contact-email').value.trim();
            const phone = document.getElementById('contact-phone').value.trim();

            if (!name || (!email && !phone)) {
                alert('Please provide your name and at least one contact method (email or phone).');
                return;
            }

            alert('Thank you! Your information has been submitted. We will contact you soon.');
            volunteerForm.reset();
            refreshDetails();
        });
    }

    // Helper function to scroll to form
    window.scrollToForm = function () {
        document.getElementById('full-name').focus();
        window.scrollTo({
            top: document.getElementById('join-us').offsetTop - 80,
            behavior: 'smooth'
        });
    }

    // Lazy loading for images
    document.querySelectorAll('img').forEach(img => {
        if (!img.hasAttribute('loading')) {
            img.setAttribute('loading', 'lazy');
        }
    });

})();