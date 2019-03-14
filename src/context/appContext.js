import React, { createContext, useState } from "react";

const AppContext = createContext({});

// Initial State ---------------------------
const initialState = () => {
  return {
    address: "",
    lat: null,
    lng: null,
    streetNumber: null,
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

const AppProvider = ({ children }) => {
  // STATE ------------------------------------------------
  const [loading, setLoading] = useState(false);
  const [state, setState] = useState(initialState);
  const updateState = updatedState => setState({ ...state, ...updatedState });

  React.useEffect(() => {
    console.log("useEffect from context");
  }, [state]);

  console.log(state);

  return (
    <AppContext.Provider
      value={{
        loading,
        setLoading,
        state,
        updateState
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
export { AppProvider };
