import React, { useState } from "react";
import {
  MDBTable,
  MDBTableHead,
  MDBTableBody,
  MDBBtnGroup,
  MDBBtn,
} from "mdb-react-ui-kit";
import { useSelector, useDispatch } from "react-redux";
import {
  paginationHandler,
  nameFormatter,
} from "../../../components/utilities";
import Swal from "sweetalert2";
import { DESTROY } from "../../../redux/slices/query";

export function TBLprocurements({ equipments, page, handleToggle }) {
  const { token, theme, maxPage, auth } = useSelector(({ auth }) => auth),
    dispatch = useDispatch();

  return (
    <>
      <MDBTable align="middle" hover responsive color={theme.color}>
        <caption>List of pending equipments</caption>
        <caption className="caption-top">
          Total of <b>{equipments?.length}</b> equipments(s)
        </caption>
        <MDBTableHead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Particulars</th>
            <th scope="col">Title</th>
            <th scope="col">Amount</th>
            <th scope="col" className="text-center">
              Action
            </th>
          </tr>
        </MDBTableHead>
        <MDBTableBody>
          {equipments?.length > 0 ? (
            paginationHandler(equipments, page, maxPage).map(
              (equipments, index) => (
                <tr key={equipments?._id}>
                  <td>{index + 1}</td>
                  <td>
                    {equipments.supplier ? (
                      <>
                        <h5>{equipments.supplier.name}</h5>
                        <small>{equipments.supplier.companyName}</small>
                      </>
                    ) : (
                      <span>
                        {nameFormatter(equipments.particular?.fullName)}
                      </span>
                    )}
                  </td>
                  <td>{equipments.fsId}</td>
                  <td>
                    <p className="fw-bold mb-1 text-capitalize">
                      {equipments.amount}
                    </p>
                    <p className="text-muted mb-0">Due :{equipments.due}</p>
                  </td>
                  <td className="text-center">
                    <MDBBtnGroup className="shadow-0">
                      <MDBBtn
                        onClick={() => handleToggle(equipments)}
                        color="info"
                        size="sm"
                        title="Update information."
                      >
                        update
                      </MDBBtn>
                      <MDBBtn
                        onClick={() =>
                          Swal.fire({
                            icon: "warning",
                            title: "Are you sure?",
                            html: `You won't be able to revert this!`,
                            showCancelButton: true,
                            confirmButtonText: "Yes, continue!",
                          }).then(result => {
                            if (result.isConfirmed) {
                              dispatch(
                                DESTROY({
                                  entity: "assets/persons/equipments",
                                  id: equipments._id,
                                  token,
                                })
                              );
                            }
                          })
                        }
                        color={theme.color}
                        size="sm"
                        title="Archive this branch."
                      >
                        archive
                      </MDBBtn>
                    </MDBBtnGroup>
                  </td>
                </tr>
              )
            )
          ) : (
            <tr className="text-center" style={{ height: "280px" }}>
              <td colSpan={4}>
                <h2>No Tag equipments.</h2>
              </td>
            </tr>
          )}
        </MDBTableBody>
      </MDBTable>
    </>
  );
}
