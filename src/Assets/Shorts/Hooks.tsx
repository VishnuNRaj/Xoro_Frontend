import { useRef, useState } from "react"
import { User } from "../../Store/UserStore/Authentication/Interfaces"

export const useUploadShorts = () => {
    const [video, setVideo] = useState<File | null>(null)
    const inputRef = useRef<HTMLInputElement | null>(null)
    const [data, setData] = useState<{ Caption: string, Tags: string, Context: string }>({
        Caption: "",
        Tags: "",
        Context: ""
    })
    const [tags, setTags] = useState<string[]>([])
    const clear = () => {
        setData({ Caption: "", Context: "", Tags: "" })
        setTags([])
        setVideo(null)
    }
    const selectVideo = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { files } = e.target
        if (files && files.length > 0 && files[0].type.startsWith("video/")) {
            setVideo(files[0])
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }

    const setTagUsers = () => {
        if (!data.Tags.startsWith("#") || data.Tags.length < 2 || data.Tags[1] === "#") return
        const tag = data.Tags.split("#")[1]
        setTags([...tags, tag])
        setData({ ...data, Tags: "" })
    }

    const handleUpload = () => {

    }



    return { video, selectVideo, clear, data, inputRef, handleChange, setTagUsers, handleUpload }
}