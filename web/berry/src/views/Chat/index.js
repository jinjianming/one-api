import {Grid} from '@mui/material';
import {gridSpacing} from 'store/constant';
import {API} from "../../utils/api";

const Chat = () => {
    const loadTokens = async (startIdx) => {
        // const [tokens, setTokens] = useState([]);

        const res = await API.get(`/api/token/`);
        const key = res.data.data[0].key
        const url = `https://like.chatapi.asia/#/?settings={"key":"sk-${key}","url":"https://chat.chatapi.asia"}`;
        window.open(url)


    };
    loadTokens()

    return (
        <>
        </>
    )
};
export default Chat;