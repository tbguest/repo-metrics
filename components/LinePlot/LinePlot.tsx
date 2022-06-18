import React, { useEffect } from "react";
import * as d3 from "d3";

import styles from "./LinePlot.module.css";

function LinePlot(props) {
  const { data, width, height } = props;

  const plotId = "";
  const id = `container${plotId}`;

  useEffect(() => {
    drawChart();
  }, [data]);

  function drawChart() {
    // console.log("datatotal", data[0].total);
    // Add logic to draw the chart here

    d3.select("#container").select("svg").remove();

    const margin = { top: 50, right: 50, bottom: 50, left: 50 };
    const yMinValue = d3.min(data, (d) => d.total);
    const yMaxValue = d3.max(data, (d) => d.total);
    const xMinValue = d3.min(data, (d) => d.week);
    const xMaxValue = d3.max(data, (d) => d.week);

    const svg = d3
      .select("#container")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      // .attr("viewBox", `0 0 ${width} ${height}`)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    const xScale = d3
      .scaleLinear()
      .domain([xMinValue, xMaxValue])
      .range([0, width]);
    const yScale = d3.scaleLinear().range([height, 0]).domain([0, yMaxValue]);
    const line = d3
      .line()
      .x((d) => xScale(d.week))
      .y((d) => yScale(d.total));
    //   .curve(d3.curveMonotoneX);

    // define the area
    const area = d3
      .area()
      .x((d) => xScale(d.week))
      .y0(100) // from height in [id]?
      .y1((d) => yScale(d.total));

    svg
      .append("g")
      .attr("class", "x-axis")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom().scale(xScale).tickSize(15));
    svg.append("g").attr("class", "y-axis").call(d3.axisLeft(yScale));
    svg
      .append("path")
      .datum(data)
      .attr("fill", "None")
      .attr("stroke", "#39d353")
      .attr("stroke-width", 4)
      .attr("class", "line")
      .attr("d", line);

    // add the area
    svg
      .append("path")
      .data([data])
      .attr("class", "area")
      .attr("d", area)
      .attr("fill", "#39d353");
  }
  // return <div id="container" />;
  return <div id="container" className={styles.container} />;
}

export default LinePlot;
