import { useEffect } from "react";
import { API } from "../../utils/api";

const Chat = () => {
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
            window.open(url);
        } catch (error) {
            console.error("Error loading tokens:", error);
        }
    };

    useEffect(() => {
        loadTokens();
    }, []);

    return (
        <>
            <button onClick={loadTokens}>Load Tokens</button>
        </>
    );
};

export default Chat;
