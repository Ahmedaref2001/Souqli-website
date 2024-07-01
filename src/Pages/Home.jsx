import React,{useState,useRef} from "react";
import Navbar from "../components/Navbar";
import HomeSerch from "../components/HomeSerch";
import Categories from "../components/Categories"
import ProductsAndOffers from "../components/ProductsAndOffers"
import OurBlog from "../components/OurBlog";
import Footer from "../components/Footer"




export const Home = () => {
  const categoryElement = useRef(null);
  const blogElement = useRef(null);
  const contactElement = useRef(null);




  const [currentSection, setCurrentSection] = useState("");

  // Handle smooth scroll navigation
const handleNavigation = (id) => {
  if(categoryElement&&id==="#categoriesId"){
    categoryElement.current.scrollIntoView({ behavior: "smooth" });
  }else if(blogElement&&id==="#blogid"){
    blogElement.current.scrollIntoView({ behavior: "smooth" });
  }else if(contactElement&&id==="#contact"){
    contactElement.current.scrollIntoView({ behavior: "smooth" });
  }
};
  return (
    <div>
      <Navbar handleNavigation={handleNavigation} setCurrentSection={setCurrentSection} currentSection={currentSection}/>
      <HomeSerch />
      <Categories categoryElement={categoryElement}/>
      <ProductsAndOffers/>
      <OurBlog blogElement={blogElement}/>
      <Footer contactElement={contactElement}/>
    </div>
  );
};
export default Home;
