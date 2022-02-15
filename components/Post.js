import Moment from 'react-moment'
import MoreHorizRoundedIcon from '@mui/icons-material/MoreHorizRounded'
import CommentIcon from '@mui/icons-material/ModeCommentOutlined'
import DeleteIcon from '@mui/icons-material/DeleteOutlineOutlined'
import RefreshIcon from '@mui/icons-material/CachedOutlined'
import FavoriteIcon from '@mui/icons-material/Favorite'
import FavoriteIconOutlined from '@mui/icons-material/FavoriteBorderOutlined'
import ShareIcon from '@mui/icons-material/Share'
import UploadIcon from '@mui/icons-material/UploadRounded'

import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useRecoilState } from 'recoil'
import { modalOpenState, singlePostState } from '../atoms/modalAtom'

const Post = ({ post, postPage, inModal }) => {

    const { data: session } = useSession()
    const router = useRouter()
    const [modalOpen, setModalOpen] = useRecoilState(modalOpenState)
    const [singlePost, setSinglePost] = useRecoilState(singlePostState)
    const [likes, setLikes] = useState(post?.likes ?? [])
    const [liked, setLiked] = useState(post?.liked ?? false)

    const likePost = async () => {
        
        if(liked) { // dislike
            setLikes(
                likes.filter(email => email != session?.user?.email)
            )
        } else { // like
            setLikes([...likes, session.user.email])
        }

        setLiked(!liked)
        const body = {
            action: 'updateLikes',
            email: post.email
        }
        const response = await fetch(`/api/post/${post._id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                action: 'updateLikes',
                email: post.email
            })
        })
    }

    const deletePost = async () => {
        const request = await fetch(`/api/post/${post._id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        router.push('/home')
    }

    return (
        <div 
            className={`p-3 flex cursor-pointer border-b border-gray-200 transition duration-300 ease-linear ${ !postPage && !inModal && 'hover:bg-gray-100 hover:bg-opacity-80'}`}
            onClick={() => {
                if(!postPage && !inModal) router.push(`/post/${post._id}`)
            }}
        >
            {!postPage && (
                <img 
                    src={ post?.userImage } 
                    alt="Profile picture"
                    className="h-11 w-11 rounded-full mr-4" 
                />
            )}
            <div className="flex flex-col space-y-2 w-full">
                <div className={`flex ${!postPage && "justify-between"}`}>
                    {postPage && (
                        <img 
                            src={post?.userImage}
                            alt="Profile picture"
                            className="h-11 w-11 rounded-full mr-4"
                        />
                    )}
                    <div>
                        <div className="inline-block group">
                            <h4 className={`font-bold text-base group-hover:underline ${!postPage && 'inline-block'}`}>{ post?.username }</h4>
                            <span className={`text-sm ${!postPage && 'ml-1.5'}`}>@{ post?.email }</span>
                        </div>
                        <span className="m-1">·</span>
                        <span className="hover:underline text-sm">
                            <Moment fromNow>{new Date(post?.timestamp)}</Moment>
                        </span>
                        {!postPage && (
                            <p className="text-base mt-0.5">
                                {post?.input}
                            </p>
                        )}
                    </div>
                    {!inModal && (
                        <div className="icon hoverAnimation group hover:text-blue-200 h-8 w-8 flex-shrink-0 ml-auto">
                            <MoreHorizRoundedIcon className="h-5 w-5 text-black/80 group-hover:text-blue-500" />
                        </div>
                    )}
                </div>
                {postPage && (
                    <p className="text-base mt-0.5">
                        {post?.input}
                    </p>
                )}
                <img
                    src={post?.imageUrl}
                    alt=""
                    className="rounded-2xl max-h-[700px] object-cover"
                />
                
                {!inModal && (
                    <div className={`flex justify-between w-10/12 ${postPage && 'mx-auto'}`}>
                        <div
                            className="flex items-center space-x-1 group"
                            onClick={(e) => {
                                e.stopPropagation();
                                setSinglePost(post);
                                setModalOpen(true);
                            }}
                        >
                            <div className="icon group-hover:bg-[#1d9bf0] group-hover:bg-opacity-10">
                                <CommentIcon className="h-5 group-hover:text-[#1d9bf0]" />
                            </div>
                            {post?.comments?.length > 0 && (
                            <span className="group-hover:text-[#1d9bf0] text-sm">
                                {post.comments.length}
                            </span>
                            )}
                        </div>

                        {session?.user?.email === post?.email ? (
                            <div
                            className="flex items-center space-x-1 group"
                            onClick={(e) => {
                                e.stopPropagation();
                                deletePost();
                            }}
                            >
                            <div className="icon group-hover:bg-red-600/10">
                                <DeleteIcon className="h-5 group-hover:text-red-600" />
                            </div>
                            </div>
                        ) : (
                            <div className="flex items-center space-x-1 group">
                            <div className="icon group-hover:bg-green-500/10">
                                <RefreshIcon className="h-5 group-hover:text-green-500" />
                            </div>
                            </div>
                        )}

                        <div
                            className="flex items-center space-x-1 group"
                            onClick={(e) => {
                                e.stopPropagation();
                                likePost();
                            }}
                        >
                            <div className="icon group-hover:bg-pink-600/10">
                                {liked ? (
                                    <FavoriteIcon className="h-5 text-pink-600" />
                                ) : (
                                    <FavoriteIconOutlined className="h-5 group-hover:text-pink-600" />
                                )}
                            </div>
                            {likes.length > 0 && (
                                <span
                                    className={`group-hover:text-pink-600 text-sm ${
                                    liked && "text-pink-600"
                                    }`}
                                >
                                    {likes.length}
                                </span>
                            )}
                        </div>

                        <div className="icon group">
                            <ShareIcon className="h-5 group-hover:text-[#1d9bf0]" />
                        </div>
                        <div className="icon group">
                            <UploadIcon className="h-5 group-hover:text-[#1d9bf0]" />
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Post
