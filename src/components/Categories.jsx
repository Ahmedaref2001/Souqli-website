import React, { useEffect, useState } from "react";
import categoriesstyle from "../stylee/categoriesstyle.module.css";
import { Container } from "react-bootstrap";
import BoxOfCategorie from "./BoxOfCategorie";
import axios from "axios";
import Loader from '../components/Loader'
export const Categories = ({categoryElement}) => {
  const[loadind,setLoadind]=useState(false)

  useEffect(() => {
    setLoadind(true)
    axios
      .get("https://souqlysystemsite.runasp.net/api/Home/User-home")
      .then((res) => {
        setCategories(res.data.categories);
        setLoadind(false)
      })
      .catch((res) => {
        console.log(res);
        setLoadind(false)
      });
  }, []);

  
  const [categories, setCategories] = useState([]);

  

  return (
    <>
    {loadind&&<Loader/>}

    <div className={categoriesstyle.categoriesBox} ref={categoryElement}>
      <Container>
        <h2>Categories</h2>
        <div className={categoriesstyle.allCategories}>
          {categories.map((ele) => (
            <BoxOfCategorie key={ele.id} props={ele} />
          ))}
        </div>
      </Container>
    </div>
    </>
    
  );
};
export default Categories;
