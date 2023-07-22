import React from "react";
import {
  MDBTable,
  MDBTableHead,
  MDBTableBody,
  MDBIcon,
  MDBBtn,
  MDBBtnGroup,
} from "mdb-react-ui-kit";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { paginationHandler } from "../../../../components/utilities";
import { DESTROY } from "../../../../redux/slices/query";
export function TBLcompanies({
  companies,
  page,
  setVisibility,
  setIsUpdate,
  setUpdate,
}) {
  const { theme, maxPage, token } = useSelector(({ auth }) => auth);
  const dispatch = useDispatch();

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
            entity: "assets/companies",
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
      <caption>List of companies</caption>
      <caption className="caption-top">
        Total of <b>{companies?.length}</b> companie(s)
      </caption>
      <MDBTableHead>
        <tr>
          <th>#</th>
          <th scope="col">Name </th>
          <th scope="col">Acronym</th>
          <th>Action</th>
        </tr>
      </MDBTableHead>
      <MDBTableBody>
        {companies?.length > 0 ? (
          paginationHandler(companies, page, maxPage).map((companie, index) => (
            <tr key={`temperature-${index}`}>
              <td>{1 + index}</td>
              <td>{companie.name}</td>
              <td>{companie.acronym}</td>
              <td>
                <MDBBtnGroup>
                  <MDBBtn
                    color="danger"
                    onClick={() => handleDelete(companie._id)}
                  >
                    <MDBIcon fas icon="trash" />
                  </MDBBtn>
                  <MDBBtn onClick={() => handleUpdate(companie)}>
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
