import React from "react";

import { withStyles, withTheme } from "@material-ui/core/styles";
import withRoot from "../withRoot";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ReferenceLine,
  Cell
} from "recharts";

// utils
import reverse from "lodash.reverse";
import format from "date-fns/format";
import isAfter from "date-fns/isAfter";
import subDays from "date-fns/subDays";
import addDays from "date-fns/addDays";
import { runWaterDeficitModel } from "../utils/api";

import AppContext from "../context/appContext";
import { Typography } from "@material-ui/core";

const styles = theme => ({
  root: {
    // padding: "16px 0",
  }
});

const reversedLastDays = field => {
  // only latest value to display on the barChart
  const irrigationDateIdx = field.data.findIndex(
    d => d.date === field.irrigationDate
  );

  const idxMinus7Days = irrigationDateIdx - 7 < 0 ? 0 : irrigationDateIdx - 7;
  const idxPlus2Days = irrigationDateIdx + 3;

  // console.log(field);
  const forecast3Days = field.forecast.daily.data.slice(0, 3);
  // console.log(forecast3Days);
  let data = field.data.slice(idxMinus7Days, idxPlus2Days);
  if (field.isThisYear) {
    data = data.map((d, i) => {
      let p = { ...d };
      if (i === 7) {
        p.forecast = forecast3Days[0];
      }
      if (i === 8) {
        p.forecast = forecast3Days[1];
      }
      if (i === 9) {
        p.forecast = forecast3Days[2];
      }
      return p;
    });
  }
  // console.log(data);
  return reverse(data);
};

const BarChartDeficit = React.memo(({ theme }) => {
  // console.log("BarChart");
  const { lawn, setLawn, lawns, setLawns } = React.useContext(AppContext);
  const [lastDays, setLastDays] = React.useState(reversedLastDays(lawn));

  // The domain needs to be as big as possible related to the deficit
  const initialDomain = () => {
    const min = Math.min(...lastDays.map(d => d.barDeficit));
    const max = Math.max(...lastDays.map(d => d.barDeficit));

    const absMin = Math.abs(min);
    const absMax = Math.abs(max);

    const dom = Math.max(absMin, absMax);
    return dom + dom * 0.4;
  };

  const [domain, setDomain] = React.useState(initialDomain);
  const determineDomain = lastDays => {
    const min = Math.min(...lastDays.map(d => d.barDeficit));
    const max = Math.max(...lastDays.map(d => d.barDeficit));

    const absMin = Math.abs(min);
    const absMax = Math.abs(max);

    const newDomain = Math.max(absMin, absMax);
    const maxDomain = Math.max(domain, newDomain);

    setDomain(maxDomain);
  };

  React.useEffect(() => {
    // console.log("change field");
    setLastDays(reversedLastDays(lawn));
  }, [lawn]);

  React.useEffect(() => {
    // console.log("change domain");
    determineDomain(lastDays);
  }, [lastDays]);

  const watered = date => {
    const copy = { ...lawn };

    const index = copy.data.findIndex(d => d.date === date);
    const water = copy.sprinklerRate * copy.sprinklerMinutes;
    const day = copy.data[index];
    day.waterAppliedByUser = day.waterAppliedByUser === 0 ? water : 0;
    day.waterAppliedByUser === 0
      ? (day.pcpn = day.pcpn - water)
      : (day.pcpn = day.pcpn + water);

    const pcpns = copy.data.map(d => d.pcpn);
    const pets = copy.data.map(d => d.pet);
    const updatedDeficit = runWaterDeficitModel(pcpns, pets);

    const updatedData = copy.data.map((day, i) => {
      let p = { ...day };
      p.deficit = +updatedDeficit.deficitDaily[i].toFixed(2);
      p.barDeficit =
        p.deficit >= 0 ? p.deficit - p.threshold : p.deficit - p.threshold;
      return p;
    });
    copy.data = [...updatedData];
    setLawn(copy);
    setLastDays(reversedLastDays(copy));
    const filteredLawns = lawns.filter(l => l.id === lawn.id);
    const updatedLawns = [copy, ...filteredLawns];
    setLawns(updatedLawns);
  };

  const XaxisLabel = props => {
    const { x, y, index } = props;
    return (
      <>
        {index === 0 ? (
          <g transform={`translate(${x - 10},${y + 3})`}>
            <text
              x={24}
              y={15}
              fontSize="0.7rem"
              fill={theme.palette.grey["600"]}
            >
              DRY
            </text>
            <svg width={20} height={20} x={0} y={0}>
              <FontAwesomeIcon icon="tint" color={"#F79824"} />
            </svg>
          </g>
        ) : (
          <g transform={`translate(${x - 10},${y + 3})`}>
            <text
              x={-30}
              y={15}
              fontSize="0.7rem"
              fill={theme.palette.grey["600"]}
            >
              WET
            </text>
            <svg width={20} height={20} x={0} y={0}>
              <FontAwesomeIcon icon="tint" color={"#0197F6"} />
            </svg>
          </g>
        )}
      </>
    );
  };

  const YaxisLabel = props => {
    const { x, y, payload } = props;
    const date = payload.value;
    const isDeficit = lawn.data.find(d => d.date === date).barDeficit < 0;
    const today = new Date();
    const tomorrow = addDays(today, 1);
    const yesterday = subDays(today, 1);
    const formatted = date => format(date, "M/dd/yyyy");

    let day = "";
    if (date === formatted(tomorrow)) day = "tomorrow";
    if (date === formatted(today)) day = "today";
    if (date === formatted(yesterday)) day = "yesterday";

    const text = day => {
      switch (day) {
        case "tomorrow":
          return <tspan fontSize="1rem">Tomorrow</tspan>;
        case "today":
          return (
            <tspan
              fontWeight="bold"
              fill={isDeficit ? "#F79824" : "#0197F6"}
              fontSize="1.2rem"
            >
              TODAY
            </tspan>
          );
        case "yesterday":
          return <tspan fontSize="1rem">Yesterday</tspan>;
        default:
          return (
            <tspan fontSize="1rem">{format(new Date(date), "MMM do")}</tspan>
          );
      }
    };

    return (
      <g>
        <text x={x - 80} y={y} dy={5} fill="#666">
          {text(day)}
        </text>
      </g>
    );
  };

  function allowedToWater(date) {
    let streetNumber = "odd";
    if (lawn.streetNumber % 2 === 0) streetNumber = "even";
    let todayDate = "odd";
    if (new Date(date).getDate() % 2 === 0) todayDate = "even";
    return streetNumber === todayDate;
  }

  // console.log(window.innerWidth, window.innerHeight);
  let width = window.innerWidth;
  if (width > 600) width = 640;
  let height = "82%";
  if (window.innerHeight < 450) height = 600;
  // console.log(width, height);

  const RightIconButtons = props => {
    const { y, index, payload, lastDays } = props;
    const today = new Date().toLocaleDateString();

    return (
      <svg
        width={100}
        height={22}
        x={lawn.isThisYear ? width - 93 : width - 80}
        y={y - 10}
        style={{ filter: "brightness(0.5) sepia(1) " }}
      >
        {isAfter(new Date(lastDays[index].date), new Date()) ? (
          <g transform={`translate(${-18},${0})`}>
            <text
              x={74}
              y={16}
              fontSize="0.8rem"
              fill={theme.palette.grey["600"]}
            >
              {(lastDays[index].forecast.precipProbability * 100).toFixed(0)}%
            </text>
            <svg width={20} x={50}>
              <FontAwesomeIcon
                icon={["fal", "cloud-rain"]}
                color={theme.palette.grey["600"]}
              />
            </svg>
          </g>
        ) : lastDays[index].waterAppliedByUser === 0 ? (
          lawn.streetNumber !== null &&
          lastDays[index].date === today &&
          !allowedToWater(lastDays[index].date) ? (
            <Typography variant="caption">not allowed</Typography>
          ) : (
            <FontAwesomeIcon
              icon={["fa", "tint"]}
              color={theme.palette.grey["300"]}
              onClick={() => watered(payload.value)}
            />
          )
        ) : (
          <FontAwesomeIcon
            icon={["fas", "tint"]}
            color={"#0197F6"}
            onClick={() => watered(payload.value)}
          />
        )}
      </svg>
    );
  };

  return (
    <ResponsiveContainer width={width} height={height}>
      <BarChart
        layout="vertical"
        // width={window.innerWidth > 500 ? 500 : window.innerWidth}
        // height={window.innerHeight < 500 ? 500 : window.innerHeight - 165}
        data={lastDays}
        maxBarSize={15}
        margin={{ top: 24, right: 40, left: 50, bottom: 8 }}
      >
        <XAxis
          type="number"
          tick={<XaxisLabel />}
          tickCount={2}
          ticks={[+domain.toFixed(2) * -1, +domain.toFixed(2)]}
          interval="preserveStartEnd"
          stroke={theme.palette.grey["300"]}
          domain={[-domain, domain]}
        />

        {/* Left dates */}
        <YAxis
          dataKey="date"
          type="category"
          orientation="left"
          tickLine={false}
          axisLine={false}
          tick={<YaxisLabel />}
        />

        {/* RIght Icons */}
        <YAxis
          dataKey="date"
          yAxisId="right"
          type="category"
          orientation="right"
          tickLine={false}
          axisLine={false}
          tick={<RightIconButtons lastDays={lastDays} />}
        />

        <ReferenceLine x={0} stroke={theme.palette.grey["300"]} />

        <Bar dataKey="barDeficit" minPointSize={0} radius={[0, 20, 20, 0]}>
          {lastDays.map(day => {
            return (
              <Cell
                key={day.date}
                fill={day.barDeficit >= 0 ? "#0197F6" : "#F79824"}
              />
            );
          })}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
});

export default withRoot(withStyles(styles)(withTheme()(BarChartDeficit)));
