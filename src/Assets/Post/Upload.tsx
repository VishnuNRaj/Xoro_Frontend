import React, { memo } from 'react';

interface uploadProps {
  Media: File[];
  setMedia: React.Dispatch<React.SetStateAction<File[]>>;
}

const Upload: React.FC<uploadProps> = memo(({ Media, setMedia }) => {
  console.log(Media)
  return <></>
})
export default Upload