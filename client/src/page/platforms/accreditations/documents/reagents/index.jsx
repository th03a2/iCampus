import React from "react";
import { MDBRow, MDBContainer } from "mdb-react-ui-kit";
import BreadCrumb from "../../../../../components/breadcrumb";

const path = [
  {
    path: "Reagents",
  },
];

export function Reagents() {
  return (
    <>
      <BreadCrumb title="Reagent Inventory" paths={path} button={false} />
      <MDBContainer className="py-5 mt-4">
        <MDBRow className="mb-3">Reagents</MDBRow>
      </MDBContainer>
      ;
    </>
  );
}
