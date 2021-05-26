import Link from "next/link";

interface Props {

}

const Navabar = (props: Props) => {

  const user = null;
  const username = null;

  return (
    <nav className='navbar'>
      <ul>
        <li>
          <Link href='/'>
            <button className='btn-logo'>FEED</button>
          </Link>
        </li>

        {/* user is is signed-in and has username */}
        {username && (
          <>
            <li className="push-left">
              <Link href='/admin'>
                <button className='btn-blue'>Write Posts</button>
              </Link>
            </li>
            <li>
              <Link href={`/${username}`}>
                <img src={user?.photoURL} />
              </Link>
            </li>
          </>
        )}


        {/* user is not signed in OR has not created username */}
        {!username && (
          <li>
            <Link href='/signin'>
              <button className='btn-blue'>Log in</button>
            </Link>
          </li>
        )}
      </ul>
    </nav>
  )
}

export default Navabar
