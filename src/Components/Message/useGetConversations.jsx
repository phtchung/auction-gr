import { useEffect, useState } from "react";
import {getUsersChatSideBar} from "../../Services/messageService.jsx";
import useConversation from "../../zustand/useConversation.js";

const useGetConversations = () => {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const {listConversation , setListConversation } = useConversation()
    useEffect(() => {
        const getConversations = async () => {
            setLoading(true);
            try {
                const res = await getUsersChatSideBar()
                const data = res.data;
                if (data.error) {
                    throw new Error(data.error);
                }
                setListConversation(data);
            } catch (error) {
                console.log('a')
            } finally {
                setLoading(false);
                setSuccess(true)
            }
        };

        getConversations();
    }, []);

    return {success, loading, conversations : listConversation };
};
export default useGetConversations;
