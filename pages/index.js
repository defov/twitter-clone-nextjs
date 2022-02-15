import Head from 'next/head'
import Image from 'next/image'
import { getProviders, getSession, signIn } from 'next-auth/react'
import TwitterIcon from '@mui/icons-material/Twitter'
import GoogleIcon from '@mui/icons-material/Google';

export default function HomeScreen( { providers } ) {
  return (
    <div>
      <Head>
        <title>Twitter</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className='flex flex-col lg:flex-row-reverse h-screen'>
        <div className='flex min-w-[45%] sm:max-w-[75vw] sm:mx-auto lg:mx-0 flex-col p-8 gap-y-10 sm:gap-y-14'>
          <TwitterIcon 
            className='textBlue h-12 w-12'
          />
          <h1 className='font-bold text-5xl sm:text-7xl'>Happening now</h1>
          <h2 className='font-bold text-2xl sm:text-4xl'>Join Twitter today.</h2>
          <div className='flex flex-col'>
            <button
              className='bg-transparent text-black flex items-center justify-center gap-x-1 border rounded-full border-gray-200 w-72 h-10 transition hover:bg-gray-200'
              onClick={() => signIn(providers.google.id, {callbackUrl: "/home"})}
            >
              <GoogleIcon />
              Sign up with google
            </button>
            <div className='w-72 h-10 flex items-center'>
              <div className='flex-1 h-[1px] bg-gray-100'></div>
              <p className='-mt-1 px-2'>or</p>
              <div className='flex-1 h-[1px] bg-gray-100'></div>
            </div>
            <button
              className='bgBlue hover:bg-blue-500 transition text-white font-bold rounded-full flex items-center justify-center w-72 h-10'
            >
              Sign up with phone or email
            </button>
            <p
              className='w-72 mt-2 text-[0.66em] font-gray-300'
            >
              By signing up, you agree to the Terms of Service and Privacy Policy, including Cookie Use.
            </p>
          </div>

          <div className='flex flex-col gap-y-2'>
            <h2 className='text-black text-lg'>Already have an account?</h2>
            <button
              className='bg-white hover:bg-blue-200 transition textBlue font-bold border border-gray-200 rounded-full flex items-center justify-center w-72 h-10'
            >
              Sign In
            </button>
          </div>
        </div>
        <div className='hidden lg:inline-block relative lg:flex-1 h-64 lg:h-full w-full'>
          <Image src="/images/login-background.png"
            className='z-1'
            layout='fill' 
            objectFit='fill' 
            priority 
          />
          <div className='absolute z-2 top-0 bottom-0 left-0 right-0 w-fit h-fit !m-auto'>
            <TwitterIcon 
              className='text-white h-96 w-96'
            />
          </div>
        </div>
      </main>
    </div>
  )
}

export async function getServerSideProps(context) {
  const session = await getSession(context)
  if(session) {
    return {
      redirect: {
        permanent: false,
        destination: "/home"
      }
    }
  }

  const providers = await getProviders()
  return {
      props: {
          providers
      }
  }
}
