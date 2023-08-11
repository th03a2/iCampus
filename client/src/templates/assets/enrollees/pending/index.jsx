import React from "react";
import {
  MDBTable,
  MDBTableHead,
  MDBTableBody,
  MDBBtn,
  MDBIcon,
} from "mdb-react-ui-kit";
import { useSelector } from "react-redux";
import {
  paginationHandler,
  nameFormatter,
} from "../../../../components/utilities";
export function TBLpending({
  enrollees,
  page,
  setInformation,
  setVisibility,
  status,
}) {
  const { theme, maxPage } = useSelector(({ auth }) => auth);

  const handleInformation = (information) => {
    console.log(information);
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
          <th scope="col">Semester </th>
          {status === "approved" && <th scope="col">Section </th>}
          <th scope="col">Action </th>
        </tr>
      </MDBTableHead>
      <MDBTableBody>
        {enrollees?.length > 0 ? (
          paginationHandler(enrollees, page, maxPage).map((enrollee, index) => (
            <tr key={`temperature-${index}`}>
              <td>{1 + index}</td>
              <td>{nameFormatter(enrollee.student?.fullName)}</td>
              <td>{enrollee.batch?.semester + " semester"}</td>
              {status === "approved" && <td>{enrollee.section?.name}</td>}

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
