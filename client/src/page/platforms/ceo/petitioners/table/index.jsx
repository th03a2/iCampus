import React from "react";
import { MDBTable, MDBTableHead, MDBTableBody } from "mdb-react-ui-kit";
import { useSelector } from "react-redux";
import { paginationHandler } from "../../../../../components/utilities";
import TableCard from "./card";

export default function PetitionTable({ petitions, handleAction, page }) {
  const { theme, maxPage } = useSelector(({ auth }) => auth);

  return (
    <MDBTable align="middle" hover responsive color={theme.color}>
      <caption>List of petitions</caption>
      <caption className="caption-top">
        Total of <b>{petitions.length}</b> petition(s)
      </caption>
      <MDBTableHead>
        {petitions.length > 0 ? (
          <tr>
            <th scope="col">User</th>
            <th scope="col" className="text-center">
              Branch
            </th>
            <th scope="col" className="text-center">
              Date
            </th>
            <th scope="col" className="text-center">
              Actions
            </th>
          </tr>
        ) : (
          <tr className="text-center">
            <td colSpan={4}>No requested petitions.</td>
          </tr>
        )}
      </MDBTableHead>
      <MDBTableBody>
        {petitions.length > 0 &&
          paginationHandler(petitions, page, maxPage).map(petition => (
            <TableCard
              key={petition._id}
              petition={petition}
              handleAction={handleAction}
            />
          ))}
      </MDBTableBody>
    </MDBTable>
  );
}
