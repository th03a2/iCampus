import React from "react";
import { MDBTable, MDBTableBody, MDBTableHead } from "mdb-react-ui-kit";
import Overview from "./overview";

const Index = () => {
  const gender = "Female";
  const apc = JSON.parse(localStorage.getItem(`task-printout`))?.apc;
  const cells = JSON.parse(localStorage.getItem(`task-printout`))?.cc || [
    null,
    null,
    null,
    null,
  ];

  const color = {
    color: apc < 150 ? "blue" : apc > 400 && "red",
    fontWeight: "bold",
  };

  return (
    <MDBTable responsive hover bordered>
      <MDBTableHead>
        <tr>
          <th className="py-0 px-2">Category</th>
          <th className="py-0 px-2">Results</th>
          <th className="py-0 px-2">Reference</th>
        </tr>
      </MDBTableHead>
      <MDBTableBody>
        {cells?.map((value, index) => (
          <Overview index={index} value={value} gender={gender} />
        ))}
        <tr key={`result-5`}>
          <td className="py-0 px-2">&nbsp;</td>
          <td className="py-0 px-2">&nbsp;</td>
          <td className="py-0 px-2">&nbsp;</td>
        </tr>
        <tr key={`result-6`}>
          <td className="py-0 px-2">APC</td>
          <td className="py-0 px-2" style={color}>
            {apc}
          </td>
          <td className="py-0 px-2">
            150-400x10 <sup>9</sup>/L
          </td>
        </tr>
      </MDBTableBody>
    </MDBTable>
  );
};

export default Index;
