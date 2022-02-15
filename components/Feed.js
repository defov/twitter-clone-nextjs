import Input from './Input'
import Post from './Post'
import SparklesIcon from '@mui/icons-material/AutoAwesomeOutlined'

const Feed = ({ posts }) => {
    return (
        <div className="flex-grow max-w-2xl sm:ml-[81px] xl:ml-[380px] border-r border-gray-200">
            <div className="bg-white/80 backdrop-blur flex items-center sm:justify-between py-2 px-3 sticky top-0 z-50 border-b border-gray-200">
                <h2 className='text-lg sm:text-xl font-bold'>Home</h2>
                <div className='hoverAnimation w-9 h-9 flex items-center justify-center xl-px-0 ml-auto'>
                    <SparklesIcon className='h-6 w-6' />     
                </div>
            </div>

            <Input />

            <div className="pb-72">
                {posts && posts.map(post => (
                    <Post key={post._id} post={post} />
                ))}
            </div>

        </div>
    )
}

export default Feed
