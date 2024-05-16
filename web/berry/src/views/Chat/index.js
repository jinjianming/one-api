import { useState, useEffect } from "react";
import { API } from "../../utils/api";

const Chat = () => {
    const [chatUrl, setChatUrl] = useState("");
    const [loading, setLoading] = useState(true);

    const loadTokens = async () => {
        try {
            const res = await API.get(`/api/token/`);
            const siteInfo = JSON.parse(localStorage.getItem('siteInfo'));
            if (!siteInfo) {
                console.error("siteInfo not found in localStorage");
                setLoading(false);
                return;
            }
            const serverAddress = siteInfo.server_address;
            const key = res.data.data[0].key;
            const url = `${siteInfo.chat_link}/#/?settings={"key":"sk-${key}","url":"${serverAddress}"}`;
            setChatUrl(url);
        } catch (error) {
            console.error("Error loading tokens:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadTokens();
    }, []);

    return (
        <div style={{ position: 'relative', width: '100%', height: '100vh', padding: '0', margin: '0' }}>
            {loading && (
                <div style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    fontSize: '18px',
                    fontWeight: 'bold',
                }}>
                    加载中...
                </div>
            )}
            {chatUrl && (
                <iframe
                    src={chatUrl}
                    title="Chat"
                    style={{ width: '100%', height: '100%', border: 'none', padding: '0', margin: '0' }}
                    onLoad={() => setLoading(false)}
                />
            )}
        </div>
    );
};

export default Chat;
