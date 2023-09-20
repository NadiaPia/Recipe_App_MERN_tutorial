import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie'; //to access the token. It there is token => replace Login/Register with the Logout

function Navbar() {

  const [cookies, setCookies] = useCookies(["accessS_token"]);
  const navigate = useNavigate();

  const logout = () => {
    setCookies("accessS_token", "");
    window.localStorage.removeItem("userIDD");
    navigate("/auth")
  }
  return (
    <div className="navbar">
      <Link to={"/"}> Home </Link>
      <Link to={"/create-recipe"}> Create Recipe </Link>
      <Link to={"/saved-recipes"}> Saved Resipes </Link>
      {!cookies.accessS_token ? (
      <Link to={"/auth"}> Login/Registration </Link>
      ) : (
      <button onClick={logout}>Logout</button>) }
      


    </div>
  )
}

export default Navbar
