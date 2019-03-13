import React from "react";
import { withStyles, withTheme } from "@material-ui/core/styles";
import withRoot from "../withRoot";
import Typography from "@material-ui/core/Typography";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import IconButton from "@material-ui/core/IconButton";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";

// libs
import "rc-slider/assets/index.css";
import Slider, { createSliderWithTooltip } from "rc-slider";

// components
import ButtonLink from "../components/ButtonLink";
import Header from "../components/Header";

// common styles
import { locationRoot, main } from "../styles/common";

// images
import SpraySprinkler from "../images/spraySprinkler.png";
import SingleStreamRotor from "../images/singleStreamRotorSprinkler.png";
import MultipleStreamRotor from "../images/multipleStreamRotorSprinkler.png";
import MoveableSprinkler from "../images/moveableSprinkler.png";

// slider tooltip
const SliderWithTooltip = createSliderWithTooltip(Slider);
const sprinklers = [
  {
    name: "Spray Sprinkler",
    img: SpraySprinkler,
    waterFlow: 0.02, // inches of water
    minutes: 10
  },
  {
    name: "Single Stream Rotor",
    img: SingleStreamRotor,
    waterFlow: 0.01,
    minutes: 10
  },
  {
    name: "Multiple Stream Rotor",
    img: MultipleStreamRotor,
    waterFlow: 0.01,
    minutes: 10
  },
  {
    name: "Moveable Sprinkler",
    img: MoveableSprinkler,
    waterFlow: 0.022,
    minutes: 10
  }
];

const styles = theme => ({
  root: { ...locationRoot },
  main: { ...main },
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
  footer: {
    padding: 16,
    paddingTop: 8,
    paddingBottom: 32
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
    name: "",
    img: null,
    waterFlow: 0.05,
    minutes: 10
  };
};

// REDUCER ---------------------------------
function reducer(state, action) {
  switch (action.type) {
    case "setSprinkler":
      return {
        ...state,
        name: action.name,
        img: action.img,
        waterFlow: action.waterFlow,
        minutes: action.minutes
      };
    case "setMinutes":
      return { ...state, minutes: action.minutes };
    case "reset":
      return { name: "", img: null, waterFlow: 0, minutes: 10 };
    default:
      throw new Error();
  }
}

const Sprinkler = ({ classes, theme }) => {
  // State --------------------------------------------
  const [state, dispatch] = React.useReducer(reducer, initialState());

  // selecting the sprinkler --------------------------------------------
  function toggleImage(event) {
    if (event.target.value === state.name) {
      dispatch({ type: "reset" });
    } else {
      const spk = sprinklers.find(s => s.name === event.target.value);
      dispatch({
        type: "setSprinkler",
        name: spk.name,
        img: spk.img,
        waterFlow: spk.waterFlow,
        minutes: spk.minutes
      });
    }
  }

  return (
    <div className={classes.root}>
      <Header icon="chevron-left" title="Sprinkler Type - (step 3/3)" />
      <main className={classes.main}>
        <div className={classes.padding}>
          <Typography variant="h6" align="center">
            What type of water system do you have?
          </Typography>

          <br />
          <Typography variant="caption" align="justify">
            Note: If none is selected, it defaults to the most commonly sold
            type in the region.
          </Typography>
        </div>

        <div className={classes.containerList}>
          <GridList className={classes.gridList} cols={1.5}>
            {sprinklers.map(sprinkler => {
              return (
                <GridListTile key={sprinkler.img}>
                  <img src={sprinkler.img} />
                  {/* <img src={tile.img} alt={tile.title} /> */}
                  <GridListTileBar
                    title={sprinkler.name}
                    classes={{
                      root: classes.titleBar,
                      title: classes.title
                    }}
                    actionIcon={
                      <IconButton>
                        <Checkbox
                          checked={state.name === sprinkler.name}
                          onChange={toggleImage}
                          value={sprinkler.name}
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

        <div style={{ padding: "16px 24px" }}>
          <Typography variant="body1" align="center" gutterBottom>
            The sprinkler runs for {state.minutes}{" "}
            {state.minutes > 1 ? "min" : "min "}
          </Typography>

          <br />
          <div
            style={{
              width: "90%",
              margin: "0 auto",
              marginTop: 24
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
              defaultValue={state.minutes}
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
              onChange={minutes => dispatch({ type: "setMinutes", minutes })}
            />
          </div>
        </div>
      </main>

      <ButtonLink to="/main" variant="contained" fullWidth color="primary">
        CREATE ENTRY
      </ButtonLink>
    </div>
  );
};

export default withRoot(withStyles(styles)(withTheme()(Sprinkler)));
