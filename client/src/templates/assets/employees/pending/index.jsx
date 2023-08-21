import React from "react";
import {
  MDBTable,
  MDBTableHead,
  MDBTableBody,
  MDBBtn,
  MDBIcon,
  MDBBtnGroup,
} from "mdb-react-ui-kit";
import { useDispatch, useSelector } from "react-redux";
import {
  paginationHandler,
  nameFormatter,
} from "../../../../components/utilities";
import Swal from "sweetalert2";
import { UPDATE } from "../../../../redux/slices/assets/employees";
export function TBLpendingEmployees({ employees, page, status }) {
  const { theme, maxPage, token } = useSelector(({ auth }) => auth);
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

  const addressFormatter = (address) => {
    if (typeof address === "object") {
      const { province, city, barangay, street } = address;

      return `${barangay},${street},${city},${province}`;
    }
  };

  return (
    <MDBTable align="middle" hover responsive color={theme.color}>
      <caption>List of employees</caption>
      <caption className="caption-top">
        Total of <b>{employees?.length}</b> employee(s)
      </caption>
      <MDBTableHead>
        <tr>
          <th>#</th>
          <th scope="col">Name </th>
          <th>Address</th>
          <th scope="col">Gender </th>
          <th scope="col">School type </th>
          <th scope="col">Position </th>
          {status === "approved" && <th scope="col">Designation </th>}
          {status !== "approved" && (
            <th scope="col" className="text-center">
              Action
            </th>
          )}
        </tr>
      </MDBTableHead>
      <MDBTableBody>
        {employees?.length > 0 ? (
          paginationHandler(employees, page, maxPage).map((employee, index) => (
            <tr key={`temperature-${index}`}>
              <td>{1 + index}</td>
              <td>{nameFormatter(employee.user?.fullName)}</td>
              <td>{addressFormatter(employee.user?.address)}</td>
              <td>
                {employee.user?.gender ? (
                  <MDBIcon fas icon="male" color="warning" size="2x" />
                ) : (
                  <MDBIcon fas icon="female" color="warning" size="2x" />
                )}
              </td>
              <td>{employee.branchId?.name}</td>
              <td>{employee.position}</td>
              {status === "approved" && <td>{employee?.designation}</td>}

              {status !== "approved" && (
                <td className="d-flex justify-content-center">
                  <MDBBtnGroup>
                    {/* <MDBBtn size="sm" onClick={() => handleInformation(employee)}>
                    <MDBIcon far icon="eye" />
                  </MDBBtn> */}
                    <MDBBtn
                      type="button"
                      size="sm"
                      color="danger"
                      onClick={() =>
                        handleDecision(employee._id, "deny", employee.postion)
                      }
                    >
                      Deny
                    </MDBBtn>
                    <MDBBtn
                      type="button"
                      size="sm"
                      onClick={() =>
                        handleDecision(
                          employee._id,
                          "approved",
                          employee.position
                        )
                      }
                    >
                      Approved
                    </MDBBtn>
                  </MDBBtnGroup>
                </td>
              )}
            </tr>
          ))
        ) : (
          <tr className="text-center">
            <td colSpan={3}>No Enrollees.</td>
          </tr>
        )}
      </MDBTableBody>
    </MDBTable>
  );
}
