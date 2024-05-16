import {Grid} from '@mui/material';
import {gridSpacing} from 'store/constant';
import {API} from "../../utils/api";

const Chat = () => {
    const loadTokens = async (startIdx) => {
        // const [tokens, setTokens] = useState([]);

        const res = await API.get(`/api/token/`);
        let status = localStorage.getItem('status');
        const chatLink = localStorage.getItem('chat_link');
        let serverAddress = '';
        if (status) {
            status = JSON.parse(status);
            serverAddress = status.server_address;
        }
        if (serverAddress === '') {
            serverAddress = window.location.origin;
        }
        const key = res.data.data[0].key
        const url = `${chatLink}/#/?settings={"key":"sk-${key}","url":${serverAddress}`;
        window.open(url)


    };
    loadTokens()

    return (
        <>
        </>
    )
};
export default Chat;