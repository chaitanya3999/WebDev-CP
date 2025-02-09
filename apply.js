document.addEventListener('DOMContentLoaded', function() {
    const applicationForm = document.querySelector('.application-form');
    
    if (applicationForm) {
        applicationForm.addEventListener('submit', handleApplicationSubmit);
    }
});

function handleApplicationSubmit(event) {
    event.preventDefault();

    const formData = {
        firstName: document.getElementById('firstName').value,
        lastName: document.getElementById('lastName').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        dob: document.getElementById('dob').value,
        sport: document.getElementById('sport').value,
        experience: document.getElementById('experience').value,
        achievements: document.getElementById('achievements').value,
        program: document.getElementById('program').value,
        message: document.getElementById('message').value,
        timestamp: new Date().toISOString()
    };

    if (!validateFormData(formData)) {
        return;
    }

    saveApplication(formData);
    displaySuccessMessage();
    applicationForm.reset();
    displaySubmittedDetails(formData);
}

function validateFormData(data) {
    const requiredFields = ['firstName', 'lastName', 'email', 'phone', 'dob', 'sport', 'program'];
    
    for (let field of requiredFields) {
        if (!data[field]) {
            alert(`Please fill in the ${field.replace(/([A-Z])/g, ' $1').toLowerCase()} field`);
            return false;
        }
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
        alert('Please enter a valid email address');
        return false;
    }

    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(data.phone)) {
        alert('Please enter a valid 10-digit phone number');
        return false;
    }

    const dob = new Date(data.dob);
    const today = new Date();
    const age = today.getFullYear() - dob.getFullYear();
    if (age < 5 || age > 100) {
        alert('Please enter a valid date of birth');
        return false;
    }

    if (data.experience && (data.experience < 0 || data.experience > 50)) {
        alert('Please enter a valid experience between 0 and 50 years');
        return false;
    }

    return true;
}

function saveApplication(applicationData) {
    let applications = JSON.parse(localStorage.getItem('applications') || '[]');
    applications.push(applicationData);
    localStorage.setItem('applications', JSON.stringify(applications));
}

function displaySuccessMessage() {
    alert('Your application has been submitted successfully!');
}

function displaySubmittedDetails(data) {
    const submittedDetails = document.getElementById('submittedDetails');
    if (!submittedDetails) return;

    const detailsDiv = document.createElement('div');
    detailsDiv.classList.add('user-details');
    
    detailsDiv.innerHTML = `
        <p>Name: ${data.firstName} ${data.lastName}</p>
        <p>Email: ${data.email}</p>
        <p>Phone: ${data.phone}</p>
        <p>Date of Birth: ${data.dob}</p>
        <p>Sport: ${data.sport}</p>
        <p>Experience: ${data.experience} years</p>
        <p>Achievements: ${data.achievements || 'None specified'}</p>
        <p>Program: ${data.program}</p>
        <p>Message: ${data.message || 'None provided'}</p>
    `;

    submittedDetails.appendChild(detailsDiv);
}

function getAllApplications() {
    return JSON.parse(localStorage.getItem('applications') || '[]');
}

function clearAllApplications() {
    localStorage.removeItem('applications');
}
