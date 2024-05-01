import { useEffect, useState } from "react";
import {getUsersChatSideBar} from "../../Services/messageService.jsx";
import useConversation from "../../zustand/useConversation.js";

const useGetConversations = () => {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const {listConversation , setListConversation, openChat , setOpenChat,unReadCount,setUnreadCount } = useConversation()
    useEffect(() => {
        const getConversations = async () => {
            setLoading(true);
            try {
                const res = await getUsersChatSideBar()
                const data = res.data;
                if (data.error) {
                    throw new Error(data.error);
                }
                data.sort((a, b) => {
                    return new Date(b.lastM.createdAt) - new Date(a.lastM.createdAt);
                });
                setListConversation(data);
                let unRCount = 0
                data.map((conver) => {
                    unRCount  +=  conver.unReadM
                })
                setUnreadCount(unRCount)
            } catch (error) {
                console.log('a')
            } finally {
                setLoading(false);
                setSuccess(true)
            }
        };

         getConversations();
    }, [openChat,setListConversation,setUnreadCount]);

    return {success, loading, conversations : listConversation };
};
export default useGetConversations;
