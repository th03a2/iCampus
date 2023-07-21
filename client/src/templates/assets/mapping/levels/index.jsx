import React from "react";
import { MDBTable, MDBTableHead, MDBTableBody } from "mdb-react-ui-kit";
import { useSelector } from "react-redux";

import { paginationHandler } from "../../../../components/utilities";

export function TBLlevels({ levels, page }) {
  const { theme, maxPage } = useSelector(({ auth }) => auth);

  return (
    <MDBTable align="middle" hover responsive color={theme.color}>
      <caption>List of Grade levels</caption>
      <caption className="caption-top">
        Total of <b>{levels?.length}</b> Grade Level(s)
      </caption>
      <MDBTableHead>
        <tr>
          <th>#</th>
          <th scope="col">Name </th>
          <th scope="col">Level </th>
          <th scope="col">stage </th>
          <th scope="col">Description </th>
        </tr>
      </MDBTableHead>
      <MDBTableBody>
        {levels?.length > 0 ? (
          paginationHandler(levels, page, maxPage).map((level, index) => (
            <tr key={`temperature-${index}`}>
              <td>{1 + index}</td>
              <td>{level.name}</td>
              <td>{level.lvl}</td>
              <td>{level.stage}</td>
              <td>{level.description}</td>
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
