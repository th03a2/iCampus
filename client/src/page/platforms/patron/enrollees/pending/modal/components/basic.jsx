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
  MDBInput,
} from "mdb-react-ui-kit";
import degree from "../../../../../../../fakeDb/json/levels";
import field from "../../../../../../../fakeDb/json/subjects";

export default function BasicInformation({
  setActiveItem,
  link,
  setLink,
  category,
  setCategory,
  information,
}) {
  const [topic, setTopic] = useState([]),
    [isStrand, setIsStrand] = useState(false),
    [levels, setLevels] = useState([]),
    [specifications, setSpecifications] = useState("");

  useEffect(() => {
    const filterLevel = degree.find((data) => data.id === information.levelId);
    const { subjects, strand } = filterLevel || [];

    if (subjects) {
      const filterSubjects = subjects.map((id) =>
        field.find((data) => data.id === id)
      );
      setTopic([...filterSubjects]);
      setIsStrand(false);
    } else {
      setIsStrand(true);
      const filterStrand = strand?.find(
        (data) => data.specifications === information.specifications
      );
      if (filterStrand) {
        const filterSubjects = filterStrand?.subject.map((id) =>
          field.find((data) => data.id === id)
        );

        setTopic(filterSubjects || []);
        setSpecifications(filterStrand.specifications);
      }
    }
    setCategory(filterLevel.category);
    setLevels(filterLevel);
  }, [information.levelId, levels, information.specifications]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const tabs = { ...link };

    tabs.personnel = true;

    setLink(tabs);
    setActiveItem("personnel");
  };

  return (
    <MDBContainer className="mt-4" style={{ height: "580px" }}>
      <form onSubmit={handleSubmit}>
        <MDBRow>
          <MDBCol md={6}>
            <MDBInputGroup textBefore="Category">
              <select
                className="form-control"
                value={category}
                disabled
                onChange={(e) => setCategory(e.target.value)}
              >
                <option>{category}</option>
              </select>
            </MDBInputGroup>
          </MDBCol>
          <MDBCol md={6}>
            <MDBInputGroup textBefore="Student Status">
              <select
                className="form-control"
                value={information?.categorization}
                disabled
              >
                <option>{information.categorization}</option>
              </select>
            </MDBInputGroup>
          </MDBCol>
        </MDBRow>
        <MDBRow className="mt-3">
          <MDBCol md={6}>
            <MDBInputGroup textBefore="Grade Level">
              <select
                className="form-control"
                disabled
                value={information.levelId}
              >
                <option>{levels.description}</option>
              </select>
            </MDBInputGroup>
          </MDBCol>
          <MDBCol md={6}>
            <MDBInputGroup textBefore="Strand">
              {isStrand && (
                <select
                  className="form-control"
                  value={specifications}
                  required
                  disabled
                >
                  <option>{specifications}</option>
                </select>
              )}
            </MDBInputGroup>
          </MDBCol>
        </MDBRow>

        {/* <MDBContainer>
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
        </MDBContainer> */}

        <div
          style={{
            textAlign: "right",
            position: "fixed",
            bottom: "27px",
            right: "120px",
          }}
          className="fixed-bottom"
        >
          <MDBBtn type="submit" className="mb-2">
            Next
          </MDBBtn>
        </div>
      </form>
    </MDBContainer>
  );
}
