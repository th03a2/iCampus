import React from "react";
import {
  MDBTable,
  MDBTableHead,
  MDBTableBody,
  MDBBadge,
} from "mdb-react-ui-kit";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";

import { paginationHandler } from "../../../../components/utilities";

export function TBLschools({ schools, page }) {
  const { theme, maxPage } = useSelector(({ auth }) => auth);

  const handleContacts = (contacts) => {
    Swal.fire({
      title: "Contacts",
      text: "Here is your contact list:",
      icon: "info",
      showCancelButton: false,
      showCloseButton: true,
      html: `<ul>
                <li>${contacts.mobile}</li>
                <li>${contacts.email}</li>
             </ul>`,
      confirmButtonText: "OK",
    });
  };

  const addressFormatter = (address) => {
    if (typeof address === "object") {
      const { province, city, barangay, street } = address;

      return `${barangay},${street},${city},${province}`;
    }
  };
  return (
    <MDBTable align="middle" hover responsive color={theme.color}>
      <caption>List of Schools</caption>
      <caption className="caption-top">
        Total of <b>{schools?.length}</b> School(s)
      </caption>
      <MDBTableHead>
        <tr>
          <th>#</th>
          <th scope="col">Name </th>
          <th scope="col">Contacts </th>
          <th>Address</th>
        </tr>
      </MDBTableHead>
      <MDBTableBody>
        {schools?.length > 0 ? (
          paginationHandler(schools, page, maxPage).map((school, index) => (
            <tr key={`temperature-${index}`}>
              <td>{1 + index}</td>
              <td title={school.acronym} className="cursor-pointer">
                {school.name}
              </td>
              <td className="cursor-pointer">
                <MDBBadge onClick={() => handleContacts(school.contacts)}>
                  view
                </MDBBadge>
              </td>
              <td>{addressFormatter(school.address)}</td>
            </tr>
          ))
        ) : (
          <tr className="text-center">
            <td colSpan={3}>No Schools.</td>
          </tr>
        )}
      </MDBTableBody>
    </MDBTable>
  );
}
