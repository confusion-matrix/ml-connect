import React from "react";

// We use Route in order to define the different routes of our application
import { Route, Routes } from "react-router-dom";

// We import all the components we need in our app

import AppNavbar from "./components/navbar";
import HomePage from "./components/homePage";
import { Navi, NaviItem } from "./components/navi";

import Edit from "./components/SampleEdit";
import Create from "./components/SampleCreate";
import Footer from "./components/footer";
import RecordList from "./components/SampleRecordList";
import "./components/style.css"

// import UploadData from "./components/uploadData";
import UserPage from "./components/userPage";

const App = () => {
  return (
    <div>
      <AppNavbar />
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route path="/edit/:id" element={<Edit />} />
        <Route path="/create" element={<Create />} />
<<<<<<< HEAD
        
        
        <Route path="/userPage" element={<UserPage />} />
=======
        <Route exact path="/RecordList" element={<RecordList />} />
>>>>>>> b28964bd28ae962890f4cab78e9180267c9f16ae
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
