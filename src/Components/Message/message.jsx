import {useAuthContext} from "../../Pages/Context/AuthContext.jsx";
import useConversation from "../../zustand/useConversation.js";
import {formatDateTimeChat} from "../../Utils/constant.js";

const Message = ({message}) => {
    const { currentUser } = useAuthContext();
    const { selectedConversation } = useConversation();
    const fromMe = message?.senderId === currentUser.id;
    const formattedTime = formatDateTimeChat(message?.createdAt);
    const chatClassName = fromMe ? "message-send" : "message-receive";
    const bubbleBgColor = fromMe ? "bg-send" : "bg-receive";

  return(
      <>
          {/*// <!-- Messages -->*/}
              {
                  message !== null ?
                      <>
                          <div className=" px-3">
                              <div className="flex justify-center mb-0.5">
                              </div>

                              <div className={chatClassName}>
                                  <div className={`rounded-md py-2 px-3 ${bubbleBgColor}`}>
                                      <p className="text-sm text-left mt-1">
                                          {message.message}
                                      </p>
                                      <p className="text-right text-xs text-grey-dark ">
                                          {formattedTime}
                                      </p>
                                  </div>
                              </div>

                          </div>
                      </>
                      :
                      <>
                          <p className='text-center top-1/2 absolute left-2/5 -translate-y-1/2 translate-x-24 text-sm'>Gửi tin nhắn để bắt đầu cuộc hội thoại </p>
                      </>
              }
      </>
  )
}
export default Message
