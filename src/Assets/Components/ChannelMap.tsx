import React, { useState } from 'react'
import { useEssentials } from '../../Functions/CommonFunctions'
import Preloader from "./Preloader";
import { Channel } from '../../Store/UserStore/Video-Management/Interfaces';

const ChannelMap: React.FC<{ user: Channel[] }> = ({ user }) => {
    const [show, setShow] = useState<boolean>(false)
    const { navigate, auth, profile } = useEssentials()
    const { loading } = auth
    const { loadingProfile } = profile
    return (
        <div className='mt-4 float-left text-white'>
            {loading || loadingProfile ? (
                <Preloader />
            ) : <></>}
            {user.length > 0 && user.map((user, index) => (
                <>
                    {show || index < 5 && (
                        <div onClick={() => navigate(`/channel/${user._id}`)} className="w-[80%] ml-[10%] py-2 border-t-2  flex float-left">
                            <div  onClick={() => navigate(`/channel/${user._id}`)} className='w-[10%] cursor-pointer float-left'>
                                <img crossOrigin="anonymous" src={user.Logo} className=' aspect-square float-left rounded-full' />
                            </div>
                            <div onClick={() => navigate(`/channel/${user._id}`)} style={{ overflowX: 'scroll', WebkitOverflowScrolling: 'touch', scrollbarWidth: 'none' }} className="w-full cursor-pointer float-left ml-10 overflow-x-scroll">
                                <p className='mt-2 font-semibold'>{user.Name}</p>
                            </div>
                        </div>
                    )}
                </>
            ))}
            {user.length > 0 && (
                <center><button onClick={() => setShow(true)} className='text-black mt-5 ml-5 p-1 px-3 bg-blue-700 font-semibold'>More <i className='fa fa-angle-right ml-2'></i><i className='fa fa-angle-right'></i> </button></center>
            )}
        </div>
    )
}

export default ChannelMap