import React from "react";
import { MDBBadge } from "mdb-react-ui-kit";

export default function Gross({ sales }) {
  return (
    <MDBBadge>{sales.reduce((total, sale) => total + sale.amount, 0)}</MDBBadge>
  );
}
