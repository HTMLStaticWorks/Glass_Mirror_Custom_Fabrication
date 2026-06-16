document.addEventListener('DOMContentLoaded', () => {
    // Dark Mode Toggle
    const darkModeToggle = document.getElementById('darkModeToggle');
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            const isDarkMode = document.body.classList.contains('dark-mode');
            localStorage.setItem('darkMode', isDarkMode);
        });

        // Check local storage for dark mode
        if (localStorage.getItem('darkMode') === 'true') {
            document.body.classList.add('dark-mode');
        }
    }

    // RTL Toggle
    const rtlToggle = document.getElementById('rtlToggle');
    if (rtlToggle) {
        rtlToggle.addEventListener('click', () => {
            const html = document.documentElement;
            if (html.getAttribute('dir') === 'rtl') {
                html.setAttribute('dir', 'ltr');
                localStorage.setItem('rtlMode', 'false');
            } else {
                html.setAttribute('dir', 'rtl');
                localStorage.setItem('rtlMode', 'true');
            }
        });

        // Check local storage for RTL
        if (localStorage.getItem('rtlMode') === 'true') {
            document.documentElement.setAttribute('dir', 'rtl');
        }
    }

    // Scroll reveal animation
    const reveals = document.querySelectorAll('.reveal');
    const revealOnScroll = () => {
        for (let i = 0; i < reveals.length; i++) {
            const windowHeight = window.innerHeight;
            const elementTop = reveals[i].getBoundingClientRect().top;
            const elementVisible = 100;
            if (elementTop < windowHeight - elementVisible) {
                reveals[i].classList.add('active');
            }
        }
    };
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Trigger on load

    // Back to Top functionality
    const backToTopButton = document.getElementById('backToTop');
    if (backToTopButton) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTopButton.classList.add('visible');
            } else {
                backToTopButton.classList.remove('visible');
            }
        });

        backToTopButton.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const navActions = document.querySelector('.nav-actions');

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            document.body.classList.toggle('menu-open');
        });
    }

    // Move actions into nav-links on mobile for correct flow
    if (window.innerWidth <= 1024 && navLinks && navActions) {
        const darkModeBtn = document.getElementById('darkModeToggle');
        const rtlBtn = document.getElementById('rtlToggle');
        const loginBtn = navActions.querySelector('.btn-primary');

        if (darkModeBtn || rtlBtn) {
            const togglesLi = document.createElement('li');
            togglesLi.style.display = 'flex';
            togglesLi.style.gap = '1rem';
            togglesLi.style.marginTop = '2rem';
            if (rtlBtn) togglesLi.appendChild(rtlBtn);
            if (darkModeBtn) togglesLi.appendChild(darkModeBtn);
            navLinks.appendChild(togglesLi);
        }

        if (loginBtn) {
            const loginLi = document.createElement('li');
            loginLi.style.width = '100%';
            loginLi.style.marginTop = '1rem';
            loginBtn.style.width = '100%';
            loginBtn.style.textAlign = 'center';
            loginLi.appendChild(loginBtn);
            navLinks.appendChild(loginLi);
        }
    }

    // Close menu when clicking a link
    const navLinkItems = document.querySelectorAll('.nav-links a:not(.btn-primary)');
    navLinkItems.forEach(link => {
        link.addEventListener('click', () => {
            document.body.classList.remove('menu-open');
        });
    });
});

// Old Parallax Effect removed - using parallax.js instead
// Parallax Effect for Ultra-Premium Hero Section
document.addEventListener('DOMContentLoaded', () => {
    const heroShowcase = document.getElementById('heroShowcase');
    const hero = document.getElementById('homeHero');
    
    if (heroShowcase && hero && window.innerWidth > 1024) {
        hero.addEventListener('mousemove', (e) => {
            const x = (e.clientX / window.innerWidth - 0.5) * 2;
            const y = (e.clientY / window.innerHeight - 0.5) * 2;
            
            const panelFront = hero.querySelector('.panel-front');
            const panelMid = hero.querySelector('.panel-mid');
            const panelBack = hero.querySelector('.panel-back');
            const bgImage = hero.querySelector('.parallax-bg');
            
            if (panelFront) panelFront.style.transform = `translate(${x * 5}px, ${y * 5}px) translateZ(80px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg)`;
            if (panelMid) panelMid.style.transform = `translate(calc(45% + ${x * -10}px), calc(15% + ${y * -10}px)) translateZ(-80px) rotateY(${12 + x * 5}deg) rotateX(${-y * 5}deg)`;
            if (panelBack) panelBack.style.transform = `translate(calc(-45% + ${x * -10}px), calc(-15% + ${y * -10}px)) translateZ(-80px) rotateY(${-12 + x * 5}deg) rotateX(${-y * 5}deg)`;
            if (bgImage) bgImage.style.transform = `scale(1.05) translate(${x * -10}px, ${y * -10}px)`;
        });
        
        // Reset on mouse leave
        hero.addEventListener('mouseleave', () => {
            const panelFront = hero.querySelector('.panel-front');
            const panelMid = hero.querySelector('.panel-mid');
            const panelBack = hero.querySelector('.panel-back');
            const bgImage = hero.querySelector('.parallax-bg');
            
            if (panelFront) panelFront.style.transform = `translate(0, 0) translateZ(80px) rotateY(0deg)`;
            if (panelMid) panelMid.style.transform = `translate(45%, 15%) translateZ(-80px) rotateY(12deg)`;
            if (panelBack) panelBack.style.transform = `translate(-45%, -15%) translateZ(-80px) rotateY(-12deg)`;
            if (bgImage) bgImage.style.transform = `scale(1.05)`;
        });

        // Click to Swap Panels in 3D Space
        const panels = hero.querySelectorAll('.glass-layer');

        panels.forEach(panel => {
            panel.addEventListener('click', function() {
                // If the clicked panel is already in front, do nothing
                if (this.classList.contains('panel-front')) return;

                const currentFront = hero.querySelector('.panel-front');
                
                // Find what class the clicked panel currently has
                let clickedClass = '';
                if (this.classList.contains('panel-mid')) clickedClass = 'panel-mid';
                if (this.classList.contains('panel-back')) clickedClass = 'panel-back';

                // Swap classes
                if (currentFront && clickedClass) {
                    currentFront.classList.remove('panel-front');
                    currentFront.classList.add(clickedClass);

                    this.classList.remove(clickedClass);
                    this.classList.add('panel-front');

                    // Crucial: Clear inline transform styles left over from mousemove
                    // so the CSS class transforms and transitions take over instantly!
                    currentFront.style.transform = '';
                    this.style.transform = '';
                }
            });
        });
    }
    // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        
        question.addEventListener('click', () => {
            const isOpen = item.classList.contains('active');
            
            // Close all other accordions
            faqItems.forEach(otherItem => {
                otherItem.classList.remove('active');
                if(otherItem.querySelector('.faq-answer')) {
                    otherItem.querySelector('.faq-answer').style.maxHeight = null;
                }
            });

            if (!isOpen) {
                item.classList.add('active');
                if(answer) {
                    answer.style.maxHeight = answer.scrollHeight + 'px';
                }
            }
        });
    });
});
