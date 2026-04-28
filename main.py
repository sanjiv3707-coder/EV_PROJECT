import streamlit as st
import os

# Set page config
st.set_page_config(
    page_title="ASTRA - Anti-Gravity Transportation",
    page_icon="🚀",
    layout="wide",
    initial_sidebar_state="expanded",
)

# Load custom CSS
def local_css(file_name):
    with open(file_name) as f:
        st.markdown(f'<style>{f.read()}</style>', unsafe_allow_html=True)

if os.path.exists("components/styles.css"):
    local_css("components/styles.css")

# Main Landing Content (or redirect to Home)
def main():
    st.markdown("""
        <div style="text-align: center; padding: 50px;">
            <h1 class="neon-glow">AI-POWERED ANTI-GRAVITY SYSTEM</h1>
            <p style="font-size: 1.5rem; color: #aaa;">The Future of Urban Mobility & Smart City Integration</p>
        </div>
    """, unsafe_allow_html=True)

    col1, col2, col3 = st.columns(3)
    
    with col1:
        st.markdown("""
            <div class="metric-card">
                <h3>🚀 LEVITATION</h3>
                <p>Advanced G-Platform simulation with real-time stability optimization.</p>
            </div>
        """, unsafe_allow_html=True)
        
    with col2:
        st.markdown("""
            <div class="metric-card">
                <h3>🧠 AI OPTIMIZATION</h3>
                <p>Neural networks predicting energy demand and safest sky-routes.</p>
            </div>
        """, unsafe_allow_html=True)
        
    with col3:
        st.markdown("""
            <div class="metric-card">
                <h3>🛡️ SAFETY CORE</h3>
                <p>Real-time collision avoidance and weather intelligence system.</p>
            </div>
        """, unsafe_allow_html=True)

    st.write("---")
    st.info("👈 Use the sidebar to navigate through the project modules.")

if __name__ == "__main__":
    main()
