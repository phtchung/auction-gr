import {createContext, useState, useEffect, useContext} from "react";
import io from "socket.io-client";
import {useAuthContext} from "./AuthContext.jsx";
import useAuctionOnlineTracking from "../../zustand/useAuctionOnlineTracking.jsx";

const SocketContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useSocketContext = () => {
    return useContext(SocketContext);
};

export const SocketContextProvider = ({children}) => {
    const [socket, setSocket] = useState(null);
    const {currentUser} = useAuthContext();
    const {selectedAuction} = useAuctionOnlineTracking()

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

    return <SocketContext.Provider value={{socket}}>{children}</SocketContext.Provider>;
};
