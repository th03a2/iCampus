import React from "react";
import { MDBTable, MDBTableHead, MDBTableBody } from "mdb-react-ui-kit";
import TableCard from "./card";

export default function SaleTable({ menus }) {
  return (
    <MDBTable align="middle" hover responsive small className="mt-3">
      <MDBTableHead>
        <tr>
          <th scope="col">#</th>
          <th scope="col" className="text-center">
            Title{" "}
          </th>

          <th scope="col">Menu</th>
          <th scope="col">Services</th>
          <th scope="col" className="text-center">
            Amount
          </th>
          <th>Count</th>
        </tr>
      </MDBTableHead>
      <MDBTableBody>
        {menus.map((menu, index) => (
          <TableCard
            key={`menu-${index}-${menu._id}`}
            menu={menu}
            index={index + 1}
          />
        ))}
      </MDBTableBody>
    </MDBTable>
  );
}
