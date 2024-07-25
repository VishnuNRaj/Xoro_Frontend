import { useEffect, useState } from 'react'
import { createFFmpeg, fetchFile, FFmpeg } from "@ffmpeg/ffmpeg";
import { toast } from 'sonner';

interface props {
    video: File | null;
};

const useSlider = ({ video }: props) => {
    const [duration, setDuration] = useState<number>(0)
    const [trim, setTrim] = useState<File | Blob | null>(null)
    const [start, setStart] = useState<number>(0)
    const [end, setEnd] = useState<number>(0)
    const [ffmpeg, setFFmpeg] = useState<FFmpeg | null>(null)
    useEffect(() => {
        if (video) {
            const ffmpegData = createFFmpeg({ log: true })
            setFFmpeg(ffmpegData)
            const videoElement = document.createElement('video');
            videoElement.src = URL.createObjectURL(video);
            videoElement.onloadedmetadata = () => {
                console.log(videoElement.duration)
                setDuration(videoElement.duration);
                setEnd(videoElement.duration >= 60 ? 60 : videoElement.duration);
            };
        }
    }, [video]);
    const handleTrimVideo = async () => {
        if (video && ffmpeg) {
            try {
                if (!ffmpeg.isLoaded()) {
                    await ffmpeg.load();
                }
                await ffmpeg.FS('writeFile', 'input.mp4', await fetchFile(video));
                await ffmpeg.run('-i', 'input.mp4', '-ss', `${start}`, '-to', `${end}`, '-c', 'copy', 'output.mp4');
                const data = await ffmpeg.FS('readFile', 'output.mp4');
                const trimmedVideo = new Blob([data.buffer], { type: 'video/mp4' });
                console.log(trimmedVideo)
                setTrim(trimmedVideo);
                // ffmpeg.exit()
            } catch (error) {
                console.error('Error trimming video:', error);
                ffmpeg.exit()
            }
        }
    };
    const handleSlide = (_e: any, newValue: any) => {
        console.log(newValue[0], newValue[1], duration, "______", start, "_____", end)
        if (newValue[1] - newValue[0] <= 10) {
            return toast.warning("Minimum 10 Seconds")
        };
        if (newValue[1] - newValue[0] >= 60) {
            return toast.warning("Maximum 1 Minute Allowed")
        }
        setStart(newValue[0])
        setEnd(newValue[1])
    }
    const convertToHHMMSS = (val: number) => {
        const secNum = parseInt(val.toString(), 10);
        let hours: string | number = Math.floor(secNum / 3600);
        let minutes: string | number = Math.floor((secNum - hours * 3600) / 60);
        let seconds: string | number = secNum - hours * 3600 - minutes * 60;

        if (hours < 10) {
            hours = '0' + hours;
        }
        if (minutes < 10) {
            minutes = '0' + minutes;
        }
        if (seconds < 10) {
            seconds = '0' + seconds;
        }
        let time;
        if (hours === '00') {
            time = minutes + ':' + seconds;
        } else {
            time = hours + ':' + minutes + ':' + seconds;
        }
        return time;
    };
    const valueText = (value: number) => {
        return `${convertToHHMMSS(value)}`;
    }
    return { start, end, trim, duration, handleTrimVideo, handleSlide, valueText, setTrim }
}


export default useSlider