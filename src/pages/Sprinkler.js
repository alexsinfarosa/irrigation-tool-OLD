import React from "react";
import { withStyles, withTheme } from "@material-ui/core/styles";
import withRoot from "../withRoot";
import Typography from "@material-ui/core/Typography";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import IconButton from "@material-ui/core/IconButton";
import Checkbox from "@material-ui/core/Checkbox";

// libs
import "rc-slider/assets/index.css";
import Slider, { createSliderWithTooltip } from "rc-slider";

// components
import ButtonLink from "../components/ButtonLink";
import Header from "../components/Header";

// common styles
import { main, footer, buttonBig } from "../styles/common";

// images
import SpraySprinkler from "../images/spraySprinkler.png";
import SingleStreamRotor from "../images/singleStreamRotorSprinkler.png";
import MultipleStreamRotor from "../images/multipleStreamRotorSprinkler.png";
import MoveableSprinkler from "../images/moveableSprinkler.png";
import Grass from "../images/grass.jpg";

import AppContext from "../context/appContext";

// slider tooltip
const SliderWithTooltip = createSliderWithTooltip(Slider);
const sprinklers = [
  {
    sprinklerType: "Fixed Spray",
    sprinklerImg: SpraySprinkler,
    sprinklerRate: 1.4 // inches of water/hr
  },
  {
    sprinklerType: "Single Stream Rotor",
    sprinklerImg: SingleStreamRotor,
    sprinklerRate: 0.9 // inches of water/hr
  },
  {
    sprinklerType: "Multiple Stream Rotor",
    sprinklerImg: MultipleStreamRotor,
    sprinklerRate: 0.35 // inches of water/hr
  },
  {
    sprinklerType: "Moveable",
    sprinklerImg: MoveableSprinkler,
    sprinklerRate: 1.2 // inches of water/hr
  },
  {
    sprinklerType: "Add rate manually",
    sprinklerImg: Grass,
    sprinklerRate: 0 // inches of water/hr
  }
];

const styles = theme => ({
  main: { ...main, overflowX: "hidden" },
  footer: { ...footer },
  containerList: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    padding: 8,
    marginLeft: -26,
    marginRight: -26
  },
  gridList: {
    flexWrap: "nowrap",
    transform: "translateZ(0)",
    width: "100%",
    height: "100%"
  },
  title: {
    color: "#fff",
    fontSize: "0.9rem"
  },
  titleBar: {
    background:
      "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)"
  },
  btnBig: {
    paddingTop: 16,
    paddingBottom: 16,
    background: theme.palette.primary.light,
    color: "#fff"
  },
  padding: {
    padding: "16px 32px"
  },
  slider: {
    padding: "16px 32px"
  },
  tipSlider: {
    background: "pink"
  }
});

// Initial state ------------------------------------------------------
const initialState = () => {
  return {
    sprinklerType: "Fixed Spray",
    sprinklerImg: SpraySprinkler,
    sprinklerRate: 1.4,
    sprinklerMinutes: 20
  };
};

// REDUCER ---------------------------------
function reducer(state, action) {
  switch (action.type) {
    case "setSprinkler":
      return {
        ...state,
        sprinklerType: action.sprinklerType,
        sprinklerImg: action.sprinklerImg,
        sprinklerRate: action.sprinklerRate
      };
    case "setMinutes":
      return { ...state, sprinklerMinutes: action.sprinklerMinutes };
    case "setSprinklerRate":
      return { ...state, sprinklerRate: action.sprinklerRate };
    case "reset":
      return {
        sprinklerType: "Fixed Spray",
        sprinklerImg: { SpraySprinkler },
        sprinklerRate: 1.4,
        sprinklerMinutes: 20
      };
    default:
      throw new Error();
  }
}

const Sprinkler = ({ classes, theme }) => {
  // console.log("Sprinkler");
  // CONTEXT ------------------------------------------
  const { addLawn } = React.useContext(AppContext);
  // State --------------------------------------------
  const [state, dispatch] = React.useReducer(reducer, initialState());

  // selecting the sprinkler --------------------------------------------
  function toggleImage(event) {
    if (event.target.value === state.sprinklerType) {
      dispatch({ type: "reset" });
    } else {
      const spk = sprinklers.find(s => s.sprinklerType === event.target.value);
      dispatch({
        type: "setSprinkler",
        sprinklerType: spk.sprinklerType,
        sprinklerImg: spk.sprinklerImg,
        sprinklerRate: spk.sprinklerRate
      });
      dispatch({
        type: "setMinutes",
        sprinklerMinutes: state.sprinklerMinutes
      });
    }
  }

  return (
    <>
      <main className={classes.main}>
        <Header icon="chevron-left" title="Sprinkler Type - (step 3/3)" />
        <div className={classes.padding}>
          <Typography variant="h6" align="center">
            What type of water system do you have?
          </Typography>
        </div>

        <div className={classes.containerList}>
          <GridList className={classes.gridList} cols={1.5}>
            {sprinklers.map(s => {
              return (
                <GridListTile key={s.sprinklerImg}>
                  <img src={s.sprinklerImg} alt={s.sprinklerType} />
                  <GridListTileBar
                    title={s.sprinklerType}
                    classes={{
                      root: classes.titleBar,
                      title: classes.title
                    }}
                    actionIcon={
                      <IconButton>
                        <Checkbox
                          checked={state.sprinklerType === s.sprinklerType}
                          onChange={toggleImage}
                          value={s.sprinklerType}
                          style={{ color: "#fff" }}
                        />
                      </IconButton>
                    }
                  />
                </GridListTile>
              );
            })}
          </GridList>
        </div>

        <div style={{ width: "100%", margin: "16px auto" }}>
          {state.sprinklerType === "Add rate manually" && (
            <>
              <Typography variant="body1" align="center" gutterBottom>
                My sprinkler rate is: {state.sprinklerRate.toFixed(2)} inches/hr
              </Typography>
              <div
                style={{
                  width: "90%",
                  margin: "0 auto",
                  marginTop: 48,
                  marginBottom: 16
                }}
              >
                <SliderWithTooltip
                  // dots
                  // activeDotStyle={{ borderColor: theme.palette.primary.light }}
                  min={0}
                  step={0.05}
                  max={3}
                  tipFormatter={e => `${e} in`}
                  // tipProps={{ overlayClassName: "tipSlider" }}
                  defaultValue={state.sprinklerRate}
                  trackStyle={{ backgroundColor: theme.palette.primary.main }}
                  handleStyle={{
                    borderColor: theme.palette.primary.main,
                    height: 28,
                    width: 28,
                    marginLeft: -14,
                    marginTop: -12,
                    backgroundColor: theme.palette.primary.main
                  }}
                  // railStyle={{ backgroundColor: "red", height: 10 }}
                  onChange={water =>
                    dispatch({ type: "setSprinklerRate", sprinklerRate: water })
                  }
                />
              </div>
            </>
          )}

          <br />
          <Typography variant="body1" align="center" gutterBottom>
            My sprinkler runs for {state.sprinklerMinutes} min
          </Typography>

          <br />
          <div
            style={{
              width: "90%",
              margin: "0 auto",
              marginTop: 24,
              marginBottom: 16
            }}
          >
            <SliderWithTooltip
              // dots
              // activeDotStyle={{ borderColor: theme.palette.primary.light }}
              min={1}
              step={1}
              max={60}
              tipFormatter={e => `${e} min`}
              // tipProps={{ overlayClassName: "tipSlider" }}
              defaultValue={state.sprinklerMinutes}
              trackStyle={{ backgroundColor: theme.palette.primary.main }}
              handleStyle={{
                borderColor: theme.palette.primary.main,
                height: 28,
                width: 28,
                marginLeft: -14,
                marginTop: -12,
                backgroundColor: theme.palette.primary.main
              }}
              // railStyle={{ backgroundColor: "red", height: 10 }}
              onChange={minutes =>
                dispatch({ type: "setMinutes", sprinklerMinutes: minutes })
              }
            />
          </div>
        </div>
      </main>

      <div className={classes.footer}>
        <ButtonLink
          to="/home"
          variant="contained"
          fullWidth
          color="primary"
          onClick={() => {
            addLawn({ ...state, id: Date.now(), updated: Date.now() });
          }}
          style={{ ...buttonBig }}
        >
          CREATE ENTRY
        </ButtonLink>
      </div>
    </>
  );
};

export default withRoot(withStyles(styles)(withTheme()(Sprinkler)));
