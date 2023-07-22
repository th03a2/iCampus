import React, { useEffect, useState } from "react";
import { MDBTable, MDBTableHead, MDBTableBody } from "mdb-react-ui-kit";
import { useSelector } from "react-redux";
export function Body({ specialization }) {
  const { theme } = useSelector(({ auth }) => auth);
  const [specializations, setSpecializations] = useState([]);

  useEffect(() => {
    specialization && setSpecializations(specialization);
  }, [specialization]);

  return (
    <MDBTable align="middle" hover responsive color={theme.color}>
      <MDBTableHead>
        <tr>
          <th>#</th>
          <th>Name</th>
        </tr>
      </MDBTableHead>
      <MDBTableBody>
        {!!specializations?.length ? (
          specializations.map((data, index) => (
            <tr key={`specializations-${index}`}>
              <td>{1 + index}</td>
              <td>{data}</td>
            </tr>
          ))
        ) : (
          <tr className="text-center">
            <td colSpan={3}>No Activity.</td>
          </tr>
        )}
      </MDBTableBody>
    </MDBTable>
  );
}
