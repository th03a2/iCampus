import React from "react";
import { MDBTypography } from "mdb-react-ui-kit";
import Company from "../../../fakeDb/company";

export default function ReceiptHeader() {
  return (
    <>
      <MDBTypography
        className="fw-bold cursor-pointer text-capitalize mb-0 border-top border-black"
        title="Click to print"
        onClick={window.print}
        tag="h5"
      >
        {Company.name}
      </MDBTypography>
      <MDBTypography className="mb-0">{Company.address}</MDBTypography>
      <MDBTypography
        style={{ marginBottom: "-5%" }}
        className="border-bottom border-black"
      >
        {Company.contact}
      </MDBTypography>
    </>
  );
}
