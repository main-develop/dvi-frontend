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
  { key: 1, src: areaChart, alt: "area-chart" },
  { key: 2, src: barChart, alt: "bar-chart" },
  { key: 3, src: lineChart, alt: "line-chart" },
  { key: 4, src: clusteredBar, alt: "clustered-bar" },
  { key: 5, src: mapTree, alt: "map-tree" },
  { key: 6, src: graph, alt: "graph" },
  { key: 7, src: pieChart, alt: "pie-chart" },
  { key: 8, src: columnLine, alt: "column-line" },
  { key: 9, src: scatterGraph, alt: "scatter-graph" },
  { key: 10, src: gantt, alt: "gantt" },
  { key: 11, src: histogram, alt: "histogram" },
];

export const Ticker = (): React.JSX.Element => {
  return (
    <div className="py-[72px] sm:py-24 bg-black text-white">
      <div className="container">
        <h2 className="text-xl text-center text-white/70">
          Supports various charts and graphs for data visualization
        </h2>
        <div className="relative ticker-transition mt-9 flex overflow-hidden">
          <motion.div
            initial={{ translateX: 0 }}
            animate={{ translateX: "-50%" }}
            transition={{ duration: 30, ease: "linear", repeat: Infinity }}
            className="flex flex-none gap-20 pr-20 sm:gap-24 sm:pr-24"
          >
            {(() => {
              const images = [];
              for (let i = 0; i < 4; i++) {
                images.push(
                  ...charts.map(({ key, src, alt }) => (
                    <Image
                      key={`${key}-${i}`}
                      src={src}
                      alt={alt}
                      className="h-9 w-auto flex-none"
                    />
                  ))
                );
              }
              return images;
            })()}
          </motion.div>
        </div>
      </div>
    </div>
  );
};
