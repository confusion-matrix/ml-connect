import React from "react";

// We use Route in order to define the different routes of our application
import { Route, Routes } from "react-router-dom";

// We import all the components we need in our app

import AppNavbar from "./components/navbar";
import HomePage from "./components/homePage";

import Edit from "./components/SampleEdit";
import Create from "./components/SampleCreate";
import Footer from "./components/footer";
import RecordList from "./components/SampleRecordList";

const App = () => {
  return (
    <div>
      <AppNavbar />
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route path="/edit/:id" element={<Edit />} />
        <Route path="/create" element={<Create />} />
        <Route exact path="/RecordList" element={<RecordList />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
