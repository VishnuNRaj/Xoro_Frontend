import { LinearProgress } from '@mui/joy'
import React from 'react'
import { useProgress } from '../../Functions/ProgressContext'

const Progressbar: React.FC = () => {
    const { progress } = useProgress()
    console.log(progress,"_____")
    return (
        <div>
            {progress && (
                <LinearProgress
                    determinate
                    variant="outlined"
                    color="neutral"
                    size="sm"
                    thickness={24}
                    value={progress}
                    sx={{
                        '--LinearProgress-radius': '20px',
                        '--LinearProgress-thickness': '24px',
                    }}
                >    </LinearProgress>
            )}
        </div>
    )
}

export default Progressbar