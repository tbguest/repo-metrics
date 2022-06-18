import { useD3 } from "../../hooks/useD3";
import React from "react";
import * as d3 from "d3";

function BarChart({ data, width, height }) {
  const ref = useD3(
    (svg) => {
      //   const height = height;
      //   const width = width;
      const margin = { top: 20, right: 30, bottom: 30, left: 40 };

      console.log(data.map((d, i) => i));

      const x = d3
        .scaleBand()
        // .domain(data.map((d) => d.week))
        .domain(data.map((d, i) => i + 1))
        // .rangeRound([margin.left, width - margin.right])
        .range([margin.left, width - margin.right])
        .padding(0.1);

      const y1 = d3
        .scaleLinear()
        .domain([0, d3.max(data, (d) => d.total)])
        .rangeRound([height - margin.bottom, margin.top]);

      const xAxis = (g) =>
        g.attr("transform", `translate(0,${height - margin.bottom})`).call(
          d3
            .axisBottom(x)
            .tickValues(
              d3
                .ticks(...d3.extent(x.domain()), width / 40)
                .filter((v) => x(v) !== undefined)
            )
            .tickSizeOuter(0)
        );

      const y1Axis = (g) =>
        g
          .attr("transform", `translate(${margin.left},0)`)
          .style("color", "black")
          // .call(d3.axisLeft(y1).ticks(null, "s"))
          .call(d3.axisLeft(y1).ticks(4))
          .call((g) => g.select(".domain").remove())
          .call((g) =>
            g
              .append("text")
              .attr("x", -margin.left)
              .attr("y", 10)
              .attr("fill", "currentColor")
              .attr("text-anchor", "start")
              .text(data.y1)
          );

      svg.select(".x-axis").call(xAxis);
      svg.select(".y-axis").call(y1Axis);

      svg
        .select(".plot-area")
        .attr("fill", "#39d353")
        .selectAll(".bar")
        .data(data)
        .join("rect")
        .attr("class", "bar")
        // .attr("x", (d) => x(d.week))
        .attr("x", (d, i) => x(i + 1))
        .attr("width", x.bandwidth())
        .attr("y", (d) => y1(d.total))
        .attr("height", (d) => y1(0) - y1(d.total));
    },
    [data.length]
  );

  return (
    <svg
      ref={ref}
      //   viewBox={`0 0 ${height} ${width}`}
      style={{
        height: height,
        // height: "100%",
        // width: "100%",
        // width: width,
        marginRight: "0px",
        marginLeft: "0px",
      }}
    >
      <g className="plot-area" />
      <g className="x-axis" />
      <g className="y-axis" />
    </svg>
  );
}

export { BarChart };
