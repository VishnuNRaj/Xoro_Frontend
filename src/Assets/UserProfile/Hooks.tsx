import { useEssentials,getCookie } from "../../Functions/CommonFunctions"
import { unfollowUser,followUser, RemovefollowUser} from "../../Store/UserStore/ProfileManagement/ProfileSlice"

export const useConnections = () => {
    const { navigate, dispatch } = useEssentials()
    const unfollowUserHook: Function = async (UserId:string):Promise<any> => {
        const token = getCookie("token")
        dispatch(unfollowUser({token,UserId})).then(({payload}:any)=>{
            if(payload.status === 202) navigate("/login")
            return true;
        })
    }
    const followUserHook: Function = async (UserId:string):Promise<any> => {
        const token = getCookie("token")
        dispatch(followUser({token,UserId})).then(({payload}:any)=>{
            if(payload.status === 202) navigate("/login")
            return true;
        })
    }
    const RemovefollowUserHook: Function = async (UserId:string):Promise<any> => {
        const token = getCookie("token")
        dispatch(RemovefollowUser({token,UserId})).then(({payload}:any)=>{
            if(payload.status === 202) navigate("/login")
            return true;
        })
    }
    return {unfollowUserHook,followUserHook,RemovefollowUserHook}
}