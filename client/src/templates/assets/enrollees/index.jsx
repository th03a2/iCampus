import React from "react";
import {
  MDBTable,
  MDBTableHead,
  MDBTableBody,
  MDBBtn,
  MDBIcon,
} from "mdb-react-ui-kit";
import { useDispatch, useSelector } from "react-redux";
import {
  paginationHandler,
  nameFormatter,
} from "../../../components/utilities";
export function TBLenrollees({
  enrollees,
  page,
  setInformation,
  setVisibility,
}) {
  const { theme, maxPage } = useSelector(({ auth }) => auth);

  const handleInformation = (information) => {
    setVisibility(true);
    setInformation(information);
  };
  return (
    <MDBTable align="middle" hover responsive color={theme.color}>
      <caption>List of Enrollees</caption>
      <caption className="caption-top">
        Total of <b>{enrollees?.length}</b> Enrollee(s)
      </caption>
      <MDBTableHead>
        <tr>
          <th>#</th>
          <th scope="col">Name </th>
          <th scope="col">Grade Level </th>
          <th scope="col">Semester </th>
          <th scope="col">Status </th>
          <th scope="col">Action </th>
        </tr>
      </MDBTableHead>
      <MDBTableBody>
        {enrollees?.length > 0 ? (
          paginationHandler(enrollees, page, maxPage).map((enrollee, index) => (
            <tr key={`temperature-${index}`}>
              <td>{1 + index}</td>
              <td>{nameFormatter(enrollee.student?.fullName)}</td>
              <td>{enrollee.level?.name}</td>
              <td>{enrollee.batch?.semester}</td>
              <td>{enrollee.status}</td>
              <td>
                <MDBBtn size="sm" onClick={() => handleInformation(enrollee)}>
                  <MDBIcon far icon="eye" />
                </MDBBtn>
              </td>
            </tr>
          ))
        ) : (
          <tr className="text-center">
            <td colSpan={3}>No Enrollees.</td>
          </tr>
        )}
      </MDBTableBody>
    </MDBTable>
  );
}
