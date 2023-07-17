import React from "react";
import { MDBTable, MDBTableHead, MDBTableBody } from "mdb-react-ui-kit";
import { useSelector } from "react-redux";
import { paginationHandler } from "../../../../../components/utilities";
import TableCard from "./card";

export default function BranchTable({ branches, page }) {
  const { theme, maxPage } = useSelector(({ auth }) => auth);

  return (
    <MDBTable align="middle" hover responsive color={theme.color}>
      <caption>List of available branches</caption>
      <caption className="caption-top">
        Total of <b>{branches.length}</b> branch(es)
      </caption>
      <MDBTableHead>
        {branches.length > 0 ? (
          <tr>
            <th scope="col">Information</th>
            <th scope="col" className="text-center">
              Classification
            </th>
            <th scope="col" className="text-center">
              Manager
            </th>
            <th scope="col" className="text-center">
              Contacts
            </th>
            <th scope="col" className="text-center">
              Actions
            </th>
          </tr>
        ) : (
          <tr className="text-center">
            <td colSpan={4}>No registered branch.</td>
          </tr>
        )}
      </MDBTableHead>
      <MDBTableBody>
        {!!branches?.length &&
          paginationHandler(branches, page, maxPage).map(branch => (
            <TableCard key={branch._id} branch={branch} />
          ))}
      </MDBTableBody>
    </MDBTable>
  );
}
