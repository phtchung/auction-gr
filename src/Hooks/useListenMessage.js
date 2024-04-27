import { useEffect } from "react";
import {useSocketContext} from "../Pages/Context/SocketContext.jsx";
import useConversation from "../zustand/useConversation.js";

const useListenMessage = () => {
    const { socket } = useSocketContext();
    const { messages, setMessages } = useConversation();

    useEffect(() => {
        socket?.on("newMessage", (newMessage) => {
            newMessage.shouldShake = true;
            setMessages([...messages, newMessage]);
        });
        return () => socket?.off("newMessage");
    }, [socket, setMessages, messages]);
};
export default useListenMessage;
