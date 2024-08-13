import { useEffect, useState } from "react"
import { Channel } from "../../Store/UserStore/Video-Management/Interfaces"
import { getCookie, useEssentials } from "../../Functions/CommonFunctions"
import { useParams } from "react-router-dom"
import { getChannel } from "../../Store/UserStore/ProfileManagement/ProfileSlice"
import { setUser } from "../../Store/UserStore/Authentication/AuthSlice"
import { toast } from "sonner"
import { useSocket } from "../../Socket"

export const useChannel = () => {
    const [channel, setChannel] = useState<Channel | null>(null)
    const [subs, setSubs] = useState(0);
    const socket = useSocket();
    const [subscribe, setSubscribe] = useState(false)
    const [own, setOwn] = useState(false)
    const { id } = useParams()
    const { dispatch, navigate, auth } = useEssentials()
    const [state, setState] = useState<"live" | "shorts" | "videos">("live")
    const editState = (state: "live" | "shorts" | "videos") => setState(state);
    const getChannelData = () => {
        const token = getCookie("token");
        if (token) {
            dispatch(getChannel({ token, id })).then(({ payload }: any) => {
                console.log(payload)
                if (!payload.user) return navigate('/login');
                if (!auth.user) dispatch(setUser(payload.user))
                if (!payload.channel) {
                    toast.error(payload.message);
                    return navigate(-1)
                }
                setChannel(payload.channel)
                setSubs(payload.channel.Subsribers.length)
                setSubscribe(payload.channel.Subsribers.includes(payload.user._id))
                setOwn(payload.user._id === payload.channel.UserId)
            })
        }
    }
    useEffect(() => {
        getChannelData()
    }, [])
    const handleSubscribe = () => {
        if (auth.user && channel) {
            socket?.emit("subscribeChannel", auth.user._id, channel._id)
            setSubs(prev => prev + 1)
            return setSubscribe(true)
        } else return
    }
    const handleUnSubscribe = () => {
        if (auth.user && channel) {
            socket?.emit("unsubscribeChannel", auth.user._id, channel._id)
            setSubs(prev => prev - 1)
            return setSubscribe(false)
        } else return
    }
    return { channel, subscribe, subs, own, handleSubscribe, handleUnSubscribe, editState,state }
}