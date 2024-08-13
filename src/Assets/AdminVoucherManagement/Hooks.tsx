import { useEffect, useState } from "react"
// import { getCookie, useEssentials } from "../../Functions/CommonFunctions"
// import { getVoucher } from "../../Store/AdminStore/Management/VoucherManagement/voucherSlice"
// import { setAdmin } from "../../Store/AdminStore/Authentication/AuthSlice"
import { Voucher } from "../../Store/UserStore/Payment-Management/interface";
import { toast } from "sonner";
interface data {
    Name: string;
    From?: string;
    End?: string;
    Months: number;
    Description: string;
    Features: string[];
    Price: number;
    Type: "Monthly" | "Yearly" | "Bi Monthly" | "Special" | null;
    Image: File | null;
    Discount: number;
}
export const useVouchers = () => {
    // const { dispatch, navigate, Admin } = useEssentials()
    const [edit, setEdit] = useState<"add" | "edit" | null>(null)
    const [id, setId] = useState<string | null>(null)
    const [state, setState] = useState<data>({
        Description: "",
        Discount: 0,
        Price: 100,
        Name: "",
        Features: [],
        Image: null,
        Months: 1,
        Type: null
    })
    const [voucher, _setVoucher] = useState<Voucher[]>([])
    useEffect(() => {
        // const token = getCookie("token")
        // if (token) {
        //     dispatch(getVoucher({ token })).then(({ payload }: any) => {
        //         if (!payload.admin) navigate("/admin/login");
        //         if (!Admin.admin) setAdmin(payload.admin);
        //         setVoucher(payload.Voucher)
        //     })
        // } else navigate("/admin/login")
    }, [])
    useEffect(() => {
        if (state.From && state.Months) {
            const date = new Date(new Date(state.From).toLocaleDateString())
            console.log(date, " Date")
            date.setMonth(date.getMonth() + parseInt(state.Months.toString()))
            console.log(state, date)
            setState({ ...state, End: new Date(date).toLocaleDateString() })
        }
    }, [state.Months, state.From])
    const handleEdit = (id: string) => {
        setId(id)
        setEdit(edit === "add" ? "edit" : "add")
    }
    const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files;
        if (file && file.length > 0 && file[0].type.startsWith("image/")) {
            setState({ ...state, Image: file[0] })
        } else toast.error("Please select image files")
    }
    const handleAdd = () => {
        setEdit("add")
    }
    const handleCancel = () => {
        setEdit(null)
        setState({
            Description: "",
            Discount: 0,
            Price: 100,
            Name: "",
            Features: [],
            Image: null,
            Months: 1,
            Type: null
        })
        setId(null)
    }
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const value = e.target.value;
        setState({ ...state, [e.target.name]: value });
    }
    const handleDate = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const value = e.target.value;
        setState({ ...state, [e.target.name]: new Date(value).toLocaleDateString() });
    }
    return { voucher, handleDate, handleChange, state, edit, id, handleEdit, handleAdd, handleImage, handleCancel }
}