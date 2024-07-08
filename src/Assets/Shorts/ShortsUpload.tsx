import React, { SetStateAction, useMemo } from "react";
import { Dialog } from "@material-tailwind/react";
import { useUploadShorts } from "./Hooks";

interface Props {
    open: boolean;
    setOpen: React.Dispatch<SetStateAction<boolean>>;
}

const ShortsUpload: React.FC<Props> = ({ open, setOpen }) => {
    const { video, selectVideo, inputRef, data, handleChange,clear } = useUploadShorts();

    const videoElement = useMemo(() => {
        if (video) {
            return (
                <video controls className="md:w-[225px] w-full flex-shrink-0 rounded-md h-[300px] md:h-[400px]" src={URL.createObjectURL(video)}></video>
            );
        }
        return (
            <div onClick={() => inputRef.current?.click()} className="w-full p-2 rounded-md h-full">
                <div className="w-full p-2 flex items-center justify-center rounded-md h-full">
                    <button className="text-gray-400 hover:text-white"><i className="fa fa-upload text-3xl"></i></button>
                </div>
            </div>
        );
    }, [video, inputRef]);

    return (
        <Dialog className="" size="xs" open={open} handler={() => setOpen(!open)} placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
            <div className="w-full p-1 md:flex">
                <div className="p-2 w-full border-2 rounded-lg md:flex border-gray-400">
                    <div className="md:w-[225px] w-full flex-shrink-0 bg-gray-800 rounded-md h-[300px] md:h-[400px]">
                        <input ref={inputRef} onChange={selectVideo} type="file" name="image" accept="video/*" hidden />
                        {videoElement}
                    </div>
                    <div className="w-full p-1 h-full relative">
                        <textarea
                            placeholder="Enter Caption..."
                            className="w-full text-sm text-gray-200 p-3 rounded-md resize-none bg-gray-800 font-semibold"
                            rows={4}
                            value={data.Caption}
                            onChange={handleChange}
                            name="Caption"
                        >
                            {data.Caption}
                        </textarea>
                        <input
                            type="text"
                            value={data.Context}
                            placeholder="Content Type..."
                            className="w-full text-sm text-gray-200 p-3 rounded-md resize-none bg-gray-800 font-semibold"
                            name="Context"
                            onChange={handleChange}
                        />
                        <input
                            type="text"
                            value={data.Tags}
                            placeholder="set hashtags for Recommendation ..."
                            className="w-full text-sm mt-2 text-gray-200 p-3 rounded-md resize-none bg-gray-800 font-semibold"
                            name="Tags"
                            onChange={handleChange}
                        />
                        <div className="bottom-1 mt-2 flex gap-2 items-center justify-center w-full h-14">
                            <button onClick={clear} className="bg-red-500 rounded-lg font-semibold text-white p-2 px-3">Clear</button>
                            <button className="bg-blue-700 rounded-lg font-semibold text-white p-2 px-3">Upload</button>
                        </div>
                    </div>
                </div>
            </div>
        </Dialog>
    );
};

export default ShortsUpload;
