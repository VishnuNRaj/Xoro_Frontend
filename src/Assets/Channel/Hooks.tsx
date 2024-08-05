import { useEffect, useState } from "react"
import { Channel } from "../../Store/UserStore/Video-Management/Interfaces"
import { getCookie, useEssentials } from "../../Functions/CommonFunctions"
import { useParams } from "react-router-dom"
import { getChannel } from "../../Store/UserStore/ProfileManagement/ProfileSlice"
import { setUser } from "../../Store/UserStore/Authentication/AuthSlice"
import { toast } from "sonner"

export const useChannel = () => {
    const [channel, setChannel] = useState<Channel | null>(null)
    const [subs, setSubs] = useState(0)
    const [subscribe, setSubscribe] = useState(false)
    const [own, setOwn] = useState(false)
    const { id } = useParams()
    const { dispatch, navigate, auth } = useEssentials()
    useEffect(() => {
        const token = getCookie("token");
        if (token) {
            dispatch(getChannel({ token, id })).then(({ payload }: any) => {
                console.log(payload)
                if (!payload.user) return navigate('/login');
                if (!auth.user) dispatch(setUser(payload.user))
                if (!payload.channel) {
                    toast.error(payload.message);
                    // return navigate(-1)
                }
                setChannel(payload.channel)
                setSubs(payload.channel.Subsribers.length)
                setSubscribe(payload.channel.Subsribers.includes(payload.user._id))
                setOwn(payload.user._id === payload.channel.UserId)
            })
        }
    }, [])
    return { channel, subscribe, subs, own }
}