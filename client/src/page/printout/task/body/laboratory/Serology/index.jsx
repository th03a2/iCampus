import React from "react";
import Overview from "./overview";
import { MDBTable, MDBTableBody, MDBTableHead } from "mdb-react-ui-kit";

const index = () => {
  const { packages, services } = JSON.parse(
    localStorage.getItem(`task-printout`)
  );

  return (
    <div
      style={{
        height: "280px",
      }}
    >
      <MDBTable responsive hover bordered>
        <MDBTableHead>
          <tr>
            <th rowSpan={2} className="py-0 px-2">
              #
            </th>
            <th rowSpan={2} className="py-0 px-2 text-center">
              Services
            </th>
            <th rowSpan={2} className="py-0 px-2 text-center">
              Results
            </th>
            <th colSpan={2} className="py-0 px-2 text-center">
              Reference
            </th>
          </tr>
          <tr className="text-center p-0">
            <th className="py-0 px-2 custom-secondary">Results</th>
            <th className="py-0 px-2 custom-secondary">Units</th>
          </tr>
        </MDBTableHead>
        <MDBTableBody>
          {Object.keys(packages).map((fk, index) => (
            <Overview
              index={index}
              value={packages[fk]}
              service={services.find(({ id }) => id === Number(fk))}
            />
          ))}
        </MDBTableBody>
      </MDBTable>
    </div>
  );
};

export default index;
