import React from "react";
import {
  MDBTable,
  MDBTableHead,
  MDBTableBody,
  MDBBtnGroup,
  MDBBtn,
  MDBIcon,
} from "mdb-react-ui-kit";
import { useDispatch, useSelector } from "react-redux";
import { DESTROY } from "../../../../redux/slices/query";
import { paginationHandler } from "../../../../components/utilities";
import Swal from "sweetalert2";
export function TBLsubjects({
  subjects,
  page,
  setVisibility,
  setUpdate,
  setIsUpdate,
}) {
  const { theme, maxPage, token } = useSelector(({ auth }) => auth);
  const dispatch = useDispatch();
  const handleUpdate = (subject) => {
    setVisibility(true);
    setUpdate(subject);
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
            entity: "assets/subjects",
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
      <caption>List of subjects</caption>
      <caption className="caption-top">
        Total of <b>{subjects?.length}</b> subject(s)
      </caption>
      <MDBTableHead>
        <tr>
          <th>#</th>
          <th scope="col">Name </th>
          <th>Action</th>
        </tr>
      </MDBTableHead>
      <MDBTableBody>
        {subjects?.length > 0 ? (
          paginationHandler(subjects, page, maxPage).map((subject, index) => (
            <tr key={`temperature-${index}`}>
              <td>{1 + index}</td>
              <td>{subject.name}</td>
              <td>
                <MDBBtnGroup>
                  <MDBBtn
                    color="danger"
                    onClick={() => handleDelete(subject._id)}
                  >
                    <MDBIcon fas icon="trash" />
                  </MDBBtn>
                  <MDBBtn onClick={() => handleUpdate(subject)}>
                    <MDBIcon fas icon="pencil-alt" />
                  </MDBBtn>
                </MDBBtnGroup>
              </td>
            </tr>
          ))
        ) : (
          <tr className="text-center">
            <td colSpan={3}>No subjects.</td>
          </tr>
        )}
      </MDBTableBody>
    </MDBTable>
  );
}
