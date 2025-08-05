import BestSellers from "../component/ui/bestSellers";
import Cta from "../component/ui/cta";
import Features from "../component/ui/features";
import Hero from "../component/ui/hero";
import Sales from "../component/ui/sales";


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
