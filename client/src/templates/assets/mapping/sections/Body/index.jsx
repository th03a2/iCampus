import React, { useEffect, useState } from "react";
import { MDBTable, MDBTableHead, MDBTableBody } from "mdb-react-ui-kit";
import { useSelector } from "react-redux";
import field from "../../../../../fakeDb/json/subjects";
import level from "../../../../../fakeDb/json/levels";

export default function Body({ topic }) {
  const { theme } = useSelector(({ auth }) => auth);
  const [subjects, setSubjects] = useState([]);

  //   useEffect(() => {
  //     subject && setSubjects(subject);
  //   }, [subject]);

  useEffect(() => {
    const filterLevel = level.find((data) => data.id === topic.levelId);
    if (filterLevel) {
      const { subjects } = filterLevel;
      if (subjects) {
        const filterSubjects = subjects.map((subject) =>
          field.find((data) => data.id === subject)
        );
        setSubjects(filterSubjects);
      } else {
        const strand = [...filterLevel.strand];

        const findStrand = strand.find(
          (data) => data.specifications === topic.specification
        );

        if (findStrand) {
          const subjects = [...findStrand.subject];
          const findSubjects = subjects.map((subject) =>
            field.find((data) => data.id === subject)
          );

          setSubjects(findSubjects);
        }
      }
    } else {
      setSubjects([]);
    }
  }, [topic]);

  return (
    <MDBTable align="middle" hover responsive color={theme.color}>
      <MDBTableHead>
        <tr>
          <th>#</th>
          <th>Name</th>
        </tr>
      </MDBTableHead>
      <MDBTableBody>
        {!!subjects?.length ? (
          subjects.map((data, index) => (
            <tr key={`subjects-${index}`}>
              <td>{1 + index}</td>
              <td>{data.name}</td>
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
