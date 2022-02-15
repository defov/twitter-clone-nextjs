import { useState, useRef } from 'react'
import { useSession } from 'next-auth/react'
import ImageIcon from '@mui/icons-material/ImageOutlined'
import GifIcon from '@mui/icons-material/GifBoxOutlined'
import PollIcon from '@mui/icons-material/PollOutlined'
import EmojiIcon from '@mui/icons-material/SentimentSatisfiedOutlined'
import ScheduleIcon from '@mui/icons-material/ScheduleOutlined'
import LocationIcon from '@mui/icons-material/LocationOnOutlined'
import CloseIcon from '@mui/icons-material/Close'
import "emoji-mart/css/emoji-mart.css"
import { Picker } from 'emoji-mart'
import { useRouter } from 'next/router'
import { useRecoilState } from 'recoil'
import { modalOpenState, singlePostState } from '../atoms/modalAtom'

const Input = ({ postId, hideBorder }) => {
    const { data: session } = useSession()
    const router = useRouter()
    const [modalOpen, setModalOpen] = useRecoilState(modalOpenState)
    const [singlePost, setSinglePost] = useRecoilState(singlePostState)
    const [input, setInput] = useState('')
    const [selectedFile, setSelectedFile] = useState(null)
    const [showEmojis, setShowEmojis] = useState(false)
    const [loading, setLoading] = useState(false)
    const filePickerRef = useRef(null)

    const marginTop = postId ? '-465px' : '465px'

    const addImageToPost = (e) => {
        const reader = new FileReader();

        if(e.target.files[0]) {
            reader.readAsDataURL(e.target.files[0])
        }

        reader.onload = (readerEvent) => {
            setSelectedFile(readerEvent.target.result)
        }
        
    }

    const addEmoji = (e) => {
        let sym = e.unified.split('-')
        let codesArray = []
        sym.forEach((el) => codesArray.push('0x' + el))
        let emoji = String.fromCodePoint(...codesArray)
        setInput(input + emoji)
    }

    const uploadImage= async () => {
        if(selectedFile) {
            const body = new FormData();
            body.append("file", filePickerRef.current.files[0]);
            const uploadResponse = await fetch("/api/upload", {
                method: "POST",
                body
            });
            const { imageUrl } = await uploadResponse.json()
            if(imageUrl) {
                return imageUrl
            }
        }
        return null
    }

    const sendPost = async () => {
        if(loading) return
        setLoading(true)

        const data = {
            input,
            username: session.user.name,
            email: session.user.email,
            userImage: session.user.image
        }

        const imageUrl = await uploadImage()
        if(imageUrl) {
            data.imageUrl = imageUrl
        }

        const response = await fetch('/api/posts', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const responseData = await response.json()

        setLoading(false)
    
        setModalOpen(false)
        setSinglePost(null)
        setInput("")
        setSelectedFile(null)
        setShowEmojis(false)
        router.push('/home')
    }

    const sendComment = async () => {
        if(loading) return
        setLoading(true)

        const data = {
            input,
            action: 'addComment',
            username: session.user.name,
            email: session.user.email,
            userImage: session.user.image
        }

        const imageUrl = await uploadImage()
        if(imageUrl) {
            data.imageUrl = imageUrl
        }

        const response = await fetch(`/api/post/${postId}`, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const responseData = await response.json()

        setLoading(false);
        setModalOpen(false)
        setSinglePost(null)
        setInput("")
        setSelectedFile(null)
        setShowEmojis(false)
        router.push(`/post/${postId}`)
    }

    return (
        <div className={`${!hideBorder && 'border-b border-gray-200'} p-3 flex space-x-3 oveflow-y-scroll ${loading && 'opacity-60'}`}>
            <img 
                src={session?.user?.image} 
                alt=""
                className="h-11 w-11 rounded-full cursor-pointer m-2"
            />
            <div className="w-full">
                <div>
                    <textarea
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        rows="2"
                        placeholder={postId ? "Reply with Tweet" : "What's happening?"}
                        disabled={loading}
                        className='bg-transparent outline-none text-lg tracking-wide w-full overflow-y-clip min-h-[50px] resize-none'
                    />
                    { selectedFile && (
                        <div className='relative my-3'>
                            <div
                                className='absolute w-8 h-8 bg-black/30 hover:bg-black/70 transition rounded-full flex items-center justify-center top-1 left-1 cursor-pointer'
                                onClick={() => setSelectedFile(null)}
                            >
                                <CloseIcon className='text-white h-5'/>
                            </div>
                            <img
                                src={selectedFile}
                                alt=""
                                className='rouded-2xl max-h-80 object-contain' 
                            />
                        </div>
                    )}
                    {!loading && (
                        <div className='flex justify-between items-center pt-3 border-t border-gray-200'>
                            <div className='flex items-center justify-start gap-x-1 relative'>
                                <div 
                                    className='hoverAnimation hover:bg-blue-100 w-8 h-8 flex items-center justify-center xl-px-0 ml-auto'
                                    onClick={() => filePickerRef.current.click()}
                                >
                                    <ImageIcon className='w-6 h-6 textBlue' />
                                    <input
                                        type="file"
                                        hidden
                                        accept=".png, .jpg, .jpeg"
                                        onChange={addImageToPost}
                                        ref={filePickerRef}
                                    />
                                </div>
                                <div className='hoverAnimation hover:bg-blue-100 w-8 h-8 flex items-center justify-center xl-px-0 ml-auto'>
                                    <GifIcon className='w-6 h-6 textBlue' />
                                </div>
                                <div className='hoverAnimation hover:bg-blue-100 w-8 h-8 flex items-center justify-center xl-px-0 ml-auto'>
                                    <PollIcon className='w-6 h-6 textBlue' />
                                </div>
                                <div
                                    className='hoverAnimation hover:bg-blue-100 w-8 h-8 flex items-center justify-center xl-px-0 ml-auto'
                                    onClick={() => setShowEmojis(!showEmojis)}
                                >
                                    <EmojiIcon className='w-6 h-6 textBlue' />
                                </div>
                                <div className='hoverAnimation hover:bg-blue-100 w-8 h-8 flex items-center justify-center xl-px-0 ml-auto'>
                                    <ScheduleIcon className='w-6 h-6 textBlue' />
                                </div>
                                <div className='hoverAnimation hover:bg-blue-100 w-8 h-8 flex items-center justify-center xl-px-0 ml-auto'>
                                    <LocationIcon className='w-6 h-6 textBlue' />
                                </div>

                                {showEmojis && (
                                    <Picker 
                                        onSelect={addEmoji}
                                        style={{
                                            position: 'absolute',
                                            marginTop,
                                            marginLeft: -40,
                                            maxWidth: '320px',
                                            borderRadius: '20px',
                                        }}  
                                    />
                                )}
                            </div>
                            <button
                                className='bgBlue rounded-full w-24 h-9 text-white text-md font-bold transition hover:bg-blue-500 disabled:bg-blue-300'
                                disabled={!input.trim() && !selectedFile}
                                onClick={() => {
                                    if(postId) {
                                        sendComment()
                                    } else {
                                        sendPost()
                                    }
                                }}
                            >
                                {postId ? 'Reply' : 'Tweet'}
                            </button>
                        </div>  
                    )}
                </div>
            </div>
        </div>
    )
}

export default Input
