import React from "react";
import { MDBTable, MDBTableHead, MDBTableBody } from "mdb-react-ui-kit";
import { useSelector } from "react-redux";

import { paginationHandler } from "../../../../components/utilities";

export function TBLsections({ sections, page }) {
  const { theme, maxPage } = useSelector(({ auth }) => auth);

  return (
    <MDBTable align="middle" hover responsive color={theme.color}>
      <caption>List of Grade sections</caption>
      <caption className="caption-top">
        Total of <b>{sections?.length}</b> Grade section(s)
      </caption>
      <MDBTableHead>
        <tr>
          <th>#</th>
          <th scope="col">Name</th>
          <th scope="col">Accumulate </th>
          <th scope="col">School Name </th>
        </tr>
      </MDBTableHead>
      <MDBTableBody>
        {sections?.length > 0 ? (
          paginationHandler(sections, page, maxPage).map((section, index) => (
            <tr key={`temperature-${index}`}>
              <td>{1 + index}</td>
              <td>{section.name}</td>
              <td>{section.accumulate}</td>
              <td>{section.branchId?.name}</td>
            </tr>
          ))
        ) : (
          <tr className="text-center">
            <td colSpan={3}>No Sections.</td>
          </tr>
        )}
      </MDBTableBody>
    </MDBTable>
  );
}
