"use client";
import Image from "next/image";
import { motion } from "framer-motion";

import areaChart from "@/assets/charts/area-chart.png";
import barChart from "@/assets/charts/bar-chart.png";
import lineChart from "@/assets/charts/line-chart.png";
import mapTree from "@/assets/charts/map-tree.png";
import pieChart from "@/assets/charts/pie-chart.png";
import scatterGraph from "@/assets/charts/scatter-graph.png";

const charts = [
  { key: 1, src: areaChart, alt: "area-chart" },
  { key: 2, src: barChart, alt: "bar-chart" },
  { key: 3, src: lineChart, alt: "line-chart" },
  { key: 4, src: mapTree, alt: "map-tree" },
  { key: 5, src: pieChart, alt: "pie-chart" },
  { key: 6, src: scatterGraph, alt: "scatter-graph" },
];

export const Ticker = () => {
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
            transition={{ duration: 20, ease: "linear", repeat: Infinity }}
            className="flex flex-none gap-24 pr-24"
          >
            {charts.map(({ key, src, alt }) => (
              <Image
                key={key}
                src={src}
                alt={alt}
                className="h-9 w-auto flex-none"
              ></Image>
            ))}
            {charts.map(({ key, src, alt }) => (
              <Image
                key={key}
                src={src}
                alt={alt}
                className="h-9 w-auto flex-none"
              ></Image>
            ))}
            {charts.map(({ key, src, alt }) => (
              <Image
                key={key}
                src={src}
                alt={alt}
                className="h-9 w-auto flex-none"
              ></Image>
            ))}
            {charts.map(({ key, src, alt }) => (
              <Image
                key={key}
                src={src}
                alt={alt}
                className="h-9 w-auto flex-none"
              ></Image>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};
