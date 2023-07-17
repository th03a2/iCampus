import React from "react";
import { MDBTable, MDBTableHead, MDBTableBody } from "mdb-react-ui-kit";
import { useSelector } from "react-redux";
import { paginationHandler } from "../../../../../../components/utilities";
import TableCard from "./card";

export default function PatientTable({ users, page, handleAction }) {
  const { theme, maxPage } = useSelector(({ auth }) => auth);

  return (
    <MDBTable align="middle" hover responsive color={theme.color}>
      <caption>List of patients</caption>
      <caption className="caption-top">
        Total of <b>{users.length}</b> patients(s)
      </caption>
      <MDBTableHead>
        {users.length > 0 ? (
          <tr>
            <th scope="col">Fullname</th>
            <th scope="col" className="text-center">
              Gender
            </th>
            <th scope="col" className="text-center">
              DOB | AGE
            </th>
            <th scope="col" className="text-center">
              Mobile
            </th>
            <th scope="col" className="text-center">
              Address
            </th>
            <th scope="col" className="text-center">
              Actions
            </th>
          </tr>
        ) : (
          <tr className="text-center">
            <td colSpan={5}>No registered patients.</td>
          </tr>
        )}
      </MDBTableHead>
      <MDBTableBody>
        {users.length > 0 &&
          paginationHandler(users, page, maxPage).map(user => (
            <TableCard key={user._id} user={user} handleAction={handleAction} />
          ))}
      </MDBTableBody>
    </MDBTable>
  );
}
