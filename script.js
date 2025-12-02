// Data stored in JavaScript arrays/objects (simulating a database)
const teamMembers = [
    {
        id: 1,
        name: "Denzel Johann Alcantara",
        role: "taga pasa",
        bio: "sir tapos na po",
        skills: ["Microsoft Proficient", "Python", "JavaScript","HTML","CSS", "Communication"],
        img: "https://i.redd.it/pf703vsgalmf1.jpeg"
    },
    {
        id: 2,
        name: "Marc Emmanuel Mallari",
        role: "taga luto pancit canton",
        bio: "single, ready to mingle",
        skills: ["Microsoft Proficient", "Python", "JavaScript", "Communication"],
        img: "https://i.redd.it/pf703vsgalmf1.jpeg"
    },
    {
        id: 3,
        name: "Faith Nicole Viloria",
        role: "Leader",
        bio: "“Focused. Friendly. Future-ready.”",
        skills: ["Microsoft Proficient", "Python", "JavaScript","HTML", "Communication"],
        img: "https://i.redd.it/pf703vsgalmf1.jpeg"
    },
    {
        id: 4,
        name: "Erika Hagos Leron",
        role: "Leader",
        bio: "Small steps. Big goals.",
        skills: ["Microsoft Proficient", "Python", "JavaScript", "Communication"],
        img: "https://i.redd.it/pf703vsgalmf1.jpeg"
    },
    {
        id: 5,
        name: "Rico Charmaine",
        role: "Member",
        bio: "Making memories while chasing dreams.",
        skills: ["Microsoft Proficient", "Python", "Communication"],
        img: "https://i.redd.it/pf703vsgalmf1.jpeg"
    }
];

const projects = [
    {
        id: 1,
        title: "Excel Grading",
        description: "A dashboard sheets for tracking grades and performance metrics.",
        tags: ["Excel"],
        category: "excel",
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTBF3twUG3gT3M1i_5ali9k9YnYieyeMQI5w&s"
    },
    {
        id: 2,
        title: "Animation and Transitions",
        description: "A animated presentation showcasing various animation techniques.",
        tags: ["Powerpoint"],
        category: "powerpoint",
        img: "https://itjunction.org/wp-content/uploads/2019/10/transitions-powerpoint-ninja-1024x378.png"
    },
    {
        id: 3,
        title: "The Work Resume",
        description: "A motivated and detail-oriented individual with strong organizational, communication, and problem-solving skills",
        tags: ["Word",],
        category: "word",
        img: "https://d25zcttzf44i59.cloudfront.net/social-worker-resume-example.png"
    }
];

// DOM Elements
const teamContainer = document.getElementById('teamContainer');
const projectContainer = document.getElementById('projectContainer');

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing...');
    
    // Render team members
    renderTeamMembers();
    
    // Render projects
    renderProjects('all');
    
    // Set up event listeners
    setupEventListeners();
    
    // Initialize scroll animations
    initScrollAnimations();
});

// Render team members from data array
function renderTeamMembers() {
    if (!teamContainer) return;
    
    teamContainer.innerHTML = '';
    
    teamMembers.forEach((member, index) => {
        const memberElement = document.createElement('div');
        memberElement.className = 'team-member';
        memberElement.style.animationDelay = `${index * 0.2}s`;
        
        memberElement.innerHTML = `
            <div class="member-img">
                <img src="${member.img}" alt="${member.name}" loading="lazy">
            </div>
            <div class="member-info">
                <h3>${member.name}</h3>
                <div class="member-role">${member.role}</div>
                <p>${member.bio}</p>
                <div class="member-skills">
                    ${member.skills.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
                </div>
            </div>
        `;
        
        teamContainer.appendChild(memberElement);
    });
}

// Render projects from data array
function renderProjects(filter) {
    if (!projectContainer) return;
    
    projectContainer.innerHTML = '';
    
    const filteredProjects = filter === 'all' 
        ? projects 
        : projects.filter(project => project.category === filter);
    
    filteredProjects.forEach((project, index) => {
        const projectElement = document.createElement('div');
        projectElement.className = 'project-card';
        projectElement.style.animationDelay = `${index * 0.2}s`;
        
        projectElement.innerHTML = `
            <div class="project-img">
                <img src="${project.img}" alt="${project.title}" loading="lazy">
            </div>
            <div class="project-info">
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                <div class="project-tags">
                    ${project.tags.map(tag => `<span class="project-tag">${tag}</span>`).join('')}
                </div>
            </div>
        `;
        
        projectContainer.appendChild(projectElement);
    });
    
    // Trigger animations for newly added projects
    setTimeout(() => {
        document.querySelectorAll('.project-card').forEach(card => {
            card.classList.add('visible');
        });
    }, 100);
}

// ===== SIMPLIFIED MOBILE MENU FUNCTIONALITY =====

function setupMobileMenu() {
    console.log('Setting up mobile menu...');
    
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.querySelector('.nav-links');
    const darkModeToggle = document.getElementById('darkModeToggle');
    
    if (!hamburger || !navLinks) {
        console.error('Menu elements not found!');
        return;
    }
    
    // Add click event to hamburger
    hamburger.addEventListener('click', function(e) {
        e.stopPropagation(); // Prevent event bubbling
        
        console.log('Hamburger clicked!');
        
        // Toggle active class on nav-links
        navLinks.classList.toggle('active');
        
        // Toggle hamburger icon
        const icon = this.querySelector('i');
        if (navLinks.classList.contains('active')) {
            icon.className = 'fas fa-times';
            // Prevent body scroll when menu is open
            document.body.style.overflow = 'hidden';
        } else {
            icon.className = 'fas fa-bars';
            // Restore body scroll
            document.body.style.overflow = '';
        }
    });
    
    // Close menu when clicking on a nav link
    const navLinksList = navLinks.querySelectorAll('a');
    navLinksList.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                navLinks.classList.remove('active');
                const icon = hamburger.querySelector('i');
                icon.className = 'fas fa-bars';
                document.body.style.overflow = '';
            }
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!navLinks.contains(e.target) && !hamburger.contains(e.target)) {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                const icon = hamburger.querySelector('i');
                icon.className = 'fas fa-bars';
                document.body.style.overflow = '';
            }
        }
    });
    
    // Dark mode toggle
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            const icon = darkModeToggle.querySelector('i');
            if (document.body.classList.contains('dark-mode')) {
                icon.className = 'fas fa-sun';
            } else {
                icon.className = 'fas fa-moon';
            }
            
            // Save preference to localStorage
            localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
        });
    }
    
    // Check for saved dark mode preference
    const savedDarkMode = localStorage.getItem('darkMode');
    if (savedDarkMode === 'true') {
        document.body.classList.add('dark-mode');
        const icon = darkModeToggle.querySelector('i');
        if (icon) {
            icon.className = 'fas fa-sun';
        }
    }
}

// ===== SETUP EVENT LISTENERS =====

function setupEventListeners() {
    console.log('Setting up event listeners...');
    
    // Setup mobile menu
    setupMobileMenu();
    
    // Project filter buttons
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');
            // Filter projects
            renderProjects(btn.dataset.filter);
        });
    });

    // Smooth scrolling for navigation links
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

    // Form validation and submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Reset previous errors and messages
            resetFormMessages();
            
            // Get form values
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();
            
            let isValid = true;
            
            // Validate name
            if (!name) {
                showError('nameError', 'Please enter your name');
                isValid = false;
            }
            
            // Validate email
            if (!email) {
                showError('emailError', 'Please enter your email address');
                isValid = false;
            } else if (!isValidEmail(email)) {
                showError('emailError', 'Please enter a valid email address');
                isValid = false;
            }
            
            // Validate message
            if (!message) {
                showError('messageError', 'Please enter a message');
                isValid = false;
            }
            
            if (isValid) {
                // Simulate form submission
                showFormMessage('success', 'Thank you for your message!');
                
                // Reset form
                contactForm.reset();
                
                // Simulate sending data
                const formData = {
                    name: name,
                    email: email,
                    message: message,
                    timestamp: new Date().toISOString()
                };
                
                console.log('Form data would be sent to server:', formData);
            } else {
                showFormMessage('error', 'Please fix the errors above before submitting.');
            }
        });
    }
    
    // Scroll effect for header
    window.addEventListener('scroll', () => {
        const header = document.querySelector('header');
        if (header) {
            if (window.scrollY > 100) {
                header.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1)';
            } else {
                header.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.05)';
            }
        }
    });
}

// ===== HELPER FUNCTIONS =====

function showError(elementId, message) {
    const errorElement = document.getElementById(elementId);
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.style.display = 'block';
    }
}

function resetFormMessages() {
    document.querySelectorAll('.error').forEach(el => {
        el.style.display = 'none';
    });
    const formMessage = document.getElementById('formMessage');
    if (formMessage) {
        formMessage.style.display = 'none';
        formMessage.className = 'form-message';
    }
}

function showFormMessage(type, message) {
    const formMessage = document.getElementById('formMessage');
    if (formMessage) {
        formMessage.textContent = message;
        formMessage.className = `form-message ${type}`;
        formMessage.style.display = 'block';
        
        // Auto-hide success message after 5 seconds
        if (type === 'success') {
            setTimeout(() => {
                formMessage.style.display = 'none';
            }, 5000);
        }
    }
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// ===== SCROLL ANIMATIONS =====

function initScrollAnimations() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // Observe team members and projects
    document.querySelectorAll('.team-member, .project-card').forEach(el => {
        observer.observe(el);
    });
}