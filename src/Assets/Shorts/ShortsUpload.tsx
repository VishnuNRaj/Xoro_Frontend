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
    const { video, selectVideo, inputRef, data, handleChange, tags, handleContext, clear, handleUpload, setTagUsers, handleRemoveTags } = useUploadShorts();
    const { start, duration, handleSlide, end, valueText, trim, handleTrimVideo, setTrim, handleClear } = useSlider({ video })
    const { category, handleSearchChange, search, emptySearch } = useCategory()
    const videoElement = useMemo(() => {
        if (trim) {
            return (
                <>
                    <video controls className="md:w-[225px] w-full flex-shrink-0 rounded-md h-[200px] md:h-[400px]" src={URL.createObjectURL(trim)}></video>
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
            <div style={{ scrollbarWidth: "none", WebkitOverflowScrolling: "touch" }} className="w-full p-1 md:flex overflow-y-scroll border-2 border-gray-400 rounded-lg">
                <div className="p-2 w-full h-auto rounded-lg md:flex ">
                    <div className={`md:w-[225px] w-full flex justify-center flex-shrink-0 bg-slate-900 rounded-md h-full md:h-[${"400px"}]`}>
                        <input ref={inputRef} onChange={(e) => selectVideo(e, setTrim)} type="file" name="image" accept="video/*" hidden />
                        {videoElement}
                    </div>
                    <div style={{ scrollbarWidth: "none", WebkitOverflowScrolling: "touch" }} className="w-full p-1 h-full md:h-[400px] relative overflow-y-scroll">
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
                            onChange={(e) => {
                                if (e.target.value.length === 0) {
                                    handleChange(e)
                                    handleSearchChange(e)
                                } else handleSearchChange(e)

                            }}
                        />
                        {category.length > 0 && (
                            <>
                                <div style={{ scrollbarWidth: "none", WebkitOverflowScrolling: "touch" }} className="absolute w-full p-1 space-y-1 max-h-[150px] overflow-y-scroll bg-gray-200 z-50">
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
                        <div className="relative top-0">
                            <input
                                type="text"
                                value={data.Tags}
                                placeholder="set hashtags for Recommendation ..."
                                className="w-full relative flex items-center text-sm mt-2 text-gray-200 p-3 rounded-md resize-none bg-slate-900 font-semibold"
                                name="Tags"
                                onChange={handleChange}
                            />
                            <div className="absolute right-2 top-2.5 w-6 h-6 flex items-center justify-center">
                                <button onClick={setTagUsers} className={`w-full h-full ${data.Tags.startsWith("#") && data.Tags[1] !== "#" && data.Tags.length > 2 ? "bg-blue-700" : "bg-gray-800"} rounded-md text-white flex items-center justify-center text-sm font-semibold`}><i className="fa fa-plus"></i></button>
                            </div>
                        </div>
                        <div className={`w-full h-[100px] p-1 gap-2 ${tags.length > 0 ? "grid grid-cols-2" : "flex flex-shrink-0 items-center justify-center"} mt-2 rounded-md bg-gray-400 overflow-y-scroll`} style={{ scrollbarWidth: "none", WebkitOverflowScrolling: "touch" }}>
                            {tags.length > 0 ?
                                <>
                                    {tags.map((tag, idx) => (
                                        <>
                                            <div className="w-full p-1 h-10 flex items-center rounded-lg justify-center relative font-semibold text-white text-sm bg-slate-800">
                                                <div style={{ scrollbarWidth: "none", WebkitOverflowScrolling: "touch" }} className="overflow-x-scroll w-[90%] cursor-auto" >
                                                    <h1>#{tag}</h1>
                                                </div>
                                                <div className="absolute right-2 h-5 w-5">
                                                    <button onClick={() => handleRemoveTags(idx)} className="w-full h-full flex p-1 rounded-md bg-red-500 items-center justify-center"><i className="fa fa-times"></i> </button>
                                                </div>
                                            </div>
                                        </>
                                    ))}
                                </> :
                                <>
                                    <h1 className="font-semibold text-sm">Add Hashtags</h1>
                                </>
                            }
                        </div>
                        {video && (
                            <div className="w-full h-20 mb-5 p-3">
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
                        <div className={`${video ? "mt-12" : "mt-2"} flex gap-2 items-center justify-center w-full h-14`}>
                            <button onClick={() => clear(handleClear)} className="bg-red-500 rounded-lg font-semibold text-white p-2 px-3 hover:bg-red-600">Clear</button>
                            <button onClick={() => trim && handleUpload(trim as File, setTrim)} className={`rounded-lg font-semibold p-2 px-3 ${trim ? "bg-blue-700 text-white hover:bg-blue-800" : "bg-gray-400 text-gray-600"}`}>Upload</button>
                        </div>
                        
                    </div>
                </div>
            </div>
        </Dialog>
    );
};

export default ShortsUpload;
