import React, { memo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
import { AppDispatch, } from '../../Store/Store';
import { useDispatch,  } from 'react-redux';
import { resetStateProfile, searchUsers } from "../../Store/UserStore/ProfileManagement/ProfileSlice";

const Search: React.FC = memo(() => {
  const navigate = useNavigate()
  const [search, setSearch] = useState<string>('')
  const dispatch: AppDispatch = useDispatch()

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
  // const { users, loadingProfile } = useSelector((state: RootState) => state.profile)
  return (
    <div className="w-full">
      <div className="relative w-full h-10">
        <div className="absolute grid w-5 h-5 place-items-center  top-2/4 right-3 -translate-y-2/4">
          <i className="fa fa-search cursor-pointer text-white" onClick={()=>{
            searchUserData(search)
          }} aria-hidden="true"></i>
        </div>
        <input
          className="peer md:w-full w-[80%] h-full bg-transparent text-white font-sans font-medium outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-white placeholder-shown:border-t-white border focus:border-2 focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] !pr-9 focus:border-white"
          placeholder="" value={search} onChange={(e) => setSearch(e.target.value)}
        />
        <label
          className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-white leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-white transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-white before:border-white peer-focus:before:!border-white after:border-white peer-focus:after:!border-white"
        >
          Search
        </label>
      </div>
      {/* <div style={{ overflowY: 'auto', WebkitOverflowScrolling: 'touch', scrollbarWidth: 'none' }} className='z-10 float-left w-full mt-1 rounded-lg bg-white sticky max-h-[80px] overflow-y-auto scroll-m-0 scroll-smooth'>
        {users.length > 0 && search && users.map((user, index) => (
          <div key={index}>
            {loadingProfile && (
              <div className='h-[80px]'>
                <Preloader />
              </div>
            )}
            {!loadingProfile && (
              <div className={`w-full h-10 text-black float-left border-b-2`} >
                <div className="float-left px-2 pt-1">
                  <img src={user.Profile} className='w-8 h-8 rounded-full border-2 border-white' alt="" />
                </div>
                <h1 className='pt-4 font-semibold'>{user.Username}</h1>
              </div>
            )}
          </div>
        ))}
      </div> */}
    </div>
  );
})

export default Search