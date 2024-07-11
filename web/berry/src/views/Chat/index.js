import React, { useEffect, useState } from "react";
import { API } from "../../utils/api";
import "./index.css";

const useIsSmallScreen = () => {
    const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 768);

    useEffect(() => {
        const handleResize = () => {
            setIsSmallScreen(window.innerWidth <= 768);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return isSmallScreen;
};

const Chat = () => {
    const [chatUrl, setChatUrl] = useState("");
    const [loading, setLoading] = useState(true);
    const [theme, setTheme] = useState("lobehub"); // 默认主题

    const loadTokens = async (selectedTheme = theme) => {
        try {
            const res = await API.get(`/api/token/`);
            const siteInfo = JSON.parse(localStorage.getItem('siteInfo'));

            if (!siteInfo) {
                console.error("siteInfo not found in localStorage");
                setLoading(false);
                return;
            }

            const key = res.data.data[0].key;
            const serverAddress = siteInfo.server_address;
            let url = "";

            if (selectedTheme === "lobehub") {
                const settings = {
                    keyVaults: {
                        openai: {
                            apiKey: key,
                            baseURL: serverAddress,
                        },
                    },
                    ProviderConfig: {
                        fetchOnClient: true
                    },
                };
                url = `${siteInfo.chat_link}/#/?settings=${JSON.stringify(settings)}`;
                console.log(url)
            } else if (selectedTheme === "ChatGPT-Next-Web") {
                url = `${siteInfo.chat_link}/#/?settings={"key":"sk-${key}","url":"https://next.chatapi.asia"}`;
            }

            setChatUrl(url);
        } catch (error) {
            console.error("Error loading tokens:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadTokens("lobehub");  // 确保在组件首次加载时使用 "lobehub" 主题
    }, []);

    const handleThemeChange = (newTheme) => {
        setLoading(true);
        setTheme(newTheme);
        loadTokens(newTheme);  // 更新主题时重新加载 tokens
    };

    if (loading) {
        return <div className="chat-container">Loading...</div>;
    }

    return (
        <div className="chat-container">
            <div className="theme-selector">
                <button onClick={() => handleThemeChange("lobehub")}>Lobehub 主题</button>
                <button onClick={() => handleThemeChange("ChatGPT-Next-Web")}>ChatGPT-Next-Web 主题</button>
            </div>
            <iframe
                src={chatUrl}
                style={{ height: '100%', width: '100%', padding: 0, border: 'none' }}
                title="Chat"
            />
        </div>
    );
};

export default Chat;