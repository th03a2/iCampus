import React, { useEffect } from "react";
import { MDBTable, MDBTableHead, MDBTableBody } from "mdb-react-ui-kit";
import { useSelector } from "react-redux";

import { paginationHandler } from "../../../components/utilities";

export function TBLmaintenance({ maintenance, page }) {
  const { theme, maxPage } = useSelector(({ auth }) => auth);

  return (
    <MDBTable align="middle" hover responsive color={theme.color}>
      <caption>List of maintenance</caption>
      <caption className="caption-top">
        Total of <b>{maintenance?.length}</b> maintenance(s)
      </caption>
      <MDBTableHead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Engineer</th>
          <th>Purpose</th>
          <th>Recommendations</th>
        </tr>
      </MDBTableHead>
      <MDBTableBody>
        {maintenance?.length > 0 ? (
          paginationHandler(maintenance, page, maxPage).map((data, index) => (
            <tr key={`services-${index}`}>
              <td>{1 + index}</td>
              <td>{""}</td>
              <td>{data.engineer}</td>
              <td>{data.purpose}</td>
              <td>{data.recommendations}</td>
            </tr>
          ))
        ) : (
          <tr className="text-center">
            <td colSpan={3}>No Maintenance.</td>
          </tr>
        )}
      </MDBTableBody>
    </MDBTable>
  );
}
