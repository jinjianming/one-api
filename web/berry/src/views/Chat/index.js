import React, { useEffect, useState } from "react";
import { API } from "../../utils/api";
import "./index.css";

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

            const key = res.data.data[0].key;
            const serverAddress = siteInfo.server_address + "/v1/";

            const settings = {
                keyVaults: {
                    openai: {
                        apiKey: key,
                        baseURL: serverAddress,
                    },
                },
                languageModel: {
                    openai: {
                        fetchOnClient: true
                    },
                },
            };
            const url = `${siteInfo.chat_link}/?settings=${JSON.stringify(settings)}`;

            setChatUrl(url);
        } catch (error) {
            console.error("Error loading tokens:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadTokens();  // Load tokens using the "lobehub" theme
    }, []);

    if (loading) {
        return <div className="chat-container">Loading...</div>;
    }

    return (
        <div className="chat-container">
            <iframe
                src={chatUrl}
                style={{ height: '100%', width: '100%', padding: 0, border: 'none' }}
                title="Chat"
            />
        </div>
    );
};

export default Chat;