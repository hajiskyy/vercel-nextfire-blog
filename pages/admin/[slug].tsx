import styles from '../../styles/Admin.module.css';
import { useRouter } from "next/router"
import { useState } from "react"
import { useDocumentData } from "react-firebase-hooks/firestore"
import { useForm } from "react-hook-form"
import ReactMarkdown from "react-markdown"
import AuthCheck from "../../components/AuthCheck"
import { auth, firestore, serverTimeStamp } from "../../lib/firebase"
import toast from 'react-hot-toast';
import Link from 'next/link';
import ImageUploader from '../../components/ImageUploader';

interface Props {

}

const AdminPostEdit = (props: Props) => {
  return (
    <AuthCheck>
      <PostManager />
    </AuthCheck>
  )
}

export default AdminPostEdit

const PostManager = () => {
  const [preview, setPreview] = useState(false)
  const router = useRouter()
  const { slug } = router.query

  const postRef = firestore.collection('users').doc(auth.currentUser.uid).collection('posts').doc(slug.toString())
  const [post] = useDocumentData(postRef);

  return (
    <main>
      {
        post && (
          <>
            <section>
              <h1>{post.title}</h1>
              <p>ID: {post.slug}</p>
              <PostForm postRef={postRef} defaultValues={post} preview={preview} />
            </section>
            <aside>
              <h3>Tools</h3>
              <button onClick={() => setPreview(!preview)}>{preview ? 'Edit' : 'Preview'}</button>
              <Link href={`/${post.username}/${post.slug}`}>
                <button className="btn-blue">Live view</button>
              </Link>
            </aside>
          </>
        )
      }
    </main>
  )
}

const PostForm = ({ defaultValues, postRef, preview }) => {
  const { register, handleSubmit, reset, watch, formState } = useForm({ defaultValues, mode: 'onChange' });

  const { isValid, isDirty, errors } = formState;

  const updatePost = async ({ content, published }) => {
    await postRef.update({
      content,
      published,
      updatedAt: serverTimeStamp()
    })

    reset({ content, published })

    toast.success('Post updated successfully')
  }


  return (
    <form onSubmit={handleSubmit(updatePost)}>
      {
        preview && (
          <div className="card">
            <ReactMarkdown>{watch('content')}</ReactMarkdown>
          </div>
        )
      }
      <div className={preview ? styles.hidden : styles.controls}>
        <ImageUploader />
        <textarea name="content" {...register('content',
          {
            maxLength: { value: 20000, message: 'content is too long' },
            minLength: { value: 10, message: 'content is too short' },
            required: 'content is required'
          }
        )}></textarea>
        {errors.content && <p className="text-danger">{errors.content.message}</p>}

        <fieldset>
          <input type="checkbox" className={styles.checkbox} name="published" {...register('published')} /> Published
        </fieldset>

        <button type="submit" className="btn-green" disabled={!isDirty || !isValid}>
          Save Changes
        </button>
      </div>
    </form>
  );
}
