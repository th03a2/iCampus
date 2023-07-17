import React from "react";
import { MDBCol, MDBContainer } from "mdb-react-ui-kit";

export default function Dengue() {
  const { ns1, igg, igm } = JSON.parse(localStorage.getItem(`task-printout`));

  return (
    <MDBContainer className="offset-1">
      <MDBCol>
        <h6>DENGUE SCREENING RESULTS :</h6>
        <MDBContainer>
          <MDBCol size="11" className="offset-1 ">
            NS1 Antigen:&nbsp;
            <b style={{ color: ns1 ? "red" : "black" }}>
              {ns1 ? "POSITIVE" : "NEGATIVE"}
            </b>
            <br />
            Antibody :
            <br />
            <MDBCol md="11" className="offset-1">
              IgG:&nbsp;
              <b style={{ color: igg ? "red" : "black" }}>
                {igg ? "POSITIVE" : "NEGATIVE"}
              </b>
              <br />
              IgM:&nbsp;
              <b style={{ color: igm ? "red" : "black" }}>
                {igm ? "POSITIVE" : "NEGATIVE"}
              </b>
            </MDBCol>
          </MDBCol>
        </MDBContainer>
      </MDBCol>
    </MDBContainer>
  );
}
