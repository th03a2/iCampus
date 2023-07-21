import React from "react";
import {
  MDBTable,
  MDBTableHead,
  MDBTableBody,
  MDBBadge,
  MDBBtn,
  MDBIcon,
  MDBBtnGroup,
} from "mdb-react-ui-kit";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { DESTROY } from "../../../../redux/slices/query";
import { paginationHandler } from "../../../../components/utilities";

export function TBLschools({
  schools,
  page,
  setVisibility,
  setUpdate,
  setIsUpdate,
}) {
  const { theme, maxPage, token } = useSelector(({ auth }) => auth);
  const dispatch = useDispatch();
  const handleUpdate = (school) => {
    setVisibility(true);
    setUpdate(school);
    setIsUpdate(true);
  };
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(
          DESTROY({
            entity: "assets/branches",
            id,
            token,
          })
        );
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    });
  };

  const handleContacts = (contacts) => {
    Swal.fire({
      title: "Contacts",
      text: "Here is your contact list:",
      icon: "info",
      showCancelButton: false,
      showCloseButton: true,
      html: `<ul>
                <li>${contacts.mobile}</li>
                <li>${contacts.email}</li>
             </ul>`,
      confirmButtonText: "OK",
    });
  };

  const addressFormatter = (address) => {
    if (typeof address === "object") {
      const { province, city, barangay, street } = address;

      return `${barangay},${street},${city},${province}`;
    }
  };
  return (
    <MDBTable align="middle" hover responsive color={theme.color}>
      <caption>List of Schools</caption>
      <caption className="caption-top">
        Total of <b>{schools?.length}</b> School(s)
      </caption>
      <MDBTableHead>
        <tr>
          <th>#</th>
          <th scope="col">Name </th>
          <th scope="col">Contacts </th>
          <th>Address</th>
          <th>Action</th>
        </tr>
      </MDBTableHead>
      <MDBTableBody>
        {schools?.length > 0 ? (
          paginationHandler(schools, page, maxPage).map((school, index) => (
            <tr key={`temperature-${index}`}>
              <td>{1 + index}</td>
              <td title={school.acronym} className="cursor-pointer">
                {school.name}
              </td>
              <td className="cursor-pointer">
                <MDBBadge onClick={() => handleContacts(school.contacts)}>
                  view
                </MDBBadge>
              </td>
              <td>{addressFormatter(school.address)}</td>
              <td>
                <MDBBtnGroup>
                  <MDBBtn
                    color="danger"
                    onClick={() => handleDelete(school._id)}
                  >
                    <MDBIcon fas icon="trash" />
                  </MDBBtn>
                  <MDBBtn onClick={() => handleUpdate(school)}>
                    <MDBIcon fas icon="pencil-alt" />
                  </MDBBtn>
                </MDBBtnGroup>
              </td>
            </tr>
          ))
        ) : (
          <tr className="text-center">
            <td colSpan={3}>No Schools.</td>
          </tr>
        )}
      </MDBTableBody>
    </MDBTable>
  );
}
