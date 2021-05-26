import { Toaster } from 'react-hot-toast'
import Navabar from '../components/Navabar'
import '../styles/globals.css'


function MyApp({ Component, pageProps }) {
  return (
    <>
      <Navabar />
      <Component {...pageProps} />
      <Toaster />
    </>)
}

export default MyApp
