import React, { createContext, useState } from "react";

const AppContext = createContext({});

const AppProvider = ({ children }) => {
  // STATE ------------------------------------------------
  const [loading, setLoading] = useState(false);

  const initialLawns = () =>
    JSON.parse(window.localStorage.getItem("lawn-irrigation-tool")) || [];
  const [lawns, setLawns] = React.useState(initialLawns);

  // React.useEffect(() => {
  //   console.log("lawns changed");
  //   window.localStorage.setItem("lawn-irrigation-tool", JSON.stringify(lawns));
  // }, [lawns]);

  // Initial State ---------------------------
  const initialState = () => {
    console.log("initialState CALLED!");
    if (lawns.length > 0) {
      console.log("first lawn from the list");
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
  const updateState = updatedState =>
    setState(prevState => ({ ...prevState, ...updatedState }));

  // CRUD ---------------------------------
  const addLawn = () => {
    console.log("ADDED THE FUCKIN LAWN");
    updateState({ id: Date.now() });
    setLawns([state, ...lawns]);
    window.localStorage.setItem("lawn-irrigation-tool", JSON.stringify(lawns));
  };

  console.log(state);

  return (
    <AppContext.Provider
      value={{
        loading,
        setLoading,
        state,
        updateState,
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
