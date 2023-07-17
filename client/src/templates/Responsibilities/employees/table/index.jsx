import React from "react";
import { MDBTable, MDBTableHead, MDBTableBody } from "mdb-react-ui-kit";
// import policy from "../../../../fakeDb/json/policy.json";
import { Role } from "../../../../fakeDb";
const Table = ({
  employees,
  maxPage,
  handlePrc,
  handleStatus,
  nameFormatter,
  page,
  paginationHandler,
}) => {
  const handleDesignation = (fk) => Role.find(fk)?.display_name;

  return (
    <MDBTable
      align="middle"
      hover
      responsive
      bordered
      className="text-center border-dark"

      // color={theme.color}
    >
      <caption>List of pending Employees</caption>
      <caption className="caption-top">
        Total of <b>{employees?.length}</b> Employees(s)
      </caption>
      <MDBTableHead>
        <tr>
          <th rowSpan={2}>#</th>
          <th rowSpan={2} className="vertical-center">
            Name
          </th>
          <th rowSpan={2} className="vertical-center">
            Designation <br />
            /<br />
            Position
          </th>
          <th rowSpan={2} className="vertical-center">
            Educational Attainment
          </th>
          <th colSpan={3}>status of employment</th>
          <th rowSpan={2} className="vertical-center">
            Company Id
          </th>
          <th rowSpan={2} className="vertical-center">
            PRC Reg. No.
          </th>
          <th colSpan={2}>Valid</th>
          <th rowSpan={2} className="vertical-center">
            DOB
          </th>
          <th rowSpan={2} className="vertical-center">
            Signature
          </th>
        </tr>
        <tr>
          <th className="rotate-270 py-5">Permanent</th>
          <th className="rotate-270 py-5">Contractual</th>
          <th className="rotate-270 py-5">Others,Specify</th>
          <th className="vertical-center">From</th>
          <th className="vertical-center">To</th>
        </tr>
      </MDBTableHead>
      <MDBTableBody>
        {employees?.length > 0 ? (
          paginationHandler(employees, page, maxPage).map((data, index) => (
            <tr key={`personnels-${index}`}>
              <td>{1 + index}</td>
              <td className="text-nowrap  no-text-center">
                {nameFormatter(data.user.fullName)}
              </td>
              <td>{handleDesignation(data.designation)}</td>
              <td>{data.user.eduAttainment}</td>
              {handleStatus(data.soe)}
              <td className="text-nowrap">{data.id}</td>
              {handlePrc(data.user.prc)}
              <td className="text-nowrap">{data.user.dob}</td>
              <td></td>
            </tr>
          ))
        ) : (
          <tr className="text-center">
            <td colSpan={3}>No Employees.</td>
          </tr>
        )}
      </MDBTableBody>
    </MDBTable>
  );
};

export default Table;
