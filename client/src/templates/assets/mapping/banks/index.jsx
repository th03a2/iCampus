import React, { useEffect, useState } from "react";
import {
  MDBTable,
  MDBTableHead,
  MDBTableBody,
  MDBBtn,
  MDBIcon,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBRow,
  MDBCol,
} from "mdb-react-ui-kit";
import { useSelector } from "react-redux";

// import {
//   paginationHandler,
//   nameFormatter,
// } from "../../../../components/utilities";
import Modal from "./viewGradeAssignQuiz";
import { paginationHandler } from "../../../../components/utilities";
import levels from "../../../../fakeDb/json/levels";
import subjects from "../../../../fakeDb/json/subjects";
import Swal from "sweetalert2";
export function TBLbanks({ banks, page }) {
  const { theme, maxPage } = useSelector(({ auth }) => auth);
  const [visibility, setVisibility] = useState(false);
  const [levelAssignQuiz, setLevelAssignQuiz] = useState([]);

  // const handleCard = (data) => {
  //   if (data.cluster === "multiple choice") {
  //     const { mcAnswers, question, correctAnswer } = data;
  //     const answerText = data && correctAnswer ? correctAnswer : "no-answer";
  //     console.log(answerText);

  //     const choices = Object.entries(mcAnswers)
  //       .filter(([key, values]) => values !== "")
  //       .map(([key, value], index) => (
  //         <div className="form-check mb-2" key={index}>
  //           <input
  //             className="form-check-input"
  //             type="radio"
  //             name="answer"
  //             id={`choice-${index}`}
  //             value={index}
  //             disabled
  //             checked={value === answerText} // Check against the value, not 'choice'
  //           />
  //           <label className="form-check-label" htmlFor={`choice-${index}`}>
  //             {String.fromCharCode(65 + index)}. {value}
  //           </label>
  //         </div>
  //       ));
  //     return (
  //       <MDBCol md={3} className="mt-2">
  //         <MDBCard style={{ height: "250px" }}>
  //           <MDBCardBody>
  //             <MDBCardTitle>Question</MDBCardTitle>
  //             <div className="mb-3">
  //               <strong>{question}</strong>
  //             </div>
  //             {choices}
  //           </MDBCardBody>
  //         </MDBCard>
  //       </MDBCol>
  //     );
  //   } else if (data.cluster === "essay") {
  //     return (
  //       <MDBCol md={3} className="mt-2">
  //         <MDBCard style={{ height: "250px" }}>
  //           <MDBCardBody>
  //             <MDBCardTitle>Question</MDBCardTitle>
  //             <div className="mb-3">
  //               <strong>{data.question}</strong>
  //             </div>
  //           </MDBCardBody>
  //         </MDBCard>
  //       </MDBCol>
  //     );
  //   }
  // };

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

  const gradeLevelFormatter = (levelId) => {
    const findLevel = levels.find((level) => level.id === levelId);
    return findLevel.description;
  };

  const subjectFormatter = (subjectId) => {
    const findSubject = subjects.find((subject) => subject.id === subjectId);
    return findSubject?.name;
  };

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
    }
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
            <th scope="col">Grade Level </th>
            <th scope="col">Subject </th>
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
                <td>{gradeLevelFormatter(bank.levelId)}</td>
                <td>{subjectFormatter(bank.subjectId)}</td>
                <td>
                  <MDBBtn onClick={() => handleView(bank)}>
                    <MDBIcon fas icon="eye" />
                  </MDBBtn>
                </td>
              </tr>
            ))
          ) : (
            <tr className="text-center">
              <td colSpan={3}>No Questioneir</td>
            </tr>
          )}
        </MDBTableBody>
      </MDBTable>
      {visibility && (
        <Modal
          visibility={visibility}
          setVisibility={setVisibility}
          levelAssignQuiz={levelAssignQuiz}
        />
      )}
    </MDBContainer>
  );
}
