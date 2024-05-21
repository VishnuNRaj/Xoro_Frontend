import React, { memo, useState } from 'react';
import { Offcanvas } from '../Components/Canvas';
import Cookies from 'js-cookie';
import { AppDispatch, RootState } from '../../Store/Store';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { resetState } from '../../Store/UserStore/Authentication/AuthSlice';
import { addPost } from '../../Store/UserStore/Post-Management/PostSlice';
import { FormInput } from '../Components/Input';
import { toast, ToastContainer } from 'react-toastify';
import Preloader from '../Components/Preloader';
import { resetStateProfile, searchUsers } from '../../Store/UserStore/ProfileManagement/ProfileSlice';
// import { User } from '../../Store/UserStore/Authentication/Interfaces';

const MediaMap: React.FC<uploadProps> = memo(({ Media, setMedia }) => {
  const [show, setShow] = useState<File>(Media[0])

  return (
    <>
      <div>
        {Media.length > 0 && (
          <>
            {
              show.type.startsWith('image') ? (
                <img className="h-auto max-w-full rounded-lg" src={URL.createObjectURL(show)} alt="" />

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
            <div key={URL.createObjectURL(img)} className='w-full h-full bg-black rounded-lg'>
              {img.type.startsWith('image') ? (
                <img className="h-auto max-w-full rounded-lg" onClick={() => setShow(img)} src={URL.createObjectURL(img)} alt="" />

              ) : (
                <video src={URL.createObjectURL(img)} className='h-auto max-w-full rounded-lg' controls={false} onMouseOver={(e) => {
                  e.currentTarget.controls = true;
                }} onMouseOut={(e) => {
                  e.currentTarget.controls = false;
                }} onClick={() => setShow(img)}></video>
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

  const dispatch: AppDispatch = useDispatch()
  const navigate = useNavigate()
  const { loadingPost } = useSelector((state: RootState) => state.post)
  const { loadingProfile, users } = useSelector((state: RootState) => state.profile)
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
    const token = Cookies.get('token');
    if (token) {
      if (search.length > 0) {
        dispatch(searchUsers({ token, search })).then((state: any) => {
          console.log(state)
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

  const upload = () => {
    const { Caption, CommentsOn, Hidden } = Form
    const token = Cookies.get('token')
    if (token) {
      dispatch(addPost({
        Caption, CommentsOn, Hidden, Tags: Tag.map((tag) => {
          return tag._id
        }), Hashtags: hashTag, Images: Media, token
      })).then((state: any) => {
        console.log(state)
        if (state.payload.status === 202) {
          dispatch(resetState())
          navigate('/login')
        } else {
          toast.success(state.payload.message, {
            position: 'top-center',
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
            progress: undefined,
            onClose: state.payload.status === 200 ? () => navigate('/profile') : undefined,
            style: {
              minWidth: '400px',
              fontSize: '14px'
            }
          });
        }
      })
    } else {
      dispatch(resetState())
      navigate('/login')
    }
  };

  return (
    <div>
      <Offcanvas />
      <ToastContainer />
      {loadingPost && <Preloader />}
      {Media.length > 0 && (
        <center>
          <div className='w-auto lg:w-[70%]'>
            <center>
              <div className=" w-auto md:w-[40%] bg-[#222] rounded-lg p-5">
                <div className="grid gap-4">
                  <MediaMap Media={Media} setMedia={setMedia} />
                </div>

                <div className="w-[90%] mt-5">
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
                <div className="w-[90%] mt-5">
                  <FormInput error={error.Caption} label={'Hashtags'} name={'Hashtags'} placeholder={'Enter Hashtags'} type={'text'} onChange={(e) => SetForm({ ...Form, Hashtags: e.target.value })} value={Form.Hashtags} width={'w-4/5 float-left'} />
                  <button className='bg-blue-700 w-10 h-11 text-white float-left mx-2 rounded-md' onClick={() => {
                    let value = Form.Hashtags.trim().split('#')[1]
                    if (value) {
                      setHash([...hashTag, value])
                      SetForm({ ...Form, Hashtags: '' })
                    }
                  }} ><i className='fa fa-plus'></i></button>
                  <div className='w-auto float-left space-x-2'>
                    {hashTag.map((tag, index) => (
                      <div key={index} className='bg-gray-200 mt-2 float-left p-2 px-3 rounded-md text-gray-900'>#{tag}</div>
                    ))}
                  </div>
                </div>
                {/* tag___________________________ */}




                <div className="w-[90%] mt-5 float-left">
                  <FormInput
                    error={error.Tags}
                    label={'Tag User'}
                    name={'Tag'}
                    placeholder={'Search'}
                    type={'text'}
                    onChange={(e) => {
                      SetForm({ ...Form, Tags: e.target.value.toString() })
                      searchUserData(e.target.value)
                    }}
                    value={Form.Tags}
                    width={'w-full'}
                  />
                  <div style={{ overflowY: 'auto', WebkitOverflowScrolling: 'touch', scrollbarWidth: 'none' }} className='z-10 float-left w-full mt-1 rounded-lg bg-white sticky max-h-[80px] overflow-y-auto scroll-m-0 scroll-smooth'>
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
                              // SetForm({ ...Form, Tags: '' })
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

                  <div className="mt-2 float-left">
                    {Tag.map((tag, index) => (
                      <div key={index} className="bg-gray-200 p-2 px-3 rounded-md text-gray-900 mr-2 float-left">
                        <div className="float-left px-2 pt-1">
                          <img src={tag.Profile} className='w-8 h-8 rounded-full border-2 border-white' alt="" />
                        </div>
                        <h1 className='pt-2 font-semibold float-left'>{tag.Username}</h1>
                        <div className=" float-left">
                          <button className='w-8 h-8 bg-transparent text-black' onClick={() => {
                            setTag(Tag.filter((taged) => taged._id !== tag._id))
                          }}><i className='fa fa-times'></i></button>
                        </div>
                      </div>
                    ))}
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


