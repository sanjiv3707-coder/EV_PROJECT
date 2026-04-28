import streamlit as st
import pandas as pd
from modules.database import DatabaseManager

def show():
    st.title("📋 Trip Logs & System Reports")
    
    db = DatabaseManager()
    df = db.get_all_logs()

    if df.empty:
        st.info("Log database is currently empty.")
        return

    st.subheader("Historical Flight Data")
    st.dataframe(df, use_container_width=True)

    col1, col2 = st.columns(2)
    with col1:
        csv = df.to_csv(index=False).encode('utf-8')
        st.download_button(
            label="DOWNLOAD LOGS AS CSV",
            data=csv,
            file_name='astra_trip_logs.csv',
            mime='text/csv',
        )
    
    with col2:
        if st.button("CLEAR ALL LOGS", type="secondary"):
            # logic to clear DB could be added here
            st.warning("Database clearing requires Administrator clearance.")

if __name__ == "__main__":
    show()
