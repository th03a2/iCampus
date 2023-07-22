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
export function TBLbooks({
  books,
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
            entity: "assets/books",
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
      <caption>List of books</caption>
      <caption className="caption-top">
        Total of <b>{books?.length}</b> book(s)
      </caption>
      <MDBTableHead>
        <tr>
          <th>#</th>
          <th scope="col">Name </th>
          <th scope="col">Action </th>
        </tr>
      </MDBTableHead>
      <MDBTableBody>
        {books?.length > 0 ? (
          paginationHandler(books, page, maxPage).map((book, index) => (
            <tr key={`temperature-${index}`}>
              <td>{1 + index}</td>
              <td>{book.name}</td>
              <td>
                <MDBBtnGroup>
                  <MDBBtn color="danger" onClick={() => handleDelete(book._id)}>
                    <MDBIcon fas icon="trash" />
                  </MDBBtn>
                  <MDBBtn onClick={() => handleUpdate(book)}>
                    <MDBIcon fas icon="pencil-alt" />
                  </MDBBtn>
                </MDBBtnGroup>
              </td>
            </tr>
          ))
        ) : (
          <tr className="text-center">
            <td colSpan={3}>No Books.</td>
          </tr>
        )}
      </MDBTableBody>
    </MDBTable>
  );
}
