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
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');
const darkModeToggle = document.getElementById('darkModeToggle');
const teamContainer = document.getElementById('teamContainer');
const projectContainer = document.getElementById('projectContainer');
const filterBtns = document.querySelectorAll('.filter-btn');
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
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
    teamContainer.innerHTML = '';
    
    teamMembers.forEach((member, index) => {
        const memberElement = document.createElement('div');
        memberElement.className = 'team-member';
        memberElement.style.animationDelay = `${index * 0.2}s`;
        
        memberElement.innerHTML = `
            <div class="member-img">
                <img src="${member.img}" alt="${member.name}">
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
                <img src="${project.img}" alt="${project.title}">
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

// Set up all event listeners
function setupEventListeners() {
    // Hamburger menu toggle
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.innerHTML = navLinks.classList.contains('active') 
            ? '<i class="fas fa-times"></i>' 
            : '<i class="fas fa-bars"></i>';
    });

    // Dark mode toggle
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

    // Project filter buttons
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
                // Close mobile menu if open
                navLinks.classList.remove('active');
                hamburger.innerHTML = '<i class="fas fa-bars"></i>';
                
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Form validation and submission
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
            // Simulate form submission (no actual backend)
            showFormMessage('success', 'Thank you for your message!');
            
            // Reset form
            contactForm.reset();
            
            // Simulate sending data (in a real app, this would be an API call)
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

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navLinks.contains(e.target) && !hamburger.contains(e.target) && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            hamburger.innerHTML = '<i class="fas fa-bars"></i>';
        }
    });
    
    // Check for saved dark mode preference
    const savedDarkMode = localStorage.getItem('darkMode');
    if (savedDarkMode === 'true') {
        document.body.classList.add('dark-mode');
        const icon = darkModeToggle.querySelector('i');
        icon.className = 'fas fa-sun';
    }
}

// Initialize scroll animations
function initScrollAnimations() {
    // Add visible class to team members and projects when scrolled into view
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

// Helper functions
function showError(elementId, message) {
    const errorElement = document.getElementById(elementId);
    errorElement.textContent = message;
    errorElement.style.display = 'block';
}

function resetFormMessages() {
    document.querySelectorAll('.error').forEach(el => {
        el.style.display = 'none';
    });
    formMessage.style.display = 'none';
    formMessage.className = 'form-message';
}

function showFormMessage(type, message) {
    formMessage.textContent = message;
    formMessage.className = `form-message ${type}`;
    formMessage.style.display = 'block';
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Add scroll effect to header
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
        header.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.05)';
    }
});