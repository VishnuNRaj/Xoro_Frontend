import React from 'react'
import { User } from '../../Store/UserStore/Authentication/Interfaces'
import UserMap from '../Components/UserMap';
interface props {
    users: User[];
}
const Recommendations: React.FC<props> = ({ users }) => {
    return (
        <div className='bg-black bg-opacity-50'>
            {users.length > 0 && <UserMap user={users} />}
        </div>
    )
}

export default Recommendations