import streamlit as st
from modules.chatbot import AntiGravityChatbot

def show():
    st.title("🤖 ASTRA AI Assistant")
    
    chatbot = AntiGravityChatbot()

    if "messages" not in st.session_state:
        st.session_state.messages = []

    # Display chat history
    for message in st.session_state.messages:
        with st.chat_message(message["role"]):
            st.markdown(message["content"])

    # Sidebar Suggestions
    st.sidebar.subheader("Quick Commands")
    for suggestion in chatbot.get_suggestions():
        if st.sidebar.button(suggestion):
            prompt = suggestion
            # Trigger chat from suggestion
            st.session_state.messages.append({"role": "user", "content": prompt})
            response = chatbot.get_response(prompt)
            st.session_state.messages.append({"role": "assistant", "content": response})
            st.rerun()

    # Chat Input
    if prompt := st.chat_input("Ask ASTRA anything about the system..."):
        st.session_state.messages.append({"role": "user", "content": prompt})
        with st.chat_message("user"):
            st.markdown(prompt)

        response = chatbot.get_response(prompt)
        
        with st.chat_message("assistant"):
            st.markdown(response)
        st.session_state.messages.append({"role": "assistant", "content": response})

if __name__ == "__main__":
    show()
