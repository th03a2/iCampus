import React from "react";
import { MDBCol, MDBContainer } from "mdb-react-ui-kit";
import { aboArray } from "../../../../../../../assets/references";

export default function BloodTyping() {
  const { results } = JSON.parse(localStorage.getItem(`task-printout`));
  const aboType = aboArray[results?.bt];
  return (
    <MDBContainer className="pl-5 offset-1">
      <hr />
      <MDBCol>
        <h6>BLOOD TYPING :</h6>
        <MDBContainer className="mb-3">
          <MDBCol size="11" className="offset-1">
            FORWARD :&nbsp;
            <b>"{aboType}"</b>
          </MDBCol>
          <MDBCol size="11" className="offset-1">
            REVERSE :&nbsp;
            <b>"{aboType}"</b>
          </MDBCol>
        </MDBContainer>
        <MDBContainer>
          <MDBCol size="11" className="offset-1">
            RH :&nbsp;
            <b style={{ color: results?.rh ? "red" : "black" }}>
              {results?.rh ? "POSITIVE" : "NEGATIVE"}
            </b>
          </MDBCol>
        </MDBContainer>
      </MDBCol>
    </MDBContainer>
  );
}
