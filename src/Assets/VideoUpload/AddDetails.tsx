import React, { useRef, useState, memo } from 'react'
import VideoInput from './VideoInput'
import { getCookie, useEssentials } from '../../Functions/CommonFunctions'
import { uploadVideo } from '../../Store/UserStore/Video-Management/VideoSlice'
import { Toaster } from 'sonner'
import { toast } from 'sonner'
import useCategory from '../../Other/Category'
interface detailsProps {
    Video: File,
    Thumbnail: string[],
    setThumbnail: React.Dispatch<React.SetStateAction<string[]>>
}
const AddDetails: React.FC<detailsProps> = memo(({ Video, Thumbnail, setThumbnail }) => {
    const thumbRef = useRef<HTMLInputElement>(null)
    const videoRef = useRef<HTMLVideoElement | null>(null)
    const { category, emptySearch, handleSearchChange, search } = useCategory()
    const { auth, dispatch, navigate } = useEssentials()
    const { user } = auth;
    const handleThumbnailButtonClick = () => {
        thumbRef.current?.click()
    }
    const [, setProgress] = useState<number | null>(null)
    const [data, setData] = useState({
        Caption: '',
        Description: '',
        Thumbnail: '',
        Hashtags: '',
        CommentsOn: true,
        PremiumContent: false,
        ListedContent: true,
        RelatedTags: '',
        Restriction: '18',
    })
    const [Hashtags, setHashtags] = useState<string[]>([])
    const addThumbnail = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file: File | undefined = e.target.files?.[0];
        if (!file) return;

        const reader: FileReader = new FileReader();
        reader.onload = () => {
            const base64: string | null = reader.result as string | null;
            if (base64) {
                Thumbnail.splice(0, 1)
                setThumbnail([...Thumbnail, base64]);
            }
        };

        reader.readAsDataURL(file);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }
    const upload = () => {
        const token: string | undefined = getCookie('token')
        if (token) {
            const { Caption, CommentsOn, Description, ListedContent, PremiumContent, RelatedTags, Restriction, Thumbnail } = data
            const complete = {
                Caption,
                Description,
                Duration: videoRef.current ? videoRef.current.duration.toString() : '',
                RelatedTags,
                Restriction: parseInt(Restriction),
                Thumbnail,
                Hashtags,
                Settings: {
                    CommentsOn,
                    ListedContent,
                    PremiumContent,
                },
                Video: Video,
                token: token,
                setProgress
            }
            dispatch(uploadVideo(complete)).then((state: any) => {
                console.log(state.payload)
                if (state.payload.status === 202) navigate('/login')
                toast[(state.payload.status !== 201 && state.payload.status !== 500 ? 'success' : 'error')](state.payload.message)
                state.payload.status !== 201 && state.payload.status !== 500 ? navigate('/profile') : undefined
            })
        }
    }
    const handleContext = (name: string) => {
        setData({ ...data, RelatedTags: name })
    }
    return (
        <div>
            <Toaster richColors />
            <div className="sm:px-8 md:px-16 sm:py-8 flex justify-center ">
                <div className="md:w-2/3 w-full bg-gray-400 p-3 rounded-md">
                    <div className="md:flex justify-between">
                        <div className="md:pr-2 md:w-1/2">
                            {React.useMemo(() => (
                                <video
                                    crossOrigin="anonymous"
                                    src={URL.createObjectURL(Video)}
                                    className="rounded-lg w-full aspect-video h-full object-cover"
                                    controls={true}
                                    poster={data.Thumbnail}
                                    ref={videoRef}
                                >
                                </video>
                            ), [data.Thumbnail])}
                        </div>
                        <div className="md:w-1/2 md:mt-0 mt-3">
                            <div className="grid grid-cols-2 gap-2">
                                {Thumbnail.map((img, index) => (
                                    <React.Fragment>
                                        {React.useMemo(() => (
                                            <>
                                                <div key={index} className="">
                                                    <img crossOrigin="anonymous" src={img} onClick={() => {
                                                        setData({
                                                            ...data,
                                                            Thumbnail: img
                                                        })
                                                    }} alt="" className={`rounded-lg w-full aspect-video object-cover ${data.Thumbnail === img ? 'border-4 border-white ' : ''}`} />
                                                </div>
                                            </>
                                        ), [Thumbnail, data.Thumbnail])}
                                    </React.Fragment>
                                ))}
                                {Thumbnail.length < 4 && (
                                    <React.Fragment>
                                        {React.useMemo(() => (
                                            <div className="border-0 bg-transparent flex justify-center items-center rounded-lg">
                                                <div className="w-full">
                                                    <div className="w-full flex justify-center items-center">
                                                        <input
                                                            type="file"
                                                            id="thumbnailInput"
                                                            className="hidden"
                                                            hidden
                                                            ref={thumbRef}
                                                            onChange={addThumbnail}
                                                            accept="image/*"
                                                        />
                                                    </div>
                                                    <center>
                                                        <button className="bg-blue-700 text-white mt-4 p-1 px-4 rounded-lg" onClick={() => handleThumbnailButtonClick()}>
                                                            <i className='fa fa-plus p-2'></i>Add
                                                        </button>
                                                    </center>
                                                </div>
                                            </div>
                                        ), [Thumbnail])}
                                    </React.Fragment>
                                )}

                            </div>
                        </div>
                    </div>
                    <div className='md:flex justify-between'>
                        <div className="p-3 md:w-1/2 grid grid-col-1 gap-2">
                            <div className="w-full">
                                <VideoInput label={'Caption'} placeholder='Caption' value={data.Caption} onChange={handleChange} name={'Caption'} />
                            </div>
                            <div className="w-full">
                                <VideoInput label={'Description'} placeholder='Description' value={data.Description} onChange={handleChange} name={'Description'} />
                            </div>
                            <div className="w-full flex">
                                <div className="w-10/12">
                                    <VideoInput label={'Hashtags'} placeholder='Hashtags' value={data.Hashtags} onChange={handleChange} name={'Hashtags'} />
                                </div>
                                <div className='w-1/12 ml-[1/12]'>
                                    <button onClick={() => {
                                        if (data.Hashtags.startsWith('#') && data.Hashtags.length > 2) {
                                            setHashtags([...Hashtags, data.Hashtags])
                                            setData({ ...data, Hashtags: '' })
                                            console.log(Hashtags)
                                        }
                                    }} className={`flex justify-center items-center p-3 rounded-md ml-5 ${data.Hashtags.startsWith('#') && data.Hashtags.length > 2 ? 'bg-blue-700' : 'bg-gray-700'}`} disabled={!data.Hashtags.startsWith('#') && data.Hashtags.length > 2} ><i className='fa fa-plus'></i></button>
                                </div>
                            </div>
                            <div className='w-full grid grid-cols-3 gap-2'>
                                {Hashtags.length > 0 && Hashtags.map((hashtag, i) => (
                                    <>
                                        <div className='bg-[#fff] w-full p-2 rounded-lg flex'>
                                            <div style={{ overflowX: 'scroll', WebkitOverflowScrolling: 'touch', scrollbarWidth: 'none' }} className="w-[75%] overflow-x-scroll">
                                                <p className='text-gray-900'>{hashtag}</p>
                                            </div>
                                            <div className='ml-[10%]'>
                                                <button onClick={() => {
                                                    setHashtags(Hashtags.filter((_tag, index) => index !== i))
                                                }} className='w-full hover:bg-red-700 px-1.5 bg-transparent  hover:text-white text-black'>
                                                    <i className='fa fa-times'></i>
                                                </button>
                                            </div>
                                        </div>
                                    </>
                                ))}
                            </div>

                        </div>
                        <div className="p-3 md:w-1/2 grid grid-cols-1">
                            <div className="w-full">
                                <div className="w-[90%] mt-3 flex items-center space-x-3 font-semibold">
                                    <label className="inline-flex items-center cursor-pointer">
                                        <input type="checkbox" checked={data.CommentsOn} onChange={() => setData({ ...data, CommentsOn: !data.CommentsOn })} className="sr-only peer" />
                                        <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                                        <span className={`ms-3 text-sm ${data.CommentsOn ? 'text-blue-700 shadow-md' : 'text-black'}`}>Comments</span>
                                    </label>
                                    <label className="inline-flex items-center cursor-pointer">
                                        <input type="checkbox" checked={data.ListedContent} onChange={() => setData({ ...data, ListedContent: !data.ListedContent })} className="sr-only peer" />
                                        <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                                        <span className={`ms-3 text-sm ${data.ListedContent ? 'text-blue-700 shadow-md' : 'text-black'}`}>Listed</span>
                                    </label>
                                    {user && user.VIP && (
                                        <label className="inline-flex items-center cursor-pointer">
                                            <input type="checkbox" checked={data.PremiumContent} onChange={() => setData({ ...data, PremiumContent: !data.PremiumContent })} className="sr-only peer" />
                                            <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                                            <span className={`ms-3 text-sm ${data.PremiumContent ? 'text-blue-700 shadow-md' : 'text-black'}`}>Premium</span>
                                        </label>
                                    )}
                                </div>
                            </div>
                            <div className="w-full">
                                <VideoInput label={'Type'} placeholder='Type' value={search.length > 0 ? search : data.RelatedTags} onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{
                                    if(e.target.value.length === 0) {
                                        handleSearchChange(e)
                                        handleChange(e)
                                    } else handleSearchChange(e)
                                }} name={'RelatedTags'} />
                                {category.length > 0 && (
                                    <>
                                        <div style={{ scrollbarWidth: "none", WebkitOverflowScrolling: "touch" }} className="absolute w-[380px] p-1 space-y-1 max-h-[150px] overflow-y-scroll bg-gray-200 z-50">
                                            {category.map((value) => (
                                                <>
                                                    <div onClick={() => {
                                                        handleContext(value.Name)
                                                        emptySearch()
                                                    }} className="w-full h-[40px] rounded-md flex items-center justify-center border-2 border-slate-800">
                                                        <h1 className="text-gray-800 font-semibold text-sm">{value.Name}</h1>
                                                    </div>
                                                </>
                                            ))}
                                        </div>
                                    </>
                                )}
                            </div>
                            <div className="w-full md:mt-0 mt-2">
                                <select onChange={(e) => setData({ ...data, Restriction: e.target.value })} name="Restriction" className='text-black h-[40px] font-medium border-1 shadow-md shadow-black border-gray-900 focus:border-2 placeholder:font-normal focus:border-black w-full p-2 px-3 rounded-lg ' id="">
                                    <option value="18">18 +</option>
                                    <option value="16">16 +</option>
                                    <option value="14">14 +</option>
                                </select>
                            </div>
                        </div>

                    </div>
                    <div className="flex items-center justify-center">
                        <button onClick={upload} className='p-2 px-4 rounded-md shadow-md text-white bg-green-700 shadow-black'>Upload</button>
                    </div>
                </div>
            </div>

        </div>
    )
})

export default AddDetails