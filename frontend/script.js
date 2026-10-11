// CareerVerse - AI Career Recommendation System JavaScript

// State management
let state = {
    selectedSkills: [],
    selectedInterest: '',
    selectedEducation: '',
    allCareers: []
};

// Comprehensive skills list
const skills = [
    // Technical Skills
    'Programming', 'Python', 'JavaScript', 'Java', 'C++', 'C#', 'Ruby', 'PHP', 'Swift', 'Kotlin',
    'HTML', 'CSS', 'SQL', 'NoSQL', 'Database', 'Git', 'Linux', 'Cloud Computing', 'AWS', 'Azure',
    'Docker', 'Kubernetes', 'DevOps', 'Machine Learning', 'Deep Learning', 'Data Science',
    'Artificial Intelligence', 'NLP', 'Computer Vision', 'Blockchain', 'Cybersecurity',
    'Networking', 'System Administration', 'API Development', 'REST', 'GraphQL',
    // Design Skills
    'Design', 'UI Design', 'UX Design', 'Graphic Design', 'Web Design', 'Figma', 'Adobe XD',
    'Photoshop', 'Illustrator', 'InDesign', 'Sketch', 'Motion Graphics', '3D Modeling',
    'Animation', 'Video Editing', 'Premiere Pro', 'After Effects', 'Blender', 'Maya',
    // Business Skills
    'Communication', 'Leadership', 'Team Management', 'Project Management', 'Agile', 'Scrum',
    'Strategic Planning', 'Business Analysis', 'Financial Analysis', 'Marketing', 'Sales',
    'Negotiation', 'Public Speaking', 'Presentation', 'Writing', 'Copywriting',
    'Content Marketing', 'SEO', 'Social Media', 'Email Marketing', 'Analytics',
    'Data Analysis', 'Excel', 'Tableau', 'Power BI', 'Risk Management', 'Compliance',
    // Science & Research
    'Research', 'Statistics', 'Mathematics', 'Physics', 'Chemistry', 'Biology',
    'Laboratory', 'Scientific Writing', 'Data Collection', 'Hypothesis Testing',
    // Healthcare
    'Patient Care', 'Medical Knowledge', 'Clinical Skills', 'Pharmacology', 'Surgery',
    'Nursing', 'Physical Therapy', 'Mental Health', 'Counseling', 'Diagnostics',
    // Creative & Media
    'Creativity', 'Writing', 'Journalism', 'Editing', 'Photography', 'Storytelling',
    'Scriptwriting', 'Broadcasting', 'Social Media Management', 'Content Creation',
    // Soft Skills
    'Problem Solving', 'Critical Thinking', 'Analytical Skills', 'Time Management',
    'Organization', 'Attention to Detail', 'Multitasking', 'Adaptability', 'Creativity',
    'Teamwork', 'Collaboration', 'Interpersonal Skills', 'Empathy', 'Patience',
    // Other
    'Teaching', 'Mentoring', 'Training', 'Language', 'Translation', 'Interpretation',
    'Legal Research', 'Case Management', 'Public Relations', 'Event Planning'
];

// Initialize the app
document.addEventListener('DOMContentLoaded', () => {
    initializeSkills();
    loadCareers();
});

// Initialize skills container
function initializeSkills() {
    const container = document.getElementById('skills-container');
    if (!container) return;
    
    container.innerHTML = skills.map(skill => 
        `<div class="skill-tag" onclick="toggleSkill(this, '${skill}')">${skill}</div>`
    ).join('');
}

// Toggle skill selection
function toggleSkill(element, skill) {
    element.classList.toggle('active');
    
    if (state.selectedSkills.includes(skill)) {
        state.selectedSkills = state.selectedSkills.filter(s => s !== skill);
    } else {
        state.selectedSkills.push(skill);
    }
    
    updateSelectedSkills();
}

// Update selected skills display
function updateSelectedSkills() {
    const list = document.getElementById('selected-skills-list');
    if (!list) return;
    
    list.innerHTML = state.selectedSkills.map(skill => 
        `<span class="skill-tag active" onclick="removeSkill('${skill}')">${skill} ×</span>`
    ).join('');
}

// Remove skill
function removeSkill(skill) {
    state.selectedSkills = state.selectedSkills.filter(s => s !== skill);
    
    // Update UI
    const skillsContainer = document.getElementById('skills-container');
    const skillElement = Array.from(skillsContainer.children).find(
        el => el.textContent.includes(skill)
    );
    if (skillElement) {
        skillElement.classList.remove('active');
    }
    
    updateSelectedSkills();
}

// Select interest
function selectInterest(element, interest) {
    document.querySelectorAll('.interest-card').forEach(card => {
        card.classList.remove('selected');
    });
    element.classList.add('selected');
    state.selectedInterest = interest;
    document.getElementById('selected-interest').value = interest;
}

// Select education
function selectEducation(element, education) {
    document.querySelectorAll('.education-card').forEach(card => {
        card.classList.remove('selected');
    });
    element.classList.add('selected');
    state.selectedEducation = education;
    document.getElementById('selected-education').value = education;
}

// Navigation functions
function nextStep(step) {
    // Validate current step
    if (step === 2 && state.selectedSkills.length === 0) {
        alert('Please select at least one skill');
        return;
    }
    
    document.querySelectorAll('.form-step').forEach(el => el.style.display = 'none');
    document.getElementById(`step-${step}`).style.display = 'block';
}

function prevStep(step) {
    document.querySelectorAll('.form-step').forEach(el => el.style.display = 'none');
    document.getElementById(`step-${step}`).style.display = 'block';
}

// Scroll to form
function scrollToForm() {
    document.getElementById('assessment-form').scrollIntoView({ behavior: 'smooth' });
}

// Show section
function showSection(sectionId) {
    document.querySelectorAll('.section').forEach(el => el.classList.remove('active'));
    document.getElementById(`${sectionId}-section`).classList.add('active');
    
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.classList.remove('active');
    });
    event.target.classList.add('active');
}

// Analyze career
async function analyzeCareer() {
    if (state.selectedSkills.length === 0) {
        alert('Please select at least one skill');
        return;
    }
    
    // Show loading
    document.getElementById('loading').style.display = 'block';
    document.getElementById('results-section').style.display = 'none';
    document.getElementById('insights-section').style.display = 'none';
    
    try {
        const response = await fetch('http://127.0.0.1:5000/analyze', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                skills: state.selectedSkills,
                interest: state.selectedInterest,
                education: state.selectedEducation
            })
        });
        
        const data = await response.json();
        
        if (data.status === 'success') {
            displayResults(data.recommendations);
            displayInsights(data.insights);
        } else {
            alert('Error: ' + data.message);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Failed to connect to server. Make sure the backend is running.');
    } finally {
        document.getElementById('loading').style.display = 'none';
    }
}

// Display results
function displayResults(recommendations) {
    const container = document.getElementById('results-container');
    document.getElementById('results-section').style.display = 'block';
    
    container.innerHTML = recommendations.map((rec, index) => {
        const rankClass = index === 0 ? 'gold' : index === 1 ? 'silver' : index === 2 ? 'bronze' : '';
        const scorePercent = rec.score;
        
        return `
            <div class="result-card" onclick="showCareerDetails('${rec.career}')">
                <div class="result-rank ${rankClass}">${rec.rank}</div>
                <div class="result-info">
                    <h3>${rec.career}</h3>
                    <p>${rec.description || 'Explore this career opportunity'}</p>
                    <p class="result-salary">Average Salary: ${rec.average_salary}</p>
                </div>
                <div class="result-score">
                    <div class="score-circle" style="--score-percent: ${scorePercent}%">
                        <span class="score-value">${Math.round(rec.score)}%</span>
                    </div>
                    <span class="score-label">Match Score</span>
                </div>
            </div>
        `;
    }).join('');
    
    // Scroll to results
    document.getElementById('results-section').scrollIntoView({ behavior: 'smooth' });
}

// Display insights
function displayInsights(insights) {
    const container = document.getElementById('insights-container');
    document.getElementById('insights-section').style.display = 'block';
    
    container.innerHTML = `
        <div class="insight-card">
            <h3><i class="fas fa-trophy"></i> Top Career Match</h3>
            <p><strong>${insights.top_career?.career || 'N/A'}</strong></p>
            <p>Score: ${insights.top_career?.score || 0}%</p>
            <p>Salary: ${insights.top_career?.average_salary || 'N/A'}</p>
        </div>
        
        <div class="insight-card strengths">
            <h3><i class="fas fa-check-circle"></i> Your Strengths</h3>
            <ul class="insight-list">
                ${insights.strengths?.length > 0 
                    ? insights.strengths.map(s => `<li><i class="fas fa-star" style="color: var(--secondary-color)"></i> ${s}</li>`).join('')
                    : '<li>No matching skills found</li>'
                }
            </ul>
        </div>
        
        <div class="insight-card gaps">
            <h3><i class="fas fa-exclamation-circle"></i> Skill Gaps</h3>
            <ul class="insight-list">
                ${insights.skill_gaps?.length > 0 
                    ? insights.skill_gaps.map(g => `<li><i class="fas fa-plus-circle" style="color: var(--danger-color)"></i> ${g}</li>`).join('')
                    : '<li>Your skills align well with the top career!</li>'
                }
            </ul>
        </div>
        
        <div class="insight-card recommendations">
            <h3><i class="fas fa-lightbulb"></i> Recommendations</h3>
            <ul class="insight-list">
                ${insights.recommendations?.map(r => `<li><i class="fas fa-arrow-right" style="color: var(--accent-color)"></i> ${r}</li>`).join('') || '<li>No recommendations available</li>'}
            </ul>
        </div>
    `;
}

// Load all careers
async function loadCareers() {
    try {
        const response = await fetch('http://127.0.0.1:5000/careers');
        const data = await response.json();
        
        if (data.status === 'success') {
            state.allCareers = data.careers;
            displayCareersGrid(data.careers);
        }
    } catch (error) {
        console.error('Error loading careers:', error);
    }
}

// Display careers grid
function displayCareersGrid(careers) {
    const grid = document.getElementById('careers-grid');
    if (!grid) return;
    
    grid.innerHTML = careers.map(career => `
        <div class="career-card" onclick="showCareerDetails('${career.career}')">
            <h3>${career.career}</h3>
            <p>${career.description || career.interest}</p>
            <p class="salary">${career.average_salary}</p>
            <span class="growth ${career.growth_outlook?.toLowerCase().replace(' ', '-')}">${career.growth_outlook || 'Moderate'}</span>
        </div>
    `).join('');
}

// Search careers
function searchCareers() {
    const query = document.getElementById('career-search').value.toLowerCase();
    const filtered = state.allCareers.filter(career => 
        career.career.toLowerCase().includes(query) ||
        career.interest.toLowerCase().includes(query) ||
        career.required_skills?.toLowerCase().includes(query)
    );
    displayCareersGrid(filtered);
}

// Show career details modal
async function showCareerDetails(careerName) {
    try {
        const response = await fetch(`http://127.0.0.1:5000/career/${encodeURIComponent(careerName)}`);
        const data = await response.json();
        
        if (data.status === 'success') {
            const career = data.career;
            const similar = data.similar_careers;
            
            const modal = document.getElementById('career-modal');
            const modalBody = document.getElementById('modal-body');
            
            modalBody.innerHTML = `
                <h2 style="color: var(--primary-color); margin-bottom: 1rem;">${career.career}</h2>
                
                <div style="margin-bottom: 1.5rem;">
                    <p><strong><i class="fas fa-money-bill-wave"></i> Average Salary:</strong> ${career.average_salary}</p>
                    <p><strong><i class="fas fa-chart-line"></i> Growth Outlook:</strong> ${career.growth_outlook || 'Moderate'}</p>
                </div>
                
                <div style="margin-bottom: 1.5rem;">
                    <h4 style="margin-bottom: 0.5rem;"><i class="fas fa-info-circle"></i> Description</h4>
                    <p style="color: var(--text-secondary);">${career.description || 'No description available.'}</p>
                </div>
                
                <div style="margin-bottom: 1.5rem;">
                    <h4 style="margin-bottom: 0.5rem;"><i class="fas fa-cogs"></i> Required Skills</h4>
                    <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
                        ${(career.required_skills || '').split(',').map(s => 
                            `<span class="skill-tag ${state.selectedSkills.includes(s.trim()) ? 'active' : ''}">${s.trim()}</span>`
                        ).join('')}
                    </div>
                </div>
                
                <div style="margin-bottom: 1.5rem;">
                    <h4 style="margin-bottom: 0.5rem;"><i class="fas fa-heart"></i> Interest Area</h4>
                    <p>${career.interest}</p>
                </div>
                
                <div style="margin-bottom: 1.5rem;">
                    <h4 style="margin-bottom: 0.5rem;"><i class="fas fa-graduation-cap"></i> Education Required</h4>
                    <p>${career.education}</p>
                </div>
                
                ${similar && similar.length > 0 ? `
                    <div>
                        <h4 style="margin-bottom: 0.5rem;"><i class="fas fa-link"></i> Similar Careers</h4>
                        <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
                            ${similar.map(s => 
                                `<span class="skill-tag" onclick="showCareerDetails('${s.career}')" style="cursor: pointer;">${s.career} (${s.similarity}%)</span>`
                            ).join('')}
                        </div>
                    </div>
                ` : ''}
                
                <div style="margin-top: 1.5rem; text-align: center;">
                    <button class="btn-analyze" onclick="addCareerToAssessment('${career.career}')">
                        <i class="fas fa-plus"></i> Add to My Assessment
                    </button>
                </div>
            `;
            
            modal.classList.add('active');
        }
    } catch (error) {
        console.error('Error loading career details:', error);
        alert('Failed to load career details');
    }
}

// Close modal
function closeModal() {
    document.getElementById('career-modal').classList.remove('active');
}

// Add career to assessment
function addCareerToAssessment(careerName) {
    const career = state.allCareers.find(c => c.career === careerName);
    if (career && career.required_skills) {
        const skills = career.required_skills.split(',').map(s => s.trim());
        skills.forEach(skill => {
            if (!state.selectedSkills.includes(skill)) {
                state.selectedSkills.push(skill);
            }
        });
        
        updateSelectedSkills();
        
        // Update skills UI
        const skillsContainer = document.getElementById('skills-container');
        skills.forEach(skill => {
            const skillElement = Array.from(skillsContainer.children).find(
                el => el.textContent.includes(skill)
            );
            if (skillElement) {
                skillElement.classList.add('active');
            }
        });
        
        closeModal();
        showSection('home');
        scrollToForm();
    }
}

// Close modal on outside click
document.addEventListener('click', (e) => {
    const modal = document.getElementById('career-modal');
    if (e.target === modal) {
        closeModal();
    }
});
