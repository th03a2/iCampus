import React from "react";
import { MDBTable, MDBTableBody, MDBTableHead } from "mdb-react-ui-kit";
import Physical from "./overview.jsx";

const Index = () => {
  return (
    <div
      style={{
        height: "280px",
      }}
    >
      <MDBTable responsive hover bordered>
        <MDBTableHead>
          <tr>
            <th colSpan={2} className="text-center py-1 ">
              Physical Examination
            </th>
            <th colSpan={6} className="text-center py-1 ">
              Chemical Examination
            </th>
          </tr>
        </MDBTableHead>
        <MDBTableBody>
          <Physical />
        </MDBTableBody>
      </MDBTable>
    </div>
  );
};

export default Index;
