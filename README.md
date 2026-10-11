# CareerVerse – AI-Based Career Recommendation System

## 📌 About the Project

**CareerVerse** is an AI-Based Career Recommendation System designed to help students and individuals identify suitable career paths based on their skills, interests, and educational backgrounds.

The system uses Python and machine learning to analyze user information and recommend relevant career options. It provides a simple web interface where users can explore potential careers and make more informed career decisions.

## 🎯 Objectives

- Recommend suitable career paths based on user skills and interests.
- Consider educational qualifications when suggesting career options.
- Use machine learning to support career recommendation.
- Provide a simple, interactive, and user-friendly interface.
- Help users explore career opportunities across different fields.

## ✨ Features

- **AI-Based Career Recommendations:** Suggests career options based on user information.
- **Skill-Based Analysis:** Uses selected skills to identify relevant career paths.
- **Interest-Based Recommendations:** Considers personal interests during career analysis.
- **Education-Based Filtering:** Uses educational background as an input.
- **Interactive Web Interface:** Provides a user-friendly frontend.
- **Career Dataset:** Uses a dataset containing career-related information.
- **Python Backend:** Processes requests and generates recommendations.

## 🛠️ Technologies Used

| Technology | Purpose |
|---|---|
| HTML | Web page structure |
| CSS | Styling and layout |
| JavaScript | Frontend interactions |
| Python | Backend development |
| Flask | Backend web framework |
| Machine Learning | Career recommendation logic |
| CSV | Career dataset storage |

## 📂 Project Structure

```text
CareerVerse/
│
├── README.md
│
├── backend/
│   ├── app.py
│   ├── model.py
│   ├── model.pkl
│   ├── requirements.txt
│   └── data/
│       └── careers.csv
│
└── frontend/
    ├── index.html
    ├── landing.html
    ├── style.css
    ├── script.js
    ├── background.js
    └── .gitignore
```

## ⚙️ Requirements

- Python 3
- Visual Studio Code
- A modern web browser
- Required Python packages listed in `backend/requirements.txt`

## 🚀 Installation and Setup

### Step 1: Clone the Repository

```bash
git clone https://github.com/shubhambhadane443/CareerVerse.git
```

### Step 2: Open the Project

Open the downloaded `CareerVerse` folder in Visual Studio Code.

### Step 3: Create a Virtual Environment

Open the terminal in VS Code and run:

```bash
cd backend
python -m venv venv
```

Activate the environment on Windows:

```powershell
.\venv\Scripts\Activate.ps1
```

### Step 4: Install Dependencies

```bash
pip install -r requirements.txt
```

### Step 5: Run the Backend

```bash
python app.py
```

The backend will start at the local address configured in `backend/app.py`.

### Step 6: Open the Frontend

Open `frontend/landing.html` or `frontend/index.html` in your browser, depending on the application's intended starting page.

If the application requires a specific backend URL or API configuration, make sure it matches the running backend.

## 🧠 How It Works

1. The user opens the CareerVerse web application.
2. The user provides relevant skills, interests, and educational information.
3. The frontend sends the information to the backend, where configured.
4. The backend processes the information using the career recommendation logic.
5. The system generates suitable career recommendations.
6. The user reviews the suggested career options.

## 🔮 Future Enhancements

- Integration with live job listings and internship opportunities.
- Resume analysis and skill-gap identification.
- Learning-resource recommendations for selected career paths.
- Personalized career roadmaps.
- Improved recommendation accuracy using larger datasets.
- User accounts and saved career recommendations.
- Deployment as a publicly accessible web application.

## 🎓 Project Purpose

CareerVerse is developed as an academic project to explore the application of artificial intelligence, machine learning, and web development in career guidance.

## 👥 Contributors

CareerVerse is
