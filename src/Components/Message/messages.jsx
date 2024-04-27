import Message from "./message.jsx";
import useConversation from "../../zustand/useConversation.js";
import {useEffect, useRef, useState} from "react";
import {toast} from "react-toastify";
import {sendMessage} from "../../Services/messageService.jsx";
import useGetMessages from "./useGetMessages.jsx";
import useListenMessage from "../../Hooks/useListenMessage.js";
import {Avatar} from "antd";
import {UserOutlined} from "@ant-design/icons";

const Messages = () => {
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const {messages, setMessages, selectedConversation, setSelectedConversation , listConversation,setListConversation} = useConversation();
    useListenMessage()
    const {messagesData, loadingMessages, success} = useGetMessages();
    const lastMessageRef = useRef();
    useEffect(() => {
        setTimeout(() => {
            lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
        }, 100);
    }, [messagesData]);

    const handleSubmit = async () => {
        if (!message) return;
        setLoading(true);
        try {
            const res = await sendMessage({message}, selectedConversation._id);
            const data = res.data
            if (data.error) throw new Error(data.error);

             listConversation.map(item => {
                    if (item._id.toString() === data.receiverId.toString()) {
                        item.lastM = data
                    }
                    return item
            });
            setMessages([...messages, data]);
            setListConversation(listConversation)
        } catch (error) {
            toast.error(error?.response?.data?.message, {
                position: "top-right",
            });
        } finally {
            setLoading(false);
        }
        setMessage("");
    };

    return (
        <>
            {/*// <!-- Right -->*/}
            <div className="relative flex flex-1 flex-col" style={{maxHeight: '29.3rem', height: '29.3rem'}}>
                {/*// <!-- Header Message  -->*/}
                {
                    loadingMessages ?
                        <span className="animate-spin"></span>
                        :
                        <>
                            {
                                success && <>
                                    <div className="p-1.5 bg-grey-lighter flex flex-row justify-between items-center">
                                        <div className="flex gap-2 items-center">
                                            <div>
                                                {
                                                    selectedConversation.avatar ?
                                                        <img className="w-6 h-6 rounded-full" alt='avatar'
                                                             src={selectedConversation.avatar}/>
                                                        :
                                                        <Avatar size='small' style={{width:24,height:24 }} icon={<UserOutlined/>}/>
                                                }
                                            </div>
                                            <div>
                                                <p className="text-grey-darkest text-sm">
                                                    {selectedConversation.username}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="ml-6 cursor-pointer">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24"
                                                 height="24">
                                                <path fill="#263238" fillOpacity=".6"
                                                      d="M12 7a2 2 0 1 0-.001-4.001A2 2 0 0 0 12 7zm0 2a2 2 0 1 0-.001 3.999A2 2 0 0 0 12 9zm0 6a2 2 0 1 0-.001 3.999A2 2 0 0 0 12 15z"></path>
                                            </svg>
                                        </div>
                                    </div>

                                    <div className="relative flex-1 overflow-auto" style={{
                                        backgroundColor: messagesData.length === 0 ? "#f6f6f6" : "#e8e8e8",
                                        maxHeight: '22.8rem'
                                    }}>
                                        {messagesData.length > 0 ? (
                                            messagesData.map((message, index) => (
                                                <div key={index} ref={lastMessageRef}>
                                                    <Message message={message}/>
                                                </div>
                                            ))
                                        ) : (
                                            <Message message={null}/>
                                        )}
                                    </div>


                                    {/*// <!-- Input -->*/}
                                    <div onKeyDown={(e) => {
                                        if (e.key === "Enter") {
                                            handleSubmit();
                                        }
                                    }}
                                         className="bg-white flex flex-col" style={{height: '4.2rem'}}>
                                        <textarea
                                            value={message}
                                            onChange={(e) => setMessage(e.target.value)}
                                            placeholder='Nhập nội dung tin nhắn'
                                            className="w-full row-2 resize-none focus:outline-none text-sm flex-1 overflow-y-auto  px-2 py-2"
                                        />

                                        <div className="ml-auto cursor-pointer  flex justify-end mx-3 pb-1"
                                             onClick={handleSubmit}
                                        >
                                            <svg style={{color: !message ? '#ccc' : '#EA580C'}} viewBox="0 0 24 24"
                                                 xmlns="http://www.w3.org/2000/svg"
                                                 className="chat-icon h-5 w-5 fill-current">
                                                <path
                                                    d="M4 14.497v3.724L18.409 12 4 5.779v3.718l10 2.5-10 2.5zM2.698 3.038l18.63 8.044a1 1 0 010 1.836l-18.63
                                8.044a.5.5 0 01-.698-.46V3.498a.5.5 0 01.698-.459z"></path>
                                            </svg>

                                        </div>
                                    </div>
                                </>
                            }
                        </>
                }
            </div>
        </>
    )
}

export default Messages
