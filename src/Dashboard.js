import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";
import { auth, db, logout } from "./firebase";
import { query, collection, getDocs, where } from "firebase/firestore";
import CreateRobot from "./components/CreateRobot";
import GameBoard from "./components/GameBoard";

function Dashboard() {
  const [user, loading, error] = useAuthState(auth);
  const [name, setName] = useState("");
  const [userId, setUserID] = useState("");
  const [robotUrl, setRobotUrl] = useState("");
  const navigate = useNavigate();

  useEffect(async () => {
    if (loading) return;
    if (!user) return navigate("/");
    const q = query(collection(db, "users"), where("uid", "==", user?.uid));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      setUserID(doc.id);
    });

    fetchUserName();
  }, [user, loading]);

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

  const fetchRobotUrl = async () => {
    try {
      const q = query(collection(db, "users"), where("uid", "==", user?.uid));
      const doc = await getDocs(q);
      const data = doc.docs[0].data(); // could be camel case

      setRobotUrl(data.roboturl);
    } catch (err) {
      console.error(err);
      alert("An error occured while fetching user data");
    }
  };

  const handleStartGame = () => {
    if (robotUrl === "none") {
      return alert("please save your robot before beginning!");
    } else {
      // <Gameboard />
    }
  };

  return (
    <div className="dashboard">
      <section className="nes-container is-dark with-title is-centered">
        <h3 className="Title">ROBO WORLD DOMINATION</h3>
        <div className="dashboard-container nes-container">
          <CreateRobot userId={userId} />
        </div>
      </section>
    </div>
  );
}

export default Dashboard;
