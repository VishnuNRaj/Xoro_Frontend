import React, { SetStateAction, useEffect, useState } from 'react';
import { Comments } from '../../Store/UserStore/CommonManagements/interfaces';
import { useComments } from './Hooks';
import { User } from '../../Store/UserStore/Authentication/Interfaces';

interface Props {
    setComments: React.Dispatch<SetStateAction<Comments[]>>;
    comments: Comments[];
    PostId: string;
}

const CommentList: React.FC<{ tags: User[]; value: string[] }> = ({ tags, value }) => {
    const [values, setValues] = useState<string[]>([]);

    useEffect(() => {
        const updatedValues = [...value];
        let valuesChanged = false;

        updatedValues.forEach((data, idx, arr) => {
            if (idx > 0 && arr[idx - 1] === "@") {
                const response = tags.find((tag) => tag._id === data);
                if (response) {
                    arr[idx] = "@" + response.Username;
                    arr[idx - 1] = " ";
                    valuesChanged = true;
                }
            }
        });

        if (valuesChanged) {
            setValues(updatedValues);
        } else {
            setValues(value);
        }
    }, [tags, value]);

    return (
        <>
            {values.map((data, index) => (
                <span className='text-gray-900 font-semibold text-sm' key={index}>{data}</span>
            ))}
        </>
    );
};

const CommentComponent: React.FC<Props> = ({ PostId }) => {
    const { text, addComment, users, addTag, upload, comments, setComments } = useComments({ PostId });

    return (
        <div className='p-2'>
            <div className='relative w-full'>
                <div className='w-full bg-violet-300 h-[380px]' style={{ overflowY: "auto", scrollbarWidth: "none" }}>
                    {users ? (
                        <div style={{ overflowX: "scroll", scrollbarWidth: "none", WebkitOverflowScrolling: "touch" }} className='grid grid-cols-1 p-2 rounded-md'>
                            {users.length > 0 ? users.map((usr) => (
                                <div className='w-full h-12 p-2 gap-2 flex items-center justify-center bg-gray-400' key={usr._id}>
                                    <div onClick={() => addTag(usr.Username, usr._id)} className='flex items-center justify-center w-full h-10 bg-violet-200'>
                                        <div className='h-8 w-8'>
                                            <img src={usr.Profile} className='w-8 h-8 rounded-full' alt="" />
                                        </div>
                                        <div className='flex ml-3'>
                                            <h1 className='text-gray-900 font-semibold text-lg'>{usr.Username}</h1>
                                        </div>
                                    </div>
                                </div>
                            )) : (
                                <>Tag Users</>
                            )}
                        </div>
                    ) : (
                        comments.map((comment,idx) => (
                            <div className='w-full flex flex-col-1 relative' key={idx}>
                                <div className='p-1'>
                                    <div className='w-auto bg-blue-200 rounded-md p-2 block'>
                                        <div className='text-sm font-semibold text-gray-900'>
                                            {comment.Comment.length > 0 && <CommentList value={comment.Comment} tags={comment.comments.tags} />}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
            <div className='p-2'>
                <div className='flex flex-row justify-between space-x-5 h-12'>
                    <div className='w-full'>
                        <textarea value={text} onChange={addComment} rows={2} style={{ overflowY: "auto", scrollbarWidth: "none" }} className='resize-none p-3 font-semibold w-full h-12 border-2 border-gray-700 rounded-md'></textarea>
                    </div>
                    <div className='w-12 h-12'>
                        <button onClick={async () => {
                            const response: any = await upload(PostId);
                            if (response) setComments([...comments, response]);
                        }} className='w-12 h-12 p-3 text-white bg-blue-700 rounded-md flex justify-center items-center'>
                            <svg fill="#fff" viewBox="0 0 48 48"><path d="M47.8 3.8c-.3-.5-.8-.8-1.3-.8h-45C.9 3.1.3 3.5.1 4S0 5.2.4 5.7l15.9 15.6 5.5 22.6c.1.6.6 1 1.2 1.1h.2c.5 0 1-.3 1.3-.7l23.2-39c.4-.4.4-1 .1-1.5zM5.2 6.1h35.5L18 18.7 5.2 6.1zm18.7 33.6l-4.4-18.4L42.4 8.6 23.9 39.7z"></path></svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CommentComponent;
