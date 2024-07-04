import React, { useState, SetStateAction } from 'react'
import { Connections, User } from '../../Store/UserStore/Authentication/Interfaces';
import { Dialog } from "@material-tailwind/react"
import { useConnections } from './Hooks';
import { useEssentials } from '../../Functions/CommonFunctions';
interface props {
    open: boolean;
    setOpen: React.Dispatch<SetStateAction<boolean>>
    connections: Connections;
    setConnection: React.Dispatch<SetStateAction<Connections | null>>
}
interface buttonProps {
    show: "follow" | "following" | "mutual";
    setShow: React.Dispatch<SetStateAction<"follow" | "following" | "mutual">>;
    value: "follow" | "following" | "mutual";
    text: string;
}
const Buttons: React.FC<buttonProps> = ({ value, setShow, show, text }) => {
    return (
        <div className='w-full'>
            <button onClick={() => setShow(value)} className={`${show === value ? "bg-blue-700  hover:bg-blue-900 text-white" : "bg-transparent hover:bg-gray-700 text-gray-400"} w-full flex items-center p-2 px-3 justify-center`}>{text}</button>
        </div>
    )
}
const UserMap: React.FC<{ user: User, show: "follow" | "following" | "mutual" }> = ({ user }) => {
    const { navigate } = useEssentials()
    return (
        <div onClick={() => navigate(`/profile/${user.ProfileLink}`)} className='w-full flex'>
            <div className=' rounded-full flex-shrink-0 items-center justify-center border-1'>
                <img src={user.Profile} alt="" className='w-6 h-6 rounded-full object-cover' />
            </div>
            <div className='ml-3'>
                <p className=''>{user.Name}</p>
            </div>
        </div>
    )
}
const ShowConnections: React.FC<props> = ({ open, connections, setOpen, setConnection }) => {
    const [show, setShow] = useState<"follow" | "following" | "mutual">("follow")
    const { unfollowUserHook, followUserHook, RemovefollowUserHook } = useConnections()
    const arr: { text: string, value: "follow" | "following" | "mutual" }[] = [
        {
            text: "Followers",
            value: "follow"
        },
        {
            text: "Following",
            value: "following"
        },
        {
            text: "Mutual",
            value: "mutual"
        }
    ]
    return (
        <div>
            <Dialog
                className='animate-slideInFromLeft h-[280px] w-[100px] border-blue-700 border-2 bg-[#111] bg-opacity-60'
                size='xs'
                open={open}
                handler={() => setOpen(false)}
                placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}    >
                <div className='flex-shrink-0'>
                    <div className='w-full h-[50px] text-md font-semibold bg-gray-800 grid grid-cols-3'>
                        {arr.map((values) => (
                            <Buttons setShow={setShow} show={show} value={values.value} text={values.text} />
                        ))}
                    </div>
                    <div className='w-full p-2'>
                        <div className='w-full border-y border-y-gray-600 grid grid-cols-1'>
                            {connections[show]?.map((userData) => (
                                <div className='w-full font-semibold border-y border-y-gray-600 bg-gray-800 h-10 p-6 hover:bg-gray-600 hover:text-white text-gray-300 flex items-center'>
                                    <UserMap user={userData} show={show} />
                                    {show === "follow" && (
                                        <div className='right-10 mr-2'>
                                            <button onClick={async () => {
                                                const response = connections.mutual.find((val) => val._id === userData._id)
                                                let newData = { ...connections }
                                                if (response) {
                                                    await unfollowUserHook(userData._id)
                                                    newData = { ...connections, following: connections.following?.filter((val) => val._id !== userData._id), mutual: connections.mutual?.filter((val) => val._id !== userData._id) }
                                                } else if (!response && connections.following && connections.mutual) {
                                                    await followUserHook(userData._id)
                                                    newData = { ...connections, following: [...connections.following, userData], mutual: [...connections?.mutual, userData] }
                                                }
                                                setConnection(newData)
                                            }} className='bg-blue-600 w-28 hover:bg-blue-700 rounded-full p-1 px-3'>{!connections.mutual.find((val) => val._id === userData._id) ? "Follow" : "Following"}</button>
                                        </div>
                                    )}
                                    {show === "follow" || show === "mutual" ? (
                                        <div className='right-10 mr-2'>
                                            <button onClick={async () => {
                                                await RemovefollowUserHook(userData._id)
                                                const newData = { ...connections, follow: connections.follow?.filter((val) => val._id !== userData._id), mutual: connections.mutual?.filter((val) => val._id !== userData._id) }
                                                setConnection(newData)
                                            }} className='bg-red-600 rounded-full p-1 px-3'>Remove</button>
                                        </div>
                                    ) : <></>}
                                    {show === "following" && (
                                        <div className='right-10'>
                                            <button onClick={async () => {
                                                await unfollowUserHook(userData._id)
                                                const newData = { ...connections, following: connections.following?.filter((val) => val._id !== userData._id), mutual: connections.mutual?.filter((val) => val._id !== userData._id) }
                                                setConnection(newData)
                                            }} className='bg-red-600 rounded-full p-1 px-3'>Unfollow</button>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

            </Dialog>
        </div>
    )
}

export default ShowConnections