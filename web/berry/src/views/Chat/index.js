import {API} from "../../utils/api";


const Chat = () => {
    const loadTokens = async (startIdx) => {
        // const [tokens, setTokens] = useState([]);
        // eslint-disable-next-line react-hooks/rules-of-hooks
        // const siteInfo = useSelector((state) => state.siteInfo);
        const res = await API.get(`/api/token/`);
        // const status = localStorage.getItem('status');
        const siteInfo = localStorage.getItem('siteInfo');
        // let serverAddress = '';
        const serverAddress = siteInfo.server_address;
        console.log(siteInfo)
        console.log("siteInfo.chat_link", siteInfo.chat_link)
        const key = res.data.data[0].key
        const url = `${siteInfo.chat_link}/#/?settings={"key":"sk-${key}","url":${serverAddress}`;
        window.open(url)
        console.log("url", url)
        console.log(siteInfo)
    };
    loadTokens()

    return (
        <>
            <button onClick={loadTokens}></button>
        </>
    )
};
export default Chat;