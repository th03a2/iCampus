import React, { useEffect, useState } from "react";
import {
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
  MDBTable,
  MDBTableBody,
  MDBTableHead,
  MDBIcon,
  MDBInputGroup,
  MDBRow,
  MDBCol,
  MDBInput,
  MDBBadge,
} from "mdb-react-ui-kit";
import levels from "../../../../fakeDb/json/levels";
import topic from "../../../../fakeDb/json/subjects";
import { useSelector } from "react-redux";
export default function Modal({
  visibility,
  setVisibility,
  selectingQuestions,
  handleView,
  handleQuestion,
}) {
  const [questionneirs, setQuestionneirs] = useState([]);
  const { onDuty } = useSelector(({ auth }) => auth);
  const [gradeLevels, setGradeLevels] = useState([]);
  const [levelId, setLevelId] = useState("");
  const [strands, setStrands] = useState([]);
  const [strandId, setStrandId] = useState("");
  const [subjects, setSubjects] = useState("");
  const [points, setPoints] = useState(0);
  const [chooseLevel, setChooseLevel] = useState({});

  useEffect(() => {
    if (onDuty._id) {
      const findLevels = levels.filter(
        (level) => level.category === onDuty.category
      );
      setGradeLevels(findLevels);
    }
  }, [visibility, onDuty]);

  useEffect(() => {
    if (levelId) {
      const findStrand = levels.find((level) => level.id === Number(levelId));
      if (findStrand.hasOwnProperty("strand")) {
        setStrands(findStrand.strand);
        setChooseLevel(findStrand);
      } else {
        const findSubject = findStrand.subject.map((id) =>
          topic.find((topic) => topic.id === id)
        );
        setSubjects(findSubject);
      }
    }
  }, [levelId]);

  useEffect(() => {
    if (strandId) {
      const getSubjectInthisStrand = strands.find(
        ({ specifications }) => specifications === strandId
      );
      const findSubject = getSubjectInthisStrand.subject.map((id) =>
        topic.find((topic) => topic.id === id)
      );
      setSubjects(findSubject);
    }
  }, [strandId]);

  useEffect(() => {
    setQuestionneirs(selectingQuestions);
  }, [selectingQuestions]);

  const handleChangePoints = (index, value) => {
    const newArray = [...questionneirs];
    const _questions = { ...newArray[index] };
    _questions.points = value;

    newArray[index] = _questions;

    setQuestionneirs(newArray);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(questionneirs);
  };
  return (
    <>
      <MDBModal show={visibility} setShow={setVisibility} tabIndex="-1">
        <MDBModalDialog size="xl">
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>Assign your create questions</MDBModalTitle>
              <MDBBtn
                className="btn-close"
                color="none"
                onClick={() => setVisibility(false)}
              ></MDBBtn>
            </MDBModalHeader>
            <form onSubmit={handleSubmit}>
              <MDBModalBody>
                <MDBRow className="my-3">
                  <MDBCol md={3}>
                    <MDBInputGroup textBefore="Grade Level">
                      <select
                        className="form-control"
                        value={levelId}
                        onChange={(e) => setLevelId(e.target.value)}
                      >
                        <option value={""}></option>
                        {gradeLevels.length > 0 &&
                          gradeLevels.map((level) => (
                            <option value={level.id}>
                              {level.description}
                            </option>
                          ))}
                      </select>
                    </MDBInputGroup>
                  </MDBCol>
                  <MDBCol md={3}>
                    <MDBInputGroup textBefore="Strand">
                      <select
                        className="form-control"
                        value={strandId}
                        onChange={(e) => setStrandId(e.target.value)}
                      >
                        <option value={""}></option>
                        {strands.length > 0 &&
                          strands.map((strand) => (
                            <option value={strand.specifications}>
                              {strand.specifications}
                            </option>
                          ))}
                      </select>
                    </MDBInputGroup>
                  </MDBCol>
                  <MDBCol md={3}>
                    <MDBInputGroup textBefore="Subject">
                      <select className="form-control">
                        <option value={""}></option>
                        {subjects.length > 0 &&
                          subjects.map((subject) => (
                            <option value={subject.id}>{subject.name}</option>
                          ))}
                      </select>
                    </MDBInputGroup>
                  </MDBCol>
                  <MDBCol md={3}>
                    <MDBInputGroup textBefore="Title">
                      <input className="form-control" />
                    </MDBInputGroup>
                  </MDBCol>
                </MDBRow>
                <MDBRow className="mt-2">
                  <MDBCol md={3}>
                    <MDBInputGroup textBefore="Start Date">
                      <MDBInput type="date" />
                    </MDBInputGroup>
                  </MDBCol>
                  <MDBCol md={3}>
                    <MDBInputGroup textBefore="Start Time">
                      <MDBInput type="time" />
                    </MDBInputGroup>
                  </MDBCol>
                  <MDBCol md={3}>
                    <MDBInputGroup textBefore="End Date">
                      <MDBInput type="date" />
                    </MDBInputGroup>
                  </MDBCol>
                  <MDBCol md={3}>
                    <MDBInputGroup textBefore="End Time">
                      <MDBInput type="time" />
                    </MDBInputGroup>
                  </MDBCol>
                </MDBRow>
                <MDBRow className="my-4">
                  <MDBCol md={6}>
                    <h5 className="text-start">
                      <strong>Check your create questions</strong>
                    </h5>
                  </MDBCol>
                  <MDBCol md={6} className="text-end">
                    <h5>
                      <strong> Total of </strong>
                      <MDBBadge>
                        {questionneirs.length + " / " + questionneirs.length}
                      </MDBBadge>
                    </h5>
                  </MDBCol>
                </MDBRow>
                <div style={{ maxHeight: "300px", overflowY: "auto" }}>
                  <MDBTable>
                    <MDBTableHead>
                      <tr>
                        <th>Questions</th>
                        <th>Cluster</th>
                        <th>Points</th>
                        <th>Action</th>
                      </tr>
                    </MDBTableHead>
                    <MDBTableBody>
                      {questionneirs.map((select, index) => (
                        <tr>
                          <td>{handleQuestion(select.question)}</td>
                          <td>{select.cluster}</td>
                          <td style={{ width: "120px" }}>
                            <input
                              value={points || select.points}
                              onChange={(e) =>
                                handleChangePoints(
                                  index,
                                  Number(e.target.value)
                                )
                              }
                              className="border-0 border-bottom form-control"
                            />
                          </td>
                          <td>
                            <MDBBtn
                              size="sm"
                              type="button"
                              onClick={() => handleView(select)}
                              color="warning"
                            >
                              <MDBIcon fas icon="eye" />
                            </MDBBtn>
                          </td>
                        </tr>
                      ))}
                    </MDBTableBody>
                  </MDBTable>
                </div>
              </MDBModalBody>
              <MDBModalFooter>
                <MDBBtn
                  color="transparent"
                  type="button"
                  onClick={() => setVisibility(false)}
                >
                  Close
                </MDBBtn>
                <MDBBtn type="submit">Start</MDBBtn>
              </MDBModalFooter>
            </form>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>
  );
}
