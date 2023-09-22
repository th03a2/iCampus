import React, { useEffect, useState } from "react";
import {
  MDBTable,
  MDBTableHead,
  MDBTableBody,
  MDBBtn,
  MDBIcon,
  MDBContainer,
  MDBBtnGroup,
  MDBInputGroup,
  MDBRow,
  MDBCol,
  MDBCheckbox,
} from "mdb-react-ui-kit";
import { useSelector } from "react-redux";
import { paginationHandler } from "../../../../components/utilities";
import Swal from "sweetalert2";
export function TBLexams({ banks, page }) {
  const { theme, maxPage } = useSelector(({ auth }) => auth);
  const [getItems, setGetItems] = useState(0);
  const [questionneirs, setQuestionneirs] = useState([]);
  const [pick, setPick] = useState([]);
  const [points, setPoints] = useState(1);

  useEffect(() => {
    setQuestionneirs(banks);
  }, [banks]);

  useEffect(() => {
    if (getItems && getItems <= questionneirs.length) {
      const questionneirReturnToOld = questionneirs.map((data) => {
        // para kung may isPick na siya na attribute tatanggalin yun
        if (data.hasOwnProperty("isPick")) {
          const { isPick, ...withoutPick } = data;
          return withoutPick;
        } else {
          return data;
        }
      });

      const randomQuestions = questionneirReturnToOld
        .slice()
        .sort(() => Math.random() - 0.5)
        .slice(0, getItems);

      const newArray = questionneirReturnToOld.map((question) => {
        const index = randomQuestions.findIndex(
          (data) => data._id === question._id
        );
        if (index > -1) {
          return {
            ...question,
            isPick: true,
            points,
          };
        } else {
          return question;
        }
      });
      setQuestionneirs(newArray);
      setPick(randomQuestions);
    } else {
      setQuestionneirs(banks);
      setPick([]);
    }
  }, [getItems]);
  const handleQuestion = (question) => {
    if (question?.length > 40) {
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

  const handlePick = (question) => {
    if (points) {
      const indexQuestioner = questionneirs.findIndex(
        ({ _id }) => _id === question._id
      );
      const index = pick.findIndex(({ _id }) => _id === question._id);
      if (index > -1) {
        const newArray = [...pick];
        const newQuestionneir = [...questionneirs];
        newArray.splice(index, 1);
        newQuestionneir[indexQuestioner] = {
          ...newQuestionneir[indexQuestioner],
          isPick: false,
        };
        setQuestionneirs(newQuestionneir);
        setPick(newArray);
      } else {
        const newQuestionneir = [...questionneirs];
        const newArray = [...pick];
        newArray.push(question);
        newQuestionneir[indexQuestioner] = {
          ...newQuestionneir[indexQuestioner],
          isPick: true,
        };
        setQuestionneirs(newQuestionneir);
        setPick(newArray);
      }
    } else {
      alert("wala");
    }
  };

  return (
    <MDBContainer
      style={{ maxHeight: "500px", overflowY: "auto", height: "500px" }}
    >
      <MDBRow className="my-2">
        <MDBCol md={4}>
          <MDBInputGroup textBefore="how many items you want  to get">
            <input
              className="form-control"
              type="number"
              max={questionneirs.length}
              min={0}
              value={getItems > questionneirs.length ? 0 : getItems}
              onChange={(e) => setGetItems(Number(e.target.value))}
            />
          </MDBInputGroup>
        </MDBCol>
        <MDBCol md={4}>
          <MDBInputGroup textBefore="how many points per answer">
            <input
              className="form-control"
              type="number"
              min={0}
              value={points}
              onChange={(e) => setPoints(Number(e.target.value))}
            />
          </MDBInputGroup>
        </MDBCol>
        <MDBCol md={4} className="text-center">
          <h5>
            Quizzes:
            <strong>
              {" " +
                pick.length +
                "/" +
                ` ${getItems > questionneirs.length ? "0" : getItems}`}
            </strong>
          </h5>
        </MDBCol>
      </MDBRow>
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
          {questionneirs?.length > 0 ? (
            paginationHandler(questionneirs, page, maxPage).map(
              (questionneir, index) => (
                <tr key={`bank-${index}`}>
                  <tr className="text-center">
                    <MDBCheckbox
                      onClick={() => handlePick(questionneir)}
                      checked={questionneir.isPick ? true : false}
                      color="danger"
                    />
                  </tr>
                  <td>{handleQuestion(questionneir.question)}</td>
                  <td>{questionneir.cluster}</td>
                  <td>
                    <MDBBtnGroup>
                      <MDBBtn
                        color="warning"
                        onClick={() => handleView(questionneir)}
                        size="sm"
                        type="button"
                      >
                        <MDBIcon fas icon="eye" />
                      </MDBBtn>
                    </MDBBtnGroup>
                  </td>
                </tr>
              )
            )
          ) : (
            <tr className="text-center">
              <td colSpan={3}>No Items</td>
            </tr>
          )}
        </MDBTableBody>
      </MDBTable>
    </MDBContainer>
  );
}
