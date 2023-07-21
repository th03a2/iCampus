import React from "react";
import { MDBTable, MDBTableHead, MDBTableBody, MDBBtn } from "mdb-react-ui-kit";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";

import {
  paginationHandler,
  nameFormatter,
} from "../../../../components/utilities";

export function TBLbanks({ banks, page }) {
  const { theme, maxPage } = useSelector(({ auth }) => auth);

  const handleView = (data, question) => {
    const answerText = data && data.ans ? data[data.ans] : "no-answer";
    const choices = Object.entries(data)
      .filter(([key]) => key !== "ans")
      .map(([key, value]) => value);

    Swal.fire({
      title: "Question",
      html: `
        <div class="mb-3">${question}</div>
        ${choices
          .map(
            (choice, index) => `
          <div class="form-check mb-2">
            <input class="form-check-input" type="radio" name="answer" id="choice-${index}" value="${index}" ${
              choice === answerText ? "checked disabled" : "disabled"
            }>
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
  };
  return (
    <MDBTable align="middle" hover responsive color={theme.color}>
      <caption>List of banks</caption>
      <caption className="caption-top">
        Total of <b>{banks?.length}</b> bank(s)
      </caption>
      <MDBTableHead>
        <tr>
          <th>#</th>
          <th scope="col">Name </th>
          <th scope="col">Subject </th>
          <th scope="col">Type </th>
          <th>Cluster</th>
          <th>category</th>
          <th scope="col">Action </th>
        </tr>
      </MDBTableHead>
      <MDBTableBody>
        {banks?.length > 0 ? (
          paginationHandler(banks, page, maxPage).map((bank, index) => (
            <tr key={`temperature-${index}`}>
              <td>{1 + index}</td>
              <td>{nameFormatter(bank?.user?.fullName)}</td>
              <td>{bank.subjectId?.name}</td>
              <td>{bank.type === "mc" ? "multiple choices" : bank.type}</td>
              <td>{bank.cluster}</td>
              <td>{bank.category}</td>
              <td>
                <MDBBtn
                  onClick={() => handleView(bank.mcAnswers, bank.question)}
                >
                  View
                </MDBBtn>
              </td>
            </tr>
          ))
        ) : (
          <tr className="text-center">
            <td colSpan={3}>No Staff accounts.</td>
          </tr>
        )}
      </MDBTableBody>
    </MDBTable>
  );
}
