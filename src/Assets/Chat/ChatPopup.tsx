import React, { useState } from 'react'
import { Popup } from 'reactjs-popup'
import ChatWindow from './ChatWindow';
import { User } from '../../Store/UserStore/Authentication/Interfaces';
import ChatComponent from './ChatComponent';

interface chatInterface {
  chatWindow: boolean;
  setChatWindow: React.Dispatch<React.SetStateAction<boolean>>
}

const ChatPopup: React.FC<chatInterface> = ({ chatWindow, setChatWindow }) => {
  const [chat, setChat] = useState<User | null>(null)
  return (
    <Popup trigger={<button></button>} position={'right top'} open={chatWindow} onClose={() => setChatWindow(false)}>
      {!chat && <ChatWindow setChat={setChat} />}
      {/* {!chat && <ChatComponent setChat={setChat} />} */}
    </Popup>
  )
}

export default ChatPopup