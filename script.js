// --- MOBILE NAVIGATION ---
// Toggles the mobile navigation menu and hamburger icon animation.
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Closes the mobile menu when a navigation link is clicked.
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// --- MODAL FUNCTIONS ---
// Opens a modal by its ID and adds a class for animation.
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (!modal) return;
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden'; // Prevents background scrolling
    
    // Trigger fade-in and slide-down animation
    setTimeout(() => {
        modal.classList.add('show');
    }, 10);
}

// Closes a modal by its ID and removes the animation class.
function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (!modal) return;
    modal.classList.remove('show');
    
    // Wait for the animation to complete before hiding the modal
    setTimeout(() => {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto'; // Restore background scrolling
    }, 500);
}

// Event listener to close any open modal when clicking on the background overlay.
window.addEventListener('click', (e) => {
    document.querySelectorAll('.modal').forEach(modal => {
        if (e.target === modal) {
            closeModal(modal.id);
        }
    });
});

// --- FORM SUBMISSION HANDLERS ---
// Placeholder for newsletter form submission.
const newsletterForm = document.getElementById('newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Thank you for subscribing to our newsletter!');
        this.reset();
    });
}

// Placeholder for contact form submission.
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Thank you for your message. We will get back to you soon!');
        this.reset();
    });
}

// --- SMOOTH SCROLLING ---
// Handles smooth scrolling for all anchor links pointing to an ID.
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return; // Ignore empty hrefs
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80, // Offset for the sticky header
                behavior: 'smooth'
            });
        }
    });
});

// --- SECTION FADE-IN ANIMATION ON SCROLL ---
// Uses Intersection Observer to add a 'visible' class to sections as they enter the viewport.
const sections = document.querySelectorAll('section');
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1 // Trigger when 10% of the section is visible
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target); // Stop observing after it's visible
        }
    });
}, observerOptions);

sections.forEach(section => {
    observer.observe(section);
});

// --- DONATION AMOUNT BUTTONS ---
// Toggles the 'active' class on donation amount buttons.
document.querySelectorAll('.amount-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        // Remove 'active' from sibling buttons
        this.parentElement.querySelectorAll('.amount-btn').forEach(b => {
            b.classList.remove('active');
        });
        // Add 'active' to the clicked button
        this.classList.add('active');
    });
});

// --- HEADER SCROLL EFFECT ---
// Adds a subtle shadow and padding change to the header on scroll.
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
        header.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
        header.style.padding = '10px 0';
    } else {
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.08)';
        header.style.padding = '15px 0';
    }
});