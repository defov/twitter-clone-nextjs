import { motion } from 'framer-motion'
import Backdrop from './Backdrop'
import Post from './Post'
import Input from './Input'

import CloseIcon from '@mui/icons-material/CloseRounded'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'

import { useRecoilState } from 'recoil'
import { singlePostState, modalOpenState } from '../atoms/modalAtom'

const dropIn = {
  hidden: {
    y: "-100vh",
    opacity: 0,
  },
  visible: {
    y: "0",
    opacity: 1,
    transition: {
      duration: 0.1,
      type: "spring",
      damping: 25,
      stiffness: 500,
    },
  },
  exit: {
    y: "100vh",
    opacity: 0,
  },
};

const Modal = () => {

  const [modalOpen, setModalOpen] = useRecoilState(modalOpenState)
  const [singlePost, setSinglePost] = useRecoilState(singlePostState)

  const handleClose = () => {
    setModalOpen(false)
    setSinglePost(null)
  }

  return (
    <Backdrop onClick={handleClose}>
      <motion.div
        onClick={(e) => e.stopPropagation()}
        className="max-w-screen-sm h-screen p-2 bg-white sm:h-fit sm:mx-auto sm:my-8 sm:border sm:rounded-2xl"
        variants={dropIn}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        {/* Inside container
        // <div className="" >
        //   { singlePost && !Object.keys(singlePost) && (
        //     <Post post={singlePost} />
        //   )}
        //   <Input />
        // </div> */}

        <div className="flex items-center">
          <div
            className="hoverAnimation w-9 h-9 flex items-center justify-center xl:px-0"
            onClick={handleClose}
          >
            <CloseIcon className='hidden sm:block h-6' />
            <ArrowBackIcon className='sm:hidden h-6' /> 
          </div>
        </div>

        {singlePost ? (
          <>
            <Post post={singlePost} inModal />
            <Input postId={singlePost._id} hideBorder />
          </>
        ) : (
          <Input hideBorder />
        )}

      </motion.div>
    </Backdrop>
  )
}

export default Modal
