import React from "react";
import Navbar from "../components/Navbar";
import HomeSerch from "../components/HomeSerch";
import Categories from "../components/Categories"
import ProductsAndOffers from "../components/ProductsAndOffers"
import OurBlog from "../components/OurBlog";
import Footer from "../components/Footer"


export const Home = () => {
  return (
    <div>
      <Navbar/>
      <HomeSerch />
      <Categories/>
      <ProductsAndOffers/>
      <OurBlog/>
      <Footer/>
    </div>
  );
};
export default Home;
