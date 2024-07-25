import React from "react"
import { OffcanvasAdmin } from "../Components/AdminHeader"

const CategoryManagement: React.FC = () => {
    return (
        <div className="w-full space-y-2 h-full">
            <div className="w-full h-[50px]">
                <OffcanvasAdmin />
            </div>
            <div className="w-full flex items-center text-3xl font-semibold justify-center text-white">Manage Category</div>
            <div className="w-full h-auto p-4 px-20">
                <table className="table-auto flex-shrink-0 w-full text-black font-semibold border-2 bg-gray-100 rounded-lg">
                    <thead className="p-2 border-2">
                        <tr className="p-1">
                            <th className="py-2 border-2">Si No</th>
                            <th className="p-2 border-2">Name</th>
                            <th className="p-2 border-2">Videos</th>
                            <th className="p-2 border-2">Created By</th>
                            <th className="p-2 border-2"></th>
                        </tr>
                    </thead>
                    <tbody className="p-1 border-2">
                        {[1, 2, 3].map((value, idx) => (
                            <tr key={idx} className="p-2 border-2">
                                <td className="py-2 flex items-center justify-center">{value}</td>
                                <td className="p-2 border-2"><center>Malcolm Lockyer</center></td>
                                <td className="p-2 border-2"><center>1961</center></td>
                                <td className="p-2 border-2"><center>1961</center></td>
                                <td className="p-2 border-2"><center><button className="p-2 aspect-square w-8 h-8 flex items-center justify-center rounded-full hover:bg-red-500"><i className="fa fa-trash"></i></button></center></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default CategoryManagement;