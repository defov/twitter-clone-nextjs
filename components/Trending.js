import MoreHorizRoundedIcon from "@mui/icons-material/MoreHorizRounded";

const Trending = ({trending}) => {
  return (
    <div className="hover:bg-gray-200 px-4 py-2 cursor-pointer transition duration-200 ease-out flex items-center justify-between">
      <div className="space-y-0.5">
        <p className="text-[#6e767d] text-xs font-medium">{trending.heading}</p>
        <h6 className="font-bold max-w-[250px] text-sm">
          {trending.description}
        </h6>
        <p className="text-[#6e767d] text-xs font-medium max-w-[250px]">
          Trending with{" "}
          {trending.tags.map((tag, index) => (
            <span className="tag" key={index}>
              {tag}
            </span>
          ))}
        </p>
      </div>

      {trending.img ? (
        <img
          src={trending.img}
          className="h-[70px] w-[70px] object-cover rounded-2xl"
        />
      ) : (
        <div className="icon group">
          <MoreHorizRoundedIcon className="h-5 text-[#6e767d] group-hover:text-[#1d9bf0]" />
        </div>
      )}
    </div>
  )
}

export default Trending;
