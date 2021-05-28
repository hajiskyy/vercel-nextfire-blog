import Link from 'next/link'
import { Post } from '../lib/type'

interface Props {
  posts: any
  admin?: boolean
}

const PostFeed = (props: Props) => {
  return props.posts ? props.posts.map((post) => <PostItem post={post} key={post.slug} admin={props.admin} />) : <h1>No Posts yet</h1>;
}

function PostItem({ post, admin = false }) {

  const wordCount = post?.content.trim().split(/\s+/g).length;
  const minutesToRead = (wordCount / 100 + 1).toFixed(0);

  return (
    <div className="card">
      <Link href={`/${post.username}`}>
        <a>
          <strong>By @{post.username}</strong>
        </a>
      </Link>
      <Link href={`/${post.username}/${post.slug}`}>
        <h2>
          <a>{post.title}</a>
        </h2>
      </Link>

      <footer>
        <span>
          {wordCount} words. {minutesToRead} min read
          </span>
        <span>💖 {post.hearCount} Hearts</span>
      </footer>
    </div>
  )
}

export default PostFeed
