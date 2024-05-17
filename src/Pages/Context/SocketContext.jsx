import {createContext, useState, useEffect, useContext} from "react";
import io from "socket.io-client";
import {useAuthContext} from "./AuthContext.jsx";
import useAuctionOnlineTracking from "../../zustand/useAuctionOnlineTracking.jsx";
import useConversation from "../../zustand/useConversation.js";

const SocketContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useSocketContext = () => {
    return useContext(SocketContext);
};

export const SocketContextProvider = ({children}) => {
    const [socket, setSocket] = useState(null);
    const [socket1, setSocket1] = useState(null);
    const {currentUser} = useAuthContext();
    const {selectedAuction} = useAuctionOnlineTracking()
    const {openChat, setOpenChat} = useConversation();


    useEffect(() => {
        if (currentUser) {
            if (selectedAuction) {
                const socket = io(`http://localhost:8088/auction/${selectedAuction}`, {
                    query: {
                        userId: currentUser.id,
                    },
                });
                setSocket(socket);

                return () => socket.close();
            } else {
                if (socket) {
                    socket.close();
                    setSocket(null);
                }
            }
        }
    }, [currentUser, selectedAuction]);

    useEffect(() => {
        if (currentUser && openChat) {
            const socket1 = io('http://localhost:8088', {
                    query: {
                        userId: currentUser.id,
                    },
                });
                setSocket1(socket1);

                return () => socket1.close();
            } else {
                if (socket1) {
                    socket1.close();
                    setSocket1(null);
                }
            }
    }, [currentUser,openChat]);

    return <SocketContext.Provider value={{socket , socket1}}>{children}</SocketContext.Provider>;
};
