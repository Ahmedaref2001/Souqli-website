import React from 'react'
import notFoundstyle from '../stylee/notFoundstyle.module.css'
import { Link } from 'react-router-dom';
const NotFound = () => {
  return (
    <div className={notFoundstyle.notFoundPage}>
     <div className={notFoundstyle.box}>
     <h1>Oops !</h1>
      <h3>Error 404 not Found</h3>
      <Link to="/" className={notFoundstyle.link}>Try again</Link>
     </div>
    </div>
  )
}
export default NotFound;