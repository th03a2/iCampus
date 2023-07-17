import React, { useEffect, useState } from "react";
import {
  MDBContainer,
  MDBTable,
  MDBTableHead,
  MDBTableBody,
} from "mdb-react-ui-kit";

const Pt = () => {
  const deal = JSON.parse(localStorage.getItem(`task-printout`)),
    [inr, setInr] = useState(),
    [percent, setPercent] = useState();

  useEffect(() => {
    if (!!deal.pt && deal.pt[0] !== null && !!deal.pt && deal.pt[1] !== null) {
      const _inr = deal.pt[0] / deal.pt[1];
      setInr(_inr.toFixed(2));
      const _per = (deal.pt[1] / deal.pt[0]) * 100;
      setPercent(_per.toFixed(2));
    }
  }, [deal]);
  return (
    <MDBContainer>
      <h6 className="text-start">PROTHROMBIN TIME :</h6>
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
            <th scope="col" style={{ width: 10 }} className="p-1">
              Name
            </th>
            <th scope="col" style={{ width: 25 }} className="p-1 fw-bold ">
              Result
            </th>
            <th scope="col" className="p-1 fw-bold ">
              Preference
            </th>
          </tr>
        </MDBTableHead>
        <MDBTableBody style={{ width: 30 }}>
          <tr>
            <td>Patient</td>
            <td
              style={{
                color:
                  deal.pt[0] < 11 ? "blue" : deal.pt[0] > 13 ? "red" : "black",
              }}
            >
              {deal.pt[0]}
            </td>
            <td>11.0-13.0 sec.</td>
          </tr>
          <tr>
            <td>Control</td>
            <td
              style={{
                color:
                  deal.pt[1] < 1 ? "blue" : deal.pt[1] > 13 ? "red" : "black",
              }}
            >
              {deal.pt[1]}
            </td>
            <td>11.0-13.0 sec.</td>
          </tr>
          <tr>
            <td>INR</td>
            <td
              style={{
                color: inr < 0.8 ? "blue" : inr > 1.1 ? "red" : "black",
              }}
            >
              {inr !== undefined ? inr : ""}
            </td>
            <td>0.8-1.1 %</td>
          </tr>
          <tr>
            <td>%Activity</td>
            <td>{percent !== undefined ? percent : ""}</td>
            <td></td>
          </tr>
        </MDBTableBody>
      </MDBTable>
    </MDBContainer>
  );
};
export default Pt;
