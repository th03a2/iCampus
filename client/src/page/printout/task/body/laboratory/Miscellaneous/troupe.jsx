import React from "react";
import { MDBCol } from "mdb-react-ui-kit";

export default function Troupe() {
  const { method, kit, lot, expiry } = JSON.parse(
    localStorage.getItem(`task-printout`)
  )?.troupe;

  return (
    <MDBCol>
      Method : <b> {method} </b> <br />
      Kit : <b>{kit}</b> <br />
      Lot Number :<b> {lot}</b> <br />
      Expiration Date : <b>{expiry}</b>
    </MDBCol>
  );
}
