import streamlit as st
import pandas as pd
import numpy as np
from modules.simulator import AntiGravitySimulator
from modules.ai_engine import AIEngine
from modules.database import DatabaseManager

def show():
    st.title("🚀 Anti-Gravity Vehicle Simulator")
    
    sim = AntiGravitySimulator()
    ai = AIEngine()
    db = DatabaseManager()

    col1, col2 = st.columns([1, 2])

    with col1:
        st.subheader("Simulation Parameters")
        weight = st.slider("Vehicle Weight (kg)", 500, 5000, 1500)
        passengers = st.number_input("Passenger Count", 1, 10, 2)
        target_alt = st.slider("Target Altitude (m)", 10, 500, 100)
        speed = st.slider("Target Speed (km/h)", 50, 800, 250)
        
        st.write("---")
        weather = st.selectbox("Weather Condition", ['Clear', 'Rain', 'Storm', 'Fog', 'Heat'])
        wind = st.slider("Wind Level (km/h)", 0, 100, 15)
        traffic = st.slider("Traffic Density", 0.0, 1.0, 0.2)

        if st.button("RUN SIMULATION"):
            inputs = {
                'weight': weight,
                'passengers': passengers,
                'altitude': target_alt,
                'speed': speed,
                'wind_speed': wind,
                'weather': weather,
                'traffic': traffic
            }
            
            # Physics Sim
            results = sim.calculate_metrics(inputs)
            
            # AI Predictions
            ai_results = ai.predict(weight, passengers, target_alt, speed, wind, weather, traffic)
            
            st.session_state['sim_results'] = {**results, **ai_results}
            st.success("Simulation Complete!")
            
            # Log to DB
            db.log_trip("Simulator-Test", 100, target_alt, speed, results['total_energy'], passengers, 0, weather)

    with col2:
        st.subheader("Real-Time Dashboard")
        
        if 'sim_results' in st.session_state:
            res = st.session_state['sim_results']
            
            m1, m2, m3 = st.columns(3)
            m1.metric("Energy Consumption", f"{res['total_energy']} kW", delta="-5% AI Optimized")
            m2.metric("Stability Score", f"{res['stability_pct']}%", delta=None)
            m3.metric("Safety Score", f"{res['safety_score']}/100", delta=None)
            
            m4, m5, m6 = st.columns(3)
            m4.metric("Collision Prob", f"{round(res['collision_probability']*100, 2)}%", delta="Safe" if res['collision_probability'] < 0.2 else "Risk", delta_color="inverse")
            m5.metric("Safe Altitude", f"{res['safe_altitude_recommendation']} m", delta=None)
            m6.metric("Travel Time", f"{res['travel_time_min']} min", delta=None)
            
            # Visualizing with a chart
            st.write("### AI Stability Prediction")
            chart_data = pd.DataFrame(np.random.randn(20, 2), columns=['Stability', 'Vibration'])
            st.line_chart(chart_data)
        else:
            st.info("Set parameters and click 'RUN SIMULATION' to see results.")
            st.image("https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1000", caption="Simulation Core Visual")

if __name__ == "__main__":
    show()
