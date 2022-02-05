import React from "react";

// We use Route in order to define the different routes of our application
import { Route, Routes } from "react-router-dom";

// We import all the components we need in our app

import AppNavbar from "./components/navbar";
import HomePage from "./components/homePage";
import { Navi, NaviItem } from "./components/navi";

import Footer from "./components/footer";
import "./components/style.css"

import Auth from "./utils/auth";

// import UploadData from "./components/uploadData";
import UserPage from "./components/userPage";

const App = () => {
  return (
    <div>
      <AppNavbar />
      <Routes>
        {Auth.loggedIn() ? (
          <Route path="/" element={<UserPage />}/>
        ) : (
          <Route exact path="/" element={<HomePage />} />
        )}  
        <Route path="/userPage" element={<UserPage />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
