import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import {
  MDBTable,
  MDBTableHead,
  MDBTableBody,
  MDBBtn,
  MDBIcon,
  MDBContainer,
  MDBBtnGroup,
} from "mdb-react-ui-kit";
import { useSelector } from "react-redux";
import { paginationHandler } from "../../../../components/utilities";
import Swal from "sweetalert2";
const socket = io("http://localhost:5000");
export function TBLpick({ page }) {
  const [items, setItems] = useState([]);
  const { theme, maxPage, auth } = useSelector(({ auth }) => auth);

  useEffect(() => {
    socket.on("send_quiz", (data) => {
      if (data) {
        const newArray = [...items];
        newArray.push(data);
        setItems(newArray);
      }
    });
  }, [items]);

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
      return question;
    }
  };

  const handleView = (data) => {
    if (data.cluster === "multiple choice") {
      const { mcAnswers, question, correctAnswer } = data;
      const answerText = data && correctAnswer ? correctAnswer : "no-answer";

      const choices = mcAnswers.map((data) => data.value);

      if (choices) {
        Swal.fire({
          title: "",
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
          icon: "question",
          confirmButtonText: "OK",
        });
      }
    } else if (data.cluster === "identification") {
      Swal.fire({
        title: "",
        html: `
          <div class="mb-3"><strong>${data.question}</strong></div>
          <div>Correct Answer<input type="text" readonly="readonly" class="form-control bg-transparent"value="${data.correctAnswer}"/></div>
        `,
        customClass: {
          container: "swal-container",
          title: "swal-title",
          confirmButton: "swal-confirm-button",
        },
        icon: "question",
        confirmButtonText: "OK",
      });
    } else if (data.cluster === "essay") {
      Swal.fire({
        title: "",
        html: `
          <div class="mb-3"><strong>${data.question}</strong></div>
        `,
        customClass: {
          container: "swal-container",
          title: "swal-title",
          confirmButton: "swal-confirm-button",
        },
        icon: "question",
        confirmButtonText: "OK",
      });
    } else if (data.cluster === "enumeration") {
      const tableHTML = `
      <table class="table table-bordered">
        <thead class="thead-dark">
          <tr>
            <th>#</th>
            <th>Correct Answer</th>
          </tr>
        </thead>
        <tbody>
          ${data.enumerationAns
            .map(
              (item, index) => `
                <tr>
                  <td>${index + 1}</td>
                  <td class="text-nowrap">${item.value}</td>
                </tr>
              `
            )
            .join("")}
        </tbody>
      </table>
    `;

      Swal.fire({
        title: "",
        html: `
        <div class="mb-3"><strong>${data.question}</strong></div>
        <div class="table-responsive" style="max-height: 200px; overflow-y: auto;">
          ${tableHTML}
        </div>
      `,
        customClass: {
          container: "swal-container",
          title: "swal-title",
          confirmButton: "btn btn-primary",
          popup: "swal-lg",
        },
        icon: "question",
        confirmButtonText: "OK",
      });
    } else {
      const tableHTML = `
      <table class="table table-bordered">
        <thead class="thead-dark">
          <tr>
            <th>#</th>
            <th>Questions</th>
            <th>Answer</th>
          </tr>
        </thead>
        <tbody>
          ${data.matchingQuestions
            .map(
              (item, index) => `
                <tr>
                  <td>${index + 1}</td>
                  <td class="text-nowrap">${item.value}</td>
                  <td class="text-nowrap">${
                    data.matchingAnswers[index]?.value
                  }</td>
                </tr>
              `
            )
            .join("")}
        </tbody>
      </table>
    `;

      Swal.fire({
        title: "",
        html: `
        <div class="mb-3"><strong>${data.question}</strong></div>
        <div class="table-responsive" style="max-height: 200px; overflow-y: auto;">
          ${tableHTML}
        </div>
      `,
        customClass: {
          container: "swal-container",
          title: "swal-title",
          confirmButton: "btn btn-primary",
          popup: "swal-lg",
        },
        icon: "question",
        confirmButtonText: "OK",
      });
    }
  };

  const handleStart = () => {
    alert("Game!");
  };

  return (
    <MDBContainer
      style={{ maxHeight: "500px", overflowY: "auto", height: "500px" }}
    >
      <h4 className="text-center mt-3">
        <strong>Your Quizs</strong>
      </h4>
      <MDBTable align="middle" hover responsive color={theme.color}>
        <MDBTableHead>
          <tr>
            <th>#</th>
            <th scope="col">Question </th>
            <th scope="col">Cluster </th>
            <th scope="col">Action </th>
          </tr>
        </MDBTableHead>
        <MDBTableBody>
          {items?.length > 0 ? (
            paginationHandler(items, page, maxPage).map((bank, index) => (
              <tr key={`bank-${index}`}>
                <td>{1 + index}</td>
                <td>{handleQuestion(bank.question)}</td>
                <td>{bank.cluster}</td>
                <td>
                  <MDBBtnGroup>
                    <MDBBtn
                      color="danger"
                      onClick={() => handleView(bank)}
                      size="sm"
                    >
                      <MDBIcon fas icon="trash" />
                    </MDBBtn>
                    <MDBBtn
                      color="warning"
                      onClick={() => handleView(bank)}
                      size="sm"
                    >
                      <MDBIcon fas icon="eye" />
                    </MDBBtn>
                  </MDBBtnGroup>
                </td>
              </tr>
            ))
          ) : (
            <tr className="text-center">
              <td colSpan={3}>No Items</td>
            </tr>
          )}
        </MDBTableBody>
      </MDBTable>

      <MDBContainer className="d-flex justify-content-end my-5 fixed-bottom">
        <MDBBtn type="button" onClick={handleStart}>
          START
        </MDBBtn>
      </MDBContainer>
    </MDBContainer>
  );
}
