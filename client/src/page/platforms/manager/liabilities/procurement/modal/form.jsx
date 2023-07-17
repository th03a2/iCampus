import React from "react";
import { MDBRow, MDBCol, MDBInput } from "mdb-react-ui-kit";
import { useSelector } from "react-redux";

export default function ModalForm() {
  const { theme } = useSelector(({ auth }) => auth);

  return (
    <MDBRow>
      <MDBCol md={12}>
        <MDBInput
          type="number"
          icon="thermometer-half"
          label="Celsius"
          name="celsius"
          contrast={theme.dark}
          required
        />
      </MDBCol>
      {/* <MDBCol md={6}>
        <MDBInput
          type="text"
          label="Ref temp"
          name="refTemp"
          contrast={theme.refTemp}
          required
        />
      </MDBCol> */}
    </MDBRow>
  );
}
