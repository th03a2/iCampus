import React from "react";
import { MDBTable, MDBTableBody, MDBTableHead, MDBBtn } from "mdb-react-ui-kit";

const EmployeeTable = ({ access, handleApproval }) => {
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
              <td>{data.flatform}</td>
              <td>{data.status ? "Active" : "Banned"}</td>
              <td className="d-flex justify-content-center">
                <MDBBtn
                  color={data.status ? "danger" : "warning"}
                  type="button"
                  onClick={() =>
                    handleApproval(data.userId, data.flatform, data.status)
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
