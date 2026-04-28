import streamlit as st
import plotly.express as px
import pandas as pd
from modules.database import DatabaseManager

def show():
    st.title("📊 Fleet Analytics & Trends")
    
    db = DatabaseManager()
    df = db.get_all_logs()
    stats = db.get_summary_stats()

    if df.empty:
        st.info("No flight logs available yet. Run some simulations to generate data!")
        return

    # Top Level Stats
    c1, c2, c3 = st.columns(3)
    c1.metric("Total Trips", stats['total_trips'])
    c2.metric("Total Distance", f"{round(stats['total_distance'], 2)} km")
    c3.metric("Avg Energy Core Load", f"{round(stats['avg_energy'], 2)} kWh")

    st.write("---")
    
    col1, col2 = st.columns(2)
    
    with col1:
        st.subheader("Energy Usage by Weather")
        fig1 = px.box(df, x='weather_condition', y='energy_used', color='weather_condition', template="plotly_dark")
        st.plotly_chart(fig1, use_container_width=True)

    with col2:
        st.subheader("Altitude vs Speed Efficiency")
        fig2 = px.scatter(df, x='altitude', y='avg_speed', size='energy_used', color='weather_condition', template="plotly_dark")
        st.plotly_chart(fig2, use_container_width=True)

    st.subheader("Safety Incident Prevention Trend")
    # Generating mock trend data
    trend_df = pd.DataFrame({
        'Day': range(1, 31),
        'Incidents Prevented': [i + (i*0.1) for i in range(1, 31)]
    })
    fig3 = px.area(trend_df, x='Day', y='Incidents Prevented', title="AI Safety Success Rate", template="plotly_dark")
    st.plotly_chart(fig3, use_container_width=True)

if __name__ == "__main__":
    show()
