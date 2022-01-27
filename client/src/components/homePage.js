import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
import pic from '../imgs/1.png'
// HOME PAGE
 

 
export default function HomePage() {
 // This following section will display the table with the records of individuals.
 return (
   <div className='main'>
    <div className='container align-content-center'>
      <div className="text-center py-3">hello world</div>
      <div className='row'>
        <img src={pic} className='py-3 col-sm-12 col-md-6'></img>
        <div className=" py-3 col-sm-12 col-md-6 align-content-center justify-content-center">
          Scrapper is a service to help people quickly parse though data and produce a short or long analysis. First you can present one or multiple documents, determine the file type, and then, using an open source AI library from TensorFlow, you will be presented with an analysis that you can either save to your profile or delete.
          </div>
      </div>
    </div>
    <div className="container py-3">
      <div className="row justify-content-center">
        <div className='py-3 col-sm-8 col-md-3'>Step 1 drag your file into the box</div>
        <div className='py-3 col-sm-8 col-md-3'>Step 2 select your file type, size and response length then wait</div>
        <div className='py-3 col-sm-8 col-md-3'>Step 3 get your result that you can either save to your profile or delete</div>
      </div>
    </div>
   </div>
   
 );
}