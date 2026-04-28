try:
    from sklearn.ensemble import RandomForestRegressor
    from sklearn.model_selection import train_test_split
    ML_AVAILABLE = True
except ImportError:
    ML_AVAILABLE = False
    print("Warning: Scikit-learn or dependencies blocked. Switching to heuristic AI mode.")

import pickle
import os
import pandas as pd
import numpy as np

class AIEngine:
    def __init__(self):
        self.energy_model = None
        self.stability_model = None
        self.collision_model = None
        self.data_path = 'data/synthetic_flight_data.csv'
        self.models_dir = 'modules/models'
        
        if ML_AVAILABLE:
            if not os.path.exists(self.models_dir):
                os.makedirs(self.models_dir)
            try:
                self.train_models()
            except Exception as e:
                print(f"ML Training failed: {e}. Using heuristics.")
                self.use_ml = False
        else:
            self.use_ml = False

    def train_models(self):
        if not os.path.exists(self.data_path):
            return
            
        df = pd.read_csv(self.data_path)
        weather_map = {'Clear': 0, 'Rain': 1, 'Storm': 2, 'Fog': 3, 'Heat': 4}
        df['weather_encoded'] = df['weather_condition'].map(weather_map)
        
        X = df[['weight', 'passenger_count', 'altitude', 'speed', 'wind_speed', 'weather_encoded', 'traffic_density']]
        
        self.energy_model = RandomForestRegressor(n_estimators=100, random_state=42)
        self.energy_model.fit(X, df['energy_consumption'])
        
        self.stability_model = RandomForestRegressor(n_estimators=100, random_state=42)
        self.stability_model.fit(X, df['stability_score'])
        
        self.collision_model = RandomForestRegressor(n_estimators=100, random_state=42)
        self.collision_model.fit(X, df['collision_probability'])
        
        self.use_ml = True

    def predict(self, weight, passengers, altitude, speed, wind_speed, weather, traffic):
        if hasattr(self, 'use_ml') and self.use_ml:
            try:
                weather_map = {'Clear': 0, 'Rain': 1, 'Storm': 2, 'Fog': 3, 'Heat': 4}
                weather_encoded = weather_map.get(weather, 0)
                features = np.array([[weight, passengers, altitude, speed, wind_speed, weather_encoded, traffic]])
                
                energy = self.energy_model.predict(features)[0]
                stability = self.stability_model.predict(features)[0]
                collision = self.collision_model.predict(features)[0]
                
                return {
                    'energy_consumption': round(energy, 2),
                    'stability_score': round(stability, 2),
                    'collision_probability': round(collision, 2),
                    'safe_altitude_recommendation': altitude if stability > 80 else altitude + 50
                }
            except:
                pass # Fallback to heuristics
        
        # Heuristic Fallback Logic
        energy = (weight * 0.05) + (altitude * 0.2) + (speed * 0.1)
        stability = 100 - (wind_speed * 0.4 + traffic * 10)
        collision = (traffic * 0.4) + (0.1 if weather in ['Fog', 'Storm'] else 0)
        
        return {
            'energy_consumption': round(energy, 2),
            'stability_score': round(stability, 2),
            'collision_probability': round(max(0, min(1, collision)), 2),
            'safe_altitude_recommendation': altitude if stability > 70 else altitude + 100
        }

if __name__ == "__main__":
    engine = AIEngine()
    print("AI Engine initialized (Heuristic or ML mode).")
