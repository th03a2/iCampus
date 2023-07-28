import React from "react";
import { MDBTable, MDBTableBody, MDBTableHead, MDBBtn } from "mdb-react-ui-kit";
import Swal from "sweetalert2";
const EmployeeTable = ({ access, handleApproval }) => {
  const handleSubmit = (userId, platform, status) => {
    Swal.fire({
      title: "Are you sure?",
      text: `You want to ${status ? "remove" : "return"} access!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: `Yes, ${status ? "remove" : "return"} it!`,
    }).then((result) => {
      if (result.isConfirmed) {
        handleApproval(userId, platform, status);
        Swal.fire(
          `${status ? "remove" : "return"}!`,
          `Your access has been ${status ? "remove" : "return"}.`,
          "success"
        );
      }
    });
  };

  return (
    <MDBTable align="middle" hover responsive>
      <MDBTableHead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Platform</th>
          <th scope="col">Status</th>
          <th scope="col" className="text-center">
            Action
          </th>
        </tr>
      </MDBTableHead>
      <MDBTableBody>
        {access &&
          access.map((data, index) => (
            <tr key={`access-${index}`}>
              <td>{index + 1}</td>
              <td>{data.platform}</td>
              <td>{data.status ? "Active" : "Banned"}</td>
              <td className="d-flex justify-content-center">
                <MDBBtn
                  color={data.status ? "danger" : "warning"}
                  type="button"
                  onClick={() =>
                    handleSubmit(data.userId, data.platform, data.status)
                  }
                >
                  {data.status ? "Remove Access" : "Return Access"}
                </MDBBtn>
              </td>
            </tr>
          ))}
      </MDBTableBody>
    </MDBTable>
  );
};

export default EmployeeTable;
