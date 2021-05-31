import Link from "next/link";
import { useContext } from "react"
import { UserContext } from "../lib/context"

interface Props {
  children?: any,
  fallback?: any
}

const AuthCheck = (props: Props) => {

  const { username } = useContext(UserContext)

  return username ? props.children : props.fallback || <Link href='/signin'>You must be signed in</Link>;
}

export default AuthCheck
