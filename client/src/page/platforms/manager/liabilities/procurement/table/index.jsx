import React from "react";
import { MDBTable, MDBTableHead, MDBTableBody } from "mdb-react-ui-kit";
import { useSelector } from "react-redux";
// import { handlePagination } from "./../../../../../components/utilities";
// import TableCard from "./card";

export default function MachinesTable({ machines, page }) {
  const { theme, maxPage } = useSelector(({ auth }) => auth);

  return (
    <MDBTable align="middle" hover responsive color={theme.color}>
      <caption>List of available machines</caption>
      <caption className="caption-top">
        Total of <b>{machines?.length}</b> machines
      </caption>
      <MDBTableHead>
        {machines?.length > 0 ? (
          <tr>
            <th scope="col">Celsius</th>
            <th scope="col" className="text-center">
              Branch
            </th>
            <th scope="col" className="text-center">
              User
            </th>
            <th scope="col" className="text-center">
              Actions
            </th>
          </tr>
        ) : (
          <tr className="text-center">
            <td colSpan={4}>No registered machine.</td>
          </tr>
        )}
      </MDBTableHead>
      <MDBTableBody>
        {/* {machines?.length > 0 &&
          handlePagination(machines, page, maxPage).map((machine) => (
            <TableCard key={machine?._id} machine={machine} />
          ))} */}
      </MDBTableBody>
    </MDBTable>
  );
}
