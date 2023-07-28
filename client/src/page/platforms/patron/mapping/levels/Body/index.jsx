import React, { useEffect, useState } from "react";
import { MDBTable, MDBTableHead, MDBTableBody } from "mdb-react-ui-kit";
import { useSelector } from "react-redux";
import { nameFormatter } from "../../../../../../components/utilities";
export function Body({ levelId, department }) {
  const { theme } = useSelector(({ auth }) => auth);
  const [sections, setSections] = useState([]);

  //   useEffect(() => {
  //     section && setSections(section);
  //   }, [section]);

  useEffect(() => {
    const findSection = department.filter((data) => data.levelId === levelId);
    console.log(department);
    if (findSection.length > 0) {
      setSections(findSection);
    } else {
      setSections([]);
    }
  }, [levelId, department]);

  return (
    <MDBTable align="middle" hover responsive color={theme.color}>
      <MDBTableHead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Accumulate</th>
          <th>Adviser</th>
        </tr>
      </MDBTableHead>
      <MDBTableBody>
        {!!sections?.length ? (
          sections.map((data, index) => (
            <tr key={`sections-${index}`}>
              <td>{1 + index}</td>
              <td>{data.name}</td>
              <td>{data.accumulate}</td>
              <td>{nameFormatter(data.adviser?.fullName)}</td>
            </tr>
          ))
        ) : (
          <tr className="text-center">
            <td colSpan={3}>No Sections.</td>
          </tr>
        )}
      </MDBTableBody>
    </MDBTable>
  );
}
