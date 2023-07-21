import React from "react";
import { MDBTable, MDBTableHead, MDBTableBody, MDBBtn } from "mdb-react-ui-kit";
import { useSelector } from "react-redux";
import defaultImage from "../../../../assets/images/default.jpg";
import { ENDPOINT } from "../../../../components/utilities";
import Swal from "sweetalert2";
import {
  paginationHandler,
  nameFormatter,
} from "../../../../components/utilities";

export function TBLarticles({ articles, page }) {
  const { theme, maxPage } = useSelector(({ auth }) => auth);

  const handleView = (data) => {
    const { title, message } = data;
    Swal.fire({
      html: `
        <div >
          <h3>${title}</h3>
        </div>
        <h5>Message</h5>
       
      `,
      customClass: {
        container: "swal-container",
        title: "swal-title",
        content: "swal-content",
        confirmButton: "swal-confirm-button",
      },
      iconHtml: `<image  src='${defaultImage}' style="width: 300px; height: 168px" />`,
      level: "hi",
      inputValue: message,
      input: "textarea",
      confirmButtonText: "OK",
    });
  };
  return (
    <MDBTable align="middle" hover responsive color={theme.color}>
      <caption>List of articles</caption>
      <caption className="caption-top">
        Total of <b>{articles?.length}</b> article(s)
      </caption>
      <MDBTableHead>
        <tr>
          <th>#</th>
          <th scope="col">Name </th>
          <th scope="col">Action </th>
        </tr>
      </MDBTableHead>
      <MDBTableBody>
        {articles?.length > 0 ? (
          paginationHandler(articles, page, maxPage).map((article, index) => (
            <tr key={`temperature-${index}`}>
              <td>{1 + index}</td>
              <td>{nameFormatter(article.user?.fullName)}</td>
              <td>
                <MDBBtn onClick={() => handleView(article)}>View</MDBBtn>
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
