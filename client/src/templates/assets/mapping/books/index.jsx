import React from "react";
import { MDBTable, MDBTableHead, MDBTableBody } from "mdb-react-ui-kit";
import { useSelector } from "react-redux";

import { paginationHandler } from "../../../../components/utilities";

export function TBLbooks({ books, page }) {
  const { theme, maxPage } = useSelector(({ auth }) => auth);

  return (
    <MDBTable align="middle" hover responsive color={theme.color}>
      <caption>List of books</caption>
      <caption className="caption-top">
        Total of <b>{books?.length}</b> book(s)
      </caption>
      <MDBTableHead>
        <tr>
          <th>#</th>
          <th scope="col">Name </th>
        </tr>
      </MDBTableHead>
      <MDBTableBody>
        {books?.length > 0 ? (
          paginationHandler(books, page, maxPage).map((book, index) => (
            <tr key={`temperature-${index}`}>
              <td>{1 + index}</td>
              <td>{book.name}</td>
            </tr>
          ))
        ) : (
          <tr className="text-center">
            <td colSpan={3}>No Books.</td>
          </tr>
        )}
      </MDBTableBody>
    </MDBTable>
  );
}
