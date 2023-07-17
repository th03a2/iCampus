import React from "react";
import { MDBRow, MDBCol, MDBInput } from "mdb-react-ui-kit";
import { useSelector } from "react-redux";

export default function ModalForm({ croppedImage }) {
  const { theme } = useSelector(({ auth }) => auth);

  return (
    <MDBRow>
      <MDBCol md={12}>
        <center>
          <img src={croppedImage} className="img-fluid" alt="croppedImage" />
        </center>
      </MDBCol>
    </MDBRow>
  );
}
