document.addEventListener("DOMContentLoaded", () => {

    /*
       Enable JavaScript-specific animations.
       This prevents the page from becoming invisible
       if JavaScript fails.
    */
    document.documentElement.classList.add("js-enabled");


    /* =========================
       MOBILE NAVIGATION
    ========================= */

    const menuToggle =
        document.getElementById("menuToggle");

    const navLinks =
        document.getElementById("navLinks");

    if (menuToggle && navLinks) {

        menuToggle.addEventListener("click", () => {

            navLinks.classList.toggle("active");

        });

        navLinks.querySelectorAll("a").forEach(link => {

            link.addEventListener("click", () => {

                navLinks.classList.remove("active");

            });

        });
    }


    /* =========================
       SCROLL PROGRESS
    ========================= */

    const progress =
        document.getElementById("scrollProgress");

    function updateProgress() {

        const scrollTop = window.scrollY;

        const pageHeight =
            document.documentElement.scrollHeight -
            document.documentElement.clientHeight;

        const percentage =
            pageHeight > 0 ?
            (scrollTop / pageHeight) * 100 :
            0;

        progress.style.width = `${percentage}%`;
    }

    window.addEventListener(
        "scroll",
        updateProgress, { passive: true }
    );

    updateProgress();


    /* =========================
       REVEAL ANIMATION
    ========================= */

    const revealElements =
        document.querySelectorAll(".reveal");

    const observer =
        new IntersectionObserver(
            entries => {

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

        observer.observe(element);

    });


    /* =========================
       ACTIVE NAVIGATION
    ========================= */

    const sections =
        document.querySelectorAll("main section[id]");

    const navItems =
        document.querySelectorAll(".nav-link");

    const sectionObserver =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        const currentId =
                            entry.target.id;

                        navItems.forEach(link => {

                            link.classList.remove("active");

                            if (
                                link.getAttribute("href") ===
                                `#${currentId}`
                            ) {
                                link.classList.add("active");
                            }

                        });

                    }

                });

            }, {
                rootMargin: "-35% 0px -55% 0px"
            }
        );

    sections.forEach(section => {

        sectionObserver.observe(section);

    });


    /* =========================
       INTERACTIVE TIMELINE
    ========================= */

    const timelineItems =
        document.querySelectorAll(".timeline-item");

    timelineItems.forEach(item => {

        const trigger =
            item.querySelector(".timeline-trigger");

        trigger.addEventListener("click", () => {

            const wasActive =
                item.classList.contains("active-timeline");

            timelineItems.forEach(otherItem => {

                otherItem.classList.remove(
                    "active-timeline"
                );

            });

            if (!wasActive) {

                item.classList.add(
                    "active-timeline"
                );

            }

        });

    });


    /* =========================
       3D IMAGE TILT
    ========================= */

    const tiltCard =
        document.getElementById("tiltCard");

    if (
        tiltCard &&
        window.matchMedia("(pointer: fine)").matches
    ) {

        tiltCard.addEventListener(
            "mousemove",
            event => {

                const rect =
                    tiltCard.getBoundingClientRect();

                const x =
                    event.clientX - rect.left;

                const y =
                    event.clientY - rect.top;

                const centerX =
                    rect.width / 2;

                const centerY =
                    rect.height / 2;

                const rotateX =
                    ((y - centerY) / centerY) * -5;

                const rotateY =
                    ((x - centerX) / centerX) * 5;

                tiltCard.style.transform =
                    `rotateX(${rotateX}deg)
                     rotateY(${rotateY}deg)
                     scale(1.02)`;

            }
        );

        tiltCard.addEventListener(
            "mouseleave",
            () => {

                tiltCard.style.transform =
                    "rotateX(0deg) rotateY(0deg) scale(1)";

            }
        );
    }


    /* =========================
       MOUSE GLOW
    ========================= */

    const cursorGlow =
        document.querySelector(".cursor-glow");

    if (
        cursorGlow &&
        window.matchMedia("(pointer: fine)").matches
    ) {

        window.addEventListener(
            "mousemove",
            event => {

                cursorGlow.style.left =
                    `${event.clientX}px`;

                cursorGlow.style.top =
                    `${event.clientY}px`;

                cursorGlow.style.opacity = "1";

            }, { passive: true }
        );

    }


    /* =========================
       QUOTE TYPING EFFECT
    ========================= */

    const quoteElement =
        document.getElementById("quoteText");

    const quote =
        "Dream, dream, dream. Dreams transform into thoughts and thoughts result in action.";

    let quoteStarted = false;

    const quoteObserver =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (
                        entry.isIntersecting &&
                        !quoteStarted
                    ) {

                        quoteStarted = true;

                        typeQuote();

                    }

                });

            }, {
                threshold: 0.5
            }
        );

    if (quoteElement) {

        quoteObserver.observe(quoteElement);

    }


    function typeQuote() {

        quoteElement.textContent = "";

        let index = 0;

        function writeCharacter() {

            if (index < quote.length) {

                quoteElement.textContent +=
                    quote.charAt(index);

                index++;

                setTimeout(
                    writeCharacter,
                    28
                );

            }

        }

        writeCharacter();

    }


    /* =========================
       IMAGE FALLBACK
    ========================= */

    const image =
        document.getElementById("kalamImage");

    if (image) {

        image.addEventListener(
            "error",
            () => {

                image.removeAttribute("src");

                image.alt =
                    "Dr. A.P.J. Abdul Kalam";

                image.style.minHeight = "500px";

                image.style.background =
                    "linear-gradient(135deg,#17243b,#080d17)";

            }
        );

    }


    /* =========================
       YEAR
    ========================= */

    const year =
        document.getElementById("year");

    if (year) {

        year.textContent =
            new Date().getFullYear();

    }


    /* =========================
       ESCAPE KEY
    ========================= */

    document.addEventListener(
        "keydown",
        event => {

            if (event.key === "Escape") {

                navLinks ? .classList.remove("active");

            }

        }
    );

});