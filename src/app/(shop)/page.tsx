import BestSellers from "../component/layout/bestSellers";
import Cta from "../component/layout/cta";
import Features from "../component/layout/features";
import Hero from "../component/layout/hero";
import Sales from "../component/layout/sales";


export default function Home() {
  return (
    <>
      <Hero />
      <Features />
      <BestSellers />
      <Cta />
      <Sales />
    </>
  );
}
