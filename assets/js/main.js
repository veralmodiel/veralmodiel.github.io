$(document).ready(function() {
    // 0. Initial State & Theme Determination (Moved to top for preloader skip)
    const urlParams = new URLSearchParams(window.location.search);
    const urlTheme = urlParams.get('theme');
    let currentTheme = urlTheme || localStorage.getItem('theme') || 'theme-modern';
    
    if (currentTheme === 'modern') currentTheme = 'theme-modern';
    if (currentTheme === '2015') currentTheme = 'theme-2015';

    const isModern = () => currentTheme === 'theme-modern';
    const overlay = $('#initial-load-overlay');

    // Apply theme immediately to minimize flash
    $('body').removeClass('theme-2015 theme-modern').addClass(currentTheme);

    // 1. Initialize AOS FIRST so it can hear the startup event
    function initAOS() {
        if (typeof AOS !== 'undefined') {
            AOS.init({
                duration: 1200,
                easing: 'ease',
                startEvent: 'app:ready', // Wait for our custom loader event
            });
        }
    }
    initAOS();

    // 2. Initial Load Progression Sequence (Conditional)
    if (isModern()) {
        (function() {
            const progress = $('#initial-progress');
            
            // Start filling progress immediately (simulating asset pre-load)
            setTimeout(() => {
                progress.css('width', '80%');
            }, 100);

            $(window).on('load', function() {
                progress.css('width', '100%');
                setTimeout(() => {
                    overlay.addClass('fade-out');
                    setTimeout(() => {
                        overlay.remove();
                        document.dispatchEvent(new Event('app:ready'));
                    }, 1000);
                }, 800);
            });
            
            // Safety timeout
            setTimeout(() => {
                if ($('#initial-load-overlay').length > 0) {
                    overlay.addClass('fade-out');
                    setTimeout(() => {
                        overlay.remove();
                        document.dispatchEvent(new Event('app:ready'));
                    }, 1000);
                }
            }, 5000);
        })();
    } else {
        // Old School: Skip preloader for nostalgic instant load
        overlay.hide().remove();
        // Small delay to ensure AOS listener is active in the event loop before dispatch
        // setTimeout(() => {
        //     document.dispatchEvent(new Event('app:ready'));
        // }, 100);
    }

    // Variable Declarations
    let cursorActive = false;
    
    // Sync UI elements
    if (isModern()) {
        $('#theme-toggle').prop('checked', true);
        // Robust Polling: Check if dependencies ARE ready
        const checkReady = setInterval(() => {
            const container = $('#vanta-bg');
            if (typeof VANTA !== 'undefined' && typeof THREE !== 'undefined' && container.length > 0 && container.height() > 0) {
                clearInterval(checkReady);
                setTimeout(() => {
                    enableModernInteractivity();
                }, 300);
            }
        }, 100);
        setTimeout(() => clearInterval(checkReady), 10000);
    } else {
        $('#theme-toggle').prop('checked', false);
    }


    
    // 2. Theme Toggle Event
    $('#theme-toggle').change(function(e) {
        // Prevent generic bubbling issues
        e.preventDefault();
        
        const isModern = $(this).is(':checked');
        const targetTheme = isModern ? 'theme-modern' : 'theme-2015';
        
        // Show loader if switching to modern
        if (isModern) {
            $('#theme-loader').removeClass('hidden');
            setTimeout(() => {
                $('#theme-loader').addClass('opacity-100');
            }, 10);
            
            setTimeout(() => {
                switchTheme(targetTheme, isModern);
                
                // Hide loader
                $('#theme-loader').removeClass('opacity-100');
                setTimeout(() => {
                    $('#theme-loader').addClass('hidden');
                    AOS.refresh();
                    document.dispatchEvent(new Event('app:ready'));
                }, 500);
            }, 1200); // Loader artificial delay
        } else {
            // Instant switch back to 2015
            switchTheme(targetTheme, isModern);
        }
    });

    function switchTheme(themeClass, isModern) {
        $('body').removeClass('theme-2015 theme-modern').addClass(themeClass);
        localStorage.setItem('theme', themeClass);
        currentTheme = themeClass;
        
        // Refresh AOS to recalculate offsets since stylesheet has changed layout
        setTimeout(() => {
            if (typeof AOS !== 'undefined') {
                AOS.refresh();
                $(window).trigger('scroll');
            }
        }, 150);
        
        if (isModern) {
            enableModernInteractivity();
        } else {
            // Disable modern stuff, refresh layout for 2015 mode
            $(window).trigger('resize');
            disableModernInteractivity();
        }

        // Always reset typing sequence on theme switch to match new aesthetic
        resetTyping();
    }

    // 3. Modern Interactivity (Vanta.js NET)
    function enableModernInteractivity(retries = 0) {
        if (cursorActive) return; // Already active or initializing
        
        // Check if libraries are loaded
        if (typeof VANTA === 'undefined' || typeof THREE === 'undefined') {
            if (retries < 10) {
                setTimeout(() => enableModernInteractivity(retries + 1), 200);
            }
            return;
        }

        cursorActive = true;
        
        // Init Vanta.js NET
        if (!window.vantaEffect) {
            console.log("Vanta NET: Starting initialization...");
            window.vantaEffect = VANTA.NET({
                el: "#vanta-bg",
                THREE: THREE, 
                mouseControls: true,
                touchControls: true,
                gyroControls: false,
                minHeight: 200.00,
                minWidth: 200.00,
                scale: 1.00,
                scaleMobile: 1.00,
                color: 0x3b82f6,
                backgroundColor: 0x0f172a,
                points: 10.00,
                maxDistance: 20.00,
                spacing: 16.00
            });
            
            // Force a resize check after a short delay to ensure the canvas fills the container
            setTimeout(() => {
                if (window.vantaEffect && typeof window.vantaEffect.resize === 'function') {
                    window.vantaEffect.resize();
                    console.log("Vanta NET: Resize triggered.");
                }
            }, 500);
        }
    }

    function disableModernInteractivity() {
        cursorActive = false;
        
        // Destroy Vanta
        if (window.vantaEffect) {
            window.vantaEffect.destroy();
            window.vantaEffect = null;
        }
    }

    // 4. Timeline Scroll Tracking (Only 1 active, closest to center)
    function updateTimelineActive() {
        if (!$('body').hasClass('theme-modern')) {
            // If they want native behavior or no classes in 2015, we can just clear it
            // but let's just clear for safety or leave them. Actually, let's remove so it only tracks in modern if they intended.
            $('.timeline-item').removeClass('is-active');
            return;
        }

        let viewportCenter = $(window).scrollTop() + ($(window).height() / 2);
        let closest = null;
        let minDistance = Infinity;

        $('.timeline-item').each(function() {
            let itemCenter = $(this).offset().top + ($(this).outerHeight() / 2);
            let distance = Math.abs(viewportCenter - itemCenter);

            if (distance < minDistance) {
                minDistance = distance;
                closest = this;
            }
        });

        $('.timeline-item').removeClass('is-active');
        // Add active if it's reasonably within viewport
        if (closest && minDistance < ($(window).height() / 1.5)) {
            $(closest).addClass('is-active');
        }
    }

    $(window).on('scroll resize', updateTimelineActive);
    // Initial call
    updateTimelineActive();

    // 5. Dynamic Typing Effect (Terminal vs. IDE Editor)
    const terminalText = [
        "Initializing boot sequence...",
        "Loading Ver_Almodiel.sys...",
        "Activating Developer Mode [██████████] 100%",
        "Welcome to my portfolio."
    ];

    const modernCodeText = [
        "git init almodiel-portfolio",
        "git remote add origin https://github.com/veralmodiel/portfolio.git",
        "git pull origin production",
        "git status --short",
        "M assets/css/modern-v2.css",
        "M assets/js/main.js",
        "git log --oneline -n 1",
        "df4e21a [Senior-Dev] Establish Modern Interface"
    ];
    
    let lineIndex = 0;
    let charIndex = 0;
    let typingActive = true;
    
    function typeWriter() {
        if (!typingActive) return;

        const currentArray = isModern() ? modernCodeText : terminalText;
        const typeSpeed = isModern() ? 25 : 40; // typing in an IDE is often "faster" looking
        const lineDelay = isModern() ? 300 : 500;

        if (lineIndex < currentArray.length) {
            if (charIndex === 0) {
                // Add a new paragraph for the new line
                const lineClass = isModern() ? 'code-line' : 'terminal-line';
                $('#terminal-output').append('<p id="line-' + lineIndex + '" class="' + lineClass + '"><span class="text"></span><span class="cursor animate-pulse inline-block w-2 bg-green-400 h-4 ml-1 align-middle"></span></p>');
                
                // Customize cursor color for modern
                if (isModern()) {
                  $('#line-' + lineIndex + ' .cursor').removeClass('bg-green-400').addClass('bg-blue-400');
                }
            }
            
            const currentString = currentArray[lineIndex];
            
            if (charIndex < currentString.length) {
                $('#line-' + lineIndex + ' .text').text(currentString.substring(0, charIndex + 1));
                charIndex++;
                // Auto-scroll to keep latest line visible in fixed-height terminal
                const output = document.getElementById('terminal-output');
                if (output) output.scrollTop = output.scrollHeight;
                setTimeout(typeWriter, typeSpeed + (Math.random() * 20)); // Subtle human-like variation
            } else {
                // Line finished
                $('#line-' + lineIndex + ' .cursor').removeClass('animate-pulse').hide();
                lineIndex++;
                charIndex = 0;
                setTimeout(typeWriter, lineDelay);
            }
        } else {
            // Typing complete, show final blinking cursor
            const finalCursorColor = isModern() ? 'bg-blue-400' : 'bg-green-400';
            $('#terminal-output').append('<p><span class="animate-pulse inline-block w-2 ' + finalCursorColor + ' h-4 ml-1 align-middle"></span></p>');
        }
    }
    
    // Start typing effect after short delay
    setTimeout(typeWriter, 1200);

    // Safety restart for typing if we switch themes (re-types the correct context)
    function resetTyping() {
        typingActive = false; // Stop current loop
        $('#terminal-output').empty();
        lineIndex = 0;
        charIndex = 0;
        typingActive = true;
        typeWriter();
    }
    
    // We can hook into switchTheme if needed, but let's keep it simple for now. 
    // The default reload handles initial state already.

    function initAOS() {
        if (typeof AOS !== 'undefined') {
            AOS.init({
                duration: 800,
                easing: 'ease',
                startEvent: 'app:ready', // Wait for our custom loader event
            });
        }
    }

    // 6. Navigation Active State, Smooth Scroll & Mobile Menu
    (function() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
        const mobileNav = document.getElementById('mobile-nav');
        const mobileMenuToggle = document.getElementById('mobile-menu-toggle');

        // Toggle Mobile Menu
        function toggleMenu() {
            const isOpen = mobileNav.classList.toggle('open');
            mobileMenuToggle.classList.toggle('open');
            document.body.style.overflow = isOpen ? 'hidden' : '';
        }

        if (mobileMenuToggle) {
            mobileMenuToggle.addEventListener('click', toggleMenu);
        }

        // Close when tapping the backdrop
        const backdrop = mobileNav ? mobileNav.querySelector('.mobile-nav-backdrop') : null;
        if (backdrop) {
            backdrop.addEventListener('click', () => {
                if (mobileNav.classList.contains('open')) toggleMenu();
            });
        }

        // Smooth Scroll & Auto-close for all nav links
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                const targetId = link.getAttribute('href');
                if (targetId.startsWith('#')) {
                    e.preventDefault();
                    
                    // Close mobile menu if open
                    if (mobileNav.classList.contains('open')) {
                        toggleMenu();
                    }

                    const targetElement = document.querySelector(targetId);
                    if (targetElement) {
                        const headerOffset = 80;
                        const elementPosition = targetElement.getBoundingClientRect().top;
                        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                        window.scrollTo({
                            top: offsetPosition,
                            behavior: 'smooth'
                        });
                    }
                }
            });
        });

        // Intersection Observer for Active State
        const observerOptions = {
            root: null,
            rootMargin: '-20% 0px -70% 0px',
            threshold: 0
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.getAttribute('id');
                    
                    navLinks.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === `#${id}`) {
                            link.classList.add('active');
                        }
                    });
                }
            });
        }, observerOptions);

        sections.forEach(section => observer.observe(section));
    })();
});
