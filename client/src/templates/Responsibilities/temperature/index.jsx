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
import { DESTROY } from "../../../redux/slices/query";
import Swal from "sweetalert2";

import { paginationHandler } from "../../../components/utilities";

export function TBLtemperature({
  temperature,
  page,
  setVisibility,
  setUpdate,
  setIsUpdate,
}) {
  const dispatch = useDispatch();
  const { theme, maxPage, token } = useSelector(({ auth }) => auth);

  const handleUpdate = (data) => {
    setVisibility(true);
    setUpdate(data);
    setIsUpdate(true);
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes,continue!",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(
          DESTROY({
            id,
            entity: "monitorings/temperatures",
            token,
          })
        );
      }
    });
  };
  return (
    <MDBTable align="middle" hover responsive color={theme.color}>
      <caption>List of pending temperature</caption>
      <caption className="caption-top">
        Total of <b>{temperature?.length}</b> Temperature(s)
      </caption>
      <MDBTableHead>
        <tr>
          <th scope="col" rowSpan={2}>
            #
          </th>
          <th scope="col" colSpan={2}>
            Ref
          </th>
          <th scope="col" colSpan={2}>
            Room
          </th>
          <th scope="col" rowSpan={2} className="text-center">
            Actions
          </th>
        </tr>
        <tr>
          <th scope="col">Am </th>
          <th scope="col">Pm </th>
          <th scope="col">Am </th>
          <th scope="col">Pm </th>
        </tr>
      </MDBTableHead>
      <MDBTableBody>
        {temperature?.length > 0 ? (
          paginationHandler(temperature, page, maxPage).map((data, index) => (
            <tr key={`temperature-${index}`}>
              <td>{1 + index}</td>
              <td>{data.AmRef}</td>
              <td>{data.PmRef}</td>
              <td>{data.AmRoom}</td>
              <td>{data.PmRoom}</td>
              <td className="d-flex justify-content-center">
                <MDBBtnGroup>
                  <MDBBtn
                    onClick={() => handleDelete(data._id)}
                    color="warning"
                  >
                    <MDBIcon fas icon="trash" />
                  </MDBBtn>
                  <MDBBtn type="button" onClick={() => handleUpdate(data)}>
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
