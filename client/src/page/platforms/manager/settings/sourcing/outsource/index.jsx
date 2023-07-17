import React from "react";
import { MDBTable, MDBTableHead, MDBTableBody } from "mdb-react-ui-kit";
import { useSelector } from "react-redux";
import { paginationHandler } from "../../../../../../components/utilities";
import TableCard from "./card";

export default function SourcingTable({ page, handleVisibility }) {
  const { theme, maxPage } = useSelector(({ auth }) => auth),
    { vendors } = useSelector(({ sourcing }) => sourcing);

  return (
    <MDBTable align="middle" hover responsive color={theme.color}>
      <caption>List of Sourcing</caption>
      <caption className="caption-top"></caption>
      <MDBTableHead>
        <tr>
          <th scope="col">#</th>
          <th scope="col" className="text-center">
            Sendout
          </th>
          <th scope="col" className="text-center">
            Contract
          </th>
          <th scope="col" className="text-center">
            Status
          </th>
          <th scope="col" className="text-center">
            Actions
          </th>
        </tr>
      </MDBTableHead>
      <MDBTableBody>
        {!!vendors?.length &&
          paginationHandler(vendors, page, maxPage).map((vendor, index) => (
            <TableCard
              key={vendor._id}
              index={index + 1}
              vendor={vendor}
              handleVisibility={handleVisibility}
            />
          ))}
      </MDBTableBody>
    </MDBTable>
  );
}
