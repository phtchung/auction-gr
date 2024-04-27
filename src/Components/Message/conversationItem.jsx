import {Avatar} from "antd";
import {UserOutlined} from "@ant-design/icons";
import useConversation from "../../zustand/useConversation.js";
import {formatDateTimeChat} from "../../Utils/constant.js";

const ConversationItem = ({conversation}) => {
    const { selectedConversation, setSelectedConversation} = useConversation();
    const isSelected = selectedConversation?._id === conversation._id;

  return(
      <>
          <div className={`p-3 flex gap-1  ${isSelected ? "bg-gray-200" : "hover:bg-gray-100"}  items-center cursor-pointer`}
               onClick={() => setSelectedConversation(conversation)}>
          <div>
                  {
                      conversation.avatar ?
                          <img className="h-9 w-9 rounded-full" alt='avatar'
                               src={conversation.avatar}/>
                          :
                          <Avatar icon={<UserOutlined/>}/>
                  }
              </div>
              <div className="flex-1 p-0.5">
                  <div className="flex items-center mb-0.5 justify-between">
                      <p className="text-sm overflow_css_w_120 text-left  font-semibold"
                         style={{color: '#333333'}}>
                          {conversation?.username}
                      </p>
                      <p className="text-xs text-gray-700">
                          {formatDateTimeChat(conversation.lastM.createdAt)}

                      </p>
                  </div>
                  <p className="text-gray-500 text-left text-sm overflow_css_w_158">
                      {conversation.lastM.message}
                      {/*{selectedConversation && messages ? messages[messages.length-1].message : ''}*/}
                  </p>
              </div>
          </div>
      </>
  )
}
export default ConversationItem
