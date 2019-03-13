import React from "react";
import { withStyles, withTheme } from "@material-ui/core/styles";
import withRoot from "../withRoot";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Divider from "@material-ui/core/Divider";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

// utils
import hideVirtualKeyboard from "hide-virtual-keyboard";

// GOOGLE API
import PlacesAutocomplete from "react-places-autocomplete";
import { geocodeByAddress, getLatLng } from "react-places-autocomplete";

// components
import ButtonLink from "../components/ButtonLink";
import Header from "../components/Header";

// common styles
import { locationRoot, locationMain } from "../styles/common";

const styles = theme => ({
  root: { ...locationRoot },
  main: { ...locationMain }
});

// Initial State ---------------------------
const initialState = () => {
  return {
    address: "",
    isStreetNumber: true,
    lat: null,
    lng: null,
    streetNumber: null
  };
};

// REDUCER ---------------------------------
function reducer(state, action) {
  switch (action.type) {
    case "setAddress":
      return { ...state, address: action.address };
    case "toggleStreetNumber":
      return { ...state, isStreetNumber: !state.isStreetNumber };
    case "setLatLng":
      return { ...state, lat: action.lat, lng: action.lng };
    case "setStreetNumber":
      return { ...state, streetNumber: action.streetNumber };
    case "reset":
      return {
        address: "",
        isStreetNumber: true,
        lat: null,
        lng: null,
        streetNumber: null
      };
    default:
      throw new Error();
  }
}

const Location = ({ classes, theme }) => {
  // STATE --------------------------------------------------------
  const [state, dispatch] = React.useReducer(reducer, initialState());
  const [errorMessage, setErrorMessage] = React.useState("");

  // Handle address change ------------------------------------------
  const handleAddressChange = address => {
    dispatch({ type: "setAddress", address });
    setErrorMessage("");
  };

  // Determine street number if checkbox is selected
  const determineStreetNumber = address => {
    const arr = address.split(" ");
    const streetNumber = +arr[0];
    if (!isNaN(streetNumber)) {
      dispatch({ type: "setStreetNumber", streetNumber });
    }
  };

  // Click on one of the suggested addresses of the list
  const handleSelectAdress = address => {
    dispatch({ type: "setAddress", address });
    geocodeByAddress(address)
      .then(results => {
        const formattedAddress = results[0].formatted_address;
        if (state.isStreetNumber) {
          determineStreetNumber(formattedAddress);
        }
        return getLatLng(results[0]);
      })
      .then(({ lat, lng }) => {
        if (!(lat >= 37.2 && lat <= 47.6) || !(lng >= -82.7 && lng <= -66.1)) {
          setErrorMessage("ZERO_RESULTS");
        } else {
          dispatch({ type: "setLatLng", lat, lng });
          hideVirtualKeyboard();
        }
      })
      .catch(error => console.error("Error", error));
  };

  // Returns error if address is not valid
  const handleError = async (status, clearSuggestions) => {
    // console.log("Error from Google Maps API", status);
    setErrorMessage(status);
    clearSuggestions();
  };

  return (
    <div className={classes.root}>
      <Header icon="chevron-left" title="Create Location - (step 1/3)" />

      <main className={classes.main}>
        <Typography variant="h6" align="center" gutterBottom>
          Enter Your Location
        </Typography>

        <br />
        <Typography variant="caption" align="center" gutterBottom>
          Weather data is only available for Nassau County
        </Typography>

        <br />
        <FormGroup row>
          <FormControlLabel
            control={
              <Checkbox
                checked={state.isStreetNumber}
                color="primary"
                onChange={() => dispatch({ type: "toggleStreetNumber" })}
              />
            }
            label="My street number follows the odd/even irrigation ordinance"
          />
        </FormGroup>
        <br />

        <PlacesAutocomplete
          value={state.address}
          onChange={handleAddressChange}
          onSelect={handleSelectAdress}
          shouldFetchSuggestions={state.address.length > 2}
          onError={handleError}
        >
          {({
            getInputProps,
            suggestions,
            getSuggestionItemProps,
            loading
          }) => (
            <div>
              <form noValidate autoComplete="off">
                <TextField
                  autoComplete="off"
                  id="address"
                  label="Address"
                  placeholder="Type your address"
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  color="secondary"
                  SelectProps={{ native: true }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="delete address"
                          onClick={() => dispatch({ type: "reset" })}
                        >
                          <small>&#10005;</small>
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                  {...getInputProps({ className: "location-search-input" })}
                />
              </form>
              <div className="autocomplete-dropdown-container">
                {loading && (
                  <Typography variant="caption" align="center">
                    Loading...
                  </Typography>
                )}
                {!loading &&
                  state.address.length > 0 &&
                  errorMessage === "ZERO_RESULTS" && (
                    <Typography variant="caption" align="center" color="error">
                      Address is not valid
                    </Typography>
                  )}

                {suggestions.map(suggestion => {
                  const className = suggestion.active
                    ? "suggestion-item--active"
                    : "suggestion-item";
                  // inline style for demonstration purpose
                  const style = suggestion.active
                    ? {
                        backgroundColor: theme.palette.primary.main,
                        borderRadius: 4,
                        color: "#ffffff",
                        padding: 16,
                        cursor: "pointer"
                      }
                    : {
                        backgroundColor: theme.palette.background.default,
                        padding: 16,
                        cursor: "pointer"
                      };
                  return (
                    <div {...getSuggestionItemProps(suggestion)}>
                      <div
                        {...getSuggestionItemProps(suggestion, {
                          className,
                          style
                        })}
                      >
                        <Typography variant="caption" color="inherit">
                          {suggestion.description}
                        </Typography>
                      </div>
                      <Divider />
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </PlacesAutocomplete>
      </main>

      {errorMessage.length === 0 && state.lat && (
        <ButtonLink
          to="/irrigationDate"
          variant="contained"
          fullWidth
          color="primary"
        >
          Continue
        </ButtonLink>
      )}
    </div>
  );
};

export default withRoot(withStyles(styles)(withTheme()(Location)));
