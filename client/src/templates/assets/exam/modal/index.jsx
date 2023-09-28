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
import { SAVE } from "../../../../redux/slices/assets/exams";
import { useDispatch, useSelector } from "react-redux";
export default function Modal({
  visibility,
  setVisibility,
  selectingQuestions,
  handleView,
  handleQuestion,
}) {
  const { auth, token } = useSelector(({ auth }) => auth);
  const [questionneirs, setQuestionneirs] = useState([]);
  const { onDuty } = useSelector(({ auth }) => auth);
  const [gradeLevels, setGradeLevels] = useState([]);
  const [levelId, setLevelId] = useState("");
  const [strands, setStrands] = useState([]);
  const [strandId, setStrandId] = useState("");
  const [subjects, setSubjects] = useState("");
  const [title, setTitle] = useState("");
  const [subjectId, setSubjectId] = useState(1);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const dispatch = useDispatch();

  const points = 1;

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
    const exam = {
      branchId: onDuty._id,
      levelId,
      specification: strandId ? strandId : "",
      subjectId,
      title,
      startDate,
      startTime,
      startDate,
      endTime,
      user: auth._id,
    };
    const questions = questionneirs.map((questionneir) => {
      return {
        bankId: questionneir._id,
        points: questionneir.points === 0 ? points : questionneir.points,
        examId: "",
      };
    });

    dispatch(
      SAVE({
        form: { exam, questions },
        token,
      })
    );
  };
  return (
    <>
      <MDBModal show={visibility} setShow={setVisibility}>
        <MDBModalDialog size="xl">
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>Assign your questions</MDBModalTitle>
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
                    <MDBInputGroup className="mb-3" textBefore="Grade Level">
                      <select
                        className="form-select"
                        value={levelId}
                        onChange={(e) => setLevelId(e.target.value)}
                        required
                      >
                        <option value={""}></option>
                        {gradeLevels.length > 0 &&
                          gradeLevels.map((level, index) => (
                            <option value={level.id} key={index}>
                              {level.description}
                            </option>
                          ))}
                      </select>
                    </MDBInputGroup>
                  </MDBCol>
                  <MDBCol md={3}>
                    <MDBInputGroup className="mb-3" textBefore="Strand">
                      <select
                        className="form-select"
                        value={strandId}
                        onChange={(e) => setStrandId(e.target.value)}
                        required
                      >
                        <option value={""}></option>
                        {strands.length > 0 &&
                          strands.map((strand, index) => (
                            <option value={strand.specifications} key={index}>
                              {strand.specifications}
                            </option>
                          ))}
                      </select>
                    </MDBInputGroup>
                  </MDBCol>
                  <MDBCol md={3}>
                    <MDBInputGroup className="mb-3" textBefore="Subject">
                      <select
                        className="form-select"
                        value={subjectId}
                        onChange={(e) => setSubjectId(Number(e.target.value))}
                        required
                      >
                        <option value={""}></option>
                        {subjects.length > 0 &&
                          subjects.map((subject, index) => (
                            <option value={subject.id} key={index}>
                              {subject.name}
                            </option>
                          ))}
                      </select>
                    </MDBInputGroup>
                  </MDBCol>
                  <MDBCol md={3}>
                    <MDBInputGroup className="mb-3" textBefore="Title">
                      <input
                        className="form-control"
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                      />
                    </MDBInputGroup>
                  </MDBCol>
                </MDBRow>
                <MDBRow className="mt-2">
                  <MDBCol md={3}>
                    <MDBInputGroup className="mb-3" textBefore="Start Date">
                      <MDBInput
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                      />
                    </MDBInputGroup>
                  </MDBCol>
                  <MDBCol md={3}>
                    <MDBInputGroup
                      className="mb-3"
                      textBefore="Start Time"
                      value={startTime}
                      onChange={(e) => setStartTime(e.target.value)}
                    >
                      <MDBInput type="time" />
                    </MDBInputGroup>
                  </MDBCol>
                  <MDBCol md={3}>
                    <MDBInputGroup
                      className="mb-3"
                      textBefore="End Date"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                    >
                      <MDBInput type="date" />
                    </MDBInputGroup>
                  </MDBCol>
                  <MDBCol md={3}>
                    <MDBInputGroup
                      className="mb-3"
                      textBefore="End Time"
                      value={endTime}
                      onChange={(e) => setEndTime(e.target.value)}
                    >
                      <MDBInput type="time" />
                    </MDBInputGroup>
                  </MDBCol>
                </MDBRow>
                <MDBRow className="my-4">
                  <MDBCol md={6}>
                    <h5 className="text-start">
                      <strong>Check your questions</strong>
                    </h5>
                  </MDBCol>
                  <MDBCol md={6} className="text-end">
                    <h5>
                      <strong> Total </strong>
                      <MDBBadge
                        pill
                        style={{
                          fontSize: "1.20rem",
                          padding: "0.2rem 0.5rem",
                        }}
                      >
                        {questionneirs.length}
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
                        <tr key={index}>
                          <td>{handleQuestion(select.question)}</td>
                          <td>{select.cluster}</td>
                          <td style={{ width: "120px" }}>
                            <input
                              value={select.points || points}
                              onChange={(e) =>
                                handleChangePoints(
                                  index,
                                  Number(e.target.value)
                                )
                              }
                              className="form-control border-0 border-bottom"
                            />
                          </td>
                          <td>
                            <MDBBtn
                              size="sm"
                              type="button"
                              onClick={() => handleView(select)}
                              color="warning"
                            >
                              <i className="fas fa-eye"></i>
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
                <MDBBtn type="submit" color="primary">
                  Start
                </MDBBtn>
              </MDBModalFooter>
            </form>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>
  );
}
