import { create } from "zustand";

const useConversation = create((set) => ({
    selectedConversation: null,
    setSelectedConversation: (selectedConversation) => set({ selectedConversation }),
    messages: [],
    setMessages: (messages) => set({ messages }),
    listConversation : [],
    setListConversation: (listConversation) => set({ listConversation }),
    openChat:false,
    setOpenChat: (openChat) => set({ openChat }),
    unReadCount:0,
    setUnreadCount : (unReadCount) => set({ unReadCount }),
}));

export default useConversation;
