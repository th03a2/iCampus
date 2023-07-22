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
import Swal from "sweetalert2";
import { paginationHandler } from "../../../../components/utilities";
import { DESTROY } from "../../../../redux/slices/query";
export function TBLsections({
  sections,
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
            entity: "assets/Sections",
            id,
            token,
          })
        );
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    });
  };

  return (
    <MDBTable align="middle" hover responsive color={theme.color}>
      <caption>List of Grade sections</caption>
      <caption className="caption-top">
        Total of <b>{sections?.length}</b> Grade section(s)
      </caption>
      <MDBTableHead>
        <tr>
          <th>#</th>
          <th scope="col">Name</th>
          <th scope="col">Accumulate </th>
          <th>Action</th>
        </tr>
      </MDBTableHead>
      <MDBTableBody>
        {sections?.length > 0 ? (
          paginationHandler(sections, page, maxPage).map((section, index) => (
            <tr key={`temperature-${index}`}>
              <td>{1 + index}</td>
              <td>{section.name}</td>
              <td>{section.accumulate}</td>
              <td>
                <MDBBtnGroup>
                  <MDBBtn
                    color="danger"
                    onClick={() => handleDelete(section._id)}
                  >
                    <MDBIcon fas icon="trash" />
                  </MDBBtn>
                  <MDBBtn onClick={() => handleUpdate(section)}>
                    <MDBIcon fas icon="pencil-alt" />
                  </MDBBtn>
                </MDBBtnGroup>
              </td>
            </tr>
          ))
        ) : (
          <tr className="text-center">
            <td colSpan={3}>No Sections.</td>
          </tr>
        )}
      </MDBTableBody>
    </MDBTable>
  );
}
