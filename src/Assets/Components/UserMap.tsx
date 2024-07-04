import React from 'react'
import { User } from '../../Store/UserStore/Authentication/Interfaces'
import { useEssentials } from '../../Functions/CommonFunctions'
import Preloader from "./Preloader";

const UserMap: React.FC<{ user: User[] }> = ({ user }) => {
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
                    {index < 5 && (
                        <div onClick={() => navigate(`/profile/${user.ProfileLink}`)} className="w-[80%] ml-[10%] py-2 border-t-2  flex float-left">
                            <div  onClick={() => navigate(`/profile/${user.ProfileLink}`)} className='w-[10%] cursor-pointer float-left'>
                                <img src={user.Profile} className=' aspect-square float-left rounded-full' />
                            </div>
                            <div onClick={() => navigate(`/profile/${user.ProfileLink}`)} style={{ overflowX: 'scroll', WebkitOverflowScrolling: 'touch', scrollbarWidth: 'none' }} className="w-full cursor-pointer float-left ml-10 overflow-x-scroll">
                                <p className=' mt-2 font-semibold'>{user.Username}</p>
                            </div>
                        </div>
                    )}
                </>
            ))}
        </div>
    )
}

export default UserMap