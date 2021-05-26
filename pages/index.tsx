import toast from 'react-hot-toast'

export default function Home() {
  return (
    <div>
      <button onClick={() => toast.success('hello toast!')}>
        Toast Me Bro
      </button>
    </div>
  )
}
