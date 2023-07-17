import React from "react";
import { MDBTable, MDBTableHead, MDBTableBody } from "mdb-react-ui-kit";
import { useSelector } from "react-redux";
import {
  nameFormatter,
  paginationHandler,
  mobileFormatter,
} from "../../../../components/utilities";

export function TBLstaff({ staffs, page }) {
  const { theme, maxPage } = useSelector(({ auth }) => auth);

  return (
    <MDBTable align="middle" hover responsive color={theme.color}>
      <caption>List of pending staffs</caption>
      <caption className="caption-top">
        Total of <b>{staffs?.length}</b> staff(s)
      </caption>
      <MDBTableHead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Name</th>
          <th scope="col">DOB/Mobile/Gender</th>
          <th scope="col">Designation</th>
          <th scope="col">Rate</th>
          <th scope="col" className="text-center">
            Joined At
          </th>
        </tr>
      </MDBTableHead>
      <MDBTableBody>
        {staffs?.length > 0 ? (
          paginationHandler(staffs, page, maxPage).map((staff, index) => (
            <tr key={staff?._id}>
              <td>{index + 1}</td>
              <td>
                <p className="fw-bold mb-1">
                  {nameFormatter(staff?.user?.fullName, false)}
                </p>
                <p className="text-muted mb-0">{staff?.user?.email}</p>
              </td>
              <td>
                <p className="fw-bold mb-1 text-capitalize">
                  {new Date(staff?.user?.dob).toDateString()}
                </p>
                <p className="text-muted mb-0">
                  {mobileFormatter(staff?.user?.mobile)} |{" "}
                  {staff?.user?.isMale ? "Male" : "Female"}
                </p>
              </td>
              <td className="text-center">
                <p className="fw-normal mb-1">{staff?.section}</p>
              </td>
              <td className="text-center">
                <p className="fw-normal mb-1">{staff?.rate}</p>
              </td>
              <td className="text-center">
                <p className="fw-normal mb-1">
                  {new Date(staff?.user?.createdAt).toDateString()}
                </p>
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
