import { React, useState, useEffect } from "react";
import { getDocs, collection, query, where, doc, updateDoc } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db, logout } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";


const CreateRobot = (props) => {
  const [word, setWord] = useState("");
  
  const roboPicture = () => {
    if (word === "") { 
      return <img src={`https://www.robohash.org/example`} className="nes-container is-dark with-title is-rounded"/>;
    } else {
      return <img src={`https://www.robohash.org/${word}`} className="nes-container is-dark with-title is-rounded"/>;
    }
  };


  const saveRobot = async () => {
    const userRef = doc(db, 'users', props.userId);
    await updateDoc(userRef, {
      roboturl: `https://www.robohash.org/${word}`
    })
  };

  return (
    <>
      <h1>Create your Robot</h1>
      <div className="robot-pic">{roboPicture()}</div>
      <div className="makeRobot">
        <p>Wanted for World Domination.</p>
        <input
          type="text"
          name="word"
          onChange={(event) => {
            setWord(event.target.value);
          }}
          required
          placeholder="Zark Muckerburg"
          className="nes-input is-dark"
        />
        <br/>
        <br/>
        <div className="nes-container dashboard-control is-rounded">
          <p>
          <button
            className="nes-btn is-primary dashboard-start"
            onClick={saveRobot}
          >
            Begin Dominating
          </button>
          <button
            className="dashboard-logout nes-btn is-error"
            onClick={logout}
          >
            Logout
          </button>
          </p>
        </div>
      </div>
    </>
  );
};

export default CreateRobot;
