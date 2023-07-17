import React from "react";
import { MDBTable, MDBTableBody, MDBTableHead } from "mdb-react-ui-kit";
import { diffToArray } from "../preference";
import Overview from "./overview";

const index = () => {
  const diff = diffToArray(
    JSON.parse(localStorage.getItem(`task-printout`))?.dc
  );

  return (
    <MDBTable responsive hover bordered>
      <MDBTableHead>
        <tr>
          <th className="py-0 px-2">Differential</th>
          <th className="py-0 px-2">Results</th>
          <th className="py-0 px-2">Reference</th>
        </tr>
      </MDBTableHead>
      <MDBTableBody>
        {diff.map((value, index) => (
          <Overview index={index} value={value} />
        ))}
      </MDBTableBody>
    </MDBTable>
  );
};

export default index;
