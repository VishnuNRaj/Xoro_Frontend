import React, { Fragment, memo, useEffect, useState } from 'react';
import { resetAdminStates } from '../../Store/Store';
import { useEssentials, getCookie } from '../../Functions/CommonFunctions';
import { getUsers, updateUser, updateUserData } from '../../Store/AdminStore/Management/UserManagement/AdminUserSlice';
import { toast } from 'react-hot-toast';
// import { OffcanvasAdmin } from '../Components/AdminHeader';
import { setAdmin } from '../../Store/AdminStore/Authentication/AuthSlice';
import Preloader from '../Components/Preloader';
import { Dialog } from '@material-tailwind/react';
import { FormInput } from './../Components/Input';
import Dropdown from './../Components/Dropdown';

interface users {
    Name: string;
    Email: string;
    Password: string;
    Profile: string;
    Verified: boolean;
    Suspended: boolean;
    SuspendedTill: Date;
    Terminated: boolean;
    Username: string;
    Phone: string;
    SetSuspension: boolean;
    SetTermination: boolean;
    Reason: string;
    SusDate: number | null;
    _id: string;
}

const UserManagement: React.FC = memo(() => {
    const {navigate,adminuser,dispatch} = useEssentials()
    const { loadingUsers, users } = adminuser
    const [edit, setEdit] = useState<users | null>(null);
    const [error] = useState<string>('');

    const suspentionObj: { value: number; label: string }[] = [
        { value: 7, label: '7 Days' },
        { value: 14, label: '14 Days' },
        { value: 21, label: '21 Days' }
    ];

    type ToastType = 'success' | 'error';

    const toastify = (message: string, type: ToastType): void => {
        toast[type](message, {
            duration: 2000,
            position: 'top-right'
        })
    };

    useEffect(() => {
        const token = getCookie('admin');
        if (token) {
            dispatch(getUsers({ token })).then((action: any) => {
                console.log(action);
                if (action.payload.status !== 200) {
                    resetAdminStates();
                    return navigate('/admin/login')
                }
                dispatch(setAdmin(action.payload.admin));
            });
        } else {
            resetAdminStates();
            navigate('/admin/login');
        }
    }, []);

    const update = () => {
        if (edit?.Reason === '') {
            toastify('Reason is required', 'error');
            return;
        }
        if (edit?.SetSuspension && !edit.SusDate) {
            toastify('Suspension Date is required', 'error');
            return;
        }
        const token = getCookie('admin');
        if (token && edit) {
            dispatch(updateUser({
                Suspended: edit.SetSuspension,
                token: token,
                Reason: edit.Reason,
                SuspendedTill: edit.SusDate,
                Terminate: edit.SetTermination,
                UserId: edit._id
            })).then((state: any) => {
                const updatedUsers = users.map((user: any) => {
                    if (user._id === edit._id) {
                        return {
                            ...user,
                            Suspended: edit.SetSuspension,
                            Terminated: edit.SetTermination,
                        };
                    }
                    return user;
                });
                dispatch(updateUserData(updatedUsers));
                setEdit(null);
                toastify(state.payload.message, 'success');
            });
        }
    };

    if (loadingUsers) {
        return <Preloader />;
    }

    return (
        <Fragment>
            {/* <OffcanvasAdmin /> */}
            <div className='w-full h-12 mt-5 flex items-center justify-center'>
                <h1 className='text-2xl text-white font-semibold'>Manage Users</h1>
            </div>
            <div className='mt-2'>
                <center>
                    <table className="table-auto text-black font-semibold border-2 bg-gray-100 rounded-lg">
                        <thead className='p-2 border-2'>
                            <tr className='p-2 '>
                                <th className='p-3  border-r-2'>Name</th>
                                <th className='p-3  border-r-2' >Username</th>
                                <th className='p-3  border-r-2' >Email</th>
                                <th className='p-3  border-r-2' >Verified</th>
                                <th className='p-3  border-r-2' >Terminated</th>
                                <th className='p-3  border-r-2' >Suspended</th>
                                <th className='p-3' >Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users && users.length > 0 && (
                                users.map((user) => (
                                    <tr key={user.id} className=''>
                                        <td className='p-3  border-r-2'>{user && user.Name}</td>
                                        <td className='p-3  border-r-2'>{user && user.Username}</td>
                                        <td className='p-3  border-r-2'>{user && user.Email}</td>
                                        <td className='p-3  border-r-2'><center>{user && user.Verified ? 'Yes' : 'No'}</center></td>
                                        <td className='p-3  border-r-2'><center>{user && user.Terminated ? 'Yes' : 'No'}</center></td>
                                        <td className='p-3  border-r-2'><center>{user && user.Suspended ? 'Yes' : 'No'}</center></td>
                                        <td className='p-3'><center><button onClick={() => setEdit({ ...user, SetSuspension: false, SetTermination: false, SusDate: null })} className='bg-green-700 p-2 text-white px-3'>Details</button></center></td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </center>
                <Dialog
                    open={edit ? true : false}
                    size='sm'
                    className='bg-black shadow-sm shadow-gray-200 border-2 text-white border-white z-10'
                    placeholder={undefined} handler={function (): void {
                        throw new Error('Function not implemented.');
                    }} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}
                >
                    <div className='w-full h-11'>
                        <button className='float-right p-2 pr-3' onClick={() => setEdit(null)}><i className='fa fa-close text-red-700'></i></button>
                        <center><h1 className='p-2 text-xl font-bold'>User Details</h1></center>
                    </div>
                    <div className='w-full border-t-2 border-t-white font-semibold'>
                        <div className="w-full">
                            <img crossOrigin="anonymous" src={edit?.Profile} className='w-52 p-5 h-52 object-cover rounded-full float-left' alt="" />
                            <div className="w-auto float-left ml-16 mt-5">
                                <h1>Name : {edit?.Name}</h1>
                                <h1>Username : {edit?.Username}</h1>
                                <h1>Email : {edit?.Email}</h1>
                                <h1>Verified : <span className={`${edit?.Verified ? 'text-green-700' : 'text-red-700'}`}> {edit?.Verified ? 'Verified' : 'Unverified'}</span></h1>
                                {edit?.Verified && (
                                    <>
                                        <h1 className='mt-2'>Terminated : {edit?.Terminated ? <span className='text-red-700'>Terminated</span> : (
                                            <button className='bg-red-700 p-1 rounded-full ml-3 px-3' onClick={() => setEdit({ ...edit, SetTermination: !edit.SetTermination, SetSuspension: false, SusDate: null, Reason: '' })}>{edit.SetTermination ? 'Cancel' : 'Terminate'}</button>
                                        )}</h1>
                                        {edit.SetTermination && (
                                            <div>
                                                <FormInput error={error} label={'Reason'} name={'Reason'} type={'text'} width={'w-full mt-3'} placeholder={'Enter Reason For Termination'} value={edit.Reason} key={edit.Username} onChange={(e) => setEdit({ ...edit, Reason: e.target.value })} />
                                                <center><button className='p-1 px-3 bg-green-700 mt-3 rounded-md' onClick={update} >Submit</button></center>
                                            </div>
                                        )}
                                        {!edit?.Terminated && !edit.SetTermination && (
                                            <div>
                                                <h1 className='mt-2'>Suspended : {edit?.Suspended ? (
                                                    <>
                                                        <button
                                                            className='bg-red-700 p-1 rounded-full ml-3 px-3 mt-2 mb-2'
                                                            onClick={() => {
                                                                setEdit({ ...edit, SetSuspension: false, SetTermination: false, Reason: '', SusDate: null });
                                                                update();
                                                            }}
                                                        >
                                                            Cancel Suspension
                                                        </button>
                                                    </>
                                                ) : (
                                                    <button
                                                        className='bg-red-700 p-1 rounded-full ml-3 px-3 mt-2 mb-2'
                                                        onClick={() => setEdit({ ...edit, SetSuspension: !edit.SetSuspension, SetTermination: false, Reason: '' })}
                                                    >
                                                        {edit.SetSuspension ? 'Cancel' : 'Suspend'}
                                                    </button>
                                                )}
                                                </h1>
                                                {edit.SetSuspension && (
                                                    <div>
                                                        <center>
                                                            <Dropdown options={suspentionObj} Label={'Suspend Account'} onSelect={(value: number) => setEdit({ ...edit, SusDate: value })} />
                                                            <FormInput error={error} label={'Reason'} name={'Reason'} type={'text'} width={'w-full mt-3'} placeholder={'Enter Reason For Termination'} value={edit.Reason} key={edit.Username} onChange={(e) => setEdit({ ...edit, Reason: e.target.value })} />
                                                            <center><button className='p-1 px-3 bg-green-700 mt-3 mb-10 rounded-md' onClick={update}>Submit</button></center>
                                                        </center>
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </Dialog>
            </div>
        </Fragment>
    );
});

export default UserManagement;
