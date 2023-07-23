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
import { DESTROY } from "../../../redux/slices/query";
import { paginationHandler } from "../../../components/utilities";
import Swal from "sweetalert2";
export function TBLbatch({
  batch,
  page,
  setUpdate,
  setIsUpdate,
  setVisibility,
}) {
  const { theme, maxPage, token } = useSelector(({ auth }) => auth),
    dispatch = useDispatch();
  const options = { year: "numeric", month: "long", day: "numeric" };

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
            entity: "assets/batch",
            id,
            token,
          })
        );
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    });
  };

  const handleUpdate = (data) => {
    setUpdate(data);
    setIsUpdate(true);
    setVisibility(true);
  };
  return (
    <MDBTable align="middle" hover responsive color={theme.color}>
      <caption>List of Grade batch</caption>
      <caption className="caption-top">
        Total of <b>{batch?.length}</b> Grade data(s)
      </caption>
      <MDBTableHead>
        <tr>
          <th>#</th>
          <th scope="col">Semester </th>
          <th scope="col">SY </th>
          <th scope="col">Stages </th>
          <th scope="col">Enrollment Start </th>
          <th scope="col">Enrollment End </th>
          <th scope="col">School Start </th>
          <th scope="col">School End </th>
          <th>Action</th>
        </tr>
      </MDBTableHead>
      <MDBTableBody>
        {batch?.length > 0 ? (
          paginationHandler(batch, page, maxPage).map((data, index) => (
            <tr key={`temperature-${index}`}>
              <td>{1 + index}</td>
              <td>{data.semester}</td>
              <td>{data.SY}</td>
              <td>{data.stages}</td>
              <td>
                {new Date(data.e_start).toLocaleDateString(undefined, options)}
              </td>
              <td>
                {new Date(data.e_end).toLocaleDateString(undefined, options)}
              </td>
              <td>
                {new Date(data.c_start).toLocaleDateString(undefined, options)}
              </td>
              <td>
                {new Date(data.c_end).toLocaleDateString(undefined, options)}
              </td>
              <td>
                <MDBBtnGroup>
                  <MDBBtn color="danger" onClick={() => handleDelete(data._id)}>
                    <MDBIcon fas icon="trash" />
                  </MDBBtn>
                  <MDBBtn onClick={() => handleUpdate(data)}>
                    <MDBIcon fas icon="pencil-alt" />
                  </MDBBtn>
                </MDBBtnGroup>
              </td>
            </tr>
          ))
        ) : (
          <tr className="text-center">
            <td colSpan={3}>No Batch.</td>
          </tr>
        )}
      </MDBTableBody>
    </MDBTable>
  );
}
