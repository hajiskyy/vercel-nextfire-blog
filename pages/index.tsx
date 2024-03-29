import { GetServerSideProps } from 'next'
import { firestore, postToJSON } from '../lib/firebase'
import { useState } from 'react';
import PostFeed from '../components/PostFeed';
import Loader from '../components/Loader';
import { fromMillis } from "../lib/firebase";

const LIMIT = 1;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const postsQuery = firestore.collectionGroup('posts')
    .where('published', '==', true)
    .orderBy('createdAt', 'desc')
    .limit(LIMIT)

  const posts = (await postsQuery.get()).docs.map(postToJSON);

  return {
    props: { posts }
  }


}

export default function Home(props) {

  const [posts, setPosts] = useState(props.posts)
  const [loading, setLoading] = useState(false)

  const [postsEnd, setPostsEnd] = useState(false)

  const getMorePosts = async () => {
    setLoading(true);
    const last = posts[posts.length - 1];
    const cursor = typeof last.createdAt === 'number' ? fromMillis(last.createdAt) : last.createdAt;
    const query = firestore
      .collectionGroup('posts')
      .where('published', '==', true)
      .orderBy('createdAt', 'desc')
      .startAfter(cursor)
      .limit(LIMIT)

    const newPosts = (await query.get()).docs.map((doc) => doc.data());

    setPosts(posts.concat(newPosts));
    setLoading(false);

    if (newPosts.length < LIMIT) {
      setPostsEnd(true)
    }
  }

  return (
    <div>
      <main>
        <PostFeed posts={posts} />
        {!loading && !postsEnd && <button onClick={getMorePosts}>Load more</button>}

        <Loader show={loading} />

        {postsEnd && 'This is the end!'}
      </main>
    </div>
  )
}
