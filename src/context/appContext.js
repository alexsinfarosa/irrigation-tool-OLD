import React, { createContext, useState } from "react";
import { navigate } from "@reach/router";

// utils ===========================
import { fetchForecastData, currentModelMainFunction } from "../utils/api";
import differenceInHours from "date-fns/differenceInHours";

const AppContext = createContext({});

const AppProvider = ({ children }) => {
  // console.log("AppProvider");
  // STATE ------------------------------------------------
  const initialVisits = () =>
    JSON.parse(window.localStorage.getItem("lawn-irrigation-tool-visits")) || 0;
  const [visits, setVisits] = useState(initialVisits);
  const [loading, setLoading] = useState(false);
  const [navPath, setNavPath] = useState("home");

  const initialLawns = () =>
    JSON.parse(window.localStorage.getItem("lawn-irrigation-tool")) || [];
  const [lawns, setLawns] = useState(initialLawns);

  // console.log(lawns.length);
  React.useEffect(() => {
    // console.log("useEffect 1");
    lawns.length === 0 ? navigate("/") : navigate("/home");
    const count = visits + 1;
    setVisits(count);
    window.localStorage.setItem(
      "lawn-irrigation-tool-visits",
      JSON.stringify(count)
    );
  }, []);

  const fetchForecastAndData = async () => {
    const lawnCopy = { ...lawn };
    const hours = differenceInHours(Date.now(), new Date(lawnCopy.updated));
    console.log(hours);
    if (hours > 6) {
      console.log("updating forecast and data...");
      setLoading(true);
      const forecast = await fetchForecastData(lawnCopy.lat, lawnCopy.lng);
      const [isTomorrowAbove, isInTwoDaysAbove] = probabilityOfPrecip(
        forecast.daily.data
      );
      const data = await currentModelMainFunction(
        lawnCopy,
        isTomorrowAbove,
        isInTwoDaysAbove
      );
      const updatedLawnCopy = {
        ...lawnCopy,
        updated: Date.now(),
        forecast,
        data
      };
      // console.log(updatedLawnCopy);

      let lawnsCopy = [...lawns].filter(l => l.id !== updatedLawnCopy.id);
      const newLawns = [updatedLawnCopy, ...lawnsCopy];
      updateLawn(updatedLawnCopy);
      setLawns(newLawns);
      setLoading(false);
    }
  };

  React.useEffect(() => {
    if (lawns.length !== 0) {
      fetchForecastAndData();
    }
  }, []);

  React.useEffect(() => {
    // console.log("useEffect 2");
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
      sprinklerType: "Fixed Spray",
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

  // CRUD ------------------------------------------------
  const addLawn = async newLawn => {
    // console.log("addLawn");
    setLoading(true);
    let updatedLawn = { ...lawn, ...newLawn };

    const forecast = await fetchForecastData(updatedLawn.lat, updatedLawn.lng);
    const [isTomorrowAbove, isInTwoDaysAbove] = probabilityOfPrecip(
      forecast.daily.data
    );
    const data = await currentModelMainFunction(
      updatedLawn,
      isTomorrowAbove,
      isInTwoDaysAbove
    );
    updatedLawn = { ...updatedLawn, forecast, data };

    updateLawn(updatedLawn);
    setNavPath("home");
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
        addLawn,
        visits
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
export { AppProvider };
