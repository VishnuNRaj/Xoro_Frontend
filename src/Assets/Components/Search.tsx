import React, { memo, useState, useEffect, useCallback } from "react";
import { searchUsers } from "../../Store/UserStore/ProfileManagement/ProfileSlice";
import { useEssentials,getCookie } from '../../Functions/CommonFunctions'
import { User } from "../../Store/UserStore/Authentication/Interfaces";
import { PostImage } from "../../Store/UserStore/Post-Management/Interfaces";
import debounce from 'lodash/debounce';

interface DataInterface {
  users: User[],
  post: PostImage[],
  video: any[],
  live: any[]
}

interface SearchProps {
  data: DataInterface;
  setData: React.Dispatch<React.SetStateAction<DataInterface>>;
}

const Search: React.FC<SearchProps> = memo(({ data,setData }) => {
  const {navigate,dispatch} = useEssentials();
  const [search, setSearch] = useState<string>('');

  const handleSearch = useCallback(
    debounce(async (search: string) => {
      const token = getCookie('token');
      if (token) {
        if (search.length > 0) {
          const state:any = await dispatch(searchUsers({ token, search }));
          if (state.payload.status === 202) {
            navigate('/login');
          }
          setData({...data,users:state.payload.users})
        } else {
          setData({...data,users:[]})
        }
      } else {
        navigate('/login');
      }
    }, 300),
    []
  );

  useEffect(() => {
    handleSearch(search);
    return () => {
      handleSearch.cancel();
    };
  }, [search, handleSearch]);

  return (
    <div className="w-full">
      <div className="relative w-full h-10">
        <input
          className="text-white font-medium border-2 shadow-md shadow-black border-gray-900 focus:border-2 placeholder:font-normal bg-gray-700 focus:border-black w-full p-2 px-3 rounded-lg"
          placeholder="Search..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value)
            handleSearch(e.target.value)
          }}
        />
      </div>
    </div>
  );
});

export default Search;
