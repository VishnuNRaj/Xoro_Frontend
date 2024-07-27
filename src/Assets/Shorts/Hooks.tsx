import { useRef, useState } from 'react';

export const useUploadShorts = () => {
  const [video, setVideo] = useState<File | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [search, setSearch] = useState("")
  const [data, setData] = useState<{ Caption: string; Tags: string; Context: string }>({
    Caption: '',
    Tags: '',
    Context: '',
  });
  const [tags, setTags] = useState<string[]>([]);

  // useEffect(() => {
  //   const ws = new WebSocket('ws://localhost:8000');

  //   ws.onopen = () => {
  //     console.log('Connected to WebSocket server');
  //   };

  //   ws.onclose = () => {
  //     console.log('Disconnected from WebSocket server');
  //   };

  //   ws.onerror = (error) => {
  //     console.error('WebSocket error:', error);
  //   };

  //   return () => {
  //     ws.close();
  //   };
  // }, []);

  const clear = (trim: any) => {
    setData({ Caption: '', Context: '', Tags: '' });
    setTags([]);
    setVideo(null);
    setSearch("")
    trim(null)
  };

  const selectVideo = (e: React.ChangeEvent<HTMLInputElement>, setTrim: any) => {
    const { files } = e.target;
    if (files && files.length > 0 && files[0].type.startsWith('video/')) {
      setVideo(files[0]);
      setTrim(files[0])
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const setTagUsers = () => {
    if (!data.Tags.startsWith('#') || data.Tags.length < 2 || data.Tags[1] === '#') return;
    const tag = data.Tags.split('#')[1];
    setTags([...tags, tag]);
    setData({ ...data, Tags: '' });
  };

  const handleContext = (name:string) => {
      setData({...data,Context:name})
  }

  const handleUpload = () => {
    if (!video) return;
    // const ws = new WebSocket('ws://localhost:8000');

    // ws.onopen = () => {
    //   console.log('Connected to WebSocket server');
    //   const reader = new FileReader();
    //   reader.onload = () => {
    //     const arrayBuffer = reader.result;
    //     if (arrayBuffer) {
    //       const blob = new Blob([arrayBuffer], { type: 'video/flv' });
    //       console.log(blob);
    //       ws.send(blob);
    //     }
    //   };
    //   reader.readAsArrayBuffer(video);
    // };

    // ws.onerror = (error) => {
    //   console.error('WebSocket error:', error);
    // };

    // ws.onclose = () => {
    //   console.log('Disconnected from WebSocket server');
    // };
  };

  return { video, selectVideo, clear, data, inputRef, handleChange,handleContext, setTagUsers, handleUpload, search, setSearch };
};
