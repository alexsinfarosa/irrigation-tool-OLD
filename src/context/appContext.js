import React, { createContext, useState } from "react";
import { navigate } from "@reach/router";

const AppContext = createContext({});

const AppProvider = ({ children }) => {
  console.log("AppProvider");
  // STATE ------------------------------------------------
  const [loading, setLoading] = useState(false);

  // path
  const path = window.location.pathname.split("/");
  const tab = path[path.length - 1];
  console.log(tab);
  const [navPath, setNavPath] = useState(tab);

  const initialLawns = () =>
    JSON.parse(window.localStorage.getItem("lawn-irrigation-tool")) || [];
  const [lawns, setLawns] = useState(initialLawns);

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

  // CRUD ------------------------------------------------
  const addLawn = newLawn => {
    const updatedLawn = { ...lawn, ...newLawn };
    updateLawn(newLawn);
    const updatedLawns = [updatedLawn, ...lawns];
    setLawns(updatedLawns);
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
