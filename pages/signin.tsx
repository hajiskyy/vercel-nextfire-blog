import toast from "react-hot-toast";
import { auth, googleAuthProvider } from "../lib/firebase";

interface Props {

}

const SignIn = (props: Props) => {

  const user = null;
  const username = null;


  return (
    <main>
      {user ?

        !username ? <UsernameForm /> : <SignOutButton />

        :

        <SignInButton />

      }
    </main>
  )
}

function SignInButton() {

  const signInWithGoogle = async () => {
    try {
      await auth.signInWithPopup(googleAuthProvider)
    } catch (error) {
      toast.error('error')
    }
  };

  return (
    <button className="btn-google" onClick={signInWithGoogle}>
      Sign in with Google
    </button>
  )

}



function SignOutButton() {
  return <button onClick={() => auth.signOut()}>Sign Out</button>
}

function UsernameForm() {

}

export default SignIn
