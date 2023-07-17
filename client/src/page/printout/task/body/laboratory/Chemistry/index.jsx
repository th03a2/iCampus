import React from "react";
import { MDBTable, MDBTableHead, MDBTableBody } from "mdb-react-ui-kit";
import Overview from "./overview";
import { useParams } from "react-router-dom";

const Chemistry = () => {
  const { form } = useParams();
  const { packages, services } = JSON.parse(
    localStorage.getItem(`task-printout`)
  );

  return (
    <div
      style={{
        minHeight: "280px",
      }}
    >
      <MDBTable
        small
        striped
        bordered
        style={{ fontSize: "12px" }}
        className="mb-0"
      >
        <MDBTableHead>
          <tr className="text-center p-0">
            <th rowSpan={2} className="py-0 px-2">
              #
            </th>
            <th rowSpan={2} className="py-0 px-2">
              Services
            </th>
            <th colSpan={2} className="py-0 px-2">
              Conventional Unit
            </th>
            <th colSpan={2} className="py-0 px-2">
              System International Unit
            </th>
          </tr>
          <tr className="text-center p-0">
            <th className="py-0 px-2 custom-secondary">Results</th>
            <th className="py-0 px-2 custom-secondary">Reference</th>
            <th className="py-0 px-2 custom-secondary">Results</th>
            <th className="py-0 px-2 custom-secondary">Reference</th>
          </tr>
        </MDBTableHead>
        <MDBTableBody>
          {Object.keys(packages).map((fk, index) => (
            <Overview
              key={`${form}-${index}`}
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

export default Chemistry;
