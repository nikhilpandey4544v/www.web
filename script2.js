const title = document.querySelector(".section-title");

const colors = ["#ff4655", "#ff8a65", "#ffc107", "#4fc3f7", "#ab47bc"];
let index = 0;

setInterval(() => {
  title.style.color = colors[index];
  title.style.textShadow = `0 0 5px ${colors[index]}`;
  index = (index + 1) % colors.length;
}, 1500);

document.addEventListener("DOMContentLoaded", () => {
  const toggleBtn = document.querySelector(".toggle-icon1");
  const navLinks = document.getElementById("mobile-menu");
  toggleBtn.addEventListener("click", () => {
    navLinks.classList.toggle("hidden");
  });
});

// Parallax Effect Handler
class ParallaxManager {
    constructor() {
        this.layers = document.querySelectorAll('.parallax-layer');
        this.container = document.querySelector('.parallax-container');
        this.mouse = { x: 0, y: 0 };
        this.containerRect = null;
        this.bounds = { min: -30, max: 30 };
        
        this.init();
    }
    
    init() {
        if (!this.container) return;
        
        window.addEventListener('mousemove', (e) => this.handleMouseMove(e));
        window.addEventListener('scroll', () => this.handleScroll());
        window.addEventListener('resize', () => this.updateContainerRect());
        
        this.updateContainerRect();
        this.animate();
    }
    
    updateContainerRect() {
        if (this.container) {
            this.containerRect = this.container.getBoundingClientRect();
        }
    }
    
    handleMouseMove(e) {
        if (!this.containerRect) return;
        
        this.mouse.x = (e.clientX - this.containerRect.left) / this.containerRect.width;
        this.mouse.y = (e.clientY - this.containerRect.top) / this.containerRect.height;
    }
    
    handleScroll() {
        const scrolled = window.pageYOffset;
        this.layers.forEach(layer => {
            const speed = layer.dataset.speed || 1;
            const yOffset = -(scrolled * speed);
            layer.style.transform = `translateY(${yOffset}px)`;
        });
    }
    
    animate() {
        this.layers.forEach(layer => {
            const speed = layer.dataset.speed || 1;
            const x = this.lerp(this.bounds.min, this.bounds.max, this.mouse.x) * speed;
            const y = this.lerp(this.bounds.min, this.bounds.max, this.mouse.y) * speed;
            
            layer.style.transform = `translate3d(${x}px, ${y}px, 0)`;
        });
        
        requestAnimationFrame(() => this.animate());
    }
    
    lerp(start, end, amount) {
        return (1 - amount) * start + amount * end;
    }
}

// 3D Card Effect
class Card3DEffect {
    constructor(element) {
        this.element = element;
        this.bounds = element.getBoundingClientRect();
        this.mouse = { x: 0, y: 0 };
        this.center = {
            x: this.bounds.left + this.bounds.width / 2,
            y: this.bounds.top + this.bounds.height / 2
        };
        
        this.init();
    }
    
    init() {
        this.element.addEventListener('mousemove', (e) => this.handleMouseMove(e));
        this.element.addEventListener('mouseleave', () => this.handleMouseLeave());
    }
    
    handleMouseMove(e) {
        this.mouse.x = e.clientX - this.center.x;
        this.mouse.y = e.clientY - this.center.y;
        
        const rotateX = (this.mouse.y / (this.bounds.height / 2)) * -20;
        const rotateY = (this.mouse.x / (this.bounds.width / 2)) * 20;
        
        this.element.style.transform = `
            perspective(1000px)
            rotateX(${rotateX}deg)
            rotateY(${rotateY}deg)
            scale3d(1.05, 1.05, 1.05)
        `;
    }
    
    handleMouseLeave() {
        this.element.style.transform = `
            perspective(1000px)
            rotateX(0deg)
            rotateY(0deg)
            scale3d(1, 1, 1)
        `;
    }
}

// Glitch Text Effect
class GlitchText {
    constructor(element) {
        this.element = element;
        this.originalText = element.textContent;
        this.chars = '!<>-_\\/[]{}';
        this.isGlitching = false;
        
        this.init();
    }
    
    init() {
        this.element.addEventListener('mouseover', () => this.startGlitch());
        this.element.addEventListener('mouseleave', () => this.stopGlitch());
    }
    
    startGlitch() {
        if (this.isGlitching) return;
        this.isGlitching = true;
        
        let iteration = 0;
        const maxIterations = 4;
        
        const interval = setInterval(() => {
            this.element.textContent = this.originalText
                .split('')
                .map((char, index) => {
                    if (index < iteration) return this.originalText[index];
                    return this.chars[Math.floor(Math.random() * this.chars.length)];
                })
                .join('');
            
            if (iteration >= maxIterations) {
                clearInterval(interval);
                this.element.textContent = this.originalText;
                this.isGlitching = false;
            }
            
            iteration += 1/6; // Slowed down by reducing increment
        }, 30); // Increased interval time from 30ms to 100ms
    }
    
    stopGlitch() {
        this.element.textContent = this.originalText;
    }
}

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Mobile Menu Toggle
const mobileMenuButton = document.getElementById('mobile-menu-button');
const navLinks = document.getElementById('mobile-menu');

if (mobileMenuButton && navLinks) {
    console.log(mobileMenuButton);
    mobileMenuButton.addEventListener("click", () => {
        navLinks.classList.toggle("open");
    });
}

// Scroll Animations
const observerOptions = {
    root: null,
    threshold: 0.1,
    rootMargin: "0px"
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-slide-up', 'opacity-100');
            entry.target.classList.remove('opacity-0', 'translate-y-10');
        }
    });
}, observerOptions);

document.querySelectorAll('section').forEach(section => {
    section.classList.add('opacity-0', 'translate-y-10', 'transition-all', 'duration-700', 'ease-out');
    observer.observe(section);
});

// Skill Cards Hover Effect
const skillCards = document.querySelectorAll('.skill-card');
skillCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.classList.add('glow-effect');
    });
    card.addEventListener('mouseleave', () => {
        card.classList.remove('glow-effect');
    });
});

// Dynamic Cyber Grid
function createCyberGrid() {
    const grid = document.querySelector('.cyber-grid');
    if (!grid) return;

    const gridSize = 50;
    const numRows = Math.ceil(window.innerHeight / gridSize);
    const numCols = Math.ceil(window.innerWidth / gridSize);

    for (let i = 0; i < numRows * numCols; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cyber-grid-cell');
        grid.appendChild(cell);
    }
}

// Particle Effect
function createParticles() {
    const numParticles = 50;
    const colors = ['#00f3ff', '#b537f2', '#ff3366'];
    const container = document.createElement('div');
    container.className = 'particles-container fixed inset-0 pointer-events-none z-10';
    document.body.appendChild(container);

    for (let i = 0; i < numParticles; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.setProperty('--size', Math.random() * 3 + 1 + 'px');
        particle.style.setProperty('--color', colors[Math.floor(Math.random() * colors.length)]);
        particle.style.left = Math.random() * 100 + 'vw';
        particle.style.animationDuration = Math.random() * 3 + 2 + 's';
        particle.style.animationDelay = Math.random() * 5 + 's';
        container.appendChild(particle);
    }
}

// Form Handling with Animation
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Simple form validation
        const name = contactForm.querySelector('input[name="name"]').value;
        const email = contactForm.querySelector('input[name="email"]').value;
        const message = contactForm.querySelector('textarea[name="message"]').value;
        
        if (!name || !email || !message) {
            alert('Please fill in all fields');
            return;
        }
        
        // Add success message
        const submitBtn = contactForm.querySelector('.submit-btn');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Message Sent!';
        submitBtn.classList.add('bg-green-500', 'border-green-500');
        
        // Reset form after delay
        setTimeout(() => {
            contactForm.reset();
            submitBtn.textContent = originalText;
            submitBtn.classList.remove('bg-green-500', 'border-green-500');
        }, 3000);
    });
}

// Initialize everything
document.addEventListener('DOMContentLoaded', () => {
    createCyberGrid();
    createParticles();
    
    // Initialize parallax
    const parallaxManager = new ParallaxManager();
    
    // Initialize 3D cards
    document.querySelectorAll('.skill-card').forEach(card => {
        new Card3DEffect(card);
    });
    
    // Initialize matrix rain
    if (window.innerWidth > 768) {
        new MatrixRain();
    }
    
    // Initialize glitch text
    document.querySelectorAll('.glitch-text').forEach(text => {
        new GlitchText(text);
    });
    
    // Smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// Navbar Scroll Effect
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    const navbar = document.querySelector('nav');
    
    if (currentScroll <= 0) {
        navbar.classList.remove('nav-hidden');
        return;
    }
    
    if (currentScroll > lastScroll && !navbar.classList.contains('nav-hidden')) {
        navbar.classList.add('nav-hidden');
    } else if (currentScroll < lastScroll && navbar.classList.contains('nav-hidden')) {
        navbar.classList.remove('nav-hidden');
    }
    
    lastScroll = currentScroll;
});

// Stats Counter Animation
const animateStats = () => {
    const stats = document.querySelectorAll('.stat-number');
    stats.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-target'));
        const duration = 2000; // 2 seconds
        const increment = target / (duration / 16); // 60fps
        let current = 0;

        const updateCounter = () => {
            if (current < target) {
                current += increment;
                stat.textContent = Math.round(current);
                requestAnimationFrame(updateCounter);
            } else {
                stat.textContent = target;
            }
        };

        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                updateCounter();
                observer.unobserve(stat);
            }
        });

        observer.observe(stat);
    });
};

// Achievement Cards Hover Effect
const achievementCards = document.querySelectorAll('.achievement-card');
achievementCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
    });
});

// Project Showcase Parallax
const projectShowcase = document.querySelector('.project-showcase');
if (projectShowcase) {
    // but initally set the transform to 0 once reach that section then set it to the rate use this id:current-projects
    const currentProjects = document.getElementById('project-showcase');
    currentProjects.style.transform = 'translate3d(0px, 0px, 0px)';
    const projectShowcaseObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                currentProjects.style.transform = 'translate3d(0px, 0px, 0px)';
            }
        });
    }, { threshold: 0.5 });
    projectShowcaseObserver.observe(currentProjects);
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * 0.08;
        currentProjects.style.transform = `translate3d(0px, ${rate}px, 0px)`;
    });
}

// Timeline Animation
const timelineItems = document.querySelectorAll('.timeline-item');
const timelineObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
            entry.target.style.opacity = 1;
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.5 });

timelineItems.forEach(item => {
    item.style.opacity = 0;
    item.style.transform = 'translateY(20px)';
    timelineObserver.observe(item);
});

// Setup Cards Hover Effect
const specCards = document.querySelectorAll('.spec-card');
specCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.classList.add('animate-pulse-border');
    });
    card.addEventListener('mouseleave', () => {
        card.classList.remove('animate-pulse-border');
    });
});

// Blog Cards Image Parallax
const blogCards = document.querySelectorAll('.blog-card');
blogCards.forEach(card => {
    const image = card.querySelector('img');
    if (image) {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width;
            const y = (e.clientY - rect.top) / rect.height;
            
            image.style.transform = `scale(1.1) translate(${x * 10}px, ${y * 10}px)`;
        });
        
        card.addEventListener('mouseleave', () => {
            image.style.transform = 'scale(1) translate(0, 0)';
        });
    }
});

// Social Cards Hover Animation
const socialCards = document.querySelectorAll('.social-card');
socialCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.classList.add('animate-float');
    });
    card.addEventListener('mouseleave', () => {
        card.classList.remove('animate-float');
    });
});

// Cyber Grid Animation
const cyberGrids = document.querySelectorAll('.cyber-grid-alt');
cyberGrids.forEach(grid => {
    window.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        
        grid.style.transform = `perspective(500px) rotateX(${60 + mouseY * 5}deg) rotateY(${mouseX * 5}deg)`;
    });
});

// Initialize animations
document.addEventListener('DOMContentLoaded', () => {
    animateStats();
    
    // Add smooth scroll for all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// Mobile menu toggle
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navMenu = document.querySelector('.nav-menu');

if (mobileMenuBtn && navMenu) {
    mobileMenuBtn.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        mobileMenuBtn.classList.toggle('active');
    });
}

// Simple intersection observer for fade-in elements
const fadeInElements = document.querySelectorAll('.fade-in');
const fadeInObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            fadeInObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1
});

fadeInElements.forEach(element => {
    fadeInObserver.observe(element);
});

