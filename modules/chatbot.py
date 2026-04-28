class AntiGravityChatbot:
    def __init__(self):
        self.context = "You are ASTRA, the AI Assistant for the Anti-Gravity Transportation System."
        self.responses = {
            "hello": "Greetings, Commander. ASTRA online. How can I assist with your flight today?",
            "status": "All systems nominal. Energy core at 88%. Levitation stability: 99.4%.",
            "safety": "Passenger safety is my priority. Current weather risk is LOW. No collision threats detected.",
            "energy": "We are currently optimizing levitation energy. Consumption is 12% below baseline.",
            "emergency": "Emergency protocol activated. Scanning for nearest landing zones... Found Sector 4 G-Platform.",
            "altitude": "Optimal altitude for current wind conditions is 150 meters.",
            "route": "Fastest route to Neo-Tokyo is SkyLane 7. Estimated travel time: 14 minutes."
        }

    def get_response(self, user_input):
        user_input = user_input.lower()
        
        for key in self.responses:
            if key in user_input:
                return self.responses[key]
        
        return "I'm sorry, I don't have information on that specific query. Would you like me to run a full system diagnostic?"

    def get_suggestions(self):
        return ["Check system status", "What is the safest route?", "Optimize energy usage", "Emergency landing"]
