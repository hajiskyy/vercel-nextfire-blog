import { useDocument } from 'react-firebase-hooks/firestore';
import { auth, firestore, increment } from '../lib/firebase';

interface Props {
  postRef: any
}

const HeartButton = (props: Props) => {

  const heartRef = props.postRef.collection('hearts').doc(auth.currentUser.uid);
  const [heartDoc] = useDocument(heartRef)

  const addHeart = async () => {
    const uid = auth.currentUser.uid;
    const batch = firestore.batch();
    batch.update(props.postRef, { heartCount: increment(1) });
    batch.set(heartRef, { uid })
    await batch.commit();
  }

  const removeHeart = async () => {
    const batch = firestore.batch();
    batch.update(props.postRef, { heartCount: increment(-1) });
    batch.delete(heartRef)
    await batch.commit();
  }



  return heartDoc?.exists ? (
    <button onClick={removeHeart}>💔 UnHeart</button>
  ) : (
    <button onClick={addHeart}>🧡 Heart</button>
  )
}

export default HeartButton
