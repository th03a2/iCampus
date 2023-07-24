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
import { paginationHandler } from "../../../components/utilities";

export function TBLenrollment({ schools, page, setSchoolId, setVisibility }) {
  const { theme, maxPage } = useSelector(({ auth }) => auth);

  const handleEnroll = (id) => {
    setVisibility(true);
    setSchoolId(id);
  };

  const addressFormatter = (address) => {
    if (typeof address === "object") {
      const { province, city, barangay, street } = address;

      return `${barangay},${street},${city},${province}`;
    }
  };

  return (
    <MDBTable align="middle" hover responsive color={theme.color}>
      <caption>List of Grade schools</caption>
      <caption className="caption-top">
        Total of <b>{schools?.length}</b> Grade school(s)
      </caption>
      <MDBTableHead>
        <tr>
          <th>#</th>
          <th scope="col">Name </th>
          <th scope="col">Category </th>
          <th scope="col">Address </th>
          <th scope="col">Action </th>
        </tr>
      </MDBTableHead>
      <MDBTableBody>
        {schools?.length > 0 ? (
          paginationHandler(schools, page, maxPage).map((school, index) => (
            <tr key={`temperature-${index}`}>
              <td>{1 + index}</td>
              <td>{school.school_id?.name}</td>
              <td>{school.school_id?.category}</td>
              <td>{addressFormatter(school.school_id?.address)}</td>
              <td>
                <MDBBtnGroup>
                  <MDBBtn
                    color="danger"
                    onClick={() => handleEnroll(school._id)}
                  >
                    Enroll
                  </MDBBtn>
                </MDBBtnGroup>
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
