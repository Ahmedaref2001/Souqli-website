import React, { useState,useEffect } from "react";
import sortAndSearchstyle from "../stylee/sortAndSearchForProductsstyle.module.css";
import NewProduct from "../components/NewProduct";
import { Container } from "react-bootstrap";
import { IoClose } from "react-icons/io5";
import { FaFilter } from "react-icons/fa6";


export const SortAndSearchForProducts = ({
  searchValue,
  hindelClickOnClose,
  products,
  numberOfItems
}) => {


 
  
  
  return (
    <>
    {numberOfItems >0?
   
    <section>
       <Container>
        <div className={sortAndSearchstyle.searchAndSort}>
          <div className={sortAndSearchstyle.searchInfo}>
            <span className={sortAndSearchstyle.resalt}>
              <h3>Search results for</h3>
              <span>
                <h3>{searchValue}</h3>
                {searchValue && (
                  <IoClose
                    className={sortAndSearchstyle.icon}
                    onClick={() => {
                      hindelClickOnClose();
                    }}
                  />
                )}
              </span>
            </span>
            <p>Showing {numberOfItems} results</p>
          </div>
          <div className={sortAndSearchstyle.sortBox}>
            <span>
              <FaFilter className={sortAndSearchstyle.icon} />
            </span>
            <select>
              <option>Selection Option</option>
              <option value={"Most Popular"}>Sort by:Most Popular</option>
            </select>
          </div>
        </div>
        <div className={sortAndSearchstyle.products}>
          {products.map((ele) => (
            <NewProduct props={ele} key={ele.id}/>
          ))}
        </div>
      </Container>
    </section>:"" }</>
  );
};
export default SortAndSearchForProducts;
