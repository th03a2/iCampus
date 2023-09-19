import React from "react";
import Swal from "sweetalert2";
import { DESTROY } from "../../../../../redux/slices/assets/banks";
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
  MDBTableHead,
  MDBTableBody,
  MDBIcon,
  MDBBtnGroup,
} from "mdb-react-ui-kit";
import { useSelector, useDispatch } from "react-redux";

export default function Modal({ look, setLook, quizs }) {
  const { token } = useSelector(({ auth }) => auth);
  const dispatch = useDispatch();
  const handleView = (data) => {
    if (data.cluster === "multiple choice") {
      const { mcAnswers, question, correctAnswer } = data;
      const answerText = data && correctAnswer ? correctAnswer : "no-answer";

      const choices = Object.entries(mcAnswers)
        .filter(([key, value]) => value !== "")
        .map(([key, value]) => value && value);

      if (choices) {
        Swal.fire({
          title: "Question",
          html: `
            <div class="mb-3"><strong>${question}</strong></div>
            ${choices
              .map(
                (choice, index) => `
                  <div class="form-check mb-2">
                    <input class="form-check-input" type="radio" name="answer"  id="choice-${index}" value="${index}" ${
                  choice === answerText ? "checked" : "" // Set 'checked' if choice matches the correct answer
                } disabled>
                    <label class="form-check-label" for="choice-${index}">
                      ${String.fromCharCode(65 + index)}. ${choice}
                    </label>
                  </div>
                `
              )
              .join("")}
          `,
          customClass: {
            container: "swal-container",
            title: "swal-title",
            confirmButton: "swal-confirm-button",
          },
          icon: "info",
          confirmButtonText: "OK",
        });
      }
    } else if (data.cluster === "identification") {
      Swal.fire({
        title: "Question",
        html: `
          <div class="mb-3"><strong>${data.question}</strong></div>
          <div>Correct Answer<input type="text" readonly="readonly" class="form-control"value="${data.correctAnswer}"/></div>
        `,
        customClass: {
          container: "swal-container",
          title: "swal-title",
          confirmButton: "swal-confirm-button",
        },
        icon: "info",
        confirmButtonText: "OK",
      });
    } else if (data.cluster === "essay") {
      Swal.fire({
        title: "Question",
        html: `
          <div class="mb-3"><strong>${data.question}</strong></div>
        `,
        customClass: {
          container: "swal-container",
          title: "swal-title",
          confirmButton: "swal-confirm-button",
        },
        icon: "info",
        confirmButtonText: "OK",
      });
    } else if (data.cluster === "enumeration") {
      const tableHTML = `
        <table class="table">
          <thead>
            <tr>
              <th>#</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            ${data.enumerationAns
              .map(
                (item, index) => `
              <tr>
                <td>${index + 1}</td>
                <td>${item.value}</td>
              </tr>
            `
              )
              .join("")}
          </tbody>
        </table>
     `;
      Swal.fire({
        title: "Question",
        html: `
          <div class="mb-3"><strong>${data.question}</strong></div>
          <div>${tableHTML}</div>
        `,
        customClass: {
          container: "swal-container",
          title: "swal-title",
          confirmButton: "swal-confirm-button",
        },
        icon: "info",
        confirmButtonText: "OK",
      });
    }
  };

  const handleQuestion = (question) => {
    if (question.length > 40) {
      const messages = question.split(" ");
      var updateMessages = " ";
      for (const index in messages) {
        if (index < 6) {
          updateMessages += " " + messages[index];
        }
      }
      return updateMessages + "...";
    } else {
      return question + ".";
    }
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(DESTROY({ id, token }));
      }
    });
  };
  return (
    <>
      <MDBModal show={look} setShow={setLook} tabIndex="-1">
        <MDBModalDialog size="lg">
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>Modal title</MDBModalTitle>
              <MDBBtn
                className="btn-close"
                color="none"
                onClick={() => setLook(false)}
              ></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>
              <MDBTable>
                <MDBTableHead>
                  <tr>
                    <th>#</th>
                    <th>Question</th>
                    <th>Cluster</th>
                    <th>Action</th>
                  </tr>
                </MDBTableHead>
                <MDBTableBody>
                  {quizs.length > 0 &&
                    quizs.map((quiz, index) => (
                      <tr key={index}>
                        <td>{1 + index}</td>
                        <td>{handleQuestion(quiz.question)}</td>
                        <td>{quiz.cluster}</td>
                        <td>
                          <MDBBtnGroup>
                            <MDBBtn
                              type="button"
                              onClick={() => handleView(quiz)}
                            >
                              <MDBIcon fas icon="eye" />
                            </MDBBtn>
                            <MDBBtn
                              type="button"
                              color="danger"
                              onClick={() => handleDelete(quiz._id)}
                            >
                              <MDBIcon fas icon="trash" />
                            </MDBBtn>
                          </MDBBtnGroup>
                        </td>
                      </tr>
                    ))}
                </MDBTableBody>
              </MDBTable>
            </MDBModalBody>

            <MDBModalFooter>
              <MDBBtn color="secondary" onClick={() => setLook(false)}>
                Close
              </MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>
  );
}
