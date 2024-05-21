import React, { useRef, useState, memo } from 'react'
import VideoInput from './VideoInput'
import { Offcanvas } from '../Components/Canvas'
interface detailsProps {
    Video: File,
    Thumbnail: string[],
    setThumbnail: React.Dispatch<React.SetStateAction<string[]>>
}
const AddDetails: React.FC<detailsProps> = memo(({ Video, Thumbnail, setThumbnail }) => {
    const thumbRef = useRef<HTMLInputElement>(null)
    const handleThumbnailButtonClick = () => {
        thumbRef.current?.click()
    }
    const [data, setData] = useState({
        Caption: '',
        Description: '',
        Thumbnail: '',
        Hashtags: '',
        CommentsOn: false,
        Hidden: false,
        PremiumContent: false,
        ListedContent: true,
        RelatedTags: '',
        Restriction: '',
        Duration: '',
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

    return (
        <div>
            <div className="h-[70px] w-full">
                <Offcanvas />
            </div>
            <div className="sm:px-8 md:px-16 sm:py-8 flex justify-center">
                <div className="md:w-2/3 w-full bg-gray-400 p-3">
                    <div className="md:flex justify-between">
                        <div className="md:pr-2 md:w-1/2">
                            {React.useMemo(() => (
                                <video
                                    src={URL.createObjectURL(Video)}
                                    className="rounded-lg w-full h-full object-cover"
                                    controls={true}
                                    poster={data.Thumbnail}
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
                                                    <img src={img} onClick={() => {
                                                        setData({
                                                            ...data,
                                                            Thumbnail: img
                                                        })
                                                    }} alt="" className={`rounded-lg w-full ${data.Thumbnail === img ? 'border-4 border-white ' : ''}`} />
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
                                                    setHashtags(Hashtags.filter((tag, index) => index !== i))
                                                }} className='w-full hover:bg-red-700 px-1.5 bg-transparent  hover:text-white text-black'>
                                                    <i className='fa fa-times'></i>
                                                </button>
                                            </div>
                                        </div>
                                    </>
                                ))}
                            </div>

                            {/* <div className="w-full">
                                <VideoInput label={''} placeholder='Caption' value={data.Caption} onChange={handleChange} name={'Caption'} />
                            </div> */}
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
})

export default AddDetails