import React from "react";
import { MDBCol, MDBContainer } from "mdb-react-ui-kit";
import Troupe from "../troupe";

export default function Typhoid() {
  const { igg, igm } = JSON.parse(localStorage.getItem(`task-printout`));

  return (
    <>
      <MDBCol>
        <h6>Results:</h6>
        <MDBContainer>
          <span>TYPHOID ANTIBODY Results :</span>
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
        </MDBContainer>
      </MDBCol>
      <hr />
      <Troupe />
    </>
  );
}
