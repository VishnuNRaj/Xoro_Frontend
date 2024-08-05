import React from 'react'
import { useChannel } from './Hooks'
import { Toaster } from 'sonner'

const UserChannel: React.FC = () => {
    const { } = useChannel()
    return (
        <div>
            <Toaster richColors position='top-right' duration={1500} />
            UserChannel
        </div>
    )
}

export default UserChannel