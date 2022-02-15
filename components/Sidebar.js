import SidebarLink from './SidebarLink'
import TwitterIcon from '@mui/icons-material/Twitter'
import HomeIcon from '@mui/icons-material/BungalowRounded'
import HomeIconOutlined from '@mui/icons-material/BungalowOutlined'
import ExploreIcon from '@mui/icons-material/TagRounded'
import ExploreIconOutlined from '@mui/icons-material/TagRounded'
import NotificationIcon from '@mui/icons-material/NotificationsRounded'
import NotificationIconOutlined from '@mui/icons-material/NotificationsOutlined'
import MailIcon from '@mui/icons-material/MailRounded'
import MailIconOutlined from '@mui/icons-material/MailOutline'
import BookmarkIcon from '@mui/icons-material/BookmarkBorderRounded'
import BookmarkIconOutlined from '@mui/icons-material/BookmarkBorderOutlined'
import ArticleIcon from '@mui/icons-material/ArticleRounded'
import ArticleIconOutlined from '@mui/icons-material/ArticleOutlined'
import PersonIcon from '@mui/icons-material/PersonRounded'
import PersonOutlineIcon from '@mui/icons-material/PersonOutlineRounded'
import MoreHorizIcon from '@mui/icons-material/MoreHorizRounded'
import CreateIcon from '@mui/icons-material/Create';

import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useRecoilState } from 'recoil'
import { modalOpenState, singlePostState } from '../atoms/modalAtom'

const Sidebar = () => {
    const { data: session } = useSession()
    const router = useRouter()
    const [modalOpen, setModalOpen] = useRecoilState(modalOpenState)
    const [singlePost, setSinglePost] = useRecoilState(singlePostState)

    const openTweetModal = () => {
        setSinglePost(null)
        setModalOpen(true)
    }

    return (
        <div className="sidebarContainer">
            {/* Twitter icon */}
            <div 
                className='flex items-center justify-center w-14 h-14 hoverAnimation mx-3 xl:ml-24 hover:bg-blue-100'
                onClick={() => router.push('/home')}
            >
                <TwitterIcon 
                    className='sideberIcon textBlue'
                />
            </div>

            {/* Sidebar menu */}
            <div className='space-y-0.5 mt-1 xl:ml-24'>
                <SidebarLink text="Home" Icon={HomeIcon} onClick={router} active onClick={() => router.push('/home')} />
                <SidebarLink text="Explore" Icon={ExploreIconOutlined} />
                <SidebarLink text="Notifications" Icon={NotificationIconOutlined} />
                <SidebarLink text="Messages" Icon={MailIconOutlined} />
                <SidebarLink text="Bookmarks" Icon={BookmarkIconOutlined} />
                <SidebarLink text="Lists" Icon={ArticleIconOutlined} />
                <SidebarLink text="Profile" Icon={PersonOutlineIcon} />
                <SidebarLink text="More" Icon={MoreHorizIcon} />
            </div>

            <div>

            </div>

            <div 
                className='flex xl:hidden items-center justify-center w-fit h-fit p-2 xl:ml-24 bgBlue hover:bg-blue-500 rounded-full mt-3'
                onClick={openTweetModal}
            >
                <CreateIcon 
                    className='text-white h-8 w-8'
                />
            </div>

            <button
                className='hidden xl:inline xl:ml-24 mt-3 bgBlue rounded-full w-60 h-[52px] text-white text-lg font-bold shadow-md transition hover:bg-blue-500'
                onClick={openTweetModal}
            >
                Tweet
            </button>

            <div 
                className='flex items-center justify-center xl:ml-24 mt-auto mb-3 h-fit hoverAnimation'
                onClick={signOut}
            >
                    <img 
                        src={session?.user?.image}
                        alt=""
                        className='h-10 w-10 rounded-full xl:mr-2.5'
                    />
                    <div className='hidden xl:inline leading-5 overflow-hidden w-40'>
                        <h4 className='font-bold truncate'>{session?.user?.name}</h4>
                        <p className='text-gray-500 truncate'>{session?.user?.email}</p>
                    </div>
                    <MoreHorizIcon className='hidden xl:inline'/>
            </div>
            
        </div>
    )
}

export default Sidebar