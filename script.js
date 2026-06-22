document.addEventListener("DOMContentLoaded", () => {
    
    // ==========================================
    // 1. SYSTEM PAGE LOADER & INITIALIZATION
    // ==========================================
    const loader = document.getElementById("loader");
    if (loader) {
        window.addEventListener("load", () => {
            loader.style.opacity = "0";
            setTimeout(() => loader.style.display = "none", 500);
        });
        
        // Unconditional Fallback: Clear loading screen after 400ms no matter what
        setTimeout(() => {
            loader.style.opacity = "0";
            setTimeout(() => loader.style.display = "none", 500);
        }, 400);
    }

    // ==========================================
    // 2. STICKY INTERACTIVE RESPONSIVE HEADER NAV
    // ==========================================
    const hamburger = document.querySelector(".hamburger");
    const navLinks = document.querySelector(".nav-links");

    if (hamburger && navLinks) {
        hamburger.addEventListener("click", () => {
            navLinks.classList.toggle("active");
            hamburger.classList.toggle("toggle");
        });

        document.addEventListener("click", (e) => {
            if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
                navLinks.classList.remove("active");
                hamburger.classList.remove("toggle");
            }
        });
    }

    // ==========================================
    // 3. COMPLETE CONFIGURABLE DARK MODE INTERFACE
    // ==========================================
    const themeToggle = document.getElementById("theme-toggle");
    const savedTheme = localStorage.getItem("theme") || "light";
    
    document.documentElement.setAttribute("data-theme", savedTheme);
    updateThemeIcon(savedTheme);

    if (themeToggle) {
        themeToggle.addEventListener("click", () => {
            const currentTheme = document.documentElement.getAttribute("data-theme");
            const newTheme = currentTheme === "dark" ? "light" : "dark";
            
            document.documentElement.setAttribute("data-theme", newTheme);
            localStorage.setItem("theme", newTheme);
            updateThemeIcon(newTheme);
        });
    }

    function updateThemeIcon(theme) {
        if (!themeToggle) return;
        themeToggle.textContent = theme === "dark" ? "☀️" : "🌙";
    }

    // ==========================================
    // 4. ANIMATED INTERSECTION STAT COUNTERS
    // ==========================================
    const counters = document.querySelectorAll(".counter");
    if (counters.length > 0) {
        const counterObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counter = entry.target;
                    const target = parseInt(counter.getAttribute("data-target"), 10) || 0;
                    let count = 0;
                    const speed = target / 50; 

                    const updateCount = () => {
                        count += speed;
                        if (count < target) {
                            counter.textContent = Math.ceil(count);
                            setTimeout(updateCount, 20);
                        } else {
                            counter.textContent = target + (counter.textContent.includes("%") ? "%" : "+");
                        }
                    };
                    updateCount();
                    observer.unobserve(counter);
                }
            });
        }, { threshold: 0.5 });

        counters.forEach(counter => counterObserver.observe(counter));
    }

       // ==========================================
    // 5. INFRASTRUCTURE NEWS/EVENTS CORNER SLIDER (FIXED)
    // ==========================================
    const track = document.querySelector(".slider-track");
    if (track && track.children.length > 0) {
        const slides = Array.from(track.children);
        let index = 0;

        function setSlidePosition() {
            // FIXED: Target the first individual slide inside the collection array correctly using [0]
            const firstSlide = slides[0]; 
            if (firstSlide) {
                const slideWidth = firstSlide.getBoundingClientRect().width + 20; 
                track.style.transform = `translateX(-${index * slideWidth}px)`;
            }
        }

        setInterval(() => {
            const itemsVisible = window.innerWidth > 992 ? 3 : window.innerWidth > 768 ? 2 : 1;
            index++;
            if (index > slides.length - itemsVisible) {
                index = 0;
            }
            setSlidePosition();
        }, 4000);

        window.addEventListener("resize", setSlidePosition);
    }

    // ==========================================
    // 6. ACCORDION FAQ MODULE SYSTEM
    // ==========================================
    const accordionHeaders = document.querySelectorAll(".accordion-header");
    accordionHeaders.forEach(header => {
        header.addEventListener("click", () => {
            const content = header.nextElementSibling;
            const isOpen = content.style.maxHeight && content.style.maxHeight !== "0px";

            document.querySelectorAll(".accordion-content").forEach(item => item.style.maxHeight = null);

            if (!isOpen) {
                content.style.maxHeight = content.scrollHeight + "px";
            }
        });
    });

    // ==========================================
    // 7. AUTO-CHANGING FADING PICTURE SLIDESHOW
    // ==========================================
    const fadingSlides = document.querySelectorAll(".gallery-slide");
    if (fadingSlides.length > 0) {
        let currentSlideIndex = 0;

        setInterval(() => {
            fadingSlides[currentSlideIndex].classList.remove("active");
            currentSlideIndex = (currentSlideIndex + 1) % fadingSlides.length;
            fadingSlides[currentSlideIndex].classList.add("active");
        }, 3000);
    }

    // ==========================================
    // 8. LIVE STAFF DIRECTORY INDEX ENGINE
    // ==========================================
    const searchBox = document.getElementById("staff-search");
    const staffCards = document.querySelectorAll(".staff-card");

    if (searchBox) {
        searchBox.addEventListener("input", (e) => {
            const query = e.target.value.toLowerCase().trim();

            staffCards.forEach(card => {
                const name = card.querySelector("h3").textContent.toLowerCase();
                const role = card.querySelector("p").textContent.toLowerCase();

                if (name.includes(query) || role.includes(query)) {
                    card.style.display = "block";
                } else {
                    card.style.display = "none";
                }
            });
        });
    }

       // ==========================================
    // 9. CONDITIONAL ADMISSIONS LOGIC & FORM CHECK
    // ==========================================
    const admissionClassSelect = document.getElementById("admission-class");
    const docPrimaryHolder = document.getElementById("doc-primary-holder");
    const docPromotionHolder = document.getElementById("doc-promotion-holder");
    const docTransferHolder = document.getElementById("doc-transfer-holder");

    if (admissionClassSelect) {
        admissionClassSelect.addEventListener("change", () => {
            const selectedClass = admissionClassSelect.value;

            if (docPrimaryHolder) docPrimaryHolder.style.display = "none";
            if (docPromotionHolder) docPromotionHolder.style.display = "none";
            if (docTransferHolder) docTransferHolder.style.display = "none";

            if (selectedClass === "form1" && docPrimaryHolder) {
                docPrimaryHolder.style.display = "block";
            } else if (selectedClass === "form2" || selectedClass === "form3" || selectedClass === "form4") {
                if (docPromotionHolder) docPromotionHolder.style.display = "block";
                if (docTransferHolder) docTransferHolder.style.display = "block";
            }
        });
    }

    const admissionForm = document.getElementById("school-admission-form");
    if (admissionForm) {
        admissionForm.addEventListener("submit", (e) => {
            let formIsValid = true;
            const chosenClass = admissionClassSelect ? admissionClassSelect.value : "";

            const standardRequired = admissionForm.querySelectorAll("input[required], select[required], textarea[required]");
            standardRequired.forEach(input => {
                const errSpan = input.nextElementSibling;
                if (!input.value.trim()) {
                    formIsValid = false;
                    if (errSpan && errSpan.classList.contains("error-msg")) errSpan.style.display = "block";
                } else {
                    if (errSpan && errSpan.classList.contains("error-msg")) errSpan.style.display = "none";
                }
            });

            if (chosenClass === "form1") {
                const file1 = document.getElementById("doc-primary");
                if (file1) {
                    const err1 = file1.nextElementSibling;
                    if (!file1.files.length) {
                        formIsValid = false;
                        if (err1) err1.style.display = "block";
                    } else {
                        if (err1) err1.style.display = "none";
                    }
                }
            } else if (chosenClass === "form2" || chosenClass === "form3" || chosenClass === "form4") {
                const file2 = document.getElementById("doc-promotion");
                const file3 = document.getElementById("doc-transfer");

                if (file2) {
                    const err2 = file2.nextElementSibling;
                    if (!file2.files.length) {
                        formIsValid = false;
                        if (err2) err2.style.display = "block";
                    } else {
                        if (err2) err2.style.display = "none";
                    }
                }

                if (file3) {
                    const err3 = file3.nextElementSibling;
                    if (!file3.files.length) {
                        formIsValid = false;
                        if (err3) err3.style.display = "block";
                    } else {
                        if (err3) err3.style.display = "none";
                    }
                }
            }

            if (!formIsValid) {
                e.preventDefault();
                alert("Please complete all required fields and upload mandatory documents before submitting.");
            } else {
                e.preventDefault();
                alert("Success! Your admission file has been logged into our student network registry.");
                admissionForm.reset();
                if (docPrimaryHolder) docPrimaryHolder.style.display = "none";
                if (docPromotionHolder) docPromotionHolder.style.display = "none";
                if (docTransferHolder) docTransferHolder.style.display = "none";
            }
        });
    }

    const contactForm = document.getElementById("school-contact-form");
    if (contactForm) {
        contactForm.addEventListener("submit", (e) => {
            let isValid = true;
            const inputs = contactForm.querySelectorAll("input[required], textarea[required]");
            
            inputs.forEach(input => {
                const errorMsg = input.nextElementSibling;
                if (!input.value.trim()) {
                    isValid = false;
                    if (errorMsg && errorMsg.classList.contains("error-msg")) errorMsg.style.display = "block";
                } else {
                    if (errorMsg && errorMsg.classList.contains("error-msg")) errorMsg.style.display = "none";
                }
            });

            if (!isValid) {
                e.preventDefault();
            } else {
                e.preventDefault();
                alert("Thank you! Your general message inquiry has been delivered cleanly.");
                contactForm.reset();
            }
        });
    }

    // ==========================================
    // 10. BACK TO TOP GLOBAL SCROLL CONTROL
    // ==========================================
    const backToTopBtn = document.getElementById("back-to-top");
    if (backToTopBtn) {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 400) {
                backToTopBtn.style.display = "flex";
            } else {
                backToTopBtn.style.display = "none";
            }
        });

        backToTopBtn.addEventListener("click", () => {
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    }
});