import PostFeed from "../../components/PostFeed"
import UserProfile from "../../components/UserProfile"
import { GetServerSideProps } from 'next';
import { getUserWithUsername, postToJSON } from "../../lib/firebase";
import { Post } from "../../lib/type";
export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { username } = query;

  const userDoc = await getUserWithUsername(username)

  let user = null;
  let posts = null;

  if (userDoc) {
    user = userDoc.data();
    const postsQuery = userDoc.ref.collection('posts')
      .where('published', '==', 'true')
      .orderBy('createdAt', 'desc')
      .limit(5)

    posts = (await postsQuery.get()).docs.map(postToJSON)
    console.log(posts)
  }

  return {
    props: { user, posts }
  }
}

interface Props {
  user: any,
  posts: any
}

const UserProfilePage = (props: Props) => {
  return (
    <main>
      <UserProfile user={props.user} />
      <PostFeed posts={props.posts} />
    </main>
  )
}

export default UserProfilePage

