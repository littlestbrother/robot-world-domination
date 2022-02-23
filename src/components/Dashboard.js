import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";
import { auth, db, logout } from "../firebase";
import { query, collection, getDocs, where } from "firebase/firestore";
import CreateRobot from "./CreateRobot";
import Gameboard from "./Gameboard";
import { getCountries } from "../Fetch";

function Dashboard() {
  const [user, loading] = useAuthState(auth);
  const [userId, setUserID] = useState("");
  const [robotUrl, setRobotUrl] = useState("");
  const navigate = useNavigate();
  const [countriesList, setCountriesList] = useState();

  useEffect(async () => {
    setCountriesList(await getCountries());
  }, []);

  useEffect(async () => {
    if (loading) return;
    if (!user) return navigate("/");
    const q = query(collection(db, "users"), where("uid", "==", user?.uid));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      setUserID(doc.id);
    });
    fetchRobotUrl();
  }, [user, loading]);

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

  if (robotUrl === undefined || robotUrl === "https://www.robohash.org") {
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
  } else {
    if (countriesList) {
      let editedData = countriesList.map((element) => {
        return {country: element.cca2, value: element.population}
      })

      return (
        <>
          <Gameboard countriesData={ editedData } />
        </>
      );
    } else {
      return <h3>Test</h3>;
    }
  }
}

export default Dashboard;
