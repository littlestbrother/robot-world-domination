import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";
import { auth, db, logout } from "./firebase";
import { query, collection, getDocs, where } from "firebase/firestore";
import CreateMonster from './components/CreateMonster';
import GameBoard from './components/GameBoard';

function Dashboard() {
  const [user, loading, error] = useAuthState(auth);
  const [name, setName] = useState("");
  const [monsterUrl, setMonsterUrl] = useState("");
  const navigate = useNavigate();

  const fetchUserName = async () => {
    try {
      const q = query(collection(db, "users"), where("uid", "==", user?.uid));
      const doc = await getDocs(q);
      const data = doc.docs[0].data();

      setName(data.name);
    } catch (err) {
      console.error(err);
      alert("An error occured while fetching user data");
    }
  };

  
  const fetchMonsterUrl = async () => {
    try {
      const q = query(collection(db, "users"), where("uid", "==", user?.uid));
      const doc = await getDocs(q);
      const data = doc.docs[0].data(); // could be camel case

      setMonsterUrl(data.monsterurl);
    } catch (err) {
      console.error(err);
      alert("An error occured while fetching user data");
    }
  }

  const handleStartGame = () => {
    if(monsterUrl === 'none'){
      return (
        alert('please save your monster before beginning!')
      )
    } else {
      // <Gameboard />
    }
  }

  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/");

    fetchUserName();
  }, [user, loading]);


  return (
    <div className="dashboard">
      <div className="dashboard__container">
        <button onClick={handleStartGame}>Start Game</button>
        <button className="dashboard__btn" onClick={logout}>
          Logout
        </button>
        <CreateMonster /> 
      </div>
    </div>
  );
}

export default Dashboard;
