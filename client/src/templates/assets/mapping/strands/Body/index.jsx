import React, { useEffect, useState } from "react";
import { MDBTable, MDBTableHead, MDBTableBody } from "mdb-react-ui-kit";
import { useSelector } from "react-redux";
export function Body({ strands }) {
  const { theme } = useSelector(({ auth }) => auth);
  const [majors, setMajors] = useState([]);

  useEffect(() => {
    strands && setMajors(strands);
  }, [strands]);

  return (
    <MDBTable align="middle" hover responsive color={theme.color}>
      <MDBTableHead>
        <tr>
          <th>#</th>
          <th>Name</th>
        </tr>
      </MDBTableHead>
      <MDBTableBody>
        {!!majors?.length ? (
          majors.map((data, index) => (
            <tr key={`majors-${index}`}>
              <td>{1 + index}</td>
              <td>{data}</td>
            </tr>
          ))
        ) : (
          <tr className="text-center">
            <td colSpan={3}>No major.</td>
          </tr>
        )}
      </MDBTableBody>
    </MDBTable>
  );
}
