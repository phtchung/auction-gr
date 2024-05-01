import { useEffect } from "react";
import {useSocketContext} from "../Pages/Context/SocketContext.jsx";
import useConversation from "../zustand/useConversation.js";

const useListenMessage = () => {
    const { socket1 } = useSocketContext();
    const { messages, setMessages , listConversation, setListConversation, selectedConversation,unReadCount,setUnreadCount } = useConversation();

    useEffect(() => {
        socket1?.on("newMessage", (newMessage) => {
            newMessage.shouldShake = true;
            console.log('',newMessage)
            if(selectedConversation._id.toString() === newMessage.senderId.toString() ){
                setMessages([...messages, newMessage]);
            }

            // const isNewConversation  = listConversation.some(conversation => conversation._id === newMessage.lastM.senderId);
            // if(!isNewConversation){
            //     setListConversation([...listConversation,])
            // }
            listConversation.map(item => {
                if (item._id.toString() === newMessage.senderId.toString()) {
                    item.lastM = newMessage
                }
                if (item._id.toString() === selectedConversation._id.toString()) {
                    item.unReadM = 0
                }else if(item._id.toString() === newMessage.senderId.toString()){
                    item.unReadM += 1
                }
                return item
            });
            listConversation.sort((a, b) => {
                return new Date(b.lastM.createdAt) - new Date(a.lastM.createdAt);
            });
            setUnreadCount(unReadCount + newMessage.unReadM)
            setListConversation(listConversation)

        });
        return () => socket1?.off("newMessage");
    }, [socket1, setMessages, messages,setListConversation,listConversation]);
};
export default useListenMessage;
