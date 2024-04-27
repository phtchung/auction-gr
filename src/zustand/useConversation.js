import { create } from "zustand";

const useConversation = create((set) => ({
    selectedConversation: null,
    setSelectedConversation: (selectedConversation) => set({ selectedConversation }),
    messages: [],
    setMessages: (messages) => set({ messages }),
    listConversation : [],
    setListConversation: (listConversation) => set({ listConversation }),

}));

export default useConversation;
