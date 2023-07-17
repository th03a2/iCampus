import React from "react";
import { MDBCol } from "mdb-react-ui-kit";
import { properNameFormatter } from "../../../../components/utilities";

const Index = () => {
  const performer = JSON.parse(localStorage.getItem(`task-printout`))
    .signatories[0];

  return (
    <MDBCol
      size={6}
      className="mt-3"
      // style={{ position: "relative", marginRight: 200 }}
    >
      {performer && (
        <>
          <u
            style={{ fontSize: "15px" }}
            className="fw-bold mb-0 text-capitalize"
          >
            {properNameFormatter(performer?.fullName, false, false)}
            {", "}
            {performer?.fullName?.postnominal}
          </u>
          <p style={{ fontSize: "12px" }} className="text-muted">
            Medical Laboratory Scientist PRC#: {performer?.prc?.id}
          </p>
        </>
      )}

      {!performer && <span>Please Select signatories</span>}
    </MDBCol>
  );
};

export default Index;
