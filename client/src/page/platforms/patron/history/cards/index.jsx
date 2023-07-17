import React from "react";
import {
  MDBTable,
  MDBTableHead,
  MDBTableBody,
  MDBBtnGroup,
  MDBBtn,
  MDBTooltip,
} from "mdb-react-ui-kit";
import CompanyCard from "./card";
import { useSelector } from "react-redux";
import {
  paginationHandler,
  PresetUser,
} from "../../../../../components/utilities";

import policy from "../../../../../fakeDb/json/policy.json";

export default function CompanyTables({ history, page }) {
  const { theme, maxPage } = useSelector(({ auth }) => auth);

  const handleDesignation = (designation) => {};
  return (
    <>
      <MDBTable align="middle" hover responsive color={theme.color}>
        <caption>List of pending heads</caption>
        <caption className="caption-top">
          Total of <b>{history.length}</b> head(s)
        </caption>
        <MDBTableHead>
          <tr>
            <th>#</th>
            <th>Company</th>
            <th>Branch</th>
            <th>Designation</th>
            <th>Date Submitted</th>
            <th>Requirements</th>

            <th>Status</th>
            <th className="text-center">Action</th>
          </tr>
        </MDBTableHead>
        <MDBTableBody>
          {history?.map((data, index) => (
            <tr key={`history-${index}`}>
              <td>{index + 1}</td>
              <td>{data.branch.companyName}</td>
              <td>{data.branch.name}</td>
              <td>{data.designation}</td>
              <td>{new Date(data.createdAt).toLocaleDateString()}</td>
              <td>Pds,resume</td>
              <td>{data.status}</td>
            </tr>
          ))}
        </MDBTableBody>
      </MDBTable>
    </>
  );
}
