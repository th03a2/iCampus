import React from "react";
import { MDBTable, MDBTableHead, MDBTableBody } from "mdb-react-ui-kit";
import { useSelector } from "react-redux";

import { paginationHandler } from "../../../components/utilities";

export function TBLmachines({ machines, page }) {
  const { theme, maxPage } = useSelector(({ auth }) => auth);

  return (
    <MDBTable align="middle" hover responsive color={theme.color}>
      <caption>List of machines</caption>
      <caption className="caption-top">
        Total of <b>{machines?.length}</b> machine(s)
      </caption>
      <MDBTableHead>
        <tr>
          <th>#</th>
          <th>Machines</th>
          <th>Serial</th>
          <th>Mortgage</th>
          <th>Accuired</th>
          <th>Status</th>
        </tr>
      </MDBTableHead>
      <MDBTableBody>
        {machines?.length > 0 ? (
          paginationHandler(machines, page, maxPage).map((data, index) => (
            <tr key={`machines-${index}`}>
              <td>{1 + index}</td>
              <td>
                <h5> {data.brand}</h5>
                <small>{data.model}</small>
              </td>
              <td>{data.serial}</td>
              <td>{data.mortgage ? `${data.mortgage}year(s)` : "paid"}</td>
              <td>{data.accuqired}</td>
              <td>{data.status}</td>
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
