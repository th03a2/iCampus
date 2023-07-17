import React from "react";
import { MDBRow, MDBCol, MDBInput } from "mdb-react-ui-kit";

import { useSelector } from "react-redux";

export default function ModalForm({ data }) {
  const { theme } = useSelector(({ auth }) => auth);

  return (
    <MDBRow>
      <MDBCol md={12}>
        <MDBInput
          type="number"
          label="Celsius"
          name="celsius"
          contrast={theme.dark}
          defaultValue={data.celsius}
          required
        />
      </MDBCol>
    </MDBRow>
  );
}
