import React from "react";
import { MDBTable, MDBTableBody, MDBTableHead } from "mdb-react-ui-kit";
import Physical from "./overview.jsx";

const index = () => {
  return (
    <div
      style={{
        minHeight: "280px",
      }}
    >
      <MDBTable responsive hover bordered>
        <MDBTableHead>
          <tr>
            <th className="py-0 px-2">Name</th>
            <th className="py-0 px-2">Result</th>
            <th className="py-0 px-2">&nbsp;</th>
            <th className="py-0 px-2">Name</th>
            <th className="py-0 px-2">Result</th>
          </tr>
        </MDBTableHead>
        <MDBTableBody>
          <Physical />
        </MDBTableBody>
      </MDBTable>
    </div>
  );
};

export default index;
