"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import areaChart from "@/shared/assets/charts/area-chart.png";
import barChart from "@/shared/assets/charts/bar-chart.png";
import clusteredBar from "@/shared/assets/charts/clustered-bar.png";
import columnLine from "@/shared/assets/charts/column-line.png";
import gantt from "@/shared/assets/charts/gantt.png";
import graph from "@/shared/assets/charts/graph.png";
import lineChart from "@/shared/assets/charts/line-chart.png";
import mapTree from "@/shared/assets/charts/map-tree.png";
import pieChart from "@/shared/assets/charts/pie-chart.png";
import scatterGraph from "@/shared/assets/charts/scatter-graph.png";
import histogram from "@/shared/assets/charts/histogram.png";

const charts = [
  { src: areaChart, alt: "area-chart" },
  { src: barChart, alt: "bar-chart" },
  { src: lineChart, alt: "line-chart" },
  { src: clusteredBar, alt: "clustered-bar" },
  { src: mapTree, alt: "map-tree" },
  { src: graph, alt: "graph" },
  { src: pieChart, alt: "pie-chart" },
  { src: columnLine, alt: "column-line" },
  { src: scatterGraph, alt: "scatter-graph" },
  { src: gantt, alt: "gantt" },
  { src: histogram, alt: "histogram" },
];

export const Ticker = (): React.JSX.Element => {
  return (
    <div className="py-[72px] sm:py-24 bg-black text-white">
      <div className="container">
        <h2 className="text-xl text-center text-white/70">
          Supports various charts and graphs for data visualization
        </h2>
        <div className="relative flex overflow-hidden mt-9 ticker-transition">
          <motion.div
            initial={{ translateX: 0 }}
            animate={{ translateX: "-50%" }}
            transition={{ duration: 30, ease: "linear", repeat: Infinity }}
            className="flex flex-none pr-20 sm:pr-24 gap-20 sm:gap-24"
          >
            {Array.from({ length: 4 }).flatMap((_, i) =>
              charts.map(({ src, alt }) => (
                <Image
                  key={`${i}-${alt}`}
                  src={src}
                  alt={alt}
                  className="flex-none h-9 w-auto select-none"
                />
              ))
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};
