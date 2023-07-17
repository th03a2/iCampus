import React from "react";
import { MDBTable, MDBTableHead, MDBTableBody } from "mdb-react-ui-kit";
import { useSelector } from "react-redux";
// import Swal from "sweetalert2";

import { paginationHandler } from "../../../components/utilities";

export function TBLservices({ services, page }) {
  const { theme, maxPage } = useSelector(({ auth }) => auth);

  return (
    <MDBTable align="middle" hover responsive color={theme.color}>
      <caption>List of pending Services offers</caption>
      <caption className="caption-top">
        Total of <b>{services?.length}</b> Services offer(s)
      </caption>
      <MDBTableHead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Price</th>
        </tr>
      </MDBTableHead>
      <MDBTableBody>
        {services?.length > 0 ? (
          paginationHandler(services, page, maxPage).map((data, index) => (
            <tr key={`services-${index}`}>
              <td>{1 + index}</td>
              <td>
                {data.abbreviation} | {data.name}
              </td>
              <td>₱ {data?.opd || ""}</td>
            </tr>
          ))
        ) : (
          <tr className="text-center">
            <td colSpan={3}>No Staff accounts.</td>
          </tr>
        )}
      </MDBTableBody>
    </MDBTable>
  );
}
