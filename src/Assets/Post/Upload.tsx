import React, { memo, useState, useEffect } from 'react';
import { resetState } from '../../Store/UserStore/Authentication/AuthSlice';
import { addPost } from '../../Store/UserStore/Post-Management/PostSlice';
import { FormInput } from '../Components/Input';
import Preloader from '../Components/Preloader';
import { resetStateProfile, searchUsers } from '../../Store/UserStore/ProfileManagement/ProfileSlice';
import { useEssentials, getCookie, useToast, } from '../../Functions/CommonFunctions';

const MediaMap: React.FC<uploadProps> = memo(({ Media }) => {
  const [show, setShow] = useState<File>(Media[0])

  return (
    <>
      <div className=''>
        {Media.length > 0 && (
          <>
            {
              show.type.startsWith('image') ? (
                <img className="h-60 w-72 object-cover aspect-square rounded-lg" src={URL.createObjectURL(show)} alt="" />

              ) : (
                <video src={URL.createObjectURL(show)} className='h-auto max-w-full rounded-lg' controls={false} onMouseOver={(e) => {
                  e.currentTarget.controls = true;
                }} onMouseOut={(e) => {
                  e.currentTarget.controls = false;
                }} ></video>
              )
            }
          </>
        )}
      </div>
      <div className="grid grid-cols-4 gap-4">
        {Media.map((img: File) => (
          show.name !== img.name && (
            <div key={URL.createObjectURL(img)} className='aspect-square bg-black rounded-lg'>
              {img.type.startsWith('image') ? (
                <img className="w-full aspect-square object-cover rounded-lg hover:p-2 animate-popup" onClick={() => setShow(img)} src={URL.createObjectURL(img)} alt="" />
              ) : (
                <video src={URL.createObjectURL(img)} className=' aspect-square h-auto max-w-full rounded-lg' controls={false} onClick={() => setShow(img)}></video>
              )}
            </div>
          )
        ))}
      </div>
    </>
  )
})

interface uploadProps {
  Media: File[];
  setMedia: React.Dispatch<React.SetStateAction<File[]>>;
}

const Upload: React.FC<uploadProps> = memo(({ Media, setMedia }) => {

  const { dispatch, navigate, post, profile } = useEssentials()
  const { loadingPost } = post
  const { loadingProfile, users } = profile
  const [hashTag, setHash] = useState<string[]>([])
  const [Tag, setTag] = useState<{
    Username: string;
    _id: string;
    Profile: string;
  }[]>([])

  const [Form, SetForm] = useState<{
    Caption: string;
    Tags: string;
    Hashtags: string;
    CommentsOn: boolean;
    Hidden: boolean;
  }>({
    Caption: '',
    Tags: '',
    Hashtags: '',
    CommentsOn: true,
    Hidden: false,
  });
  const [error] = useState({
    Caption: '',
    Tags: '',
    Hashtags: ''
  });



  const searchUserData: Function = async (search: string) => {
    const token: string | undefined = getCookie('token');
    if (token) {
      if (search.length > 0) {
        dispatch(searchUsers({ token, search })).then((state: any) => {
          if (state.payload.status === 202) {
            return navigate('/login')
          }
        })
      } else {
        return dispatch(resetStateProfile())
      }
    } else {
      return navigate('/login')
    }

  }

  useEffect(() => {
    const Tag = Form.Tags
    if (Tag.length > 0) {
      searchUserData(Tag)
    }
  }, [Form.Tags])

  const upload = () => {
    const { Caption, CommentsOn, Hidden } = Form
    const token: string | undefined = getCookie('token')
    if (token) {
      dispatch(addPost({
        Caption, CommentsOn, Hidden, Tags: Tag.map((tag) => {
          return tag._id
        }), Hashtags: hashTag, Images: Media, token
      })).then((state: any) => {
        if (state.payload.status === 202) {
          dispatch(resetState())
          navigate('/login')
        } else {
          useToast(state.payload.message, 'success')
          return state.payload.status === 200 ? navigate('/profile') : null
        }
      })
    } else {
      dispatch(resetState())
      navigate('/login')
    }
  };

  return (
    <div>
      {loadingPost && <Preloader />}
      {Media.length > 0 && (
        <center>
          <div className='w-full'>
            <center>
              <div className="w-[90%] sm:w-[60%] md:w-[35%] bg-[#000] rounded-lg flex flex-col items-center p-5 justify-center">
                <div className="grid gap-4">
                  <MediaMap Media={Media} setMedia={setMedia} />
                </div>

                <div className='w-full'>
                  <div className="w-[100%] mt-5">
                    <FormInput error={error.Caption} label={'Caption'} name={'Caption'} placeholder={'Enter Caption'} type={'text'} onChange={(e) => SetForm({ ...Form, Caption: e.target.value })} value={Form.Caption} width={'w-full'} />
                  </div>
                  <div className="w-[90%] mt-5">
                    <label className="inline-flex items-center cursor-pointer">
                      <input type="checkbox" checked={Form.CommentsOn} onChange={() => SetForm({ ...Form, CommentsOn: !Form.CommentsOn })} className="sr-only peer" />
                      <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                      <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">Comment</span>
                    </label>
                    <label className="inline-flex items-center cursor-pointer ml-3">
                      <input type="checkbox" checked={Form.Hidden} onChange={() => SetForm({ ...Form, Hidden: !Form.Hidden })} className="sr-only peer" />
                      <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                      <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">Hidden</span>
                    </label>
                  </div>
                  <div className="w-full mt-5 h-11">
                    <FormInput error={error.Caption} label={'Hashtags'} name={'Hashtags'} placeholder={'Enter Hashtags'} type={'text'} onChange={(e) => SetForm({ ...Form, Hashtags: e.target.value })} value={Form.Hashtags} width={'w-[83%] float-left'} />
                    <button className='bg-blue-700 h-full w-[10%] text-white mx-2 rounded-md' onClick={() => {
                      const value = Form.Hashtags.trim().split('#')[1]
                      if (value) {
                        setHash([...hashTag, value])
                        SetForm({ ...Form, Hashtags: '' })
                      }
                    }} ><i className='fa fa-plus'></i></button>
                    <div className='w-auto grid grid-cols-3 float-left gap-2'>
                      {hashTag.map((tag, index) => (
                        <div key={index} className='bg-gray-200 mt-2 float-left px-3 p-1 rounded-md flex text-gray-900'>
                          <div className='w-[80%]' style={{ overflowX: 'scroll', WebkitOverflowScrolling: 'touch', scrollbarWidth: 'none' }}>
                            <div className='flex font-semibold flex-shrink-0 items-center'>
                              <h1>#{tag}</h1>
                            </div>
                          </div>
                          <div className='w-[12%] flex items-center' onClick={() => {
                            const updatedTags = [...hashTag];
                            updatedTags.splice(index, 1);
                            setHash(updatedTags);

                          }}>
                            <button className=' hover:bg-red-700 p-1 rounded-md flex items-center justify-center'><i className='fa fa-times'></i></button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  {/* tag___________________________ */}




                  <div className="w-full mt-5">
                    <FormInput error={error.Caption} label={'Tags'} name={'Tags'} placeholder={'Enter Username'} type={'text'} onChange={(e) => SetForm({ ...Form, Tags: e.target.value })} value={Form.Tags} width={'w-full mt-5 float-left'} />
                    <div style={{ overflowY: 'auto', WebkitOverflowScrolling: 'touch', scrollbarWidth: 'none' }} className='z-10 w-full mt-1 rounded-lg bg-white sticky max-h-[80px] overflow-y-auto scroll-m-0 scroll-smooth'>
                      {users.length > 0 && Form.Tags && users.map((user, index) => (
                        <div key={index}>
                          {loadingProfile && (
                            <div className='h-[80px]'>
                              <Preloader />
                            </div>
                          )}
                          {!loadingProfile && (
                            <div className={`w-full h-10 text-black float-left border-b-2 ${Tag.find((tag) => tag.Username === user.Username) ? 'opacity-70' : 'opacity-100 cursor-pointer'}`} onClick={() => {
                              if (!Tag.find((tag) => tag.Username === user.Username)) {
                                setTag([...Tag, { Username: user.Username ? user.Username : '', Profile: user.Profile ? user.Profile : '', _id: user._id }])
                                SetForm({ ...Form, Tags: '' })
                              }
                            }} >
                              <div className="float-left px-2 pt-1">
                                <img src={user.Profile} className='w-8 h-8 rounded-full border-2 border-white' alt="" />
                              </div>
                              <h1 className='pt-4 font-semibold'>{user.Username}</h1>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>

                    <div className="mt-2 w-full grid grid-cols-2 gap-4">
                      {Tag.map((tag, index) => (
                        <div key={index} className='bg-gray-200 w-full p-2 rounded-lg flex'>
                          <div className='w-[10%] mr-5 flex'>
                            <div className='flex-shrink-0'>
                              <img src={tag.Profile} className='w-6 h-6 rounded-full' alt="" />
                            </div>
                          </div>
                          <div className="w-[60%]">
                            <div className='flex items-center overflow-x-auto' style={{ overflowX: 'scroll', WebkitOverflowScrolling: 'touch', scrollbarWidth: 'none' }}>
                              <div className='flex-shrink-0 overflow-x-scroll' style={{ overflowX: 'scroll', WebkitOverflowScrolling: 'touch', scrollbarWidth: 'none' }}>
                                <p className='font-semibold'>{tag.Username}</p>
                              </div>
                            </div>
                          </div>
                          <div className='ml-[5%] flex items-center'>
                            <button className='w-full hover:bg-red-700 px-1.5 bg-transparent hover:text-white text-black' onClick={() => {
                              setTag(Tag.filter((taged) => taged._id !== tag._id))
                            }}>
                              <i className='fa fa-times'></i>
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>

                  </div>
                </div>

                <div className='w-full inline-block'>
                  <button onClick={upload} className='bg-blue-700 text-white p-2 px-3 rounded-md mt-5'>Upload</button>
                </div>
              </div>
            </center>
          </div>
        </center >
      )}
    </div >
  );

})
export default Upload


