import React from "react";
import { MDBTable, MDBTableBody, MDBTableHead } from "mdb-react-ui-kit";
import Overview from "./overview";

const index = () => {
  const rci = JSON.parse(localStorage.getItem(`task-printout`))?.rci;
  return (
    <MDBTable responsive hover bordered>
      <MDBTableHead>
        <tr>
          <th className="py-0 px-2"></th>
          <th className="py-0 px-2">Results</th>
          <th className="py-0 px-2">Reference</th>
        </tr>
      </MDBTableHead>
      <MDBTableBody>
        {rci?.map((value, index) => (
          <Overview value={value} index={index} />
        ))}
      </MDBTableBody>
    </MDBTable>
  );
};

export default index;
