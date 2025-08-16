// Smooth scrolling for navigation links
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

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all fade-in elements
document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
});

// Interactive button functionality
document.getElementById('contactBtn').addEventListener('click', function() {
    // Simulate download functionality
    this.textContent = 'Downloading...';
    this.style.background = 'linear-gradient(135deg, #28a745, #20c997)';
    
    setTimeout(() => {
        this.textContent = 'Resume Downloaded!';
        setTimeout(() => {
            this.textContent = 'Download Resume';
            this.style.background = 'linear-gradient(135deg, #667eea, #764ba2)';
        }, 2000);
    }, 1500);
});

// Profile image click effect
document.getElementById('profileImage').addEventListener('click', function() {
    this.style.transform = 'scale(1.1) rotate(5deg)';
    setTimeout(() => {
        this.style.transform = 'scale(1.05)';
    }, 200);
});

// Add typing effect to the main heading
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

// Initialize typing effect when page loads
window.addEventListener('load', () => {
    const heading = document.querySelector('.profile-info h1');
    const originalText = heading.textContent;
    typeWriter(heading, originalText, 150);
});

// Add hover effects to project cards
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Add skill tag animation
document.querySelectorAll('.skill-tag').forEach((tag, index) => {
    tag.style.animationDelay = `${index * 0.1}s`;
    tag.style.animation = 'fadeInUp 0.6s ease forwards';
});

// Dark Mode Toggle JavaScript
const themeToggle = document.getElementById('theme-toggle');
const htmlElement = document.documentElement;

// Check for saved theme preference or default to light mode
const savedTheme = localStorage.getItem('theme') || 'light';
htmlElement.setAttribute('data-theme', savedTheme);
themeToggle.checked = savedTheme === 'dark';

function setTheme() {
    const currentTheme = themeToggle.checked ? 'dark' : 'light';
    htmlElement.setAttribute('data-theme', currentTheme);
    localStorage.setItem('theme', currentTheme);
}

themeToggle.addEventListener('change', setTheme); 