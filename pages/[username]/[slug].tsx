import { GetStaticPaths, GetStaticProps } from "next"
import PostContent from "../../components/postContent";
import { firestore, getUserWithUsername, postToJSON } from "../../lib/firebase";
import { useDocumentData } from 'react-firebase-hooks/firestore';
import { Post } from "../../lib/type";
import AuthCheck from "../../components/AuthCheck";
import HeartButton from "../../components/HeartButton";
import Link from "next/link";


export const getStaticProps: GetStaticProps = async ({ params }) => {

  const { username, slug } = params;
  const userDoc = await getUserWithUsername(username)

  let post;
  let path;

  if (userDoc) {
    const postRef = userDoc.ref.collection('posts').doc(slug.toString())
    post = postToJSON(await postRef.get())

    path = postRef.path;
  }


  return {
    props: { post, path },
    revalidate: 5000,
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const snapshot = await firestore.collectionGroup('posts').get();

  const paths = snapshot.docs.map((doc) => {
    const { slug, username } = doc.data();
    return {
      params: { username, slug }
    }
  })

  return {
    paths,
    fallback: 'blocking'
  }
}

interface Props {
  post: Post,
  path: string
}

const PostPage = (props: Props) => {
  const postRef = firestore.doc(props.path);
  const [realtimePost] = useDocumentData(postRef)

  const post = realtimePost || props.post;
  return (
    <main>
      <section>
        <PostContent post={post} />
      </section>

      <aside className="card">
        <p>
          <strong>{post.heartCount || 0} 🧡</strong>
        </p>
        <AuthCheck
          fallback={
            <Link href="/signin">
              <button> Sign In</button>
            </Link>
          }
        >
          <HeartButton postRef={postRef} />
        </AuthCheck>
      </aside>
    </main>
  )
}

export default PostPage
