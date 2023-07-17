import React from "react";
import { MDBCol } from "mdb-react-ui-kit";
import { properNameFormatter } from "../../../../components/utilities";

const Encoder = () => {
  const encoder = JSON.parse(localStorage.getItem(`task-printout`))
    .signatories[2];
  return (
    <MDBCol className="mt-3" size={6}>
      {encoder?.fullName && (
        <>
          <u
            style={{ fontSize: "15px" }}
            className="fw-bold mb-0 text-capitalize"
          >
            {properNameFormatter(encoder.fullName, false, false)}
          </u>
          <p style={{ fontSize: "12px" }} className="text-muted">
            Receptionist
          </p>
        </>
      )}
    </MDBCol>
  );
};

export default Encoder;
