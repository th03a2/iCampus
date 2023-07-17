import React from "react";
import { MDBTable, MDBTableHead, MDBTableBody } from "mdb-react-ui-kit";
import TableCard from "./card";

export default function SaleTable({ deals }) {
  return (
    <MDBTable align="middle" hover responsive small className="mt-3">
      <MDBTableHead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Menu</th>
          <th scope="col">Services</th>
          <th scope="col" className="text-center">
            Amount
          </th>
        </tr>
      </MDBTableHead>
      <MDBTableBody>
        {deals.map(
          (deal, index) =>
            deal.inhouse.length > 0 && (
              <TableCard
                key={`menu-${index}-${deal._id}`}
                deal={deal}
                index={index + 1}
              />
            )
        )}
      </MDBTableBody>
    </MDBTable>
  );
}
