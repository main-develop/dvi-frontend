import "./home.css";
import { Overview } from "@/components/main/home-page/ui/Overview";
import { Ticker } from "@/components/main/home-page/ui/Ticker";

export const HomePage = (): React.JSX.Element => {
  return (
    <>
      <Overview></Overview>
      <Ticker></Ticker>
    </>
  );
};
