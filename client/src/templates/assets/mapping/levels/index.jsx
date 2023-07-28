import React from "react";
import {
  MDBTable,
  MDBTableHead,
  MDBTableBody,
  MDBBtn,
  MDBBtnGroup,
  MDBIcon,
} from "mdb-react-ui-kit";
import { useDispatch, useSelector } from "react-redux";
import { DESTROY } from "../../../../redux/slices/query";
import { paginationHandler } from "../../../../components/utilities";
import Swal from "sweetalert2";
export function TBLlevels({ levels, page }) {
  const { theme, maxPage, token } = useSelector(({ auth }) => auth),
    dispatch = useDispatch();

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
          <th scope="col">Abbreviation </th>
          <th scope="col">stage </th>
          <th>Action</th>
        </tr>
      </MDBTableHead>
      <MDBTableBody>
        {levels?.length > 0 ? (
          paginationHandler(levels, page, maxPage).map((level, index) => (
            <tr key={`temperature-${index}`}>
              <td>{1 + index}</td>
              <td>{level.description}</td>
              <td>{level.name}</td>
              <td>{level.lvl}</td>
              <td>
                <MDBBtn>Subjects</MDBBtn>
              </td>
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
