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
export function TBLstaff({ staffs, page }) {
  const { theme, maxPage, token } = useSelector(({ auth }) => auth),
    dispatch = useDispatch();

  return (
    <MDBTable align="middle" hover responsive color={theme.color}>
      <caption>List of Grade staffs</caption>
      <caption className="caption-top">
        Total of <b>{staffs?.length}</b> Grade Level(s)
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
        {staffs?.length > 0 ? (
          paginationHandler(staffs, page, maxPage).map((staff, index) => (
            <tr key={`temperature-${index}`}>
              <td>{1 + index}</td>
              <td>{staff.description}</td>
              <td>{staff.name}</td>
              <td>{staff.lvl}</td>
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
