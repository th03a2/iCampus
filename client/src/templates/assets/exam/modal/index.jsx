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

export default function Modal({
  visibility,
  setVisibility,
  selectingQuestions,
  handleView,
  handleQuestion,
}) {
  const [questionneirs, setQuestionneirs] = useState([]);

  useEffect(() => {
    setQuestionneirs(selectingQuestions);
  }, [selectingQuestions]);
  const [points, setPoints] = useState(0);

  const handleChangePoints = (index, value) => {
    const newArray = [...questionneirs];
    const _questions = { ...newArray[index] };
    _questions.points = value;

    newArray[index] = _questions;

    setQuestionneirs(newArray);
  };
  console.log(questionneirs);
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
            <MDBModalBody>
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
              <MDBRow className="my-3">
                <MDBCol md={4}>
                  <MDBInputGroup textBefore="Grade Level">
                    <select className="form-control"></select>
                  </MDBInputGroup>
                </MDBCol>
                <MDBCol md={4}>
                  <MDBInputGroup textBefore="Strand">
                    <select className="form-control"></select>
                  </MDBInputGroup>
                </MDBCol>
                <MDBCol md={4}>
                  <MDBInputGroup textBefore="Subject">
                    <select className="form-control"></select>
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
                              handleChangePoints(index, e.target.value)
                            }
                            className="border-0 border-bottom form-control"
                          />
                        </td>
                        <td>
                          <MDBBtn
                            size="sm"
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
              <MDBBtn color="transparent" onClick={() => setVisibility(false)}>
                Close
              </MDBBtn>
              <MDBBtn>Start</MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>
  );
}
