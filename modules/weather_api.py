import random

class WeatherSystem:
    def __init__(self):
        self.conditions = ['Clear', 'Rain', 'Storm', 'Fog', 'Heat']

    def get_current_weather(self, location="Smart City Hub"):
        condition = random.choice(self.conditions)
        temp = random.randint(15, 45)
        wind_speed = random.randint(0, 100)
        
        return {
            'location': location,
            'condition': condition,
            'temperature': f"{temp}°C",
            'wind_speed': f"{wind_speed} km/h",
            'visibility': "High" if condition == 'Clear' else "Low" if condition in ['Fog', 'Storm'] else "Moderate",
            'risk_level': "Critical" if condition == 'Storm' else "Elevated" if condition in ['Fog', 'Rain'] else "Low"
        }

    def get_forecast(self):
        return [self.get_current_weather() for _ in range(3)]
