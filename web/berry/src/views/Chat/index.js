
import {API} from "../../utils/api";


const Chat = () => {
    const loadTokens = async (startIdx) => {
        // const [tokens, setTokens] = useState([]);
        // eslint-disable-next-line react-hooks/rules-of-hooks
        // const siteInfo = useSelector((state) => state.siteInfo);
        const res = await API.get(`/api/token/`);
        // const status = localStorage.getItem('status');
        const siteInfo = localStorage.getItem('siteInfo');
        let serverAddress = '';
        if (siteInfo?.server_address) {
            serverAddress = siteInfo.server_address;
        } else {
            serverAddress = window.location.host;
        }
        console.log(siteInfo)

        if (siteInfo?.chat_link) {
            const key = res.data.data[0].key
            const url = `${siteInfo.chat_link}/#/?settings={"key":"sk-${key}","url":${serverAddress}`;
            window.open(url)
        }
        console.log(siteInfo)


    };
    loadTokens()

    return (
        <>
        </>
    )
};
export default Chat;