# CareerVerse – AI-Based Career Recommendation System

## About the Project

CareerVerse is an AI-based career recommendation system designed to help students and individuals explore suitable career paths based on their skills, interests, and educational background.

The project uses a web interface, Python backend, and machine learning techniques to generate career recommendations.

## Objectives

- Recommend career paths based on skills and interests.
- Consider educational background when suggesting careers.
- Help users explore opportunities across different fields.
- Provide a simple and interactive interface for career guidance.

## Features

- AI-based career recommendations
- Skill-based analysis
- Interest-based recommendations
- Education-based recommendations
- Career dataset containing career-related information
- Interactive web interface

## Technologies Used

| Technology | Purpose |
|---|---|
| HTML | Web page structure |
| CSS | Styling and layout |
| JavaScript | Frontend interactions |
| Python | Backend development |
| Flask | Backend web framework |
| Machine Learning | Career recommendation logic |
| CSV | Career dataset storage |

## Project Structure

```text
CareerVerse/
├── README.md
├── backend/
│   ├── app.py
│   ├── model.py
│   ├── model.pkl
│   ├── requirements.txt
│   └── data/
│       └── careers.csv
└── frontend/
    ├── index.html
    ├── landing.html
    ├── style.css
    ├── script.js
    └── background.js
```

## Requirements

- Python 3
- Visual Studio Code
- A modern web browser
- Packages listed in `backend/requirements.txt`

## Installation and Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/shubhambhadane443/CareerVerse.git
   ```

2. Open the project folder in Visual Studio Code.

3. Open the terminal and navigate to the backend:

   ```bash
   cd backend
   ```

4. Install the required packages:

   ```bash
   pip install -r requirements.txt
   ```

5. Start the backend:

   ```bash
   python app.py
   ```

6. Open `frontend/landing.html` or `frontend/index.html` in your browser.

## How It Works

1. The user opens the CareerVerse web application.
2. The user provides skills, interests, and educational information.
3. The frontend sends the information to the backend.
4. The backend processes the information using the configured recommendation logic.
5. The system displays suitable career recommendations.

## Future Enhancements

- Integration with job listings and internships
- Resume analysis
- Personalized career roadmaps
- Learning-resource recommendations
- User accounts and saved recommendations
- Deployment as a publicly accessible web application

## Project Purpose

CareerVerse is an academic project exploring the application of artificial intelligence, machine learning, and web development in career guidance.

---

**CareerVerse – Explore your future.**
