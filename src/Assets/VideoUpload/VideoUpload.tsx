import React, { useState } from 'react'
import AddDetails from './AddDetails'
import SelectVideo from './VideoSelect'
const VideoUpload: React.FC = () => {
    const [Video, setVideo] = useState<File | null>(null)
    const [Thumbnail, setThumbnail] = useState<string[]>([])
    console.log(Video, Thumbnail)
    return (
        <div>
            {Thumbnail.length === 0 && <SelectVideo Video={Video} setVideo={setVideo} setThumbnail={setThumbnail} />}
            {Thumbnail.length > 0 && Video && <AddDetails Video={Video} Thumbnail={Thumbnail} setThumbnail={setThumbnail} />}
        </div>
    )
}

export default VideoUpload