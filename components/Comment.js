import MoreHorizRoundedIcon from '@mui/icons-material/MoreHorizRounded'
import CommentIcon from '@mui/icons-material/ModeCommentOutlined'
import FavoriteIconOutlined from '@mui/icons-material/FavoriteBorderOutlined'
import ShareIcon from '@mui/icons-material/Share'
import UploadIcon from '@mui/icons-material/UploadRounded'

const Comment = ({ comment }) => {
  return (
    <div className="p-3 flex cursor-pointer border-b border-gray-200 hover:bg-gray-100">
    <img
      src={comment?.userImage}
      alt=""
      className="h-11 w-11 rounded-full mr-4"
    />
    <div className="flex flex-col space-y-2 w-full">
      <div className="flex justify-between">
        <div>
          <div className="inline-block group">
            <h4 className="font-bold text-[15px] sm:text-base inline-block group-hover:underline">
              {comment?.username}
            </h4>
            <span className="ml-1.5 text-sm sm:text-[15px]">
              {comment?.email}{" "}
            </span>
          </div>{" "}
          ·{" "}
          {/* <span className="hover:underline text-sm sm:text-[15px]">
            <Moment fromNow>{newDate(comment?.timestamp?)}</Moment>
          </span> */}
          <p className="mt-0.5 max-w-lg text-[15px] sm:text-base">
            {comment?.input}
          </p>
        </div>
        <div className="icon group flex-shrink-0">
          <MoreHorizRoundedIcon className="h-5 group-hover:text-[#1d9bf0]" />
        </div>
      </div>

      {comment?.imageUrl && (
        <img
            src={comment?.imageUrl}
            alt=""
            className="rounded-2xl max-h-[700px] object-cover"
        />
      )}

      <div className="flex justify-between w-10/12">
        <div className="icon group">
          <CommentIcon className="h-5 group-hover:text-[#1d9bf0]" />
        </div>

        <div className="flex items-center space-x-1 group">
          <div className="icon group-hover:bg-pink-600/10">
            <FavoriteIconOutlined className="h-5 group-hover:text-pink-600" />
          </div>
          <span className="group-hover:text-pink-600 text-sm"></span>
        </div>

        <div className="icon group">
          <ShareIcon className="h-5 group-hover:text-[#1d9bf0]" />
        </div>
        <div className="icon group">
          <UploadIcon className="h-5 group-hover:text-[#1d9bf0]" />
        </div>
      </div>
    </div>
  </div>
  )
};

export default Comment;
