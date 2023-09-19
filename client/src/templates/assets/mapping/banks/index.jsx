import React, { useEffect, useState } from "react";
import {
  MDBTable,
  MDBTableHead,
  MDBTableBody,
  MDBBtn,
  MDBIcon,
  MDBContainer,
  MDBBtnGroup,
} from "mdb-react-ui-kit";
import { useDispatch, useSelector } from "react-redux";
import { DESTROY } from "../../../../redux/slices/assets/banks";
import Modal from "./viewGradeAssignQuiz";
import { paginationHandler } from "../../../../components/utilities";
import Swal from "sweetalert2";
export function TBLbanks({
  banks,
  page,
  setVisibility,
  setIsUpdate,
  setUpdateBank,
}) {
  const { theme, maxPage, auth, token } = useSelector(({ auth }) => auth);
  const [levelAssignQuiz, setLevelAssignQuiz] = useState([]),
    dispatch = useDispatch();

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
    }
  };

  const handleDelete = (data) => {
    if (auth._id === data.user._id) {
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
          dispatch(DESTROY({ id: data._id, token }));
        }
      });
    } else {
      Swal.fire({
        title: "Failed!",
        text: "You are not the author of  this question!",
        icon: "warning",
        showCancelButton: false,
        confirmButtonColor: "#3085d6",
      });
    }
  };

  const handleUpdate = (bank) => {
    setVisibility(true);
    setIsUpdate(true);
    setUpdateBank(bank);
  };
  return (
    <MDBContainer>
      {/* <MDBRow>
        {banks?.length > 0 ? (
          paginationHandler(banks, page, maxPage).map((bank, index) =>
            handleCard(bank)
          )
        ) : (
          <tr className="text-center">
            <td colSpan={3}>No Staff accounts.</td>
          </tr>
        )}
      </MDBRow> */}
      <MDBTable align="middle" hover responsive color={theme.color}>
        <caption>List of banks</caption>
        <caption className="caption-top">
          Total of <b>{banks?.length}</b> bank(s)
        </caption>
        <MDBTableHead>
          <tr>
            <th>#</th>
            <th scope="col">Question </th>
            <th scope="col">Cluster </th>
            <th scope="col">Action </th>
          </tr>
        </MDBTableHead>
        <MDBTableBody>
          {banks?.length > 0 ? (
            paginationHandler(banks, page, maxPage).map((bank, index) => (
              <tr key={`bank-${index}`}>
                <td>{1 + index}</td>
                <td>{handleQuestion(bank.question)}</td>
                <td>{bank.cluster}</td>
                <td>
                  <MDBBtnGroup>
                    <MDBBtn color="warning" onClick={() => handleView(bank)}>
                      <MDBIcon fas icon="eye" />
                    </MDBBtn>
                    {auth._id === bank.user._id && (
                      <>
                        <MDBBtn
                          color="primary"
                          onClick={() => handleUpdate(bank)}
                        >
                          <MDBIcon fas icon="pencil-alt" />
                        </MDBBtn>
                        <MDBBtn
                          color="danger"
                          onClick={() => handleDelete(bank)}
                        >
                          <MDBIcon fas icon="trash" />
                        </MDBBtn>
                      </>
                    )}
                  </MDBBtnGroup>
                </td>
              </tr>
            ))
          ) : (
            <tr className="text-center">
              <td colSpan={3}>No Questionnaire</td>
            </tr>
          )}
        </MDBTableBody>
      </MDBTable>
      <Modal levelAssignQuiz={levelAssignQuiz} />
    </MDBContainer>
  );
}
