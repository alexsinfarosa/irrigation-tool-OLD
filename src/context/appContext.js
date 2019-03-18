import React, { createContext, useState } from "react";
import { navigate } from "@reach/router";

// utils ===========================
import { fetchForecastData } from "../utils/api";
import { numberOfHoursLapsed } from "../utils/utils";

const AppContext = createContext({});

const AppProvider = ({ children }) => {
  console.log("AppProvider");
  // STATE ------------------------------------------------
  const [loading, setLoading] = useState(false);

  // path
  const path = window.location.pathname.split("/");
  const tab = path[path.length - 1];
  const [navPath, setNavPath] = useState(tab);

  const initialLawns = () =>
    JSON.parse(window.localStorage.getItem("lawn-irrigation-tool")) || [];
  const [lawns, setLawns] = useState(initialLawns);

  React.useEffect(() => {
    if (lawns.length !== 0) {
      navigate("/main");
      setNavPath("main");
    }
  }, []);

  React.useEffect(() => {
    if (lawns.length === 0) {
      navigate("/");
      window.localStorage.removeItem("lawn-irrigation-tool");
      window.localStorage.removeItem("LIT_location");
    } else {
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

  async function fetchForecast() {
    setLoading(true);
    const forecast = await fetchForecastData(lawn.lat, lawn.lng);
    updateLawn(forecast);
    setLoading(false);
  }

  React.useEffect(() => {
    const numOfHours = numberOfHoursLapsed(lawn.updated);
    console.log(numOfHours);
    fetchForecast();
  }, []);

  // CRUD ------------------------------------------------
  const addLawn = async newLawn => {
    const updatedLawn = { ...lawn, ...newLawn };
    const forecast = await fetchForecast();
    updateLawn(newLawn, forecast);

    const updatedLawns = [updatedLawn, ...lawns];
    setLawns(updatedLawns);
    setNavPath("main");
    window.localStorage.setItem("lawn-irrigation-tool", JSON.stringify(lawns));
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
