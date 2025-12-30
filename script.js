// Night Mode Functionality
class NightMode {
    constructor() {
        this.nightModeToggle = document.getElementById('nightModeToggle');
        this.mobileNightModeToggle = document.getElementById('mobileNightModeToggle');
        this.body = document.body;
        this.indicator = document.querySelector('.night-mode-indicator');
        this.init();
    }
    
    init() {
        // Load saved preference
        const savedMode = localStorage.getItem('nightMode');
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        
        // Set initial mode
        if (savedMode !== null) {
            this.setMode(savedMode === 'true');
        } else if (systemPrefersDark) {
            this.setMode(true);
        }
        
        // Add event listeners
        if (this.nightModeToggle) {
            this.nightModeToggle.addEventListener('change', () => this.toggleMode());
        }
        
        if (this.mobileNightModeToggle) {
            this.mobileNightModeToggle.addEventListener('change', () => this.toggleMode());
        }
        
        // Sync the two toggles
        this.syncToggles();
    }
    
    setMode(isNightMode) {
        this.body.classList.toggle('night-mode', isNightMode);
        this.body.classList.toggle('light-mode', !isNightMode);
        
        // Update both toggles
        if (this.nightModeToggle) this.nightModeToggle.checked = isNightMode;
        if (this.mobileNightModeToggle) this.mobileNightModeToggle.checked = isNightMode;
        
        // Show indicator
        this.showIndicator(isNightMode ? 'Night Mode Activated' : 'Light Mode Activated');
        localStorage.setItem('nightMode', String(isNightMode));
    }
    
    toggleMode() {
        const isNightMode = this.nightModeToggle?.checked ?? this.mobileNightModeToggle?.checked ?? false;
        this.setMode(isNightMode);
    }
    
    syncToggles() {
        if (!this.nightModeToggle || !this.mobileNightModeToggle) return;
        
        this.nightModeToggle.addEventListener('change', () => {
            this.mobileNightModeToggle.checked = this.nightModeToggle.checked;
        });
        
        this.mobileNightModeToggle.addEventListener('change', () => {
            this.nightModeToggle.checked = this.mobileNightModeToggle.checked;
        });
    }
    
    showIndicator(text) {
        if (!this.indicator) return;
        
        const span = this.indicator.querySelector('span');
        if (span) span.textContent = text;
        
        this.indicator.classList.add('show');
        
        setTimeout(() => {
            this.indicator.classList.remove('show');
        }, 2000);
    }
}

// Smooth scroll helper that accounts for a fixed/sticky header.
// Pass an element; it will scroll so the element's top sits below the header.
function scrollToElementWithOffset(element, headerSelector = '.navbar', fallback = 80) {
    if (!element) return;

    // If target is the page top, go to 0 to avoid leaving blank space
    if (element.id === 'home' || element === document.body || element === document.documentElement) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
    }

    // Prefer an explicit CSS variable if the project sets a header offset
    const cssHeaderOffset = getComputedStyle(document.documentElement).getPropertyValue('--header-offset');
    const parsedCssOffset = cssHeaderOffset ? parseInt(cssHeaderOffset.trim(), 10) : NaN;

    const header = document.querySelector(headerSelector);
    // Use the real header height when available, otherwise fall back to CSS var or provided fallback
    const headerHeight = header ? Math.ceil(header.getBoundingClientRect().height) : (Number.isFinite(parsedCssOffset) ? parsedCssOffset : fallback);

    const elementRect = element.getBoundingClientRect();
    const absoluteElementTop = elementRect.top + window.pageYOffset;
    const scrollTarget = Math.max(absoluteElementTop - headerHeight, 0);
    window.scrollTo({ top: scrollTarget, behavior: 'smooth' });
}

// Mobile Menu Functionality
class MobileMenu {
    constructor() {
        this.menuBtn = document.querySelector('.menu-btn');
        this.mobileMenu = document.querySelector('.mobile-menu');
        this.mobileMenuClose = document.querySelector('.mobile-menu-close');
        this.mobileMenuBackdrop = this.createBackdrop();
        this.navLinks = document.querySelectorAll('.mobile-nav-links a');
        this.init();
    }
    
    init() {
        // Create backdrop if it doesn't exist
        if (!document.querySelector('.mobile-menu-backdrop')) {
            document.body.appendChild(this.mobileMenuBackdrop);
        }
        
        // Event listeners
        if (this.menuBtn) {
            this.menuBtn.addEventListener('click', () => this.openMenu());
        }
        if (this.mobileMenuClose) {
            this.mobileMenuClose.addEventListener('click', () => this.closeMenu());
        }
        if (this.mobileMenuBackdrop) {
            this.mobileMenuBackdrop.addEventListener('click', () => this.closeMenu());
        }
        
        // Close menu when clicking links
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                const targetId = link.getAttribute('href');
                // If it's an in-page anchor and the target exists, intercept for smooth scroll
                if (targetId && targetId.startsWith('#') && targetId !== '#' && document.querySelector(targetId)) {
                    e.preventDefault();
                    this.closeMenu();
                    setTimeout(() => {
                        const targetElement = document.querySelector(targetId);
                        if (targetElement) {
                            scrollToElementWithOffset(targetElement);
                        }
                    }, 300);
                    return;
                }
                // Otherwise let the browser handle navigation for external/full-page links
                this.closeMenu();
            });
        });
        
        // Close on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.mobileMenu?.classList.contains('show')) {
                this.closeMenu();
            }
        });
    }
    
    createBackdrop() {
        const backdrop = document.createElement('div');
        backdrop.className = 'mobile-menu-backdrop';
        backdrop.setAttribute('aria-hidden', 'true');
        return backdrop;
    }
    
    openMenu() {
        if (!this.mobileMenu) return;
        this.mobileMenu.classList.add('show');
        this.mobileMenuBackdrop?.classList.add('show');
        document.body.style.overflow = 'hidden';
        this.menuBtn?.setAttribute('aria-expanded', 'true');
    }
    
    closeMenu() {
        if (!this.mobileMenu) return;
        this.mobileMenu.classList.remove('show');
        this.mobileMenuBackdrop?.classList.remove('show');
        document.body.style.overflow = '';
        this.menuBtn?.setAttribute('aria-expanded', 'false');
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize Night Mode
    const nightMode = new NightMode();
    
    // Initialize Mobile Menu
    const mobileMenu = new MobileMenu();
    
    // Portfolio filtering
    initPortfolioFilter();
    
    // Form submission
    initContactForm();
    
    // Smooth scrolling (which now also updates active link on single click)
    initSmoothScroll();
    
    // Navbar scroll effect
    initNavbarScrollEffect();
    
    // Active section highlighting
    initActiveSectionHighlight();

    // Auto-scroll if the page loaded with a hash (accounting for fixed header)
    if (window.location.hash && document.querySelector(window.location.hash)) {
        // Delay slightly to allow layout and header sizing to stabilise (increased to avoid race on some devices)
        setTimeout(() => {
            const target = document.querySelector(window.location.hash);
            if (target) scrollToElementWithOffset(target);
        }, 160);
    }

    // Ensure hero CTAs use the same offset helper as a fallback
    document.querySelectorAll('.hero-ctas a').forEach(a => {
        a.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href && href.startsWith('#') && href !== '#' && document.querySelector(href)) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) scrollToElementWithOffset(target);
            }
        });
    });
    
    // System theme change detection
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    mediaQuery.addEventListener('change', (e) => {
        if (localStorage.getItem('nightMode') === null) {
            nightMode.setMode(e.matches);
        }
    });
});

// Portfolio Filter
function initPortfolioFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    if (filterButtons.length === 0) return;
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            const filter = button.getAttribute('data-filter');
            
            portfolioItems.forEach(item => {
                const shouldShow = filter === 'all' || item.getAttribute('data-category') === filter;
                const isVisible = shouldShow;
                
                if (isVisible) {
                    item.style.display = 'block';
                    requestAnimationFrame(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    });
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// Contact Form
function initContactForm() {
    const messageForm = document.getElementById('messageForm');
    if (!messageForm) return;
    
    messageForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const nameInput = messageForm.querySelector('input[type="text"]');
        const emailInput = messageForm.querySelector('input[type="email"]');
        const messageInput = messageForm.querySelector('textarea');
        
        // Validate inputs
        if (!nameInput?.value || !emailInput?.value || !messageInput?.value) {
            showAlert('Please fill in all fields.');
            return;
        }
        
        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailInput.value)) {
            showAlert('Please enter a valid email address.');
            return;
        }
        
        const successMsg = `Thank you, ${nameInput.value}! We've received your message and will respond to ${emailInput.value} soon.`;
        showAlert(successMsg);
        
        messageForm.reset();
    });
}

// Show alert with theme-aware styling
function showAlert(message) {
    const isNightMode = document.body.classList.contains('night-mode');
    const alertStyle = isNightMode ? 
        'background: #1E1E1E; color: #E0E0E0; border: 1px solid #333;' : 
        'background: white; color: #333; border: 1px solid #ddd;';
    
    alert(message);
}

// Flag to prevent scroll events from overriding user clicks
// When user clicks a link, this flag is set to true for 1 second
// During this time, scroll-based active state updates are ignored
let isUserClickActive = false;

// Smooth Scroll - NOW ALSO UPDATES ACTIVE LINK STATE ON SINGLE CLICK
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        // Skip anchors that live inside the mobile menu; MobileMenu handles them
        if (anchor.closest('.mobile-menu')) return;

        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            // Do not intercept plain '#' or missing targets
            if (!targetId || targetId === '#' || targetId === '#0') return;
            const targetElement = document.querySelector(targetId);
            if (!targetElement) return; // let browser handle navigation if element missing
            e.preventDefault();
            
            // CRITICAL: Set flag to prevent scroll events from overriding this click
            // This ensures the clicked link stays active during smooth scroll animation
            isUserClickActive = true;
            setTimeout(() => {
                isUserClickActive = false;
            }, 1000); // Allow scroll-based updates to resume after 1 second
            
            // IMPORTANT: Update active link state on single click (before scroll)
            // Extract the ID without the '#' and set it as active
            const id = targetId.substring(1);
            setActiveLinkForSection(id);
            
            // use helper that subtracts header height
            scrollToElementWithOffset(targetElement);
        });
    });
}

// Mark active nav link and set aria-current for accessibility
// This function is called in two ways:
// 1. On click: immediately highlights the clicked link
// 2. On scroll: highlights the section currently in viewport (only if user is NOT actively clicking)
function setActiveLinkForSection(id) {
    document.querySelectorAll('.nav-links a, .mobile-nav-links a').forEach(a => {
        const href = a.getAttribute('href');
        if (href === `#${id}`) {
            // ALWAYS target the link with matching href, regardless of nesting
            // The 'active' class applies color from CSS (--muted in light mode)
            // This ensures the correct link is highlighted, never the wrong one
            a.classList.add('active');
            a.setAttribute('aria-current', 'page');
        } else {
            // Remove 'active' class from ALL other links
            // This guarantees only ONE link is highlighted at any time
            a.classList.remove('active');
            a.removeAttribute('aria-current');
        }
    });
}

// Navbar Scroll Effect
function initNavbarScrollEffect() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;
    
    window.addEventListener('scroll', () => {
        const isNightMode = document.body.classList.contains('night-mode');
        const shadowColor = isNightMode ? 
            '0 5px 20px rgba(0,0,0,0.3)' : 
            '0 5px 20px rgba(0,0,0,0.1)';
        const normalColor = isNightMode ?
            '0 2px 10px rgba(0,0,0,0.2)' :
            '0 2px 10px rgba(0,0,0,0.1)';
        
        navbar.style.boxShadow = window.scrollY > 100 ? shadowColor : normalColor;
    });
}

// Active Section Highlighting on Scroll
// This function auto-highlights the section currently visible in the viewport
// BUT it respects user clicks: when user clicks a link, scroll-based updates are disabled for 1 second
function initActiveSectionHighlight() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a, .mobile-nav-links a');

    if (sections.length === 0 || navLinks.length === 0) return;

    window.addEventListener('scroll', () => {
        // CRITICAL: Skip this update if user just clicked a link
        // The isUserClickActive flag is set when a link is clicked
        // This prevents scroll events from overriding the user's selection
        if (isUserClickActive) return;

        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            if (scrollY >= (sectionTop - 100)) {
                current = section.getAttribute('id');
            }
        });

        // Update visual active states and aria-current
        // This only runs if user is NOT actively clicking
        setActiveLinkForSection(current);
    });
}

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + D to toggle dark mode
    if ((e.ctrlKey || e.metaKey) && e.key === 'd') {
        e.preventDefault();
        const nightModeToggle = document.getElementById('nightModeToggle');
        if (nightModeToggle) {
            nightModeToggle.checked = !nightModeToggle.checked;
            nightModeToggle.dispatchEvent(new Event('change', { bubbles: true }));
        }
    }
});
// Note: direct anchor listeners with header offset were removed in favor of
// `initSmoothScroll()` using `scrollToElementWithOffset()` to avoid duplicate handlers.
// Hero Section Parallax Effect
  window.addEventListener("scroll", () => {
    const hero = document.querySelector(".hero-right");
    if (!hero) return;

    const offset = window.scrollY * 0.25;
    hero.style.backgroundPosition = `center calc(30% + ${offset}px)`;
  });

