import {useEffect} from "react";
import {useSocketContext} from "../Pages/Context/SocketContext.jsx";
import useAuctionOnlineTracking from "../zustand/useAuctionOnlineTracking.jsx";

const useListenBidding = () => {
    const {socket} = useSocketContext();
    const {selectedAuction, setBidList, bidList, setHighestPrice} = useAuctionOnlineTracking()

    useEffect(() => {
        socket?.on("auction", (newBid) => {
            setBidList([newBid, ...bidList]);
            setHighestPrice(newBid.bid_price)
        });

        return () => socket?.off("auction");
    }, [socket, setBidList, bidList]);
};
export default useListenBidding;
