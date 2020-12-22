import React, { useState } from "react";

//display when no  event is available
const NoData = () => {
  return (
    <React.Fragment>
      <div className="card mb-4">
        <div className="card-body">
          <h2 className="card-title">No Data Found</h2>
          <p className="card-text">Add events now...</p>
        </div>
      </div>
    </React.Fragment>
  );
};

export default NoData;
