import Link from "next/link"
import ReactMarkdown from "react-markdown"
import { Post } from "../lib/type"

interface Props {
  post?: Post | any
}

const PostContent = (props: Props) => {
  const createdAt = typeof props.post?.createdAt == 'number' ? new Date(props.post.createdAt) : props.post.createdAt.toDate()


  return (
    <div className="card">
      <h1>{props.post?.title}</h1>
      <span className="text-sm">
        Written by {' '}
        <Link href={`/${props.post.username}`}>
          <a className="text-info">@{props.post.username}</a>
        </Link>{' '}

        on {createdAt.toISOString()}
      </span>
      <ReactMarkdown>{props.post?.content}</ReactMarkdown>
    </div>
  )
}

export default PostContent
