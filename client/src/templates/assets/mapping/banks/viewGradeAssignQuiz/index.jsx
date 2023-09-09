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
  MDBContainer,
} from "mdb-react-ui-kit";
import levels from "../../../../../fakeDb/json/levels";
import subjects from "../../../../../fakeDb/json/subjects";
import ModalQuiz from "../viewQuiz";
export default function Modal({ visibility, setVisibility, levelAssignQuiz }) {
  const [gradeAssignQuiz, setGradeAssignQuiz] = useState({});
  const [quizs, setQuiz] = useState([]);
  const [look, setLook] = useState(false);

  useEffect(() => {
    const catalog = levelAssignQuiz.reduce((accumulator, currenValue) => {
      const findLevel = levels.find(
        (level) => level.id === Number(currenValue.levelId)
      );

      const subject = subjects.find(
        ({ id }) => id === Number(currenValue.subjectId)
      );
      const _subject = subject.name;
      const gradeLevel = findLevel.description;
      const strand = findLevel.hasOwnProperty("strand")
        ? findLevel.strand.find(
            (data) => data.specifications === currenValue.specification
          )
        : "";

      const key = `${gradeLevel}-${
        strand.specifications || "None"
      }-${_subject}`;

      if (!accumulator[key]) {
        accumulator[key] = [currenValue];
      } else {
        accumulator[key].push(currenValue);
      }

      return accumulator;
    }, {});
    setGradeAssignQuiz(catalog);
  }, [levelAssignQuiz]);

  const handleView = (data) => {
    setLook(true);
    setQuiz(data);
  };

  return (
    <>
      <MDBContainer>
        {" "}
        <MDBModal show={visibility} setShow={setVisibility} tabIndex="-1">
          <MDBModalDialog size="xl">
            <MDBModalContent>
              <MDBModalHeader>
                <MDBModalTitle>Modal title</MDBModalTitle>
                <MDBBtn
                  className="btn-close"
                  color="none"
                  onClick={() => setVisibility(false)}
                ></MDBBtn>
              </MDBModalHeader>
              <MDBModalBody>
                <MDBTable>
                  <MDBTableHead>
                    <tr>
                      <th>#</th>
                      <th>Grade Level</th>
                      <th>Strand</th>
                      <th>Subject</th>
                      <th>Count of create tasks</th>
                      <th>Action</th>
                    </tr>
                  </MDBTableHead>
                  <MDBTableBody>
                    {gradeAssignQuiz
                      ? Object.entries(gradeAssignQuiz).map(
                          ([key, value], index) => {
                            const array = key.split("-"); //gradeLevel,Strand,Subject
                            return (
                              <tr>
                                <td>{1 + index}</td>
                                <td>{array[0]}</td>
                                <td>{array[1]}</td>
                                <td>{array[2]}</td>
                                <td>{value.length}</td>
                                <td>
                                  <MDBBtn onClick={() => handleView(value)}>
                                    <MDBIcon fas icon="eye" />
                                  </MDBBtn>
                                </td>
                              </tr>
                            );
                          }
                        )
                      : ""}
                  </MDBTableBody>
                </MDBTable>
              </MDBModalBody>

              <MDBModalFooter>
                <MDBBtn color="secondary" onClick={() => setVisibility(false)}>
                  Close
                </MDBBtn>
              </MDBModalFooter>
            </MDBModalContent>
          </MDBModalDialog>
        </MDBModal>
        {look && <ModalQuiz look={look} setLook={setLook} quizs={quizs} />}
      </MDBContainer>
    </>
  );
}
