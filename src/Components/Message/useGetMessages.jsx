import { useEffect, useState } from "react";
import useConversation from "../../zustand/useConversation.js";
import {toast} from "react-toastify";
import {getFullMessages} from "../../Services/messageService.jsx";

const useGetMessages = () => {
    const [loading, setLoading] = useState(false);
    const { messages, setMessages, selectedConversation } = useConversation();
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        const getMessages = async () => {
            setLoading(true);
            try {
                const res = await getFullMessages(selectedConversation._id);
                const data = res.data;
                if (data.error) {
                    throw new Error(data.error);
                }
                setMessages(data);
            } catch (error) {
                toast.error(error.message);
            } finally {
                setLoading(false);
                setSuccess(true)
            }
        };

        if (selectedConversation?._id) getMessages();
    }, [selectedConversation?._id, setMessages]);

    return { messagesData : messages , loadingMessages : loading , success };
};
export default useGetMessages;
