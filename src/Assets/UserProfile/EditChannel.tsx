import { Dialog } from '@material-tailwind/react';
import React, { SetStateAction, useEffect, useRef, useState } from 'react';
import { editChannel } from '../../Store/UserStore/ProfileManagement/ProfileSlice';
import Preloader from '../Components/Preloader';
import { useEssentials, getCookie, useToast } from '../../Functions/CommonFunctions';
import useCategory from '../../Other/Category';
import { useSocket } from '../../Socket';
import { Socket } from 'socket.io-client';
import { getChannelBase } from '../../Store/UserStore/CommonManagements/CommonService';
import { toast, Toaster } from 'sonner';
import { Channel } from '../../Store/UserStore/Video-Management/Interfaces';

interface Props {
    open: boolean;
    setOpen: React.Dispatch<SetStateAction<boolean>>;
}

interface stateProps {
    Name: string;
    Description: string;
    Type: string[];
    Logo: string | null;
}
let fileData: File | null = null

const EditChannel: React.FC<Props> = ({ open, setOpen }) => {
    const socket = useSocket()
    const { navigate, dispatch, profile } = useEssentials()
    const [soc, setSoc] = useState<Socket | null>(null)
    const { category, getAllCategory } = useCategory()
    useEffect(() => {
        getAllCategory()
        setSoc(socket)
        getChannel()
    }, [])

    useEffect(() => {
        if (soc) {
            soc.on("getChannel", (data) => {
                console.log(data)
            })
        }
    }, [soc])
    const inputRef = useRef<HTMLInputElement | null>(null)
    const { loadingProfile } = profile
    const [state, setState] = useState<stateProps>({
        Name: '',
        Description: '',
        Type: [],
        Logo: null
    })
    const getChannel = async () => {
        const token: string | undefined = getCookie("token")
        if (token) {
            const response = await getChannelBase({ token })
            if (response.status !== 200) {
                toast.error(response.message)
            } else {
                const channel: Channel = response.channel
                console.log(channel)
                setState({
                    Name: channel.Name,
                    Description: channel.Description,
                    Logo: channel.Logo,
                    Type: channel.Type
                })
            }
        }
    }
    const create = () => {
        const { Name, Logo, Description, Type } = state
        if (!Name || !Logo) {
            useToast('Enter Channel Details Properly', 'error')
        }
        const token: string | undefined = getCookie('token')
        if (token) {
            dispatch(editChannel({ Name, Logo: fileData ? Logo : null, Description, Type, token })).then((state: any) => {
                if (state.payload.status === 202) {
                    navigate('/login')
                }
                toast[state.payload.status === 200 ? "success" : "error"](state.payload.message)
            })
        }

    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setState({ ...state, [e.target.name]: e.target.value })
    }
    const handleCheckboxChange = (data: string) => {
        setState((prevState) => {
            const updatedType = prevState.Type.includes(data)
                ? prevState.Type.filter((val) => val !== data)
                : [...prevState.Type, data];
            return { ...prevState, Type: updatedType };
        });
    };
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { files } = e.target;
        if (files && files[0].type.split('/')[0] !== 'image') {
            useToast('Select a proper image', 'error');
            return;
        }
        if (files && files[0]) {
            const file = files[0];
            fileData = file;
            const reader = new FileReader();
            reader.onloadend = () => {
                setState({ ...state, Logo: reader.result as string });
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <Dialog
            className='animate-slideInFromLeft border-blue-700 border-2 bg-[#111] bg-opacity-60'
            size='xs'
            open={open}
            handler={() => setOpen(false)}
            placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}    >
            <Toaster richColors position='top-right' />
            {loadingProfile && <Preloader />}
            <div className='w-full h-full'>
                <div className="relative w-full h-[40px] flex items-center justify-center">
                    <h1 className='text-lg text-gray-300 font-semibold'>Create Channel</h1>
                    <button
                        className='fixed right-0 top-0 text-gray-300 rounded-tr-md w-[40px] h-[40px] hover:bg-red-700 hover:text-white'
                        onClick={() => setOpen(false)}
                    >
                        <i className='fa fa-times'></i>
                    </button>
                </div>
                <div style={{ scrollbarColor: 'white' }} className='border-t-2 rounded-md border-blue-700 px-6 py-4 w-full space-y-2 max-h-[75vh] overflow-y-auto'>
                    <div className="w-full">
                        <div className='w-full flex items-center justify-center'>
                            <img className='rounded-full aspect-square w-[100px] h-[100px] object-cover ' src={state.Logo ? state.Logo : 'https://images.pexels.com/photos/3377405/pexels-photo-3377405.jpeg?cs=srgb&dl=pexels-elina-araja-1743227-3377405.jpg&fm=jpg'} alt="" />
                        </div>
                        <div className="w-full">
                            <div className="mt-5 flex justify-center w-full">
                                <label onClick={() => {
                                    inputRef.current?.click()
                                }} className="cursor-pointer">
                                    <i className="fa fa-camera cursor-pointer text-white bg-blue-500 rounded-full p-2"></i>
                                </label>
                                <input id="logo" onChange={handleFileChange} type="file" ref={inputRef} className="hidden" />
                            </div>
                        </div>
                    </div>
                    <div className="w-full">
                        <label htmlFor="text" className='text-gray-300 font-semibold mb-2'>Channel Name </label>
                        <input type='text' value={state.Name} onChange={handleChange} name='Name' className='p-2 px-4 w-full rounded-md border-2 font-semibold' />
                    </div>
                    <div className="w-full">
                        <label htmlFor="text" className='text-gray-300 font-semibold mb-2'>Description</label>
                        <input type='text' onChange={handleChange} value={state.Description} name='Description' className='p-2 bg-gray-50 px-4 w-full rounded-md border-2 font-semibold' />
                    </div>
                    {state.Type.length > 0 && (
                        <div className="w-full">
                            <label htmlFor="Contents" className='text-gray-300 font-semibold mb-2 block'>Contents</label>
                            <div className='p-2 px-4 w-full bg-gray-50 rounded-md border-2 border-gray-700 font-semibold'>
                                <div style={{ scrollbarWidth: 'none', WebkitOverflowScrolling: 'touch' }} className='w-full flex overflow-x-auto gap-2'>
                                    {state.Type.map((data, index) => (
                                        <div
                                            key={index}
                                            className='flex-shrink-0 gap-4 flex items-center bg-gray-300 rounded-md w-1/3'
                                        >
                                            <div style={{ scrollbarWidth: 'none' }} className='overflow-x-auto w-[75%] whitespace-nowrap flex-grow px-2'>
                                                <p className='text-black'>{data}</p>
                                            </div>
                                            <div className='flex-shrink-0'>
                                                <button className='bg-red-700 h-8 w-8 aspect-square  text-white p-1 rounded-md' onClick={() => {
                                                    const arr = state.Type.filter((_val, idx) => idx !== index)
                                                    setState({ ...state, Type: arr })
                                                }} >
                                                    <i className='fa fa-times'></i>
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                    <div className='w-full flecx items-center font-semibold p-3 justify-center text-white'>
                        <center>
                            <label htmlFor="content">What type of content to you upload ?</label>
                        </center>
                    </div>
                    <div className='w-[80%] mt-3 ml-[10%] grid grid-cols-3 gap-4'>
                        {category.length > 0 && category.map((data, index) => (
                            <div key={index} className="flex items-center mb-5">
                                <input
                                    id={`remember-${index}`}
                                    type="checkbox"
                                    value={data.Name}
                                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
                                    required
                                    onChange={() => handleCheckboxChange(data.Name)}
                                    checked={state.Type.some((val) => val === data.Name)}
                                />
                                <label
                                    htmlFor={`remember-${index}`}
                                    className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                >
                                    {data.Name}
                                </label>
                            </div>
                        ))}
                    </div>
                    <div className='w-full flex items-center justify-center'>
                        <button type='button' onClick={create} className='bg-blue-700 p-2 px-3 text-white font-semibold rounded-md '>Create</button>
                    </div>
                </div>
            </div>
        </Dialog>
    );
};

export default EditChannel;
