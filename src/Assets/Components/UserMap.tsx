import React, { useState } from 'react'
import { User } from '../../Store/UserStore/Authentication/Interfaces'
import { useNavigate } from 'react-router-dom'
const UserMap: React.FC<{ user: User[] }> = ({ user }) => {
    const [show, setShow] = useState<boolean>(false)
    const navigate = useNavigate()
    return (
        <div className='mt-4 float-left'>
            {user.length > 0 && user.map((user, index) => (
                <>
                    {show || index < 5 && (
                        <div onClick={() => navigate(`/profile/${user.ProfileLink}`)} className="min-w-full p-2 border-t-2 flex float-left">
                            <div onClick={() => navigate(`/profile/${user.ProfileLink}`)} className='w-[10%] float-left'>
                                <img src={user.Profile} className=' aspect-square float-left rounded-full' />
                            </div>
                            <div onClick={() => navigate(`/profile/${user.ProfileLink}`)} style={{ overflowX: 'scroll', WebkitOverflowScrolling: 'touch', scrollbarWidth: 'none' }} className="w-full float-left ml-10 overflow-x-scroll">
                                <p className='text-gray-900 mt-2 font-semibold'>{user.Username}</p>
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

export default UserMap