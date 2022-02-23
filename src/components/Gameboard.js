import React, { useEffect, useState } from "react";
import { getCountries, data } from "../Fetch";
import PlayerStats from "./PlayerStats";
import WorldMap from "react-svg-worldmap";

const Gameboard = (props) => {
  if (props.countriesData) {
    return (
      <div className="world-map nes-container">
        <WorldMap
          color="red"
          value-suffix="people"
          size="lg"
          data={props.countriesData}
        />
        <PlayerStats />
      </div>
    );
  }

  return <h1>Loading...</h1>;
};

export default Gameboard;
