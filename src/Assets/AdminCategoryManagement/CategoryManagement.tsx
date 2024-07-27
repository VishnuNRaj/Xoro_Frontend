import React, { useEffect } from "react"
import { OffcanvasAdmin } from "../Components/AdminHeader"
import { useCategory } from "./Hooks"
import { Toaster } from "sonner"
import Preloader from "../Components/Preloader"

const CategoryManagement: React.FC = () => {
    const { getData, skip, setSkip, addData, editData, Name, total, handleEdit, setState, handleSearch, state, handleChange, clear, type, search, category, deleteData, loadingCategory } = useCategory()
    useEffect(() => {
        getData()
    }, [skip, search])
    return (
        <div className="w-full space-y-2 h-full">
            <div className="w-full h-[50px]">
                <OffcanvasAdmin />
            </div>
            <Toaster richColors />
            {loadingCategory && <Preloader />}
            <div className="w-full flex animate-slideInFromLeft justify-between">
                <div className="w-[300px] h-[50px] p-1 ml-2">
                    <input type="text" className="w-full h-full rounded-md border-2 border-black text-gray-700 p-1 px-3 flex items-center" name="" onChange={handleSearch} value={search} id="" />
                </div>
                <div className="w-full flex items-center text-3xl font-semibold justify-center text-white">Manage Category</div>
                {state && (
                    <div className="w-96 h-[50px] bg-white flex items-center justify-center gap-2 p-1 mr-5 rounded-lg">
                        <input type="text" name="" value={Name} onChange={handleChange} className="max-w-[80%] h-[40px] rounded-md p-2 px-3 bg-gray-600 text-white" id="" />
                        <button onClick={type ? () => editData(Name, type) : () => addData(Name)} className="w-10 h-10 flex p-2 items-center justify-center bg-green-700 rounded-md"><i className="fa fa-plus"></i></button>
                        <button onClick={clear} className="w-10 h-10 flex p-2 items-center justify-center bg-red-700 rounded-md"><i className="fa fa-times"></i></button>
                    </div>
                )}
                {!state && <button onClick={() => setState(!state)} className="p-2 px-3 rounded-lg text-white font-semibold bg-green-600 mr-4 flex items-center justify-between gap-2"> <i className="fa fa-plus"></i> Add</button>
                }
            </div>
            <div className="w-full h-auto p-4 px-20 animate-slideInFromLeft">
                <table className="table-auto flex-shrink-0 w-full text-black font-semibold border-2 bg-gray-100 rounded-lg">
                    <thead className="p-2 border-2">
                        <tr className="p-1">
                            <th className="py-2 border-2">Si No</th>
                            <th className="p-2 border-2">Name</th>
                            <th className="p-2 border-2">Videos</th>
                            <th className="p-2 border-2">Created At</th>
                            <th className="p-2 border-2"></th>
                        </tr>
                    </thead>
                    <tbody className="p-1 border-2">
                        {category && category.map((value, idx) => (
                            <tr key={idx} className="p-2 border-2">
                                <td className="py-2 flex items-center justify-center">{idx + 1 + skip * 10}</td>
                                <td className="p-2 border-2"><center>{value.Name}</center></td>
                                <td className="p-2 border-2"><center>{value.Videos || 0}</center></td>
                                <td className="p-2 border-2"><center>{new Date(value.CreatedAt).toLocaleDateString()}</center></td>
                                <td className="p-2 border-2 flex items-center justify-center gap-2">
                                        <button onClick={() => deleteData(value._id)} className="p-2 aspect-square w-8 h-8 flex items-center justify-center rounded-full hover:bg-red-500 hover:text-gray-200"><i className="fa fa-trash"></i></button>
                                        <button onClick={() => handleEdit(value.Name, value._id)} className="p-2 aspect-square w-8 h-8 flex items-center justify-center rounded-full hover:bg-blue-500 hover:text-gray-200"><i className="fa fa-edit"></i></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="w-full h-32 flex items-center justify-center gap-2">
                {Array.from({ length: Math.ceil(total / 10) }).map((_, idx) => (
                    <button onClick={() => setSkip(idx)} className="w-10 h-10 flex items-center justify-center bg-gray-400 font-semibold rounded-full">
                        {idx + 1}
                    </button>
                ))}
            </div>
        </div>
    )
}

export default CategoryManagement;