(function() {
    'use strict';

    // mark that JS is available -> enables animations in CSS
    document.documentElement.classList.add('has-js');

    // ===== MOBILE MENU =====
    const hamburger = document.getElementById('hamburger');
    const backdrop = document.getElementById('mobileMenuBackdrop');
    const menuPanel = document.getElementById('mobileMenuPanel');
    const closeBtn = document.getElementById('mobileMenuClose');
    const menuLinks = menuPanel ? menuPanel.querySelectorAll('a[href^="#"]') : [];
    let lastFocused = null;

    function toggleMobileMenu(show) {
        if (!backdrop || !menuPanel) return;
        const willOpen = show !== undefined ? show : !backdrop.classList.contains('active');

        if (willOpen) {
            lastFocused = document.activeElement;
            backdrop.classList.add('active');
            hamburger && hamburger.classList.add('is-active');
            document.documentElement.classList.add('no-scroll');
            setTimeout(() => closeBtn && closeBtn.focus(), 80);
        } else {
            backdrop.classList.remove('active');
            hamburger && hamburger.classList.remove('is-active');
            document.documentElement.classList.remove('no-scroll');
            if (lastFocused) lastFocused.focus();
        }
    }

    hamburger && hamburger.addEventListener('click', () => toggleMobileMenu(true));
    closeBtn && closeBtn.addEventListener('click', () => toggleMobileMenu(false));
    backdrop && backdrop.addEventListener('click', (e) => {
        if (e.target === backdrop) toggleMobileMenu(false);
    });
    menuLinks.forEach((link) => {
        link.addEventListener('click', () => toggleMobileMenu(false));
    });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && backdrop && backdrop.classList.contains('active')) {
            toggleMobileMenu(false);
        }
    });

    // ===== SMOOTH SCROLL =====
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener('click', function(e) {
            const id = this.getAttribute('href');
            if (!id || id === '#') return;
            const target = document.querySelector(id);
            if (!target) return;
            e.preventDefault();
            const headerHeight = document.querySelector('header').offsetHeight || 60;
            const top = target.getBoundingClientRect().top + window.scrollY - headerHeight;
            window.scrollTo({ top, behavior: 'smooth' });
        });
    });

    // ===== SECTION REVEAL =====
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px',
        }
    );
    document.querySelectorAll('section').forEach((section) => observer.observe(section));

    // ===== HEADER SHADOW ON SCROLL =====
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = 'none';
        }
    });

    // ===== VOLUNTEER FORM =====
    const volunteerForm = document.getElementById('volunteer-form');
    if (volunteerForm) {
        // Create error message container
        const errorContainer = document.createElement('div');
        errorContainer.className = 'form-errors';
        errorContainer.setAttribute('role', 'alert');
        errorContainer.setAttribute('aria-live', 'polite');
        errorContainer.style.display = 'none';
        volunteerForm.insertBefore(errorContainer, volunteerForm.firstChild);

        function showError(message) {
            errorContainer.innerHTML = `<p>${message}</p>`;
            errorContainer.style.display = 'block';
            errorContainer.focus();
        }

        function hideError() {
            errorContainer.style.display = 'none';
        }

        function validateEmail(email) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(email);
        }

        volunteerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            hideError();

            const name = document.getElementById('full-name').value.trim();
            const email = document.getElementById('contact-email').value.trim();
            const contact = document.getElementById('can-contact').checked;

            if (!name) {
                showError('Please provide your full name.');
                document.getElementById('full-name').focus();
                return;
            }
            if (!email) {
                showError('Please provide your email address.');
                document.getElementById('contact-email').focus();
                return;
            }
            if (!validateEmail(email)) {
                showError('Please enter a valid email address.');
                document.getElementById('contact-email').focus();
                return;
            }
            if (!contact) {
                showError('Please agree to be contacted about volunteer opportunities.');
                return;
            }

            const formData = new FormData(volunteerForm);
            const urlEncoded = new URLSearchParams();
            for (const [key, value] of formData.entries()) {
                if (key === 'help_options') {
                    urlEncoded.append(key, value);
                } else {
                    urlEncoded.set(key, value);
                }
            }

            const submitBtn = document.getElementById('vol-submit');
            const original = submitBtn.textContent;
            submitBtn.textContent = 'Submitting...';
            submitBtn.disabled = true;

            const WEB_APP_URL =
                'https://script.google.com/macros/s/AKfycbyIWu9C858IMdEcGGTWgt2_nGlrxFRnUB3I0SE5ZtNm5ZnLql4TCeHqc3moH-4VchYu/exec';

            fetch(WEB_APP_URL, {
                    method: 'POST',
                    body: urlEncoded,
                    signal: AbortSignal.timeout(10000),
                })
                .then((res) => {
                    if (!res.ok) throw new Error('Network error');
                    return res.json();
                })
                .then((data) => {
                    if (data.result === 'success') {
                        errorContainer.innerHTML = '<p style="color: #0e8a52; font-weight: 600;">✓ Thank you for your interest in volunteering! We have received your application and will contact you soon.</p>';
                        errorContainer.style.display = 'block';
                        volunteerForm.reset();
                    } else {
                        throw new Error(data.error || 'Unknown error');
                    }
                })
                .catch((err) => {
                    console.error(err);
                    showError('Sorry, there was an error submitting your form. Please try again or contact us directly at info@gsbb.org');
                })
                .finally(() => {
                    submitBtn.textContent = original;
                    submitBtn.disabled = false;
                });
        });
    }



    // ===== INTERSECTION OBSERVER for sections & staggered reveals =====
    if ('IntersectionObserver' in window) {
        // Main section observer
        const sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    sectionObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        document.querySelectorAll('.has-js section').forEach(section => sectionObserver.observe(section));

        // Staggered reveal for cards
        document.querySelectorAll('.donation-grid, .projects').forEach((container) => {
            const items = Array.from(container.children);
            const childObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        items.forEach((el, i) => {
                            el.style.transitionDelay = `${i * 80}ms`;
                            el.classList.add('visible');
                        });
                        childObserver.disconnect();
                    }
                });
            }, { threshold: 0.1 });
            childObserver.observe(container);
        });

        // Lazy load images
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                    }
                    observer.unobserve(img);
                }
            });
        });
        document.querySelectorAll('img[data-src]').forEach(img => imageObserver.observe(img));
    }
})();