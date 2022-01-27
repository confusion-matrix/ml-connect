import React from "react";

// We use Route in order to define the different routes of our application
import { Route, Routes } from "react-router-dom";

// We import all the components we need in our app

import Navbar from "./components/navbar";
import HomePage from "./components/homePage";

import Edit from "./components/SampleEdit";
import Create from "./components/SampleCreate";
<<<<<<< HEAD
// import Login from "./components/login";
=======
import Login from "./components/login";
import Footer from './components/footer'

>>>>>>> 9f712ba33a890deb143c7231407c7d9a870fdca0

const App = () => {
  return (
    <div>
      <AppNavbar />
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route path="/edit/:id" element={<Edit />} />
        <Route path="/create" element={<Create />} />
        {/* <Route path="/login" element={<Login />} /> */}
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
