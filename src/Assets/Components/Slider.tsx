import { useEffect, useState } from 'react'
import { toast } from 'sonner';
import { trimVideo } from '../../Store/UserStore/CommonManagements/CommonService';
import { getCookie } from '../../Functions/CommonFunctions';

interface props {
    video: File | null;
    type?:string
};


const useSlider = ({ video,type }: props) => {
    const [duration, setDuration] = useState<number>(0)
    const [trim, setTrim] = useState<File | Blob | null>(null)
    const [start, setStart] = useState<number>(0)
    const [end, setEnd] = useState<number>(0)
    useEffect(() => {
        if (video) {
            const videoElement = document.createElement('video');
            videoElement.src = URL.createObjectURL(video);
            videoElement.onloadedmetadata = () => {
                console.log(videoElement.duration)
                setDuration(videoElement.duration);
                setEnd(videoElement.duration >= 60 && !type ? 60 : videoElement.duration);
            };
        }
    }, [video]);
    const handleTrimVideo = async () => {
        if (video) {
            try {
                const token = getCookie("token")
                const response: Blob = await trimVideo({ end, start, token, video })
                const trimmedVideo = new Blob([response], { type: 'video/mp4' });
                setTrim(new File([trimmedVideo], "trimmed-video.mp4", { type: "video/mp4" }));
            } catch (error) {
                console.error('Error trimming video:', error);
            }
        }
    };
    const handleSlide = (_e: any, newValue: any) => {
        if (newValue[1] - newValue[0] <= 10) {
            return toast.warning("Minimum 10 Seconds")
        };
        if (newValue[1] - newValue[0] >= 60 && !type) {
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