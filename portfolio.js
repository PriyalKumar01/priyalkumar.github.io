/* ============================================
   PRIYAL KUMAR - PROFESSIONAL SDE PORTFOLIO
   JavaScript: Interactions & Animations
   ============================================ */

// ---- NAVBAR SCROLL BEHAVIOR ----
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
    updateActiveNav();
});

// ---- MOBILE NAV TOGGLE ----
const hamburger = document.getElementById('nav-hamburger');
const navLinks = document.getElementById('nav-links');
hamburger.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    document.body.classList.toggle('menu-open', isOpen);
    const spans = hamburger.querySelectorAll('span');
    if (isOpen) {
        spans[0].style.transform = 'rotate(45deg) translateY(7px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translateY(-7px)';
    } else {
        spans[0].style.transform = '';
        spans[1].style.opacity = '';
        spans[2].style.transform = '';
    }
});
navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        document.body.classList.remove('menu-open');
        const spans = hamburger.querySelectorAll('span');
        spans[0].style.transform = '';
        spans[1].style.opacity = '';
        spans[2].style.transform = '';
    });
});

// ---- ACTIVE NAV HIGHLIGHT ----
function updateActiveNav() {
    const sections = document.querySelectorAll('section[id]');
    const links = document.querySelectorAll('.nav-links a');
    let currentId = '';
    sections.forEach(section => {
        if (window.scrollY >= section.offsetTop - 120) currentId = section.id;
    });
    links.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === `#${currentId}`);
    });
}

// ---- TYPEWRITER EFFECT ----
const roles = [
    'Full Stack Developer',
    'SDE | MERN Stack',
    'Competitive Programmer',
    'Tech Founder & Builder',
    'Open Source Contributor'
];
let roleIdx = 0;
let charIdx = 0;
let isDeleting = false;
const typeEl = document.getElementById('typewriter');

function type() {
    const current = roles[roleIdx];
    if (!isDeleting) {
        typeEl.textContent = current.slice(0, charIdx + 1);
        charIdx++;
        if (charIdx === current.length) {
            isDeleting = true;
            setTimeout(type, 2000);
            return;
        }
    } else {
        typeEl.textContent = current.slice(0, charIdx - 1);
        charIdx--;
        if (charIdx === 0) {
            isDeleting = false;
            roleIdx = (roleIdx + 1) % roles.length;
        }
    }
    setTimeout(type, isDeleting ? 60 : 110);
}
type();

// ---- SCROLL REVEAL ----
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.05, rootMargin: '0px 0px -20px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ---- COUNTER ANIMATION ----
function animateCounter(el) {
    const target = el.dataset.target;
    const isFloat = target.includes('.');
    const isPlus = target.endsWith('+');
    const isPercent = target.includes('%');
    const isK = target.includes('K');

    let numericTarget = parseFloat(target.replace(/[^0-9.]/g, ''));
    if (isK) numericTarget *= 1000;

    const duration = 1800;
    const start = performance.now();

    function step(currentTime) {
        const elapsed = currentTime - start;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        let current = numericTarget * eased;

        if (isK) {
            el.textContent = (current / 1000).toFixed(current >= 1000 ? 1 : 1) + 'K' + (isPlus ? '+' : '');
        } else if (isFloat) {
            el.textContent = current.toFixed(2) + (isPercent ? '%' : '');
        } else {
            el.textContent = Math.floor(current) + (isPlus ? '+' : '') + (isPercent && !isFloat ? '%' : '');
        }

        if (progress < 1) requestAnimationFrame(step);
        else {
            // Final correct value
            el.textContent = target;
        }
    }
    requestAnimationFrame(step);
}

const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounter(entry.target);
            counterObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.counter').forEach(el => counterObserver.observe(el));

// ---- SMOOTH SCROLL FOR IN-PAGE ANCHOR LINKS ----
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// ---- CURRENT YEAR IN FOOTER ----
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();
