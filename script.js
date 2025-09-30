document.addEventListener('DOMContentLoaded', function() {
            // Mobile menu toggle
            const menuToggle = document.querySelector('.menu-toggle');
            const navbar = document.querySelector('.navbar');
            const menuIcon = menuToggle.querySelector('i');
            
            menuToggle.addEventListener('click', function() {
                navbar.classList.toggle('active');
                // Toggle between menu and close icon
                if (navbar.classList.contains('active')) {
                    menuIcon.classList.remove('bx-menu');
                    menuIcon.classList.add('bx-x');
                } else {
                    menuIcon.classList.remove('bx-x');
                    menuIcon.classList.add('bx-menu');
                }
            });
            
            // Close menu when clicking on a link
            const navLinks = document.querySelectorAll('.navbar a');
            navLinks.forEach(link => {
                link.addEventListener('click', function() {
                    navbar.classList.remove('active');
                    menuIcon.classList.remove('bx-x');
                    menuIcon.classList.add('bx-menu');
                });
            });
            
            // Header scroll effect
            window.addEventListener('scroll', function() {
                const header = document.querySelector('header');
                header.classList.toggle('scrolled', window.scrollY > 50);
            });
            
            // Scroll to top button
            const scrollTopBtn = document.querySelector('.scroll-top');
            window.addEventListener('scroll', function() {
                scrollTopBtn.classList.toggle('active', window.scrollY > 300);
            });
            
            scrollTopBtn.addEventListener('click', function() {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
            
            // Typing animation
            const typed = new Typed('.typing-text', {
                strings: ['Full Stack Developer', 'Web Designer', 'PHP Developer', 'WordPress Expert'],
                typeSpeed: 50,
                backSpeed: 25,
                loop: true
            });
            
            // Animate skills on scroll
            const skillBars = document.querySelectorAll('.skill-progress');
            
            function animateSkills() {
                skillBars.forEach(bar => {
                    const width = bar.getAttribute('data-width');
                    if (isElementInViewport(bar)) {
                        bar.style.width = width;
                    }
                });
            }
            
            function isElementInViewport(el) {
                const rect = el.getBoundingClientRect();
                return (
                    rect.top >= 0 &&
                    rect.left >= 0 &&
                    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
                    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
                );
            }
            
            window.addEventListener('scroll', animateSkills);
            animateSkills(); // Run once on page load
            
            // Form submission
            const form = document.querySelector('.contact-form form');
            if (form) {
                form.addEventListener('submit', function(e) {
                    e.preventDefault();
                    
                    // Simple form validation
                    const name = form.querySelector('input[name="name"]');
                    const email = form.querySelector('input[name="email"]');
                    const message = form.querySelector('textarea[name="message"]');
                    
                    if (!name.value || !email.value || !message.value) {
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: 'Please fill in all required fields!',
                        });
                        return;
                    }
                    
                    // Submit form using Fetch API
                    const formData = new FormData(form);
                    
                    fetch(form.action, {
                        method: 'POST',
                        body: formData,
                        headers: {
                            'Accept': 'application/json'
                        }
                    })
                    .then(response => {
                        if (response.ok) {
                            Swal.fire({
                                icon: 'success',
                                title: 'Message Sent!',
                                text: 'Thank you for reaching out. I will get back to you soon!',
                            });
                            form.reset();
                        } else {
                            throw new Error('Network response was not ok');
                        }
                    })
                    .catch(error => {
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: 'Something went wrong. Please try again later!',
                        });
                        console.error('Error:', error);
                    });
                });
            }
            
            // Smooth scrolling for anchor links
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function(e) {
                    e.preventDefault();
                    
                    const targetId = this.getAttribute('href');
                    if (targetId === '#') return;
                    
                    const targetElement = document.querySelector(targetId);
                    if (targetElement) {
                        window.scrollTo({
                            top: targetElement.offsetTop - 80,
                            behavior: 'smooth'
                        });
                    }
                });
            });
            
            // Add active class to navigation links based on scroll position
            window.addEventListener('scroll', function() {
                const sections = document.querySelectorAll('section');
                const navLinks = document.querySelectorAll('.navbar a');
                
                let current = '';
                sections.forEach(section => {
                    const sectionTop = section.offsetTop;
                    const sectionHeight = section.clientHeight;
                    if (scrollY >= sectionTop - 100) {
                        current = section.getAttribute('id');
                    }
                });
                
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${current}`) {
                        link.classList.add('active');
                    }
                });
            });
        });