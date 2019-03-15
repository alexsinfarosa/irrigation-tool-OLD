import React, { createContext, useState } from "react";

const AppContext = createContext({});

const AppProvider = ({ children }) => {
  // STATE ------------------------------------------------
  const [loading, setLoading] = useState(false);

  const initialLawns = () =>
    JSON.parse(window.localStorage.getItem("lawn-irrigation-tool")) || [];
  const [lawns, setLawns] = React.useState(initialLawns);

  // Initial State ---------------------------
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

  const [state, setState] = useState(initialState);
  const updateState = updatedState => setState({ ...state, ...updatedState });

  console.log(state, lawns);

  return (
    <AppContext.Provider
      value={{
        loading,
        setLoading,
        state,
        updateState,
        lawns,
        setLawns
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
export { AppProvider };
