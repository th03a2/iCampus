import React from "react";
import { MDBTable, MDBTableHead, MDBTableBody } from "mdb-react-ui-kit";
import { useSelector } from "react-redux";

import { paginationHandler } from "../../../components/utilities";

export function TBLassurance({ assurance, page }) {
  const { theme, maxPage } = useSelector(({ auth }) => auth);

  return (
    <MDBTable align="middle" hover responsive color={theme.color}>
      <caption>List of quality assurance</caption>
      <caption className="caption-top">
        Total of <b>{assurance?.length}</b> Quality assurance(s)
      </caption>
      <MDBTableHead>
        <tr>
          <th>#</th>
          <th>Abnormal</th>
          <th>High</th>
          <th>Normal</th>
          <th>Date</th>
        </tr>
      </MDBTableHead>
      <MDBTableBody>
        {assurance?.length > 0 ? (
          paginationHandler(assurance, page, maxPage).map((data, index) => (
            <tr key={`machines-${index}`}>
              <td>{1 + index}</td>
              <td>{data.abnormal}</td>
              <td>{data.high}</td>
              <td>{data.normal}</td>
              <td>{new Date(data.createdAt).toLocaleDateString()}</td>
            </tr>
          ))
        ) : (
          <tr className="text-center">
            <td colSpan={3}>No Quality assurance.</td>
          </tr>
        )}
      </MDBTableBody>
    </MDBTable>
  );
}
