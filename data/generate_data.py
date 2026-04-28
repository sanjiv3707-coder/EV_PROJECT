import pandas as pd
import numpy as np
import sqlite3
import os

def generate_synthetic_data(num_samples=1000):
    np.random.seed(42)
    
    data = {
        'weight': np.random.uniform(500, 5000, num_samples),  # kg
        'passenger_count': np.random.randint(1, 10, num_samples),
        'altitude': np.random.uniform(10, 500, num_samples),  # meters
        'speed': np.random.uniform(50, 800, num_samples),      # km/h
        'wind_speed': np.random.uniform(0, 100, num_samples),  # km/h
        'weather_condition': np.random.choice(['Clear', 'Rain', 'Storm', 'Fog', 'Heat'], num_samples),
        'traffic_density': np.random.uniform(0, 1, num_samples),
    }
    
    df = pd.DataFrame(data)
    
    # Target variables based on some logic
    df['energy_consumption'] = (df['weight'] * 0.05 + 
                                df['altitude'] * 0.2 + 
                                df['speed'] * 0.1 + 
                                (df['wind_speed'] * 0.5 if 'Storm' in df['weather_condition'] else 0) +
                                np.random.normal(0, 10, num_samples))
    
    df['stability_score'] = 100 - (df['wind_speed'] * 0.2 + 
                                  df['traffic_density'] * 10 + 
                                  (20 if 'Storm' in df['weather_condition'] else 0) +
                                  np.random.normal(0, 2, num_samples))
    df['stability_score'] = df['stability_score'].clip(0, 100)
    
    df['collision_probability'] = (df['traffic_density'] * 0.5 + 
                                   (df['wind_speed'] / 100) * 0.2 + 
                                   (0.1 if 'Fog' in df['weather_condition'] else 0) +
                                   np.random.normal(0, 0.05, num_samples))
    df['collision_probability'] = df['collision_probability'].clip(0, 1)
    
    return df

def initialize_database():
    db_path = 'data/flight_logs.db'
    if not os.path.exists('data'):
        os.makedirs('data')
        
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()
    
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS trip_logs (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
            route TEXT,
            distance REAL,
            altitude REAL,
            avg_speed REAL,
            energy_used REAL,
            passengers INTEGER,
            safety_alerts INTEGER,
            weather_condition TEXT
        )
    ''')
    
    conn.commit()
    conn.close()
    print(f"Database initialized at {db_path}")

if __name__ == "__main__":
    df = generate_synthetic_data()
    df.to_csv('data/synthetic_flight_data.csv', index=False)
    print("Synthetic data generated.")
    initialize_database()
