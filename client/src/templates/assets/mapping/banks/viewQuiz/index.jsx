import React, { useState } from "react";
import Swal from "sweetalert2";

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
} from "mdb-react-ui-kit";

export default function Modal({ look, setLook, quizs }) {
  const handleView = (data) => {
    const { mcAnswers, question, correctAnswer } = data; // Corrected the variable name to 'correctAnswer'
    const answerText = data && correctAnswer ? correctAnswer : "no-answer";

    const choices = Object.entries(mcAnswers)
      .filter(([key, value]) => value !== "")
      .map(([key, value]) => value && value);

    if (choices) {
      Swal.fire({
        title: "Question",
        html: `
        <div class="mb-3">${question}</div>
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
                    <th>Action</th>
                  </tr>
                </MDBTableHead>
                <MDBTableBody>
                  {quizs.length > 0 &&
                    quizs.map((quiz, index) => (
                      <tr key={index}>
                        <td>{1 + index}</td>
                        <td>{handleQuestion(quiz.question)}</td>
                        <td>
                          <MDBBtn
                            type="button"
                            onClick={() => handleView(quiz)}
                          >
                            <MDBIcon fas icon="eye" />
                          </MDBBtn>
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
