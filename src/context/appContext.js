import React, { createContext, useState } from "react";
import { navigate } from "@reach/router";

// utils ===========================
import { fetchForecastData } from "../utils/api";
// import { numberOfHoursLapsed } from "../utils/utils";

const AppContext = createContext({});

const AppProvider = ({ children }) => {
  console.log("AppProvider");
  // STATE ------------------------------------------------
  const [loading, setLoading] = useState(false);

  // path
  // const path = window.location.pathname.split("/");
  // const tab = path[path.length - 1];
  // console.log(tab);
  const [navPath, setNavPath] = useState("home");

  const initialLawns = () =>
    JSON.parse(window.localStorage.getItem("lawn-irrigation-tool")) || [];
  const [lawns, setLawns] = useState(initialLawns);

  // console.log(lawns.length);
  React.useEffect(() => {
    console.log("useEffect 1");
    if (lawns.length !== 0) {
      navigate("/home");
      setNavPath("home");
    }
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

  // async function fetchForecast() {
  //   setLoading(true);
  //   const forecast = await fetchForecastData(lawn.lat, lawn.lng);
  //   updateLawn(forecast);
  //   setLoading(false);
  // }

  // React.useEffect(() => {
  //   console.log("useEffect 3");
  //   const numOfHours = numberOfHoursLapsed(lawn.updated);
  //   console.log(numOfHours);
  //   if (false) {
  //     fetchForecast();
  //   }
  // }, []);

  // CRUD ------------------------------------------------
  const addLawn = async newLawn => {
    console.log("addLawn");
    setLoading(true);
    const forecast = await fetchForecastData(lawn.lat, lawn.lng);
    const updatedLawn = { ...lawn, ...newLawn, forecast: { ...forecast } };
    updateLawn(updatedLawn);

    const updatedLawns = [updatedLawn, ...lawns];
    setLawns(updatedLawns);
    setNavPath("home");
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
