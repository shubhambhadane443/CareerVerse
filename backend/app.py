"""
CareerVerse - AI-Based Career Recommendation System
Flask Backend API
"""

from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
from model import CareerRecommender
import os

app = Flask(__name__)
CORS(app)

# Initialize the recommender
recommender = CareerRecommender()

@app.route("/")
def home():
    """Health check endpoint"""
    return jsonify({
        "status": "success",
        "message": "CareerVerse API Running",
        "version": "2.0.0"
    })

@app.route("/predict", methods=["POST"])
def predict():
    """
    Main prediction endpoint
    Expected JSON: {
        "skills": ["skill1", "skill2"],
        "interest": "technology",
        "education": "engineering"
    }
    """
    try:
        data = request.json
        
        skills = data.get("skills", [])
        interest = data.get("interest", "")
        education = data.get("education", "")
        top_n = data.get("top_n", 5)
        
        # Validate input
        if not skills or len(skills) == 0:
            return jsonify({
                "status": "error",
                "message": "Please select at least one skill"
            }), 400
        
        # Get recommendations
        recommendations = recommender.recommend_career(
            user_skills=skills,
            user_interest=interest,
            user_education=education,
            top_n=top_n
        )
        
        return jsonify({
            "status": "success",
            "count": len(recommendations),
            "recommendations": recommendations
        })
        
    except Exception as e:
        return jsonify({
            "status": "error",
            "message": str(e)
        }), 500

@app.route("/careers", methods=["GET"])
def get_all_careers():
    """Get all careers in the database"""
    try:
        careers = recommender.get_all_careers()
        return jsonify({
            "status": "success",
            "count": len(careers),
            "careers": careers
        })
    except Exception as e:
        return jsonify({
            "status": "error",
            "message": str(e)
        }), 500

@app.route("/career/<path:career_name>", methods=["GET"])
def get_career_details(career_name):
    """Get details for a specific career"""
    try:
        career = recommender.get_career_details(career_name)
        if career:
            # Get similar careers
            similar = recommender.get_similar_careers(career_name)
            
            return jsonify({
                "status": "success",
                "career": career,
                "similar_careers": similar
            })
        else:
            return jsonify({
                "status": "error",
                "message": "Career not found"
            }), 404
    except Exception as e:
        return jsonify({
            "status": "error",
            "message": str(e)
        }), 500

@app.route("/similar/<path:career_name>", methods=["GET"])
def get_similar_careers(career_name):
    """Get careers similar to a given career"""
    try:
        similar = recommender.get_similar_careers(career_name)
        return jsonify({
            "status": "success",
            "career": career_name,
            "similar_careers": similar
        })
    except Exception as e:
        return jsonify({
            "status": "error",
            "message": str(e)
        }), 500

@app.route("/analyze", methods=["POST"])
def analyze_profile():
    """
    Analyze user profile and provide insights
    Expected JSON: {
        "skills": ["skill1", "skill2"],
        "interest": "technology",
        "education": "engineering"
    }
    """
    try:
        data = request.json
        
        skills = data.get("skills", [])
        interest = data.get("interest", "")
        education = data.get("education", "")
        
        # Get recommendations
        recommendations = recommender.recommend_career(skills, interest, education, top_n=5)
        
        # Generate insights
        insights = {
            "top_career": recommendations[0] if recommendations else None,
            "skill_gaps": [],
            "strengths": [],
            "recommendations": []
        }
        
        if recommendations:
            # Analyze skill gaps
            top_career_skills = str(recommendations[0].get('required_skills', '')).split(',')
            top_career_skills = [s.strip().lower() for s in top_career_skills]
            user_skills_lower = [s.lower() for s in skills]
            
            insights["skill_gaps"] = [
                skill for skill in top_career_skills 
                if skill and skill not in user_skills_lower
            ]
            
            # Analyze strengths
            insights["strengths"] = [
                skill for skill in top_career_skills 
                if skill and skill in user_skills_lower
            ]
            
            # General recommendations
            insights["recommendations"] = [
                "Consider taking online courses to fill skill gaps",
                "Build a portfolio showcasing your projects",
                "Network with professionals in your target field",
                "Stay updated with industry trends"
            ]
        
        return jsonify({
            "status": "success",
            "insights": insights,
            "recommendations": recommendations
        })
        
    except Exception as e:
        return jsonify({
            "status": "error",
            "message": str(e)
        }), 500

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)
