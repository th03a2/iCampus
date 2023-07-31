import React, { useEffect, useState } from "react";
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBBtn,
  MDBTable,
  MDBTableBody,
  MDBTableHead,
  MDBInputGroup,
} from "mdb-react-ui-kit";
import degree from "../../../../../../fakeDb/json/levels";
import field from "../../../../../../fakeDb/json/subjects";

export default function BasicInformation({
  schoolInfo,
  setSchoolInfo,
  setActiveItem,
  link,
  setLink,
  levels,
  setLevels,
  category,
  setCategory,
}) {
  const [topic, setTopic] = useState([]),
    [isStrand, setIsStrand] = useState(false),
    [strands, setStrands] = useState([]),
    [isShow, setIsShow] = useState(false);
  const categories = ["shs", "jhs", "elementary", "prep"];
  useEffect(() => {
    if (category) {
      const findLevel = degree.filter((data) => data.category === category);
      setLevels(findLevel);
    }
  }, [category]);

  useEffect(() => {
    if (schoolInfo.levelId) {
      const filterLevel = levels.find((data) => data.id === schoolInfo.levelId);
      const { subjects, strand } = filterLevel || [];
      if (subjects) {
        const filterSubjects = subjects.map((id) =>
          field.find((data) => data.id === id)
        );
        setTopic([...filterSubjects] || []);
        setIsStrand(false);
        setIsShow(true);
      } else {
        setStrands(strand || []);
        setIsStrand(true);
        setIsShow(false);
        setTopic([]);
      }
    } else {
      setTopic([]);
      setIsStrand(false);
      setIsShow(false);
    }
  }, [schoolInfo.levelId, levels]);

  useEffect(() => {
    if (schoolInfo.specifications) {
      const filterStrand = strands.find(
        (strand) => strand.specifications === schoolInfo.specifications
      );
      const filterSubjects = filterStrand?.subject.map((id) =>
        field.find((data) => data.id === id)
      );

      if (filterSubjects) {
        setTopic(filterSubjects);
        setIsShow(true);
      }
    } else {
      setTopic([]);
      setIsShow(false);
    }
  }, [schoolInfo.specifications]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const tabs = { ...link };

    tabs.personnel = true;

    setLink(tabs);
    setActiveItem("personnel");
  };

  return (
    <MDBContainer className="mt-4">
      <form onSubmit={handleSubmit}>
        <MDBRow>
          <MDBCol md={6}>
            <MDBInputGroup textBefore="Category">
              <select
                className="form-control"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option></option>
                {categories.map((data, index) => (
                  <option value={data} key={index}>
                    {data}
                  </option>
                ))}
              </select>
            </MDBInputGroup>
          </MDBCol>
          <MDBCol md={6}>
            <MDBInputGroup textBefore="Student Status">
              <select
                className="form-control"
                value={schoolInfo?.units}
                onChange={(e) => {
                  setSchoolInfo({
                    ...schoolInfo,
                    units: e.target.value,
                  });
                }}
                required
              >
                <option></option>
                <option value={"freshman"}>Freshman</option>
                <option value={"sophomore"}>Sophomore</option>
                <option value={"junior"}>junior</option>
                <option value={"senior"}>Senior</option>
                <option value={"transferrees"}>Transferrees</option>
                <option value={"returning"}>Returning</option>
              </select>
            </MDBInputGroup>
          </MDBCol>
        </MDBRow>
        <MDBRow className="mt-3">
          <MDBCol md={6}>
            <MDBInputGroup textBefore="Grade Level">
              <select
                className="form-control"
                required
                value={schoolInfo.levelId}
                onChange={(e) =>
                  setSchoolInfo({
                    ...schoolInfo,
                    levelId: Number(e.target.value),
                  })
                }
              >
                <option> </option>

                {levels.length > 0 &&
                  levels.map((level, index) => (
                    <option value={level.id} key={index}>
                      {level.description}
                    </option>
                  ))}
              </select>
            </MDBInputGroup>
          </MDBCol>
          <MDBCol md={6}>
            {isStrand && (
              <select
                className="form-control"
                value={schoolInfo.specifications}
                required
                onChange={(e) =>
                  setSchoolInfo({
                    ...schoolInfo,
                    specifications: e.target.value,
                  })
                }
              >
                <option>Strand</option>
                {strands.length > 0 &&
                  strands.map((strand) => (
                    <option value={strand.specifications}>
                      {strand.specifications}
                    </option>
                  ))}
              </select>
            )}
          </MDBCol>
        </MDBRow>

        {isShow && (
          <MDBContainer>
            <h5 className="mt-4 text-center">
              <strong>Subjects</strong>
            </h5>
            <MDBRow className="d-flex justify-content-center">
              <MDBCol md={6}>
                <MDBTable
                  align="middle"
                  hover
                  responsive
                  className="table table-hover"
                >
                  <MDBTableHead>
                    <tr>
                      <th>#</th>
                      <th scope="col">Name </th>
                    </tr>
                  </MDBTableHead>
                  <MDBTableBody>
                    {topic.length > 0 &&
                      topic.map((data, index) => (
                        <tr>
                          <td>{1 + index}</td>
                          <td>{data.name}</td>
                        </tr>
                      ))}
                  </MDBTableBody>
                </MDBTable>
              </MDBCol>
            </MDBRow>
          </MDBContainer>
        )}
        <div className="text-end">
          <MDBBtn type="submit" className="mb-2">
            Next
          </MDBBtn>
        </div>
      </form>
    </MDBContainer>
  );
}
