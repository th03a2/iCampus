import React from "react";
import { MDBCol } from "mdb-react-ui-kit";
import {
  ENDPOINT,
  properNameFormatter,
} from "../../../../components/utilities";

const Index = () => {
  const pathologist = JSON.parse(localStorage.getItem(`task-printout`))
    .signatories[1];

  return (
    <MDBCol size={12} style={{ position: "relative" }}>
      {pathologist && (
        <>
          <img
            src={`${ENDPOINT}/public/patron/${pathologist.email}/signature.png`}
            style={{
              height: 100,
              position: "absolute",
              top: -55,
              left: 370,
            }}
            //
            alt="Pathologist"
          />
          <u
            style={{ fontSize: "15px" }}
            className="fw-bold mb-0 text-capitalize"
          >
            {properNameFormatter(pathologist?.fullName, false, false)}
            {", "}
            {pathologist?.fullName?.postnominal}
          </u>
          <p style={{ fontSize: "12px" }} className="text-muted mb-0">
            Pathologist PRC#: {pathologist?.prc?.id}
          </p>
        </>
      )}
      {!pathologist && <span>No Patholgist tagged</span>}
    </MDBCol>
  );
};

export default Index;
