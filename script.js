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
        const savedMode = localStorage.getItem('nightMode');
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        
        if (savedMode !== null) {
            this.setMode(savedMode === 'true');
        } else if (systemPrefersDark) {
            this.setMode(true);
        }
        
        this.nightModeToggle?.addEventListener('change', () => this.toggleMode());
        this.mobileNightModeToggle?.addEventListener('change', () => this.toggleMode());
        this.syncToggles();
    }
    
    setMode(isNightMode) {
        this.body.classList.toggle('night-mode', isNightMode);
        this.body.classList.toggle('light-mode', !isNightMode);
        if (this.nightModeToggle) this.nightModeToggle.checked = isNightMode;
        if (this.mobileNightModeToggle) this.mobileNightModeToggle.checked = isNightMode;
        localStorage.setItem('nightMode', String(isNightMode));
    }
    
    toggleMode() {
        const isNightMode = this.nightModeToggle?.checked ?? this.mobileNightModeToggle?.checked ?? false;
        this.setMode(isNightMode);
    }
    
    syncToggles() {
        if (!this.nightModeToggle || !this.mobileNightModeToggle) return;
        this.nightModeToggle.addEventListener('change', () => { this.mobileNightModeToggle.checked = this.nightModeToggle.checked; });
        this.mobileNightModeToggle.addEventListener('change', () => { this.nightModeToggle.checked = this.mobileNightModeToggle.checked; });
    }
}

// Mobile Menu Functionality
class MobileMenu {
    constructor() {
        this.menuBtn = document.querySelector('.menu-btn');
        this.mobileMenu = document.querySelector('.mobile-menu');
        this.closeBtn = document.querySelector('.mobile-menu-close');
        this.links = document.querySelectorAll('.mobile-nav-links a');
        this.backdrop = document.querySelector('.mobile-menu-backdrop');

        this.init();
    }

    init() {
        this.menuBtn?.addEventListener('click', () => this.open());
        this.closeBtn?.addEventListener('click', () => this.close());
        this.backdrop?.addEventListener('click', () => this.close());

        this.links.forEach(link => {
            link.addEventListener('click', () => {
                // CRITICAL: restore scroll BEFORE navigation
                document.body.style.overflow = '';
                this.mobileMenu.classList.remove('show');
                this.backdrop.classList.remove('show');
            });
        });
    }

    open() {
        this.mobileMenu.classList.add('show');
        this.backdrop.classList.add('show');
        document.body.style.overflow = 'hidden';
    }

    close() {
        this.mobileMenu.classList.remove('show');
        this.backdrop.classList.remove('show');
        document.body.style.overflow = '';
    }
}

// Global Logic
document.addEventListener('DOMContentLoaded', () => {
    new NightMode();
    new MobileMenu();
    
    // Navbar Scroll Shadow
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        navbar.style.boxShadow = window.scrollY > 50 ? '0 5px 20px rgba(0,0,0,0.1)' : 'none';
    });

    // Simple Active Link Highlighting
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a, .mobile-nav-links a');
    
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            if (window.scrollY >= (section.offsetTop - 150)) {
                current = section.getAttribute('id');
            }
        });
        navLinks.forEach(a => {
            a.classList.remove('active');
            if (a.getAttribute('href') === `#${current}`) a.classList.add('active');
        });
    });
});
document.addEventListener('DOMContentLoaded', () => {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // 1. Remove 'active' class from all buttons and add to the clicked one
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            // 2. Filter the items
            portfolioItems.forEach(item => {
                const itemCategory = item.getAttribute('data-category');

                if (filterValue === 'all' || filterValue === itemCategory) {
                    item.classList.remove('hidden');
                    // Small delay for smooth entry
                    setTimeout(() => {
                        item.style.display = 'block';
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 1);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    // Delay the 'display: none' until animation finishes
                    setTimeout(() => {
                        item.style.display = 'none';
                        item.classList.add('hidden');
                    }, 400);
                }
            });
        });
    });
});
    const messageForm = document.getElementById('messageForm');
    if (messageForm) {
        messageForm.addEventListener('submit', function(e) {
            e.preventDefault(); // stop reload

            const email = document.getElementById('contactEmail').value;
            const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

            if (!emailRegex.test(email)) {
                alert("Please enter a valid email address (e.g., user@domain.com).");
                return;
            }

            alert("Thank you! Your message has been received.");
            this.reset();
        }); 
    }     



