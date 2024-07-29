import axios from "axios"
import config from "../../../Configs/config";
import * as interfaces from "./interfaces";

const axiosInstance = axios.create({
    baseURL: `${config.BASE}/shorts`,
    withCredentials: true,
})

export const uploadShorts = async ({ Caption, CommentsOn, Context, Hashtags, Private, Shorts, token }: interfaces.uploadShorts) => {
    try {
        const from = new FormData()
        from.append("Caption", Caption)
        from.append("Private", Private.toString())
        from.append("CommentsOn", CommentsOn.toString())
        from.append("Context", Context)
        Hashtags.forEach((tag) => {
            from.append("Hashtags", tag)
        })
        from.append("Shorts", Shorts)
        const response = await axiosInstance.post("/upload",from,{
            headers:{
                Authorization:`${token}`
            }
        })
        return response.data
    } catch (e) {
        return <interfaces.uploadShortsResponse>{
            message:"Internal Server Error",
            status:500
        }
    }
}