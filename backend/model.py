"""
AI-Based Career Recommendation System
Uses TF-IDF and Cosine Similarity for intelligent career matching
"""

import pandas as pd
import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import pickle
import os

class CareerRecommender:
    def __init__(self):
        data_path = os.path.join(os.path.dirname(__file__), "data", "careers.csv")
        self.df = pd.read_csv(data_path)
        self.tfidf_matrix = None
        self.vectorizer = TfidfVectorizer(stop_words='english')
        self._train_model()
    
    def _train_model(self):
        """Train the TF-IDF model on career data"""
        # Combine all text features for better matching
        self.df['combined_features'] = (
            self.df['required_skills'].fillna('') + ' ' +
            self.df['interest'].fillna('') + ' ' +
            self.df['education'].fillna('') + ' ' +
            self.df['career'].fillna('')
        )
        
        # Create TF-IDF matrix
        self.tfidf_matrix = self.vectorizer.fit_transform(self.df['combined_features'])
        
        # Save model
        self._save_model()
    
    def _save_model(self):
        """Save the trained model"""
        model_data = {
            'vectorizer': self.vectorizer,
            'tfidf_matrix': self.tfidf_matrix,
            'df': self.df
        }
        with open('model.pkl', 'wb') as f:
            pickle.dump(model_data, f)
    
    def _load_model(self):
        """Load a pre-trained model"""
        if os.path.exists('model.pkl'):
            with open('model.pkl', 'rb') as f:
                model_data = pickle.load(f)
                self.vectorizer = model_data['vectorizer']
                self.tfidf_matrix = model_data['tfidf_matrix']
                self.df = model_data['df']
                return True
        return False
    
    def _calculate_skill_score(self, user_skills, career_skills):
        """Calculate skill matching score"""
        if not career_skills or pd.isna(career_skills):
            return 0
        
        career_skills_list = [s.strip().lower() for s in str(career_skills).split(',')]
        user_skills_lower = [s.lower() for s in user_skills]
        
        # Exact matches
        exact_matches = len(set(user_skills_lower) & set(career_skills_list))
        
        # Partial matches (skill contains or is contained)
        partial_matches = 0
        for user_skill in user_skills_lower:
            for career_skill in career_skills_list:
                if user_skill in career_skill or career_skill in user_skill:
                    partial_matches += 1
                    break
        
        # Calculate score
        if len(career_skills_list) > 0:
            score = (exact_matches * 2 + partial_matches) / (len(career_skills_list) * 2) * 100
        else:
            score = 0
        
        return min(score, 100)
    
    def _calculate_interest_score(self, user_interest, career_interest):
        """Calculate interest matching score"""
        if not user_interest or not career_interest or pd.isna(career_interest):
            return 0
        
        user_interest = user_interest.lower()
        career_interest = career_interest.lower()
        
        if user_interest in career_interest or career_interest in user_interest:
            return 25
        return 0
    
    def _calculate_education_score(self, user_education, career_education):
        """Calculate education matching score"""
        if not user_education or not career_education or pd.isna(career_education):
            return 0
        
        user_education = user_education.lower()
        career_education = career_education.lower()
        
        if 'any' in career_education:
            return 15
        
        if user_education == career_education:
            return 20
        elif user_education in career_education or career_education in user_education:
            return 10
        
        return 0
    
    def recommend_career(self, user_skills, user_interest, user_education, top_n=5):
        """
        Recommend careers based on user profile
        
        Args:
            user_skills: List of user's skills
            user_interest: User's area of interest
            user_education: User's education background
            top_n: Number of recommendations to return
        
        Returns:
            List of career recommendations with scores
        """
        results = []
        
        for idx, row in self.df.iterrows():
            # Calculate individual scores
            skill_score = self._calculate_skill_score(
                user_skills, 
                row['required_skills']
            )
            interest_score = self._calculate_interest_score(
                user_interest, 
                row['interest']
            )
            education_score = self._calculate_education_score(
                user_education, 
                row['education']
            )
            
            # Calculate TF-IDF similarity
            user_profile = ' '.join(user_skills) + ' ' + str(user_interest) + ' ' + str(user_education)
            user_vector = self.vectorizer.transform([user_profile])
            tfidf_score = cosine_similarity(user_vector, self.tfidf_matrix[idx])[0][0] * 40
            
            # Weighted total score
            total_score = (
                skill_score * 0.35 +      # 35% weight on skill matching
                interest_score * 0.30 +   # 30% weight on interest matching
                education_score * 0.15 +  # 15% weight on education matching
                tfidf_score * 0.20        # 20% weight on TF-IDF similarity
            )
            
            results.append({
                'id': int(idx + 1),
                'career': row['career'],
                'required_skills': row['required_skills'],
                'interest': row['interest'],
                'education': row['education'],
                'average_salary': row['average_salary'],
                'description': row.get('description', 'No description available'),
                'growth_outlook': row.get('growth_outlook', 'Stable'),
                'score': round(min(total_score, 100), 1),
                'skill_match': round(skill_score, 1),
                'interest_match': round(interest_score, 1),
                'education_match': round(education_score, 1),
                'tfidf_score': round(tfidf_score, 1)
            })
        
        # Sort by score and return top N
        results = sorted(results, key=lambda x: x['score'], reverse=True)
        
        # Add rank
        for i, result in enumerate(results):
            result['rank'] = i + 1
        
        return results[:top_n]
    
    def get_all_careers(self):
        """Get all careers in the database"""
        return self.df.to_dict('records')
    
    def get_career_details(self, career_name):
        """Get details for a specific career"""
        career = self.df[self.df['career'].str.lower() == career_name.lower()]
        if not career.empty:
            return career.to_dict('records')[0]
        return None
    
    def get_similar_careers(self, career_name, top_n=3):
        """Get similar careers based on career name"""
        career = self.get_career_details(career_name)
        if career:
            career_features = (
                str(career.get('required_skills', '')) + ' ' +
                str(career.get('interest', '')) + ' ' +
                str(career.get('education', ''))
            )
            career_vector = self.vectorizer.transform([career_features])
            similarities = cosine_similarity(career_vector, self.tfidf_matrix).flatten()
            
            # Get indices of most similar careers (excluding itself)
            similar_indices = similarities.argsort()[::-1][1:top_n+1]
            
            results = []
            for idx in similar_indices:
                results.append({
                    'career': self.df.iloc[idx]['career'],
                    'similarity': round(similarities[idx] * 100, 1)
                })
            return results
        return []


# Initialize recommender
recommender = CareerRecommender()

if __name__ == "__main__":
    # Test the recommender
    test_skills = ["programming", "problem solving"]
    test_interest = "technology"
    test_education = "engineering"
    
    recommendations = recommender.recommend_career(test_skills, test_interest, test_education)
    print("Career Recommendations:")
    for rec in recommendations:
        print(f"\n{rec['rank']}. {rec['career']}")
        print(f"   Score: {rec['score']}%")
        print(f"   Skills: {rec['required_skills']}")
        print(f"   Salary: ₹{rec['average_salary']}")
