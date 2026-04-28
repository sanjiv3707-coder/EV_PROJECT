import sqlite3
import pandas as pd

class DatabaseManager:
    def __init__(self, db_path='data/flight_logs.db'):
        self.db_path = db_path

    def log_trip(self, route, distance, altitude, avg_speed, energy_used, passengers, safety_alerts, weather):
        conn = sqlite3.connect(self.db_path)
        cursor = conn.cursor()
        
        cursor.execute('''
            INSERT INTO trip_logs (route, distance, altitude, avg_speed, energy_used, passengers, safety_alerts, weather_condition)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        ''', (route, distance, altitude, avg_speed, energy_used, passengers, safety_alerts, weather))
        
        conn.commit()
        conn.close()

    def get_all_logs(self):
        conn = sqlite3.connect(self.db_path)
        df = pd.read_sql_query("SELECT * FROM trip_logs ORDER BY timestamp DESC", conn)
        conn.close()
        return df

    def get_summary_stats(self):
        conn = sqlite3.connect(self.db_path)
        cursor = conn.cursor()
        
        cursor.execute("SELECT COUNT(*), SUM(distance), AVG(energy_used) FROM trip_logs")
        stats = cursor.fetchone()
        
        conn.close()
        return {
            'total_trips': stats[0] or 0,
            'total_distance': stats[1] or 0,
            'avg_energy': stats[2] or 0
        }
