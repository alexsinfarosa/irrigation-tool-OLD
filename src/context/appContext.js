import React, { createContext, useState } from "react";
import { navigate } from "@reach/router";

// utils ===========================
import { fetchForecastData, currentModelMainFunction } from "../utils/api";
// import { numberOfHoursLapsed } from "../utils/utils";

const AppContext = createContext({});

const AppProvider = ({ children }) => {
  console.log("AppProvider");
  // STATE ------------------------------------------------
  const [loading, setLoading] = useState(false);
  const [navPath, setNavPath] = useState("home");

  const initialLawns = () =>
    JSON.parse(window.localStorage.getItem("lawn-irrigation-tool")) || [];
  const [lawns, setLawns] = useState(initialLawns);

  // console.log(lawns.length);
  React.useEffect(() => {
    console.log("useEffect 1");
    lawns.length === 0 ? navigate("/") : navigate("/home");
  }, []);

  React.useEffect(() => {
    console.log("useEffect 2");
    if (lawns.length !== 0) {
      window.localStorage.setItem(
        "lawn-irrigation-tool",
        JSON.stringify(lawns)
      );
    }
  }, [lawns]);

  // Initial State -----------------------------------------
  const initialState = () => {
    if (lawns.length > 0) {
      return lawns[0];
    }
    return {
      address: "",
      lat: null,
      lng: null,
      streetNumber: null,
      isStreetNumberRequired: false,
      irrigationDate: new Date().toLocaleDateString(),
      isThisYear: true,
      sprinklerType: "",
      sprinklerImg: null,
      sprinklerRate: 0.05,
      sprinklerMinutes: 20,
      id: null,
      updated: null,
      forecast: {},
      data: []
    };
  };

  const [lawn, setLawn] = useState(initialState);
  const updateLawn = updatedState => {
    setLawn(prevState => {
      return { ...prevState, ...updatedState };
    });
  };

  function probabilityOfPrecip(data) {
    const tomorrowPrecipProbability = data[1].precipProbability;
    let isTomorrowAbove = false;
    if (tomorrowPrecipProbability > 0.6) isTomorrowAbove = true;

    let isInTwoDaysAbove = false;
    const inTwoDaysPrecipProbability = data[2].precipProbability;
    if (inTwoDaysPrecipProbability > 0.6) isInTwoDaysAbove = true;

    return [isTomorrowAbove, isInTwoDaysAbove];
  }

  // React.useEffect(() => {
  //   console.log("useEffect 3");
  //   waterMessage();
  // }, []);

  // CRUD ------------------------------------------------
  const addLawn = async newLawn => {
    console.log("addLawn");
    setLoading(true);
    const forecast = await fetchForecastData(lawn.lat, lawn.lng);
    const [isTomorrowAbove, isInTwoDaysAbove] = probabilityOfPrecip(
      forecast.daily.data
    );
    const data = await currentModelMainFunction(
      lawn,
      isTomorrowAbove,
      isInTwoDaysAbove
    );
    const updatedLawn = {
      ...lawn,
      ...newLawn,
      forecast,
      data
    };
    updateLawn(updatedLawn);

    const updatedLawns = [updatedLawn, ...lawns];
    setLawns(updatedLawns);
    window.localStorage.setItem(
      "lawn-irrigation-tool",
      JSON.stringify(updatedLawns)
    );
    setLoading(false);
  };

  return (
    <AppContext.Provider
      value={{
        loading,
        navPath,
        setNavPath,
        setLoading,
        updateLawn,
        lawn,
        setLawn,
        lawns,
        setLawns,
        addLawn
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
export { AppProvider };
