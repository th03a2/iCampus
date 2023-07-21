import React from "react";
import { MDBTable, MDBTableHead, MDBTableBody } from "mdb-react-ui-kit";
import { useSelector } from "react-redux";

import { paginationHandler } from "../../../../components/utilities";

export function TBLsubjects({ subjects, page }) {
  const { theme, maxPage } = useSelector(({ auth }) => auth);

  return (
    <MDBTable align="middle" hover responsive color={theme.color}>
      <caption>List of subjects</caption>
      <caption className="caption-top">
        Total of <b>{subjects?.length}</b> subject(s)
      </caption>
      <MDBTableHead>
        <tr>
          <th>#</th>
          <th scope="col">Name </th>
        </tr>
      </MDBTableHead>
      <MDBTableBody>
        {subjects?.length > 0 ? (
          paginationHandler(subjects, page, maxPage).map((subject, index) => (
            <tr key={`temperature-${index}`}>
              <td>{1 + index}</td>
              <td>{subject.name}</td>
            </tr>
          ))
        ) : (
          <tr className="text-center">
            <td colSpan={3}>No subjects.</td>
          </tr>
        )}
      </MDBTableBody>
    </MDBTable>
  );
}
