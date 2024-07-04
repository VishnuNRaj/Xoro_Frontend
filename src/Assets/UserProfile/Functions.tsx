import { editProfilePic } from '../../Store/UserStore/ProfileManagement/ProfileSlice';
import { toast } from 'react-hot-toast';
import Cookies from 'js-cookie';
import { User } from '../../Store/UserStore/Authentication/Interfaces';
import { AppDispatch } from '../../Store/Store';
import { editBanner } from '../../Store/UserStore/ProfileManagement/ProfileSlice';


export const handleImages = async (e: React.ChangeEvent<HTMLInputElement>, profile: { Image: File | null; Show: string; }, setProfile: React.Dispatch<React.SetStateAction<{ Image: File | null; Show: string; }>>, user: User | null, dispatch: AppDispatch) => {
    if (e.target.files && e.target.files.length > 0) {
        const file = e.target.files[0];
        const reader = new FileReader();
        if (!file.type.startsWith('image/')) {
            toast.error('Invalid file type. Please upload an image.');
            return;
        }
        reader.onloadend = async () => {
            if (typeof reader.result === 'string') {
                setProfile({ ...profile, Show: reader.result });
                toast.custom((t) => (
                    <div
                        className={`${t.visible ? 'animate-enter' : 'animate-leave'
                            } max-w-sm w-full text-white bg-gray-700 shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
                    >
                        <div className="flex-1 w-0 p-4">
                            <div className="flex items-start">
                                <div className="ml-3 flex-1">
                                    <p className="text-sm font-medium">
                                        Update Profile Picture
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="flex border-l border-gray-200">
                            <button
                                onClick={() => {
                                    updateImage(file, dispatch)
                                    toast.dismiss(t.id)
                                }}
                                className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            >
                                Yes
                            </button>
                            <button
                                onClick={() => {
                                    setProfile({ ...profile, Show: user ? user.Profile : '' });
                                    toast.dismiss(t.id)
                                }}
                                className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            >
                                No
                            </button>
                        </div>
                    </div>
                ), {
                    duration: Infinity,
                });
            }
        };
        reader.readAsDataURL(file);
    }
};

export const updateImage = async (profile: File, dispatch: AppDispatch) => {
    const token = Cookies.get('token');
    if (token) {
        if (profile) {
            dispatch(editProfilePic({ token, Image: profile }))
        }
    }
};
export const updateBanner = async (banner: File, dispatch: AppDispatch) => {
    const token = Cookies.get('token');
    if (token) {
        if (banner) {
            dispatch(editBanner({ token, Image: banner }))
        }
    }
};

export const handleBanner = async (e: React.ChangeEvent<HTMLInputElement>, banner: { Image: File | null; Show: string; }, setBanner: React.Dispatch<React.SetStateAction<{ Image: File | null; Show: string; }>>, user: User | null, dispatch: AppDispatch) => {
    if (e.target.files && e.target.files.length > 0) {
        const file = e.target.files[0];
        const reader = new FileReader();
        if (!file.type.startsWith('image/')) {
            toast.error('Invalid file type. Please upload an image.');
            return;
        }
        reader.onloadend = async () => {
            if (typeof reader.result === 'string') {
                setBanner({ ...banner, Show: reader.result })
                toast.custom((t) => (
                    <div
                        className={`${t.visible ? 'animate-enter' : 'animate-leave'
                            } max-w-sm w-full text-white bg-gray-700 shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
                    >
                        <div className="flex-1 w-0 p-4">
                            <div className="flex items-start">
                                <div className="ml-3 flex-1">
                                    <p className="text-sm font-medium">
                                        Update Banner Image
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="flex border-l border-gray-200">
                            <button
                                onClick={() => {
                                    toast.dismiss(t.id)
                                    updateBanner(file, dispatch)
                                }}
                                className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            >
                                Yes
                            </button>
                            <button
                                onClick={() => { 
                                    setBanner({ ...banner, Show: user ? user.Banner : '' });
                                    toast.dismiss(t.id)
                                }}
                                className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            >
                                No
                            </button>
                        </div>
                    </div>
                ), {
                    duration: Infinity,
                });
            }
        };
        reader.readAsDataURL(file);
    }
};

