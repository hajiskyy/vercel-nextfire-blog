import { useCollection } from "react-firebase-hooks/firestore"
import AuthCheck from "../../components/AuthCheck"
import PostFeed from "../../components/PostFeed"
import { auth, firestore, serverTimeStamp } from "../../lib/firebase"
import { useRouter } from 'next/router';
import { useContext, useState } from "react";
import { UserContext } from "../../lib/context";
import kebabCase from 'lodash.kebabcase'
import toast from "react-hot-toast";

interface Props {

}

const AdminPostsPage = (props: Props) => {
  return (
    <main>
      <AuthCheck>
        <CreateNewPost />
        <PostList />
      </AuthCheck>
    </main>
  )
}

export default AdminPostsPage

const PostList = () => {
  const ref = firestore
    .collection('users').doc(auth.currentUser.uid)
    .collection('posts')

  const query = ref.orderBy('createdAt')
  const [querySnapShot] = useCollection(query)

  const posts = querySnapShot?.docs.map((doc) => doc.data())

  return (
    <>
      <h1>Manage your Posts</h1>
      <PostFeed posts={posts} admin />
    </>
  )
}

const CreateNewPost = () => {

  const router = useRouter();
  const { username } = useContext(UserContext);
  const [title, setTitle] = useState('');

  const slug = encodeURI(kebabCase(title))

  const isValid = title.length > 3 && title.length < 100;

  const createPost = async (e) => {
    e.preventDefault();

    const uid = auth.currentUser.uid;
    const ref = firestore.collection('users').doc(uid).collection('posts').doc(slug)

    const data = {
      title,
      slug,
      uid,
      username,
      published: false,
      content: '# hello there!',
      createdAt: serverTimeStamp(),
      updatedAt: serverTimeStamp(),
      heartCount: 0
    }

    await ref.set(data);

    toast.success('New post created! 🚀')

    router.push(`/admin/${slug}`)
  }


  return (
    <form onSubmit={createPost}>
      <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="An awesome title!" className='input' />
      <p>
        <strong>Slug: </strong> {slug}
      </p>
      <button type="submit" disabled={!isValid} className="btn-green">
        Create New Post
      </button>
    </form>
  )
}



