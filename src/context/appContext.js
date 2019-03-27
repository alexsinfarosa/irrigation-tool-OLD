import React, { createContext, useState } from "react";
import { navigate } from "@reach/router";

// utils ===========================
import {
  fetchForecastData,
  currentModelMainFunction,
  runWaterDeficitModel
} from "../utils/api";

import differenceInMinutes from "date-fns/differenceInMinutes";

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

  React.useEffect(() => {
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

    const minutes = differenceInMinutes(Date.now(), new Date(lawnCopy.updated));
    // console.log(minutes);
    if (minutes > 120) {
      // console.log("UPDATED FORECAST AND DATA...");
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
      sprinklerRate: 1.4,
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

    let newUpdatedLawn = {
      ...updatedLawn,
      irrigationDate: new Date().toLocaleDateString(),
      forecast,
      data
    };
    console.log(newUpdatedLawn);
    if (updatedLawn.irrigationDate !== null) {
      console.log("inside, adding water");
      const index = data.findIndex(d => d.date === updatedLawn.irrigationDate);

      const water =
        (updatedLawn.sprinklerRate * updatedLawn.sprinklerMinutes) / 60;
      const pcpns = data.map(d => d.pcpn);
      pcpns[index] = pcpns[index] + water;
      const pets = data.map(d => d.pet);
      const updatedDeficit = runWaterDeficitModel(pcpns, pets);

      const updatedData = data.map((day, i) => {
        let p = { ...day };

        p.pcpn = i === index ? day.pcpn + water : day.pcpn;
        p.waterAppliedByUser = i === index ? water : 0;
        p.deficit = +updatedDeficit.deficitDaily[i].toFixed(2);
        p.barDeficit =
          p.deficit >= 0 ? p.deficit - p.threshold : p.deficit - p.threshold;
        return p;
      });

      newUpdatedLawn = { ...updatedLawn, forecast, data: updatedData };
      console.log(newUpdatedLawn);
    }

    updateLawn(newUpdatedLawn);
    setNavPath("home");
    const updatedLawns = [newUpdatedLawn, ...lawns];
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
        visits,
        setVisits
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
export { AppProvider };
