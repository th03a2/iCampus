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
  schoolInformation,
  setCategory,
  setBatchId,
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
    <MDBContainer className="mt-4" style={{ height: "580px" }}>
      <form onSubmit={handleSubmit}>
        <MDBRow>
          <MDBCol md={6}>
            <MDBInputGroup textBefore="Category">
              <select
                className="form-control"
                value={category}
                onChange={(e) => {
                  const selectedValue = e.target.value;
                  setBatchId(
                    // para makuha kung anong batchId ba yung napili
                    e.target.options[e.target.selectedIndex].getAttribute(
                      "data-id"
                    )
                  );
                  setCategory(selectedValue);
                }}
              >
                <option value={""}></option>
                {schoolInformation.categories.map((data, index) => (
                  <option
                    value={data.category}
                    data-id={data.batchId}
                    key={index}
                  >
                    {data.category}
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
                <option value={""}></option>
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
                <option value={""}> </option>

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
                <option value={""}>Strand</option>
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
                <div
                  className="table-container"
                  style={{ maxHeight: "300px", overflowY: "auto" }}
                >
                  <MDBTable>
                    <MDBTableHead>
                      <tr>
                        <th>#</th>
                        <th scope="col">Name</th>
                      </tr>
                    </MDBTableHead>
                    <MDBTableBody>
                      {topic.length > 0 &&
                        topic.map((data, index) => (
                          <tr key={index}>
                            <td>{1 + index}</td>
                            <td>{data.name}</td>
                          </tr>
                        ))}
                    </MDBTableBody>
                  </MDBTable>
                </div>
              </MDBCol>
            </MDBRow>
          </MDBContainer>
        )}
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
