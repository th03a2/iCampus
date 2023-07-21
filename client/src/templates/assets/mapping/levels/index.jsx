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
export function TBLlevels({
  levels,
  page,
  setUpdate,
  setIsUpdate,
  setVisibility,
}) {
  const { theme, maxPage, token } = useSelector(({ auth }) => auth),
    dispatch = useDispatch();

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
            entity: "assets/levels",
            id,
            token,
          })
        );
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    });
  };

  const handleUpdate = (level) => {
    setUpdate(level);
    setIsUpdate(true);
    setVisibility(true);
  };
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
          <th scope="col">Level </th>
          <th scope="col">stage </th>
          <th scope="col">Description </th>
          <th>Action</th>
        </tr>
      </MDBTableHead>
      <MDBTableBody>
        {levels?.length > 0 ? (
          paginationHandler(levels, page, maxPage).map((level, index) => (
            <tr key={`temperature-${index}`}>
              <td>{1 + index}</td>
              <td>{level.name}</td>
              <td>{level.lvl}</td>
              <td>{level.stage}</td>
              <td>{level.description}</td>
              <td>
                <MDBBtnGroup>
                  <MDBBtn
                    color="danger"
                    onClick={() => handleDelete(level._id)}
                  >
                    <MDBIcon fas icon="trash" />
                  </MDBBtn>
                  <MDBBtn onClick={() => handleUpdate(level)}>
                    <MDBIcon fas icon="pencil-alt" />
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
