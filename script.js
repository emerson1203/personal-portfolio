/* 
  Emmersyn Barnett's Portfolio Scripts
  Includes: Theme Toggle, Fade-in Animations, and Smooth Scrolling
*/

document.addEventListener('DOMContentLoaded', () => {
    
    // --- THEME TOGGLE LOGIC ---
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

    // Check if user has a preference saved in local storage
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme === 'dark') {
        body.classList.add('dark-mode');
        if (themeToggle) themeToggle.textContent = '☀ Light Mode';
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            body.classList.toggle('dark-mode');
            
            let theme = 'light';
            if (body.classList.contains('dark-mode')) {
                theme = 'dark';
                themeToggle.textContent = '☀ Light Mode';
            } else {
                themeToggle.textContent = '🌙 Dark Mode';
            }
            
            localStorage.setItem('theme', theme);
        });
    }

    // --- FADE-IN ANIMATION LOGIC ---
    // Uses Intersection Observer for clean scrolling animations
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(el => observer.observe(el));

    // --- SMOOTH SCROLLING ---
    // Makes internal links feel more polished
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

});
