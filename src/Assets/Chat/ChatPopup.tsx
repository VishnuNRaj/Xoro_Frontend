import React from 'react'
import { Popup } from 'reactjs-popup'
import ChatWindow from './ChatWindow';
import { useEssentials } from '../../Functions/CommonFunctions';
import ChatComponent from './ChatComponent';
import { setChat } from '../../Store/UserStore/Chat-Management/ChatSlice';

interface chatInterface {
  chatWindow: boolean;
  setChatWindow: React.Dispatch<React.SetStateAction<boolean>>
}

const ChatPopup: React.FC<chatInterface> = ({ chatWindow, setChatWindow }) => {
  const {chat,dispatch} = useEssentials()
  const closeChat = (value:boolean) => {
    dispatch(setChat(null))
    setChatWindow(value)
  }
  // const [chat, setChat] = useState<User | null>(null)
  return (
    <Popup trigger={<button></button>} position={'right top'} open={chatWindow} onClose={() => setChatWindow(false)}>
      {!chat.chat && <ChatWindow close={closeChat} />}
      {chat.chat && <ChatComponent close={closeChat} />}
    </Popup>
  )
}

export default ChatPopup