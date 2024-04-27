import { useEffect } from "react";
import {useSocketContext} from "../Pages/Context/SocketContext.jsx";
import useConversation from "../zustand/useConversation.js";

const useListenMessage = () => {
    const { socket } = useSocketContext();
    const { messages, setMessages , listConversation, setListConversation, selectedConversation } = useConversation();

    useEffect(() => {
        socket?.on("newMessage", (newMessage) => {
            newMessage.shouldShake = true;

            if(selectedConversation._id.toString() === newMessage.senderId.toString()){
                setMessages([...messages, newMessage]);
            }
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
            setListConversation(listConversation)
        });
        return () => socket?.off("newMessage");
    }, [socket, setMessages, messages,setListConversation,listConversation]);
};
export default useListenMessage;
