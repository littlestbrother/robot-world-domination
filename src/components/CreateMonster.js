import { React, useState, useEffect } from 'react';
import { doc, updateDoc } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../firebase';

// const [userDetails, setUserDetails] = useState('')
// db.collection('users').doc(id).get()
//         .then(snapshot => setUserDetails(snapshot.data()))

const CreateMonster = () => {
  const [word, setWord] = useState('');
  const [user] = useAuthState(auth);
  const [wantUid, setWantUid] = useState({});

  useEffect(() => {
    
    console.log(user)
    return;
  }, [user])
  

  const roboPicture = () => {
    if (word === '') {
      return <img src={`https://www.robohash.org/example`} />
    } else {
      return <img src={`https://www.robohash.org/${word}`} />
    }
  }

  const saveMonster = async() => {
    const userRef = doc(db, 'users', user.id);
    await updateDoc(userRef, {
      monsterurl: `https://www.robohash.org/${word}`
    });
    console.log('done');
  }

  return (
    <>
      <div className='makeMonster'>
        <h1>Create your monster with just one word</h1>
        <p>hint: use your name or favorite snack</p>
        <hr />
        <label>Word of Creation:</label>
        <input type='text' name='word' onChange={(event) => {setWord(event.target.value)}} required placeholder='Word'/>
        <button onClick={saveMonster}>Save Monster!</button>
      </div>
      <div className='monster-pic'>
        {roboPicture()}
      </div>
    </>
  )
}

export default CreateMonster;