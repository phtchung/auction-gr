import { create } from "zustand";

const useAuctionOnlineTracking = create((set) => ({
    selectedAuction: null,
    setSelectedAuction: (selectedAuction) => set({ selectedAuction }),
    bidList: [],
    setBidList: (bidList) => set({ bidList }),
    highestPrice : null,
    setHighestPrice : (highestPrice) => set({ highestPrice }),
}));

export default useAuctionOnlineTracking;
