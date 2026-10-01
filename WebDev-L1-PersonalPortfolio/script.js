/* =========================================================
   SHIVA PRAJAPATI PORTFOLIO
   INTERACTIONS
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* ================= YEAR ================= */

    const year = document.getElementById("year");

    if (year) {
        year.textContent = new Date().getFullYear();
    }


    /* ================= HEADER ================= */

    const header = document.getElementById("header");

    function handleHeader() {

        if (window.scrollY > 30) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }

    }

    window.addEventListener("scroll", handleHeader);

    handleHeader();


    /* ================= MOBILE MENU ================= */

    const menuBtn = document.getElementById("menuBtn");
    const nav = document.getElementById("nav");

    if (menuBtn && nav) {

        menuBtn.addEventListener("click", () => {

            nav.classList.toggle("open");

            const icon = menuBtn.querySelector("i");

            if (nav.classList.contains("open")) {
                icon.classList.remove("fa-bars");
                icon.classList.add("fa-xmark");
            } else {
                icon.classList.remove("fa-xmark");
                icon.classList.add("fa-bars");
            }

        });


        nav.querySelectorAll("a").forEach(link => {

            link.addEventListener("click", () => {

                nav.classList.remove("open");

                const icon = menuBtn.querySelector("i");

                icon.classList.remove("fa-xmark");
                icon.classList.add("fa-bars");

            });

        });

    }


    /* ================= TYPING EFFECT ================= */

    const typingText = document.getElementById("typingText");

    const words = [
        "modern websites.",
        "full-stack applications.",
        "creative experiences.",
        "useful solutions."
    ];

    let wordIndex = 0;
    let charIndex = 0;
    let deleting = false;

    function typeEffect() {

        if (!typingText) return;

        const currentWord = words[wordIndex];

        if (!deleting) {

            typingText.textContent =
                currentWord.substring(0, charIndex + 1);

            charIndex++;

            if (charIndex === currentWord.length) {

                deleting = true;

                setTimeout(typeEffect, 1400);

                return;
            }

        } else {

            typingText.textContent =
                currentWord.substring(0, charIndex - 1);

            charIndex--;

            if (charIndex === 0) {

                deleting = false;

                wordIndex =
                    (wordIndex + 1) % words.length;

            }

        }

        setTimeout(
            typeEffect,
            deleting ? 45 : 80
        );
    }

    typeEffect();


    /* ================= PROFILE IMAGE FALLBACK ================= */

    const profileImage =
        document.getElementById("profileImage");

    const profileFallback =
        document.getElementById("profileFallback");

    if (profileImage) {

        profileImage.addEventListener("error", () => {

            profileImage.style.display = "none";

            if (profileFallback) {
                profileFallback.style.display = "grid";
            }

        });

    }


    /* ================= REVEAL ================= */

    const revealElements =
        document.querySelectorAll(".reveal");

    const revealObserver =
        new IntersectionObserver(
            (entries, observer) => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("visible");

                        observer.unobserve(entry.target);

                    }

                });

            }, {
                threshold: 0.12
            }
        );

    revealElements.forEach(element => {
        revealObserver.observe(element);
    });


    /* ================= ACTIVE NAV ================= */

    const sections =
        document.querySelectorAll("section[id]");

    const navLinks =
        document.querySelectorAll(".nav-link");

    const sectionObserver =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        navLinks.forEach(link => {
                            link.classList.remove("active");
                        });

                        const activeLink =
                            document.querySelector(
                                `.nav-link[href="#${entry.target.id}"]`
                            );

                        if (activeLink) {
                            activeLink.classList.add("active");
                        }

                    }

                });

            }, {
                rootMargin: "-35% 0px -55% 0px"
            }
        );

    sections.forEach(section => {
        sectionObserver.observe(section);
    });


    /* ================= PROFILE TILT ================= */

    const profileCard =
        document.querySelector(".profile-card");

    if (profileCard) {

        profileCard.addEventListener("pointermove", event => {

            if (window.innerWidth < 800) return;

            const rect =
                profileCard.getBoundingClientRect();

            const x =
                (event.clientX - rect.left) / rect.width;

            const y =
                (event.clientY - rect.top) / rect.height;

            const rotateX =
                (0.5 - y) * 15;

            const rotateY =
                (x - 0.5) * 15;

            profileCard.style.setProperty(
                "--rx",
                `${rotateX}deg`
            );

            profileCard.style.setProperty(
                "--ry",
                `${rotateY}deg`
            );

        });


        profileCard.addEventListener("pointerleave", () => {

            profileCard.style.setProperty(
                "--rx",
                "0deg"
            );

            profileCard.style.setProperty(
                "--ry",
                "0deg"
            );

        });

    }


    /* ================= ALL 3D TILT CARDS ================= */

    const tiltElements =
        document.querySelectorAll(".tilt");

    tiltElements.forEach(element => {

        element.addEventListener("pointermove", event => {

            if (window.innerWidth < 800) return;

            const rect =
                element.getBoundingClientRect();

            const x =
                (event.clientX - rect.left) / rect.width;

            const y =
                (event.clientY - rect.top) / rect.height;

            const rotateX =
                (0.5 - y) * 8;

            const rotateY =
                (x - 0.5) * 8;

            element.style.setProperty(
                "--rx",
                `${rotateX}deg`
            );

            element.style.setProperty(
                "--ry",
                `${rotateY}deg`
            );

            element.style.setProperty(
                "--tz",
                "8px"
            );

            element.style.setProperty(
                "--spot-x",
                `${x * 100}%`
            );

            element.style.setProperty(
                "--spot-y",
                `${y * 100}%`
            );

        });


        element.addEventListener("pointerleave", () => {

            element.style.setProperty(
                "--rx",
                "0deg"
            );

            element.style.setProperty(
                "--ry",
                "0deg"
            );

            element.style.setProperty(
                "--tz",
                "0px"
            );

        });

    });


    /* ================= MAGNETIC BUTTONS ================= */

    const magneticElements =
        document.querySelectorAll(".magnetic");

    magneticElements.forEach(element => {

        element.addEventListener("pointermove", event => {

            if (window.innerWidth < 800) return;

            const rect =
                element.getBoundingClientRect();

            const x =
                event.clientX -
                (rect.left + rect.width / 2);

            const y =
                event.clientY -
                (rect.top + rect.height / 2);

            const strength = 0.18;

            element.style.setProperty(
                "--mx",
                `${x * strength}px`
            );

            element.style.setProperty(
                "--my",
                `${y * strength}px`
            );

            element.style.setProperty(
                "--spot-x",
                `${((event.clientX - rect.left) / rect.width) * 100}%`
            );

            element.style.setProperty(
                "--spot-y",
                `${((event.clientY - rect.top) / rect.height) * 100}%`
            );

            document.body.classList.add("cursor-hover");

        });


        element.addEventListener("pointerleave", () => {

            element.style.setProperty(
                "--mx",
                "0px"
            );

            element.style.setProperty(
                "--my",
                "0px"
            );

            document.body.classList.remove("cursor-hover");

        });

    });


    /* ================= MOUSE SPOTLIGHT ================= */

    document.addEventListener("pointermove", event => {

        document.documentElement.style.setProperty(
            "--mouse-x",
            `${event.clientX}px`
        );

        document.documentElement.style.setProperty(
            "--mouse-y",
            `${event.clientY}px`
        );

    });


    /* ================= HERO PARALLAX ================= */

    const parallaxElements =
        document.querySelectorAll(".parallax");

    document.addEventListener("pointermove", event => {

        if (window.innerWidth < 800) return;

        const x =
            (event.clientX / window.innerWidth - 0.5);

        const y =
            (event.clientY / window.innerHeight - 0.5);

        parallaxElements.forEach(element => {

            const depth =
                Number(element.dataset.depth || 15);

            const moveX =
                x * depth;

            const moveY =
                y * depth;

            if (element.classList.contains("tilt")) {

                element.style.marginLeft =
                    `${moveX * 0.2}px`;

                element.style.marginTop =
                    `${moveY * 0.2}px`;

            } else {

                element.style.transform =
                    `translate3d(${moveX}px, ${moveY}px, 0)`;

            }

        });

    });


    /* ================= CURSOR ================= */

    const cursorDot =
        document.querySelector(".cursor-dot");

    const cursorRing =
        document.querySelector(".cursor-ring");

    let cursorX = 0;
    let cursorY = 0;

    let ringX = 0;
    let ringY = 0;

    document.addEventListener("pointermove", event => {

        cursorX = event.clientX;
        cursorY = event.clientY;

        if (cursorDot) {

            cursorDot.style.left =
                `${cursorX}px`;

            cursorDot.style.top =
                `${cursorY}px`;

        }

    });


    function animateCursor() {

        ringX +=
            (cursorX - ringX) * 0.15;

        ringY +=
            (cursorY - ringY) * 0.15;

        if (cursorRing) {

            cursorRing.style.left =
                `${ringX}px`;

            cursorRing.style.top =
                `${ringY}px`;

        }

        requestAnimationFrame(animateCursor);
    }

    animateCursor();


    /* ================= CURSOR HOVER ================= */

    document
        .querySelectorAll("a, button, .tilt")
        .forEach(element => {

            element.addEventListener("mouseenter", () => {
                document.body.classList.add("cursor-hover");
            });

            element.addEventListener("mouseleave", () => {
                document.body.classList.remove("cursor-hover");
            });

        });


    /* ================= CLICK RIPPLE ================= */

    document.addEventListener("click", event => {

        const target =
            event.target.closest(".btn");

        if (!target) return;

        const ripple =
            document.createElement("span");

        ripple.style.position = "absolute";
        ripple.style.width = "10px";
        ripple.style.height = "10px";
        ripple.style.borderRadius = "50%";
        ripple.style.background = "rgba(255,255,255,.45)";
        ripple.style.pointerEvents = "none";

        const rect =
            target.getBoundingClientRect();

        ripple.style.left =
            `${event.clientX - rect.left}px`;

        ripple.style.top =
            `${event.clientY - rect.top}px`;

        ripple.style.transform =
            "translate(-50%, -50%) scale(0)";

        ripple.style.transition =
            "transform .6s ease, opacity .6s ease";

        target.appendChild(ripple);

        requestAnimationFrame(() => {

            ripple.style.transform =
                "translate(-50%, -50%) scale(18)";

            ripple.style.opacity = "0";

        });

        setTimeout(() => {
            ripple.remove();
        }, 650);

    });


    /* ================= COPY EMAIL ================= */

    const copyEmail =
        document.getElementById("copyEmail");

    if (copyEmail) {

        copyEmail.addEventListener("click", async() => {

            const email =
                copyEmail.dataset.email;

            try {

                await navigator.clipboard.writeText(email);

                showCopySuccess();

            } catch {

                const textarea =
                    document.createElement("textarea");

                textarea.value = email;

                document.body.appendChild(textarea);

                textarea.select();

                document.execCommand("copy");

                textarea.remove();

                showCopySuccess();

            }

        });

    }


    function showCopySuccess() {

        const original =
            copyEmail.innerHTML;

        copyEmail.innerHTML =
            `<i class="fa-solid fa-check"></i> Copied!`;

        setTimeout(() => {

            copyEmail.innerHTML =
                original;

        }, 1800);

    }


    /* ================= SCROLL PROGRESS ================= */

    const scrollProgress =
        document.getElementById("scrollProgress");

    function updateProgress() {

        const scrollTop =
            window.scrollY;

        const documentHeight =
            document.documentElement.scrollHeight -
            window.innerHeight;

        const percentage =
            documentHeight > 0 ?
            (scrollTop / documentHeight) * 100 :
            0;

        if (scrollProgress) {

            scrollProgress.style.width =
                `${percentage}%`;

        }

    }

    window.addEventListener(
        "scroll",
        updateProgress, { passive: true }
    );

    updateProgress();


    /* ================= BACK TO TOP ================= */

    const backTop =
        document.getElementById("backTop");

    if (backTop) {

        window.addEventListener("scroll", () => {

            if (window.scrollY > 600) {
                backTop.classList.add("show");
            } else {
                backTop.classList.remove("show");
            }

        });

        backTop.addEventListener("click", () => {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        });

    }


    /* ================= ESCAPE MENU ================= */

    document.addEventListener("keydown", event => {

        if (event.key === "Escape") {

            if (nav) {
                nav.classList.remove("open");
            }

            if (menuBtn) {

                const icon =
                    menuBtn.querySelector("i");

                icon.classList.remove("fa-xmark");
                icon.classList.add("fa-bars");

            }

        }

    });

});