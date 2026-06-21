// ===============================
// TYPING EFFECT
// ===============================

const roles = [
    "Cloud Engineer",
    "AWS Engineer",
    "DevOps Engineer",
    "Terraform Enthusiast",
    "Linux Administrator"
];

let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;

const heroTitle = document.querySelector(".hero-content h2");

function typeEffect() {

    const currentRole = roles[roleIndex];

    if (!isDeleting) {

        heroTitle.textContent =
            currentRole.substring(0, charIndex + 1);

        charIndex++;

        if (charIndex === currentRole.length) {

            isDeleting = true;

            setTimeout(typeEffect, 1500);

            return;
        }

    } else {

        heroTitle.textContent =
            currentRole.substring(0, charIndex - 1);

        charIndex--;

        if (charIndex === 0) {

            isDeleting = false;

            roleIndex++;

            if (roleIndex === roles.length) {
                roleIndex = 0;
            }
        }
    }

    setTimeout(typeEffect, isDeleting ? 50 : 100);
}

window.addEventListener("load", typeEffect);


// ===============================
// ACTIVE NAVBAR LINK
// ===============================

const sections =
document.querySelectorAll("section");

const navLinks =
document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(section => {

        const sectionTop =
            section.offsetTop - 150;

        const sectionHeight =
            section.clientHeight;

        if (
            pageYOffset >= sectionTop
            &&
            pageYOffset <
            sectionTop + sectionHeight
        ) {
            current = section.getAttribute("id");
        }

    });

    navLinks.forEach(link => {

        link.classList.remove("active");

        if (
            link.getAttribute("href")
            ===
            "#" + current
        ) {
            link.classList.add("active");
        }

    });

});


// ===============================
// SCROLL REVEAL
// ===============================

const revealElements =
document.querySelectorAll(
".skill-card, .project-card, .timeline-item, .about-card"
);

function revealOnScroll() {

    revealElements.forEach(element => {

        const windowHeight =
            window.innerHeight;

        const revealTop =
            element.getBoundingClientRect().top;

        const revealPoint = 120;

        if (
            revealTop <
            windowHeight - revealPoint
        ) {

            element.classList.add("show");

        }

    });

}

window.addEventListener(
"scroll",
revealOnScroll
);

revealOnScroll();


// ===============================
// PARTICLE BACKGROUND EFFECT
// ===============================

const canvas =
document.createElement("canvas");

canvas.id = "particles";

document.body.appendChild(canvas);

const ctx =
canvas.getContext("2d");

canvas.style.position = "fixed";
canvas.style.top = "0";
canvas.style.left = "0";
canvas.style.width = "100%";
canvas.style.height = "100%";
canvas.style.zIndex = "-1";
canvas.style.opacity = "0.25";

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];

for (let i = 0; i < 80; i++) {

    particles.push({

        x: Math.random() * canvas.width,

        y: Math.random() * canvas.height,

        radius: Math.random() * 2 + 1,

        dx: Math.random() * 1 - 0.5,

        dy: Math.random() * 1 - 0.5

    });

}

function animateParticles() {

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );

    particles.forEach(p => {

        ctx.beginPath();

        ctx.arc(
            p.x,
            p.y,
            p.radius,
            0,
            Math.PI * 2
        );

        ctx.fillStyle = "#ff9900";

        ctx.fill();

        p.x += p.dx;
        p.y += p.dy;

        if (
            p.x < 0 ||
            p.x > canvas.width
        ) {
            p.dx *= -1;
        }

        if (
            p.y < 0 ||
            p.y > canvas.height
        ) {
            p.dy *= -1;
        }

    });

    requestAnimationFrame(
        animateParticles
    );

}

animateParticles();

window.addEventListener(
"resize",
() => {

    canvas.width =
        window.innerWidth;

    canvas.height =
        window.innerHeight;

}
);


// ===============================
// COUNTER ANIMATION
// ===============================

const counters =
document.querySelectorAll(
".counter"
);

counters.forEach(counter => {

    counter.innerText = "0";

    const updateCounter = () => {

        const target =
            +counter.getAttribute(
                "data-target"
            );

        const current =
            +counter.innerText;

        const increment =
            target / 100;

        if (current < target) {

            counter.innerText =
                Math.ceil(
                    current + increment
                );

            setTimeout(
                updateCounter,
                20
            );

        } else {

            counter.innerText =
                target;

        }

    };

    updateCounter();

});


// ===============================
// SMOOTH SCROLL
// ===============================

document.querySelectorAll(
'a[href^="#"]'
).forEach(anchor => {

    anchor.addEventListener(
        "click",
        function(e) {

            e.preventDefault();

            document
                .querySelector(
                    this.getAttribute(
                        "href"
                    )
                )
                .scrollIntoView({

                    behavior:
                    "smooth"

                });

        }
    );

});


// ===============================
// NAVBAR SHADOW ON SCROLL
// ===============================

const navbar =
document.querySelector(
".navbar"
);

window.addEventListener(
"scroll",
() => {

    if (
        window.scrollY > 50
    ) {

        navbar.style.boxShadow =
            "0 5px 25px rgba(0,0,0,.4)";

    } else {

        navbar.style.boxShadow =
            "none";

    }

});
