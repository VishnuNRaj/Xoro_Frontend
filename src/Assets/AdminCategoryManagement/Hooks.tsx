import { useState } from "react"
import { addCategory, deleteCategory, editCategory, getCategory, setCategory } from "../../Store/AdminStore/Management/CategoryManagement/CategorySlice"
import { useEssentials, getCookie } from "../../Functions/CommonFunctions"
import { toast } from "sonner"
import { setAdmin } from "../../Store/AdminStore/Authentication/AuthSlice"
import { Category } from "../../Store/UserStore/CommonManagements/interfaces"
export const useCategory = () => {
    const [skip, setSkip] = useState<number>(0)
    const { dispatch, navigate, categoryadmin } = useEssentials()
    const [total, setTotal] = useState<number>(0)
    const [search, _setSearch] = useState("")
    const [type, setType] = useState<string | null>(null)
    const [state, setState] = useState(false)
    const [Name, setName] = useState("")
    const { category, loadingCategory } = categoryadmin
    const getData = async () => {
        const token: string | undefined = await getCookie("admin")
        if (token) {
            dispatch(getCategory({ skip, token, search: search.length > 0 ? search : "null" })).then(({ payload }: any) => {
                if (!payload.admin) return navigate("/admin/login")
                dispatch(setAdmin(payload.admin))
                setTotal(payload.total)
            })
        } else navigate("/admin/login")
    }
    const editData = (Name: string, id: string) => {
        if (!Name || Name.length < 3) return toast.error("Minimum 3 Characters")
        const token: string | undefined = getCookie("admin")
        if (token) {
            dispatch(editCategory({ CategoryId: id, Name, token })).then(({ payload }: any) => {
                if (payload.status === 202) return navigate("/admin/login")
                toast[payload.status === 200 ? "success" : "error"](payload.message, {
                    duration: 1000
                })
                if (payload.status === 200) {
                    const arrayy: Category[] = category.map((cat) => {
                        if (cat._id === payload.Category._id) {
                            return payload.Category
                        } return cat
                    })
                    dispatch(setCategory(arrayy))
                    clear()
                }
            })

        } else navigate("/admin/login")
    }
    const clear = () => {
        setType(null)
        setState(false)
        setName("")
    }
    const deleteData = (id: string) => {
        const token: string | undefined = getCookie("admin")
        if (token) {
            dispatch(deleteCategory({ id, token })).then(({ payload }: any) => {
                if (payload.status === 202) return navigate("/admin/login")
                toast[payload.status === 200 ? "success" : "error"](payload.message, {
                    duration: 1000
                })
                dispatch(setCategory([...category].filter((val) => val._id !== id)))
            })

        } else navigate("/admin/login")
    }
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value)
    }
    const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
        _setSearch(e.target.value)
    }
    const addData = (Name: string) => {
        const token: string | undefined = getCookie("admin")
        if (Name.length < 3) return toast.error("Minimum 3 Characters")
        if (token) {
            dispatch(addCategory({ Name, token })).then(({ payload }: any) => {
                if (payload.status === 202) return navigate("/admin/login")
                toast[payload.status === 200 ? "success" : "error"](payload.message, {
                    duration: 1000
                })
                if (payload.status === 200) {
                    clear()
                }
            })

        } else navigate("/admin/login")
    }
    const handleEdit = (name: string, id: string) => {
        setName(name)
        setType(id)
        setState(true)
    }
    return { getData, skip, category, handleChange, handleEdit, handleSearch, clear, search, type, state, setState, total, loadingCategory, editData, Name, setSkip, deleteData, addData }
}