import React, { useState } from "react";
import {
  MDBTable,
  MDBTableHead,
  MDBTableBody,
  MDBBtnGroup,
  MDBBtn,
} from "mdb-react-ui-kit";
import { useSelector, useDispatch } from "react-redux";
import { paginationHandler, nameFormatter } from "./../../components/utilities";
import Swal from "sweetalert2";
import { DESTROY } from "./../../redux/slices/query";
import { Statement } from "./../../fakeDb";

export function TBLliabilities({ bills, page, handleToggle }) {
  const { token, theme, maxPage, auth } = useSelector(({ auth }) => auth),
    dispatch = useDispatch();

  return (
    <>
      <MDBTable align="middle" hover responsive color={theme.color}>
        <caption>List of pending bills</caption>
        <caption className="caption-top">
          Total of <b>{bills?.length}</b> bill(s)
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
          {bills?.length > 0 ? (
            paginationHandler(bills, page, maxPage).map((bill, index) => (
              <tr key={bill?._id}>
                <td>{index + 1}</td>
                <td>
                  {bill.supplier ? (
                    <>
                      <h5>{bill.supplier.name}</h5>
                      <small>{bill.supplier.companyName}</small>
                    </>
                  ) : (
                    <span>{nameFormatter(bill.particular?.fullName)}</span>
                  )}
                </td>
                <td>{Statement.find(bill.fsId)?.title}</td>
                <td>
                  <p className="fw-bold mb-1 text-capitalize">{bill.amount}</p>
                  <p className="text-muted mb-0">Due :{bill.due}</p>
                </td>
                <td className="text-center">
                  <MDBBtnGroup className="shadow-0">
                    <MDBBtn
                      onClick={() => handleToggle(bill)}
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
                        }).then((result) => {
                          if (result.isConfirmed) {
                            dispatch(
                              DESTROY({
                                entity: "assets/persons/bills",
                                id: bill._id,
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
            ))
          ) : (
            <tr className="text-center" style={{ height: "280px" }}>
              <td colSpan={5}>
                <h2>No bills has been declaire.</h2>
              </td>
            </tr>
          )}
        </MDBTableBody>
      </MDBTable>
    </>
  );
}
