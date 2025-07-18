// GlobalFeed - Main JavaScript File

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('nav ul');

    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            // Toggle between menu and close icons
            const icon = this.querySelector('i');
            if (icon.classList.contains('fa-bars')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }

    // Smooth Scrolling for Navigation Links
    const navLinks = document.querySelectorAll('nav ul li a, .footer-links ul li a, .cta-buttons a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Check if the link is an anchor link
            if (this.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    // Close mobile menu if open
                    if (navMenu.classList.contains('active')) {
                        navMenu.classList.remove('active');
                        const icon = mobileMenuToggle.querySelector('i');
                        icon.classList.remove('fa-times');
                        icon.classList.add('fa-bars');
                    }
                    
                    // Smooth scroll to target
                    window.scrollTo({
                        top: targetSection.offsetTop - 70,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Animate section titles on scroll
    const sectionTitles = document.querySelectorAll('.section-title');
    
    // Animate titles that are visible on page load
    animateSectionTitlesInView();
    
    // Check for visibility on scroll
    window.addEventListener('scroll', function() {
        animateSectionTitlesInView();
    });
    
    function animateSectionTitlesInView() {
        sectionTitles.forEach(title => {
            if (isElementInViewport(title) && !title.classList.contains('animate')) {
                title.classList.add('animate');
            }
        });
    }
    
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8
        );
    }

    // Highlight active nav item on scroll
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('nav ul li a');
    
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollY >= (sectionTop - 100)) {
                current = section.getAttribute('id');
            }
        });
        
        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${current}`) {
                item.classList.add('active');
            }
        });
    });
    
    // FAQ Functionality
    const faqItems = document.querySelectorAll('.faq-item');
    
    if (faqItems.length > 0) {
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            
            question.addEventListener('click', () => {
                // Close all other FAQs
                faqItems.forEach(otherItem => {
                    if (otherItem !== item && otherItem.classList.contains('active')) {
                        otherItem.classList.remove('active');
                    }
                });
                
                // Toggle current FAQ
                item.classList.toggle('active');
            });
        });
        
        // Open the first FAQ by default
        faqItems[0].classList.add('active');
    }
    
    // Device detection for download section
    function detectDeviceOS() {
        const userAgent = navigator.userAgent || navigator.vendor || window.opera;
        
        // iOS detection
        if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
            return 'iOS';
        }
        
        // Android detection
        if (/android/i.test(userAgent)) {
            return 'Android';
        }
        
        // Default to desktop/Windows
        return 'Desktop';
    }
    
    // Download buttons functionality
    const androidDownloadBtn = document.querySelector('.android-download');
    const iosDownloadBtn = document.querySelector('.ios-download');
    const androidQRSection = document.getElementById('android-qr');
    const iosQRSection = document.getElementById('ios-qr');
    
    if (androidDownloadBtn && iosDownloadBtn) {
        const userDevice = detectDeviceOS();
        
        // Android download button click
        androidDownloadBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            if (userDevice === 'Android') {
                // Direct download for Android devices
                window.location.href = "https://example.com/download/edushorts.apk";
            } else {
                // For desktop/iOS, show QR code
                if (iosQRSection.classList.contains('active')) {
                    iosQRSection.classList.remove('active');
                }
                
                // Toggle Android QR section
                if (androidQRSection.classList.contains('active')) {
                    androidQRSection.classList.remove('active');
                } else {
                    androidQRSection.classList.add('active');
                }
            }
        });
        
        // iOS download button click
        iosDownloadBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            if (userDevice === 'iOS') {
                // Direct to App Store for iOS devices
                window.location.href = "https://apps.apple.com/app/edushorts";
            } else {
                // For desktop/Android, show QR code
                if (androidQRSection.classList.contains('active')) {
                    androidQRSection.classList.remove('active');
                }
                
                // Toggle iOS QR section
                if (iosQRSection.classList.contains('active')) {
                    iosQRSection.classList.remove('active');
                } else {
                    iosQRSection.classList.add('active');
                }
            }
        });
        
        // Direct download links inside QR sections
        const directDownloadLinks = document.querySelectorAll('.direct-download-link');
        
        directDownloadLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                if (this.parentElement.parentElement.parentElement.id === 'android-qr') {
                    window.location.href = "https://example.com/download/edushorts.apk";
                } else {
                    window.location.href = "https://apps.apple.com/app/edushorts";
                }
            });
        });
    }

    // Form Submission (Contact Form)
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form field values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Show loading indicator
            const submitButton = this.querySelector('button[type="submit"]');
            const originalButtonText = submitButton.innerHTML;
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitButton.disabled = true;
            
            // Simulate sending (would be replaced with actual email service)
            setTimeout(() => {
                // Here you would typically send the form data to a server using fetch or XMLHttpRequest
                // For example with EmailJS or a backend API
                console.log('Form submitted:', { name, email, subject, message });
                
                // Show success message
                submitButton.innerHTML = '<i class="fas fa-check"></i> Sent Successfully!';
                submitButton.style.backgroundColor = '#28a745';
                
                // Reset form
                contactForm.reset();
                
                // Reset button after a delay
                setTimeout(() => {
                    submitButton.innerHTML = originalButtonText;
                    submitButton.disabled = false;
                    submitButton.style.backgroundColor = '';
                }, 3000);
            }, 1500);
        });
    }

    // Optional: Add testimonial slider functionality
    // This is a simple auto-scroll for testimonials
    const testimonialSlider = document.querySelector('.testimonial-slider');
    
    if (testimonialSlider && testimonialSlider.children.length > 1) {
        let currentTestimonial = 0;
        const testimonials = testimonialSlider.querySelectorAll('.testimonial');
        
        setInterval(() => {
            currentTestimonial = (currentTestimonial + 1) % testimonials.length;
            testimonialSlider.scrollTo({
                left: testimonials[currentTestimonial].offsetLeft,
                behavior: 'smooth'
            });
        }, 5000); // Change testimonial every 5 seconds
    }

    // Header scroll effect
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.style.padding = '10px 0';
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.padding = '15px 0';
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        }
    });
});
