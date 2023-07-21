import React from "react";
import { MDBTable, MDBTableHead, MDBTableBody } from "mdb-react-ui-kit";
import { useSelector } from "react-redux";

import {
  paginationHandler,
  nameFormatter,
} from "../../../../components/utilities";

export function TBLcompanies({ companies, page }) {
  const { theme, maxPage } = useSelector(({ auth }) => auth);

  return (
    <MDBTable align="middle" hover responsive color={theme.color}>
      <caption>List of companies</caption>
      <caption className="caption-top">
        Total of <b>{companies?.length}</b> companie(s)
      </caption>
      <MDBTableHead>
        <tr>
          <th>#</th>
          <th scope="col">Name </th>
          <th scope="col">CEO</th>
          <th scope="col">Email</th>
        </tr>
      </MDBTableHead>
      <MDBTableBody>
        {companies?.length > 0 ? (
          paginationHandler(companies, page, maxPage).map((companie, index) => (
            <tr key={`temperature-${index}`}>
              <td>{1 + index}</td>
              <td>{companie.name}</td>
              <td>{nameFormatter(companie.ceo?.fullName)}</td>
              <td>{companie.ceo?.email}</td>
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
