import { useState } from "react";
import { API } from "../../utils/api";

const Chat = () => {
    const [chatUrl, setChatUrl] = useState("");

    const loadTokens = async (startIdx) => {
        try {
            const res = await API.get(`/api/token/`);
            const siteInfo = JSON.parse(localStorage.getItem('siteInfo'));
            if (!siteInfo) {
                console.error("siteInfo not found in localStorage");
                return;
            }
            const serverAddress = siteInfo.server_address;
            const key = res.data.data[0].key;
            const url = `${siteInfo.chat_link}/#/?settings={"key":"sk-${key}","url":"${serverAddress}"}`;
            setChatUrl(url);
        } catch (error) {
            console.error("Error loading tokens:", error);
        }
    };

    const buttonStyle = {
        padding: '10px 20px',
        fontSize: '16px',
        fontWeight: 'bold',
        color: '#fff',
        backgroundColor: '#007bff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        transition: 'background-color 0.3s ease',
    };

    const buttonHoverStyle = {
        backgroundColor: '#0056b3',
    };

    return (
        <div>
            <button
                onClick={loadTokens}
                style={buttonStyle}
                onMouseOver={(e) => e.currentTarget.style.backgroundColor = buttonHoverStyle.backgroundColor}
                onMouseOut={(e) => e.currentTarget.style.backgroundColor = buttonStyle.backgroundColor}
            >
                点击开始对话
            </button>
            {chatUrl && (
                <iframe
                    src={chatUrl}
                    title="Chat"
                    style={{ width: '100%', height: '500px', border: 'none', marginTop: '20px' }}
                />
            )}
        </div>
    );
};

export default Chat;
