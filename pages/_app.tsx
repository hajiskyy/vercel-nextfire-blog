import { Toaster } from 'react-hot-toast'
import Navabar from '../components/Navabar'
import { UserContext } from '../lib/context'
import { userUserData } from '../lib/hooks'



import '../styles/globals.css'


function MyApp({ Component, pageProps }) {

  const userData = userUserData()

  return (
    <UserContext.Provider value={userData}>
      <Navabar />
      <Component {...pageProps} />
      <Toaster />
    </UserContext.Provider>)
}

export default MyApp
