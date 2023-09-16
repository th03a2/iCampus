import React, { useState } from "react";
import {
  MDBTable,
  MDBTableHead,
  MDBTableBody,
  MDBBtn,
  MDBBtnGroup,
  MDBContainer,
  MDBIcon,
} from "mdb-react-ui-kit";
import { useDispatch, useSelector } from "react-redux";
import {
  paginationHandler,
  nameFormatter,
} from "../../../../components/utilities";
import Swal from "sweetalert2";
import { UPDATE } from "../../../../redux/slices/assets/employees";
import { Policy } from "../../../../fakeDb";
import ApplicationModal from "../modal";
export function TBLpendingEmployees({ employees, page, status }) {
  const { theme, maxPage, token } = useSelector(({ auth }) => auth);
  const [visibility, setVisibility] = useState(false);
  const [data, setData] = useState({});
  const dispatch = useDispatch();

  const handleDecision = (id, status, position) => {
    if (status === "approved") {
      Swal.fire({
        title: "Do you want change the designation",
        html: `
        <input
          type="text"
          id="input-field"
          class="swal2-input"
          placeholder="Enter something"
          value="${position}" // Set the initial value to the status value
        >`,
        showCancelButton: true,
        confirmButtonText: "Submit",
        cancelButtonText: "Cancel",
        focusConfirm: false,
        preConfirm: () => {
          const userInput =
            document.getElementById("input-field").value || position;
          return userInput || position;
        },
      }).then((result) => {
        if (result.isConfirmed) {
          dispatch(
            UPDATE({
              id,
              data: { status, designation: result.value },
              token,
            })
          );
        }
      });
    } else {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't to deny this",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, deny it!",
      }).then((result) => {
        if (result.isConfirmed) {
          dispatch(
            UPDATE({
              id,
              data: { status },
              token,
            })
          );
          Swal.fire("Deny!", "Employee has been deny.", "success");
        }
      });
    }
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    const formattedDate = new Date(dateString).toLocaleDateString(
      undefined,
      options
    );
    return formattedDate;
  };

  const handleDesignation = (designation) => {
    const foundDesignation = Policy.collection.find(
      (collection) =>
        collection.hasOwnProperty("positions") &&
        collection.positions.find(({ id }) => id === designation)
    );
    if (foundDesignation) {
      const _designation = foundDesignation.positions.find(
        ({ id }) => id === designation
      );
      return _designation?.display_name;
    }
  };

  const handleView = (data) => {
    setVisibility(true);
    setData(data);
  };
  return (
    <MDBContainer>
      {" "}
      <MDBTable align="middle" hover responsive color={theme.color}>
        <caption>List of employees</caption>
        <caption className="caption-top">
          Total of <b>{employees?.length}</b> employee(s)
        </caption>
        <MDBTableHead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Branch</th>
            <th scope="col">Designation </th>
            <th scope="col">Date Submitted </th>
            <th scope="col" className="text-center">
              Action
            </th>
          </tr>
        </MDBTableHead>
        <MDBTableBody>
          {employees?.length > 0 ? (
            paginationHandler(employees, page, maxPage).map(
              (employee, index) => (
                <tr key={`temperature-${index}`}>
                  <td>{1 + index}</td>
                  <td>{nameFormatter(employee.user?.fullName)}</td>
                  <td>{employee.branch.name}</td>
                  <td>{handleDesignation(employee.designation)}</td>
                  <td>{formatDate(employee.createdAt)}</td>
                  {status === "approved" && <td>{employee?.designation}</td>}

                  <td className="d-flex justify-content-center">
                    <MDBBtnGroup>
                      <MDBBtn
                        type="button"
                        onClick={() => handleView(employee)}
                      >
                        <MDBIcon fas icon="eye" />
                      </MDBBtn>
                    </MDBBtnGroup>
                  </td>
                </tr>
              )
            )
          ) : (
            <tr className="text-center">
              <td colSpan={3}>No Enrollees.</td>
            </tr>
          )}
        </MDBTableBody>
      </MDBTable>
      {visibility && (
        <ApplicationModal
          visibility={visibility}
          setVisibility={setVisibility}
          data={data}
        />
      )}
    </MDBContainer>
  );
}
