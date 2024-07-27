import { useEssentials, getCookie } from "../../Functions/CommonFunctions"
import { unfollowUser, followUser, RemovefollowUser, editProfile } from "../../Store/UserStore/ProfileManagement/ProfileSlice"
import { setUser } from '../../Store/UserStore/Authentication/AuthSlice';
import { toast } from "sonner"
import React, { useRef, useEffect, useState } from "react";
export const useConnections = () => {
    const { navigate, dispatch } = useEssentials()
    const unfollowUserHook: Function = async (UserId: string): Promise<any> => {
        const token = getCookie("token")
        dispatch(unfollowUser({ token, UserId })).then(({ payload }: any) => {
            if (payload.status === 202) navigate("/login")
            return true;
        })
    }
    const followUserHook: Function = async (UserId: string): Promise<any> => {
        const token = getCookie("token")
        dispatch(followUser({ token, UserId })).then(({ payload }: any) => {
            if (payload.status === 202) navigate("/login")
            return true;
        })
    }
    const RemovefollowUserHook: Function = async (UserId: string): Promise<any> => {
        const token = getCookie("token")
        dispatch(RemovefollowUser({ token, UserId })).then(({ payload }: any) => {
            if (payload.status === 202) navigate("/login")
            return true;
        })
    }
    return { unfollowUserHook, followUserHook, RemovefollowUserHook }
}

export const useProfileSettings = () => {
    const { dispatch, navigate, auth } = useEssentials()
    const [clear, setClear] = useState(false)
    const [data, setData] = useState<{ Name: string, Username: string, Description: string[], DescString: string }>({ Description: [], Name: "", Username: "", DescString: "" })
    const [type, setType] = useState("Edit");
    const { user, loading } = auth
    useEffect(() => {
        if (user) {
            setData({
                Description: [...user.Description],
                Name: user.Name,
                Username: user.Username,
                DescString: ""
            })
        }
    }, [clear])
    const handleType = (value: string) => {
        setType(value)
    }
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }
    const handleDescription = () => {
        setData({ ...data, Description: [...data.Description, data.DescString], DescString: "" })
    }
    const handleDescriptionDelete = (idx: number) => {
        const desc: string[] = data.Description.filter((_val, i) => i !== idx)
        setData({ ...data, Description: desc })
    }
    const handleClear = () => {
        setClear(!clear)
    }
    const handleUpdate = () => {
        const usernameRegex = /^[a-z0-9_.-]+$/;
        if (!data.Name || !data.Username || !usernameRegex.test(data.Username)) {
            return toast.error(!data.Name && !data.Username ? "Enter Name and Username" : !data.Name ? "Enter Name Properly" : "Enter Username Properly")
        }
        const token: string | undefined = getCookie("token")
        if (!token) {
            return navigate("/login")
        }
        const { Description, Name, Username } = data
        if (token) dispatch(editProfile({ Description, Name, Username, token })).then(({ payload }: any) => {
            console.log(payload)
            if (payload.status === 202) return navigate("/login")
            dispatch(setUser(payload.user))
            const types: "error" | "success" = payload.status === 200 ? "success" : "error"
            toast[types](payload.message)
        })
    }
    return { handleChange, data, handleDescription, handleClear, loading, handleUpdate, type, handleType, handleDescriptionDelete }
}

import { showPost } from '../../Store/UserStore/Post-Management/PostSlice';
import { Connections } from '../../Store/UserStore/Authentication/Interfaces';
import { handleBanner, handleImages } from './Functions';


const useProfileData = () => {
    const { navigate, dispatch, auth, Post, profile } = useEssentials();

    const { user, loading } = auth;
    const { loadingPost, post } = Post;
    const { loadingProfile } = profile;

    const [connections, setConnections] = useState<Connections | null>(null);
    const [type, setType] = useState<string>('Images');

    const [Profile, setProfile] = useState<{
        Image: File | null;
        Show: string;
    }>({
        Image: null,
        Show: ''
    });

    const [banner, setBanner] = useState<{
        Image: File | null;
        Show: string;
    }>({
        Image: null,
        Show: ''
    });

    useEffect(() => {
        const token = getCookie('token');
        if (token) {
            dispatch(showPost({ token })).then((state: any) => {
                if (!state.payload.user) {
                    navigate('/login');
                }
                setProfile({ ...Profile, Show: state.payload.user.Profile });
                setBanner({ ...banner, Show: state.payload.user.Banner });
                dispatch(setUser(state.payload.user));
                setConnections(state.payload.connections);
            });
        } else navigate('/login');
    }, []);

    const [open, setOpen] = useState(false);
    const [channel, setChannel] = useState(false);
    const [state, setState] = useState(false);

    const bannerRef = useRef<HTMLInputElement | null>(null);
    const profileRef = useRef<HTMLInputElement | null>(null);

    return {
        user,
        loading,
        loadingPost,
        loadingProfile,
        connections,
        type,
        Profile,
        banner,
        open,
        channel,
        state,
        bannerRef,
        profileRef,
        setConnections,
        setType,
        setProfile,
        setBanner,
        setOpen,
        setChannel,
        setState,
        dispatch,
        handleBanner,
        handleImages,
        post
    };
};

export const useMenu = () => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const openMenu = Boolean(anchorEl);

    const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    return {
        anchorEl,
        openMenu,
        handleMenuClick,
        handleMenuClose
    };
};

export default useProfileData;
