import React, { useRef } from 'react'
import { useEffect, useState } from 'react'
import fction from '../../WebPush'
import { useSocket } from '../../Socket'
import { getCookie, useEssentials } from '../../Functions/CommonFunctions'
import { getNotifications } from '../../Store/UserStore/CommonManagements/CommonService'
import { Notification as Notify } from '../../Store/UserStore/Authentication/Interfaces'
import InfiniteScroll from 'react-infinite-scroll-component'
import ChatLoader from '../Chat/ChatLoader'

const Notification: React.FC<{ close: any }> = ({ close }) => {
  const [allow, setAllow] = useState(false)
  const socket = useSocket()
  const skipRef = useRef(0)
  const { auth, navigate } = useEssentials()
  const notificationRef = useRef(true)
  const [notifications, setNots] = useState<Notify[]>([])
  const getAllowed = async () => {
    const response: any = await fction(false)
    console.log(response)
    if (response && socket && auth.user) {
      socket?.emit("allowed", auth.user._id, response.endpoint)
    }
  }
  const getNotify = async (token: string) => {
    try {
      const response = await getNotifications({ token, key: skipRef.current.toString() })
      if (response.status === 202) navigate("/login");
      console.log(response)
      if (!response?.notifications || !response.notifications?.messages) {
        return notificationRef.current = false
      }
      if (response.notifications && response.notifications.messages) {
        setNots(prev => [...prev, ...response.notifications.messages])
      }
    } catch (e) {
      console.log(e)
    }
  }
  useEffect(() => {
    const token = getCookie("token")
    if (socket && token) {
      getAllowed()
      getNotify(token)
    } else if (!token) navigate("/login")
  }, [socket])
  const disAllow = async () => {
    const response: any = await fction(false)
    if (response && socket && auth.user && allow) {
      socket?.emit("disallow", auth.user._id, response.endpoint)
      setAllow(false)
    } else if (response && auth.user && !allow) {
      socket?.emit("allow", auth.user._id, response.endpoint)
      setAllow(true)
    }
  }
  const clear = () => {
    socket?.emit("emptyMsg", auth.user?._id)
    setNots([])
  }
  useEffect(() => {
    socket?.on("allow_notification", ({ send }: { send: boolean }) => {
      console.log(send)
      setAllow(send)
    })
  }, [socket])
  const setSkip = async () => {
    skipRef.current += 25
    const token = getCookie("token")
    if (token) {
      await getNotify(token)
    } else navigate("/login")
  }
  return (
    <div className='w-full border-2 p-2 border-gray-400 h-full'>
      <div className='w-full h-[40px] flex justify-between'>
        <button className='bg-blue-600 px-4 rounded-full h-8 text-white text-sm font-semibold' onClick={disAllow} ><i className='fa fa-bell'></i> {allow ? "Disallow" : "Allow"} </button>
        <button className='bg-red-600 px-4 flex gap-4 items-center justify-center rounded-full h-8 text-white text-sm font-semibold' onClick={clear} ><i className='fa fa-trash'></i>Clear</button>
        <button className='bg-red-600 w-8 flex items-center justify-center rounded-full h-8 text-white text-sm font-semibold' onClick={close} ><i className='fa fa-times'></i></button>
      </div>
      <div style={{ scrollbarWidth: "none", WebkitOverflowScrolling: "touch" }} className='w-full h-[90%] mt-2 overflow-y-scroll'>
        <InfiniteScroll
          dataLength={notifications.length}
          hasMore={notificationRef.current}
          loader={notificationRef.current && <ChatLoader />}
          next={setSkip}
        >
          {notifications && notifications.length > 0 && notifications.map((msg) => (
            <><div className='w-full py-1'>
              <div className='w-full h-[50px] bg-gray-900 text-gray-400 hover:bg-slate-700 hover:text-white animate-popup hover:animate-popup'>
                <div className='flex w-full h-full px-4 items-center justify-between'>
                  <div className='w-10 h-10 rounded-full flex-shrink-0'>
                    <img src={msg.Link} className='w-10 h-10 rounded-full object-center' alt="" />
                  </div>
                  <div className='w-full px-4 justify-end text-sm font-semibold'>
                    {msg.Message}
                  </div>
                </div>
              </div>
            </div></>
          ))}
        </InfiniteScroll>
        <div className='w-full h-full flex items-center justify-center '>
          <span className='text-white font-semibold text-sm'><i className='fa fa-bell'> No More Notifications</i></span>
        </div>
      </div>
    </div>
  )
}

export default Notification