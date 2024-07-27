import React, { SetStateAction, useMemo } from "react";
import { Dialog } from "@material-tailwind/react";
import { useUploadShorts } from "./Hooks";
import useSlider from "../Components/Slider";
import { Slider } from "@mui/material";
import { Toaster } from "sonner";
import useCategory from "../../Other/Category";
interface Props {
    open: boolean;
    setOpen: React.Dispatch<SetStateAction<boolean>>;
}

const ShortsUpload: React.FC<Props> = ({ open, setOpen }) => {
    const { video, selectVideo, inputRef, data, handleChange,handleContext, clear, handleUpload } = useUploadShorts();
    const { start, duration, handleSlide, end, valueText, trim, handleTrimVideo, setTrim } = useSlider({ video })
    const { category, handleSearchChange, search,emptySearch } = useCategory()
    const videoElement = useMemo(() => {
        if (trim) {
            return (
                <>
                    <video controls className="md:w-[225px] w-full flex-shrink-0 rounded-md h-[300px] md:h-[400px]" src={URL.createObjectURL(trim)}></video>
                </>
            );
        }
        return (
            <div onClick={() => inputRef.current?.click()} className="w-full p-2 rounded-md h-full">
                <div className="w-full p-2 flex items-center justify-center rounded-md h-full">
                    <button className="text-gray-400 hover:text-white"><i className="fa fa-upload text-3xl"></i></button>
                </div>
            </div>
        );
    }, [video, inputRef, trim]);

    return (
        <Dialog className="" size="xs" open={open} handler={() => setOpen(!open)} placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
            <Toaster richColors closeButton duration={2000} />
            <div style={{ scrollbarWidth: "none", WebkitOverflowScrolling: "touch" }} className="w-full p-1 md:flex overflow-y-scroll">
                <div className="p-2 w-full border-2 rounded-lg md:flex border-gray-400">
                    <div className={`md:w-[225px] w-full flex-shrink-0 bg-slate-900 rounded-md h-full md:h-[${"400px"}]`}>
                        <input ref={inputRef} onChange={(e) => selectVideo(e, setTrim)} type="file" name="image" accept="video/*" hidden />
                        {videoElement}
                    </div>
                    <div className="w-full p-1 h-full relative">
                        <textarea
                            placeholder="Enter Caption..."
                            className="w-full text-sm text-gray-200 p-3 rounded-md resize-none bg-slate-900 font-semibold"
                            rows={4}
                            value={data.Caption}
                            onChange={handleChange}
                            name="Caption"
                        >
                            {data.Caption}
                        </textarea>
                        <input
                            type="text"
                            value={search.length > 0 ? search : data.Context}
                            placeholder="Content Type..."
                            className="w-full text-sm relative text-gray-200 p-3 rounded-md resize-none bg-slate-900 font-semibold"
                            name="Context"
                            onChange={handleSearchChange}
                        />
                        {category.length > 0 && (
                            <>
                                <div style={{scrollbarWidth:"none",WebkitOverflowScrolling:"touch"}} className="absolute w-full p-1 space-y-1 max-h-[150px] overflow-y-scroll bg-gray-200 z-50">
                                    {category.map((value)=>(
                                        <>
                                            <div onClick={()=>{
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
                        <input
                            type="text"
                            value={data.Tags}
                            placeholder="set hashtags for Recommendation ..."
                            className="w-full text-sm mt-2 text-gray-200 p-3 rounded-md resize-none bg-slate-900 font-semibold"
                            name="Tags"
                            onChange={handleChange}
                        />
                        <div className="bottom-1 mt-2 flex gap-2 items-center justify-center w-full h-14">
                            <button onClick={() => clear(setTrim)} className="bg-red-500 rounded-lg font-semibold text-white p-2 px-3">Clear</button>
                            <button onClick={handleUpload} className="bg-blue-700 rounded-lg font-semibold text-white p-2 px-3">Upload</button>
                        </div>
                        {video && (
                            <div className="w-full h-20 p-3">
                                <div className="h-full p-3">
                                    <div className=" flex items-center justify-center">
                                        <h1 className="flex-shrink-0 font-semibold">Trim Video</h1>
                                    </div>
                                    <Slider
                                        className="p-3 bg-blue-100"
                                        getAriaLabel={() => 'Temperature range'}
                                        min={0}
                                        max={duration || 2}
                                        valueLabelFormat={valueText}
                                        value={[start, end]}
                                        onChange={handleSlide}
                                        valueLabelDisplay="auto"
                                        color="success"
                                    />
                                    <div className="flex items-center justify-center">
                                        <button onClick={handleTrimVideo} className="p-2 px-3 rounded-md bg-blue-700 text-white text-sm font-semibold">Trim</button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </Dialog>
    );
};

export default ShortsUpload;
