import numpy as np

class AntiGravitySimulator:
    def __init__(self):
        pass

    def calculate_metrics(self, inputs):
        """
        Calculates real-time metrics based on physics-inspired formulas.
        """
        weight = inputs.get('weight', 1000)
        passengers = inputs.get('passengers', 1)
        altitude = inputs.get('altitude', 100)
        speed = inputs.get('speed', 100)
        wind_speed = inputs.get('wind_speed', 0)
        weather = inputs.get('weather', 'Clear')
        traffic = inputs.get('traffic', 0.1)

        # Base Energy (Levitation)
        levitation_energy = (weight + (passengers * 75)) * 0.02 * altitude
        
        # Kinetic Energy
        kinetic_energy = 0.5 * weight * (speed**2) * 0.00001
        
        # Environmental Drag
        weather_factor = 1.0
        if weather == 'Rain': weather_factor = 1.2
        elif weather == 'Storm': weather_factor = 1.8
        elif weather == 'Fog': weather_factor = 1.1
        
        drag = 0.5 * 1.225 * (speed**2) * 0.3 * weather_factor * 0.001
        
        total_energy = levitation_energy + kinetic_energy + drag
        
        # Stability
        stability = 100 - (wind_speed * 0.5 + (20 if weather == 'Storm' else 0) + (speed / 100))
        stability = max(0, min(100, stability))
        
        # Travel Time (Distance assumed 100km for reference)
        distance = 100
        travel_time = (distance / speed) * 60 # minutes
        
        return {
            'total_energy': round(total_energy, 2),
            'stability_pct': round(stability, 2),
            'travel_time_min': round(travel_time, 2),
            'safety_score': round(stability * 0.9, 2)
        }

    def simulate_collision_risk(self, traffic_density):
        """
        Simulates nearby vehicles and their proximity.
        """
        num_vehicles = int(traffic_density * 50)
        vehicles = []
        for i in range(num_vehicles):
            vehicles.append({
                'id': f'V-{i+100}',
                'distance': np.random.uniform(50, 1000), # meters
                'altitude_diff': np.random.uniform(-50, 50),
                'speed': np.random.uniform(100, 500)
            })
        
        # Filter potential risks
        risks = [v for v in vehicles if v['distance'] < 200 and abs(v['altitude_diff']) < 10]
        
        return vehicles, risks
