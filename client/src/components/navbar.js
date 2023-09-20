import React from 'react';
import { Link } from 'react-router-dom';



function Navbar() {
  return (
    <div className="navbar">
      <Link to={"/"}> Home </Link>
      <Link to={"/create-recipe"}> Create Recipe </Link>
      <Link to={"/cased-recipes"}> Saved Resipes </Link>
      <Link to={"/auth"}> Login/Registration </Link>

    </div>
  )
}

export default Navbar
