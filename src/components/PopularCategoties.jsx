import React from 'react'
import popularCategotiesstyle from '../stylee/popularCategotiesstyle.module.css'
import { Link } from 'react-router-dom'
export const PopularCategoties = ({details}) => {
  return (
    <div className={popularCategotiesstyle.box}>
        <img src={details.imageUrl} alt='bgImg'/>
        <div className={popularCategotiesstyle.boxDetails}>
        <h4>{details.name}</h4>
        <p>{details.description}</p>
        <Link to={`/DiscoverProducts/${details.name}`} className={popularCategotiesstyle.link}>Shop Now</Link>
        </div>
    </div>
  )
}

export default PopularCategoties