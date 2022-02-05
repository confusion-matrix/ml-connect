import React from "react";
import pic from "../imgs/3.png";
import drop from "../imgs/drop.png";
import shiner from "../imgs/shiner.png";
import savedel from "../imgs/savedel.png";
// HOME PAGE

export default function HomePage() {
  return (
    <div className="main fader2">
      <div className="container align-content-center">
        <h1 className="text-center py-3">Welcome!</h1>
        <div className="row">
          <img src={pic} className="py-3 col-sm-12 col-md-6"></img>
          <div className=" py-3 col-sm-12 col-md-6 align-content-center justify-content-center">
            Scrapper is a service to help people quickly parse though data and
            produce a short or long analysis. First you can present one or
            multiple documents, determine the file type, and then, using an open
            source AI library from TensorFlow, you will be presented with an
            analysis that you can either save to your profile or delete.
          </div>
        </div>

      </div>
      <div className="container py-3">
        <div className="row justify-content-center">
          <div className="py-3 col-sm-8 col-md-3">
            <img className="w-100" src={drop}></img>
            <h3>Step 1</h3>
            <p>
              Drag an image file or Excel Spreadsheet into the box. (NLP TBD:
              Soon)
            </p>
          </div>
          <div className="py-3 col-sm-8 col-md-3">
            <img src={shiner} className="w-100"></img>
            <h3>Step 2</h3>
            <p>
              If an Excel file is uploaded, first select the columns you'd wish
              to compare, and then the column result you'd like to compare them
              to.
            </p>
          </div>
          <div className="py-3 col-sm-8 col-md-3">
            <img src={savedel} className="w-100"></img>
            <h3>Step 3</h3>
            <p>
              Scrappi will give you his best guess. Review your result. (Ability
              to save and delete coming soon.)
            </p>
          </div>
        </div>
      </div>
    </div>
    </div>
    
  );
}
