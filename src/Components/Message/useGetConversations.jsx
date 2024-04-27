import { useEffect, useState } from "react";
import {getUsersChatSideBar} from "../../Services/messageService.jsx";

const useGetConversations = () => {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [conversations, setConversations] = useState([]);

    useEffect(() => {
        const getConversations = async () => {
            setLoading(true);
            try {
                const res = await getUsersChatSideBar()
                const data = res.data;
                if (data.error) {
                    throw new Error(data.error);
                }
                setConversations(data);
            } catch (error) {
                console.log('a')
            } finally {
                setLoading(false);
                setSuccess(true)
            }
        };

        getConversations();
    }, []);

    return {success, loading, conversations };
};
export default useGetConversations;
