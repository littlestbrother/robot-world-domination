import { React, useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db, logout } from "../firebase";
import Gameboard from "./Gameboard";


const CreateRobot = (props) => {
  const [word, setWord] = useState("");
  
  const roboPicture = () => {
    if (word === "") { 
      return <img src={`https://www.robohash.org/example`} className="nes-container is-dark with-title is-rounded" alt="a robot"/>;
    } else {
      return <img src={`https://www.robohash.org/${word}`} className="nes-container is-dark with-title is-rounded" alt="a robot"/>;
    }
  };


  const saveRobot = async () => {
    if(word){
    const userRef = doc(db, 'users', props.userId);
    await updateDoc(userRef, {
      roboturl: `https://www.robohash.org/${word}`
    })
    return(
      <Gameboard/>
    )
  } else {
    alert("are you dense? what's your name?")
  }
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
