(function() {
    // Mobile menu functionality
    const hamburger = document.getElementById("hamburger");
    const mobileNav = document.getElementById("mobileNav");

    function openMenu() {
        hamburger.classList.add("is-active");
        hamburger.setAttribute("aria-expanded", "true");
        mobileNav.classList.add("is-active");
        document.body.classList.add("menu-open");
    }

    function closeMenu() {
        hamburger.classList.remove("is-active");
        hamburger.setAttribute("aria-expanded", "false");
        mobileNav.classList.remove("is-active");
        document.body.classList.remove("menu-open");
    }

    hamburger.addEventListener("click", function() {
        if (hamburger.classList.contains("is-active")) {
            closeMenu();
        } else {
            openMenu();
        }
    });

    // Close menu with Escape key
    document.addEventListener("keydown", function(e) {
        if (e.key === "Escape") {
            closeMenu();
        }
    });

    // Close menu when a link is clicked
    mobileNav.querySelectorAll('a[href^="#"]').forEach((a) => {
        a.addEventListener("click", closeMenu);
    });

    // Enhanced donation chips functionality
    document.querySelectorAll(".amounts").forEach((group) => {
        group.addEventListener("click", function(e) {
            const btn = e.target.closest("button[data-amount]");
            if (!btn) return;

            group
                .querySelectorAll(".chip")
                .forEach((c) => c.classList.remove("active"));
            btn.classList.add("active");

            const parent = group.closest(".don-card");
            const input = parent.querySelector("input");
            if (input)
                input.value = btn.getAttribute("data-amount");
        });
    });

    // Clear active chips when custom input is used
    document
        .querySelectorAll(".custom-amount input")
        .forEach((input) => {
            input.addEventListener("input", function() {
                const parent = this.closest(".don-card");
                parent
                    .querySelectorAll(".chip")
                    .forEach((c) => c.classList.remove("active"));
            });
        });

    // Enhanced volunteer form behavior
    const volunteerForm = document.getElementById("volunteer-form");

    if (volunteerForm) {
        volunteerForm.addEventListener("submit", function(e) {
            e.preventDefault();

            // Simple validation
            const name = document
                .getElementById("full-name")
                .value.trim();
            const email = document
                .getElementById("contact-email")
                .value.trim();
            const contact =
                document.getElementById("can-contact").checked;

            if (!name) {
                alert("Please provide your full name.");
                document.getElementById("full-name").focus();
                return;
            }

            if (!email) {
                alert("Please provide your email address.");
                document.getElementById("contact-email").focus();
                return;
            }

            if (!contact) {
                alert(
                    "Please agree to be contacted about volunteer opportunities.",
                );
                return;
            }

            // Show success message
            alert(
                "Thank you for your interest in volunteering! We have received your application and will contact you soon.",
            );
            volunteerForm.reset();
        });
    }

    // Enhanced scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
            }
        });
    }, observerOptions);

    // Observe all sections
    document.querySelectorAll("section").forEach((section) => {
        observer.observe(section);
    });

    // Enhanced header behavior on scroll
    let lastScrollY = window.scrollY;
    const header = document.querySelector("header");

    window.addEventListener("scroll", () => {
        if (window.scrollY > 100) {
            header.style.background = "rgba(255, 255, 255, 0.95)";
            header.style.boxShadow =
                "0 2px 20px rgba(0, 0, 0, 0.1)";
        } else {
            header.style.background = "rgba(255, 255, 255, 0.98)";
            header.style.boxShadow = "none";
        }

        lastScrollY = window.scrollY;
    });

    // Lazy loading for images
    document.querySelectorAll("img").forEach((img) => {
        if (!img.hasAttribute("loading")) {
            img.setAttribute("loading", "lazy");
        }
    });

    // Enhanced focus management for accessibility
    document.addEventListener("keyup", function(e) {
        if (e.key === "Tab") {
            document.documentElement.classList.add(
                "keyboard-navigation",
            );
        }
    });

    document.addEventListener("mousedown", function() {
        document.documentElement.classList.remove(
            "keyboard-navigation",
        );
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener("click", function(e) {
            e.preventDefault();

            const targetId = this.getAttribute("href");
            if (targetId === "#") return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight =
                    document.querySelector("header").offsetHeight;
                const targetPosition =
                    targetElement.getBoundingClientRect().top +
                    window.pageYOffset -
                    headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: "smooth",
                });
            }
        });
    });

    // Add loading state to buttons
    document.querySelectorAll(".btn").forEach((button) => {
        button.addEventListener("click", function(e) {
            if (this.type === "submit" || this.href === "#") {
                this.classList.add("loading");
                setTimeout(() => {
                    this.classList.remove("loading");
                }, 2000);
            }
        });
    });
})();