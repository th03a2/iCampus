import React from "react";
import { MDBCol, MDBContainer } from "mdb-react-ui-kit";

export default function Pregtest() {
  const model = JSON.parse(localStorage.getItem(`task-printout`));
  const { result } = model;
  return (
    <MDBContainer className="pl-5 mt-5 mb-5">
      <MDBCol>
        PREGNANCY TEST:&nbsp;
        <b style={{ color: result ? "red" : "black" }}>
          {result ? "POSITIVE" : "NEGATIVE"}
        </b>
      </MDBCol>
    </MDBContainer>
  );
}
