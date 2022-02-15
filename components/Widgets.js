import SearchIcon from '@mui/icons-material/SearchRounded'
import Trending from './Trending'
import { trending, follow } from '../data'

const Widgets = () => {
  return (
    <div className="hidden lg:inline ml-8 xl:w-[450px] space-y-5">
      <div className="sticky top-0 py-1.5 bg-white z-50 w-11/12 xl:w-9/12">
        <div className="flex items-center bg-gray-100 p-3 rounded-full relative">
          <SearchIcon className="text-gray-500 h-5 z-50" />
          <input
            type="text"
            className="bg-transparent placeholder-gray-500 outline-none absolute inset-0 pl-11 border border-transparent w-full focus:border-[#1d9bf0] rounded-full focus:bg-white focus:shadow"
            placeholder="Search Twitter"
          />
        </div>
      </div>
        
      <div className="text-black bg-gray-100 space-y-3 pt-2 rounded-xl w-11/12 xl:w-9/12">
        <h4 className="font-bold text-xl px-4">What's happening</h4>
        {trending.map((result, index) => (
          <Trending key={index} trending={result} />
        ))}
        <button className="hover:bg-gray-200 rounded-b-xl px-4 py-3 cursor-pointer transition duration-200 ease-out flex items-center justify-between w-full text-[#1d9bf0] font-light">
          Show more
        </button>
      </div>

      <div className="text-black space-y-3 bg-gray-100 pt-2 rounded-xl w-11/12 xl:w-9/12">
        <h4 className="font-bold text-xl px-4">Who to follow</h4>
        {follow.map((result, index) => (
          <div
            className="relative hover:bg-gray-200 px-4 py-2 cursor-pointer transition duration-200 ease-out flex items-center"
            key={index}
          >
            <img
              src={result.userImg}
              className="h-12 w-12 object-cover rounded-full"
            />
            <div className="ml-4 leading-5 group">
              <h4 className="font-bold group-hover:underline">
                {result.username}
              </h4>
              <h5 className="text-gray-500 text-[15px]">{result.tag}</h5>
            </div>
            <button className="ml-auto bg-black text-white rounded-full font-bold text-sm py-1.5 px-3.5">
              Follow
            </button>
          </div>
        ))}
        <button className="hover:bg-gray-200 rounded-b-xl px-4 py-3 cursor-pointer transition duration-200 ease-out flex items-center justify-between w-full text-[#1d9bf0] font-light">
          Show more
        </button>
      </div>
    </div>
  )
}

export default Widgets;
