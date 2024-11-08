import "./home.css";
import { Overview } from "@/components/home-page/ui/Overview";
import { Ticker } from "@/components/home-page/ui/Ticker";

export const HomePage = (): React.JSX.Element => {
  return (
    <>
      <Overview></Overview>
      <Ticker></Ticker>
    </>
  );
};
