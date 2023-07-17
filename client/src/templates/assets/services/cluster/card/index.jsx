import React from "react";
import { MDBTable } from "mdb-react-ui-kit";
import Development from "./development";
import Gender from "./gender";
import Equal from "./equal";

export default function Body({ references, preference, serviceId }) {
  const handleTitle = () => {
    switch (preference) {
      case "gender":
        return <Gender references={references} serviceId={serviceId} />;
      case "development":
        return <Development references={references} serviceId={serviceId} />;
      default:
        return <Equal references={references} serviceId={serviceId} />;
    }
  };

  return (
    <MDBTable align="middle" hover responsive small className="mt-2 bg-white">
      {handleTitle(preference)}
    </MDBTable>
  );
}
