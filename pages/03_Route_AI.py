import streamlit as st
import plotly.express as px
import pandas as pd
import numpy as np

def show():
    st.title("🗺️ AI Route Optimization")
    
    col1, col2 = st.columns([1, 2])
    
    with col1:
        st.subheader("Route Configuration")
        start = st.text_input("Origin Hub", "Sector 1 Downtown")
        end = st.text_input("Destination Hub", "Sector 9 Sky-Port")
        priority = st.radio("Optimization Priority", ["Fastest", "Safest", "Energy Efficient"])
        
        st.write("---")
        st.write("**Active Constraints:**")
        st.checkbox("Avoid No-Fly Zones", value=True)
        st.checkbox("Consider Weather Turbulence", value=True)
        st.checkbox("Emergency Landing Backup", value=True)
        
        if st.button("CALCULATE OPTIMAL ROUTE"):
            st.session_state['route_calculated'] = True

    with col2:
        if st.session_state.get('route_calculated'):
            st.success(f"Route Calculated: {start} to {end}")
            
            # Mock 3D Flight Path
            df = pd.DataFrame({
                'x': np.cumsum(np.random.randn(100)),
                'y': np.cumsum(np.random.randn(100)),
                'z': np.random.uniform(50, 200, 100),
                'speed': np.random.uniform(100, 500, 100)
            })
            
            fig = px.line_3d(df, x='x', y='y', z='z', color='speed', title="Optimized 3D Flight Corridor")
            fig.update_layout(template="plotly_dark")
            st.plotly_chart(fig, use_container_width=True)
            
            st.markdown("""
                <div class="metric-card">
                    <h4>AI Route Intelligence Summary</h4>
                    <ul>
                        <li><b>Estimated Time:</b> 12.4 minutes</li>
                        <li><b>Energy Required:</b> 45.2 kWh</li>
                        <li><b>No-Fly Zones Avoided:</b> 2 (Military Airspace)</li>
                        <li><b>Weather Strategy:</b> High-altitude bypass (Fog detected at 50m)</li>
                    </ul>
                </div>
            """, unsafe_allow_html=True)
        else:
            st.info("Configure your flight path and click 'CALCULATE' to initialize ASTRA's navigation module.")

if __name__ == "__main__":
    show()
