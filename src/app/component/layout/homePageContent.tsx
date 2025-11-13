"use client"
import { useEffect } from "react";
import BestSellers from "./bestSellers";
import Cta from "./cta";
import Features from "./features";
import Hero from "./hero";
import Sales from "./sales";
import { useDispatch } from "react-redux";
import { fetchProducts } from "@/store/productslice";
import { AppDispatch } from "@/store/store";



export default function HomePageContent() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchProducts())
  }, [dispatch])
  
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
