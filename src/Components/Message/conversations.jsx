import useGetConversations from "./useGetConversations.jsx";
import ConversationItem from "./conversationItem.jsx";
import {Spin} from "antd";
import {useState} from "react";

const Conversations = () => {
    const {loading, success, conversations} = useGetConversations()
    const [filter, setFilter] = useState('');

    const handleFilterChange = (e) => {
        setFilter(e.target.value);
    };

    const filteredConversations = conversations.filter((product) =>
        product.username.toLowerCase().includes(filter.toLowerCase())
    );

    return (
        <>
            {
                loading ?
                    <>
                        <Spin tip="Loading" className="text-center ml-20  mt-40">
                        </Spin>
                    </>
                    :
                    <>
                        <div className="border-r  flex flex-col"
                             style={{maxHeight: '29.3rem', height: '29.3rem'}}>
                            {/*// <!-- Search -->*/}
                            <div className="py-2 px-2 bg-grey-lightest">
                                <input type="text"
                                       value={filter}
                                       onChange={handleFilterChange}
                                       className="w-full border border-orange-500  focus:outline-orange-300 px-2 py-2 text-sm"
                                       placeholder="Tìm kiếm"/>
                            </div>

                            {/*// <!-- Contacts -->*/}
                            <div className="bg-white flex-1 relative  overflow-y-auto ">
                                {
                                    success && filteredConversations.length > 0 ?
                                        (filteredConversations.map((conversation, index) => (
                                                <>
                                                    <ConversationItem
                                                        key={index}
                                                        conversation={conversation}
                                                    ></ConversationItem>

                                                </>
                                            )
                                        ))
                                        :
                                        <>
                                            <p className="top-1/2 left-6 text-base  -translate-y-0.5 absolute">Không tìm
                                                thấy người dùng</p>
                                        </>
                                }
                            </div>
                        </div>
                    </>
            }
        </>
    )
}

export default Conversations
