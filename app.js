const achievements = [
    {
        title: "Olympic Gold Triumph",
        description: "Historic performance with multiple gold medals",
        year: 2024,
        icon: ""
    },
    {
        title: "Asian Games Dominance",
        description: "Record-breaking medal tally across multiple disciplines",
        year: 2023,
        icon: ""
    },
    {
        title: "Commonwealth Games Success",
        description: "Exceptional display of athletic prowess and national pride",
        year: 2022,
        icon: ""
    }
];

const featuredAthletes = [
    {
        name: "Neeraj Chopra",
        sport: "Javelin Throw",
        image: "neeraj.jpg",
        achievements: "Olympic Gold Medalist",
        background: "#1a73e8"
    },
    {
        name: "PV Sindhu",
        sport: "Badminton",
        image: "sindhu.jpg",
        achievements: "World Championship Winner",
        background: "#34a853"
    },
    {
        name: "Bajrang Punia",
        sport: "Wrestling",
        image: "bajrang.jpg",
        achievements: "World Champion",
        background: "#fbbc05"
    }
];

function renderAchievements() {
    const achievementSlider = document.querySelector('.achievement-slider');
    achievementSlider.innerHTML = achievements.map(achievement => `
        <div class="achievement-card" style="background-color: rgba(26, 115, 232, 0.1);">
            <div class="achievement-icon">${achievement.icon}</div>
            <h3>${achievement.title}</h3>
            <p>${achievement.description}</p>
            <span class="year">${achievement.year}</span>
        </div>
    `).join('');
}

function renderAthletes() {
    const athleteGrid = document.querySelector('.athlete-grid');
    athleteGrid.innerHTML = featuredAthletes.map(athlete => `
        <div class="athlete-card" style="background: linear-gradient(135deg, ${athlete.background} 0%, ${athlete.background}CC 100%);">
            <div class="athlete-image-container">
                <img src="${athlete.image}" alt="${athlete.name}">
            </div>
            <h3>${athlete.name}</h3>
            <p>${athlete.sport}</p>
            <p class="achievements">${athlete.achievements}</p>
        </div>
    `).join('');
}

function handleFormSubmission(event) {
    event.preventDefault();
    const form = event.target;
    const nameInput = form.querySelector('input[placeholder="Your Name"]');
    const emailInput = form.querySelector('input[placeholder="Your Email"]');
    const messageInput = form.querySelector('textarea');
    

    const nameValid = nameInput.value.trim().length > 2;
    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value);
    const messageValid = messageInput.value.trim().length > 10;

    if (!nameValid) {
        nameInput.classList.add('error');
        nameInput.setCustomValidity('Please enter a valid name');
    } else {
        nameInput.classList.remove('error');
        nameInput.setCustomValidity('');
    }

    if (!emailValid) {
        emailInput.classList.add('error');
        emailInput.setCustomValidity('Please enter a valid email address');
    } else {
        emailInput.classList.remove('error');
        emailInput.setCustomValidity('');
    }

    if (!messageValid) {
        messageInput.classList.add('error');
        messageInput.setCustomValidity('Message must be at least 10 characters long');
    } else {
        messageInput.classList.remove('error');
        messageInput.setCustomValidity('');
    }

    if (nameValid && emailValid && messageValid) {
        console.log('Form Submitted Successfully');
        console.log(`Name: ${nameInput.value}`);
        console.log(`Email: ${emailInput.value}`);
        console.log(`Message: ${messageInput.value}`);

        const successMessage = document.createElement('div');
        successMessage.classList.add('success-message');
        successMessage.textContent = 'Thank you for your message! We will get back to you soon.';
        form.appendChild(successMessage);

        setTimeout(() => {
            successMessage.remove();
            form.reset();
        }, 3000);
    }
}

function smoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
}

function setupScrollAnimations() {
    const sections = document.querySelectorAll('section');
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        section.classList.add('fade-in');
        observer.observe(section);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    renderAchievements();
    renderAthletes();
    smoothScroll();
    setupScrollAnimations();

    const contactForm = document.getElementById('contact-form');
    contactForm.addEventListener('submit', handleFormSubmission);
});
