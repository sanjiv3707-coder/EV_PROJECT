import streamlit as st

def show():
    st.title("🏙️ Project Overview")
    
    st.markdown("""
    ### Introduction
    The **AI-Powered Anti-Gravity Transportation & Mobility System** is a concept innovation designed to solve the challenges of 21st-century urban congestion. By utilizing room-temperature superconductor simulation and AI-driven levitation, we propose a vertical mobility layer for future smart cities.

    ### Core Objectives
    1. **Levitation Efficiency**: Use AI to minimize energy core consumption.
    2. **Sky-Lane Safety**: Automated collision avoidance and traffic management.
    3. **Environmental Adaptation**: Weather-intelligent flight adjustment.
    4. **Smart Integration**: Seamless connectivity with vertical landing hubs.

    ### Key Features
    - **Vehicle Simulator**: Real-time physics and ML feedback.
    - **Route AI**: Dynamic pathfinding through 3D air corridors.
    - **Safety Dashboard**: Collision risk monitoring and emergency protocols.
    - **ASTRA Assistant**: Specialized AI for pilot support and system diagnostics.
    """)

    st.image("https://images.unsplash.com/photo-1478720568477-152d9b164e26?auto=format&fit=crop&q=80&w=1000", caption="Futuristic Smart City Concept")

if __name__ == "__main__":
    show()
