import React from "react";
import {
  MDBContainer,
  MDBTable,
  MDBTableHead,
  MDBTableBody,
} from "mdb-react-ui-kit";

const Aptt = () => {
  const deal = JSON.parse(localStorage.getItem(`task-printout`));

  return (
    <MDBContainer>
      <h6>APTT :</h6>
      <MDBTable
        responsive
        striped
        small
        bordered
        borderColor="black"
        className="mb-0"
      >
        <MDBTableHead>
          <tr>
            <th scope="col" className="p-1 fw-bold ">
              Name
            </th>
            <th scope="col" className="p-1 fw-bold ">
              Result
            </th>
            <th scope="col" className="p-1 fw-bold ">
              Preference
            </th>
          </tr>
        </MDBTableHead>
        <MDBTableBody>
          <tr>
            <td>Patient</td>
            <td
              style={{
                color:
                  deal.aptt[0] < 24
                    ? "blue"
                    : deal.aptt[0] > 39
                    ? "red"
                    : "black",
              }}
            >
              {deal.aptt[0]}
            </td>
            <td>24-39 sec.</td>
          </tr>
          <tr>
            <td>Control</td>
            <td
              style={{
                color:
                  Number(deal.aptt[1]) < 24
                    ? "blue"
                    : Number(deal.aptt[1]) > 39
                    ? "red"
                    : "black",
              }}
            >
              {deal.aptt[1]}
            </td>
            <td>24-39 sec.</td>
          </tr>
        </MDBTableBody>
      </MDBTable>
    </MDBContainer>
  );
};

export default Aptt;
