# CareerVerse - AI-Based Career Recommendation System

![CareerVerse Logo](frontend/assets/icons/logo.png)

CareerVerse is an intelligent career recommendation system that uses machine learning to suggest the best career paths based on your skills, interests, and educational background.

## 🌟 Features

- **AI-Powered Recommendations**: Uses TF-IDF vectorization and cosine similarity for intelligent matching
- **Multi-Step Assessment**: Interactive 3-step career assessment process
- **Comprehensive Career Database**: 100+ careers across various industries
- **Detailed Career Information**: Salary insights, growth outlooks, and skill requirements
- **Skill Gap Analysis**: Identifies areas for improvement
- **Similar Careers Discovery**: Find related career paths
- **Modern Responsive UI**: Beautiful, mobile-friendly interface

## 🚀 Getting Started

### Prerequisites

- Python 3.8 or higher
- pip (Python package manager)
- Modern web browser (Chrome, Firefox, Edge, Safari)

### Installation

1. **Clone or navigate to the project directory**:
   ```bash
   cd CareerVerse
   ```

2. **Set up the backend**:
   ```bash
   cd backend
   pip install -r requirements.txt
   ```

3. **Start the backend server**:
   ```bash
   python app.py
   ```
   The server will start at `http://localhost:5000`

4. **Open the frontend**:
   - Start with `frontend/landing.html` for the landing page with video background
   - Or go directly to `frontend/index.html` for the main app
   - Or use a local server:
     ```bash
     cd frontend
     python -m http.server 8000
     ```
   - Then visit `http://localhost:8000`

## 📁 Project Structure

```
CareerVerse/
├── backend/
│   ├── app.py              # Flask API server
│   ├── model.py            # ML recommendation model
│   ├── requirements.txt    # Python dependencies
│   └── data/
│       └── careers.csv     # Career database (100+ careers)
├── frontend/
│   ├── landing.html        # Landing page with video background (entry point)
│   ├── index.html          # Main HTML file (career assessment app)
│   ├── style.css           # Modern CSS styles
│   ├── script.js           # Frontend JavaScript
│   ├── background.js       # Background worker
│   └── assets/
│       └── icons/          # Project icons
└── README.md               # This file
```

## 🔧 API Endpoints

### GET Endpoints

| Endpoint | Description |
|----------|-------------|
| `/` | Health check |
| `/careers` | Get all careers |
| `/career/<name>` | Get career details |
| `/similar/<name>` | Get similar careers |

### POST Endpoints

| Endpoint | Description |
|----------|-------------|
| `/predict` | Get career recommendations |
| `/analyze` | Get recommendations with insights |

### Example Request

```json
POST /predict
Content-Type: application/json

{
    "skills": ["programming", "python", "data analysis"],
    "interest": "technology",
    "education": "engineering",
    "top_n": 5
}
```

### Example Response

```json
{
    "status": "success",
    "count": 5,
    "recommendations": [
        {
            "id": 1,
            "career": "Data Scientist",
            "required_skills": "python",
            "interest": "statistics",
            "education": "technology",
            "average_salary": "₹900,000 - ₹1,800,000",
            "description": "Analyze complex datasets...",
            "growth_outlook": "Very High",
            "score": 92.5,
            "rank": 1
        }
    ]
}
```

## 🎯 How It Works

1. **Skills Selection**: Choose from 80+ skills across technical, creative, and soft skills
2. **Interest Selection**: Select your area of interest (Technology, Business, Creative, etc.)
3. **Education Selection**: Choose your educational background
4. **AI Analysis**: The system analyzes your profile using:
   - Skill matching algorithms
   - Interest compatibility scoring
   - Education relevance
   - TF-IDF cosine similarity
5. **Get Results**: Receive personalized career recommendations with match scores

## 📊 ML Model Details

The recommendation engine uses:
- **TF-IDF Vectorization**: Converts career profiles to numerical vectors
- **Cosine Similarity**: Measures similarity between user profile and careers
- **Weighted Scoring**: Combines multiple factors (skills, interests, education)
- **Real-time Processing**: Fast recommendations with pre-trained models

## 🛠️ Tech Stack

### Backend
- **Flask**: Web framework
- **Flask-CORS**: Cross-origin resource sharing
- **Pandas**: Data manipulation
- **Scikit-learn**: Machine learning (TF-IDF, cosine similarity)

### Frontend
- **HTML5**: Semantic markup
- **CSS3**: Modern styling with CSS variables
- **JavaScript (ES6+)**: Interactive functionality
- **Font Awesome**: Icons

## 📈 Career Database

The system includes 100+ careers across various sectors:

- **Technology**: Software Developer, Data Scientist, ML Engineer, DevOps, etc.
- **Business**: Financial Analyst, Product Manager, Marketing, Sales, etc.
- **Creative**: UX Designer, Graphic Designer, Video Editor, Writer, etc.
- **Science**: Research Scientist, Biologist, Chemist, Physicist, etc.
- **Healthcare**: Doctor, Nurse, Pharmacist, Therapist, etc.
- **Engineering**: Civil, Mechanical, Electrical, Aerospace, etc.
- **Legal**: Lawyer, Judge, Legal Consultant, Paralegal, etc.

## 🔮 Future Enhancements

- [ ] User authentication and profiles
- [ ] Career path visualization with progression maps
- [ ] Resume builder integration
- [ ] Job listings integration
- [ ] Salary negotiation tips
- [ ] Skill assessment quizzes
- [ ] Multi-language support
- [ ] Career counseling chatbot

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

This project is open source and available under the MIT License.

## 👨‍💻 Author

Built with ❤️ for career explorers everywhere.

## 🙏 Acknowledgments

- Thanks to all career counselors and industry experts who helped define career profiles
- Inspired by the need for better career guidance tools
- Built using modern web technologies and machine learning

---

**CareerVerse** - Your AI-powered career companion! 🌍
