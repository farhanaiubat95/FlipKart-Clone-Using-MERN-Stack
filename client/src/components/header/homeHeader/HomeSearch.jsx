import SearchIcon from '@mui/icons-material/Search'

const HomeSearch = () => {
  return (
    <div className="w-full px-4">
      <div className="flex items-center  bg-[#f0f4ff] rounded-sm h-10 px-4 shadow-sm">
        <SearchIcon className="text-gray-400 mr-2" />
        <input
          type="text"
          placeholder="Search for Products, Brands and More"
          className="w-full bg-transparent outline-none text-gray-700 placeholder:text-gray-500 text-sm sm:text-base"
        />
      </div>
    </div>
  )
}

export default HomeSearch
