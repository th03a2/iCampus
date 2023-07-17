import React from "react";
import { MDBRow } from "mdb-react-ui-kit";
import Pathology from "./pathology";
import Performer from "./performer";
import Encoder from "./encoder";

export default function Index() {
  return (
    <MDBRow className="text-center">
      <Performer />
      <Encoder />
      <Pathology />
    </MDBRow>
  );
}
