import { Navbar } from "@/components/Navbar";
import { Overview } from "@/components/Overview";
import { Ticker } from "@/components/Ticker";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar></Navbar>
      <Overview></Overview>
      <Ticker></Ticker>
      <Footer></Footer>
    </>
  );
}
