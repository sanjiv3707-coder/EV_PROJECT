import streamlit as st
import time
import random
from modules.simulator import AntiGravitySimulator

def show():
    st.title("🛡️ Safety Control & Collision Avoidance")
    
    sim = AntiGravitySimulator()
    
    col1, col2 = st.columns([2, 1])
    
    with col1:
        st.subheader("Sky-Lane Proximity Monitor")
        traffic_density = st.slider("Simulate Traffic Density", 0.0, 1.0, 0.5)
        
        vehicles, risks = sim.simulate_collision_risk(traffic_density)
        
        # Display risks
        if risks:
            for risk in risks:
                st.error(f"⚠️ COLLISION RISK: Vehicle {risk['id']} at {round(risk['distance'], 2)}m | Alt Diff: {round(risk['altitude_diff'], 2)}m")
            st.warning("ASTRA Recommendation: Immediate altitude shift +50m or activate Hover Mode.")
        else:
            st.success("✅ Clear Airspace: No immediate collision threats detected.")
            
        # Mock Radar View
        st.write("### Tactical Radar")
        st.image("https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1000", caption="Tactical Airspace Scanning")

    with col2:
        st.subheader("System Status")
        st.markdown(f"""
            <div class="metric-card">
                <p><b>Anti-Gravity Core:</b> <span style="color: #00f2ff;">ACTIVE</span></p>
                <p><b>Stabilizers:</b> 100%</p>
                <p><b>Auto-Pilot:</b> ENGAGED</p>
                <p><b>Emergency Chutes:</b> READY</p>
                <p><b>Weather Risk:</b> LOW</p>
            </div>
        """, unsafe_allow_html=True)
        
        st.write("---")
        if st.button("TRIGGER EMERGENCY LANDING", type="primary"):
            with st.spinner("Executing descent protocol..."):
                time.sleep(2)
            st.error("VEHICLE LANDED SAFELY AT NEAREST G-PLATFORM.")

if __name__ == "__main__":
    show()
