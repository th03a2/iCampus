import React, { useState } from "react";
import {
  MDBTable,
  MDBTableHead,
  MDBTableBody,
  MDBBtn,
  MDBIcon,
  MDBContainer,
} from "mdb-react-ui-kit";
import { useSelector } from "react-redux";

// import {
//   paginationHandler,
//   nameFormatter,
// } from "../../../../components/utilities";
import Modal from "./viewGradeAssignQuiz";
export function TBLbanks({ banks, page }) {
  const { theme, maxPage } = useSelector(({ auth }) => auth);
  const [visibility, setVisibility] = useState(false);
  const [levelAssignQuiz, setLevelAssignQuiz] = useState([]);

  const handleUpdate = () => {};
  const handleDelete = () => {};

  const handleView = (data) => {
    setLevelAssignQuiz(data);
    setVisibility(true);
  };
  return (
    <MDBContainer>
      {" "}
      <MDBTable align="middle" hover responsive color={theme.color}>
        <caption>List of banks</caption>
        <caption className="caption-top">
          Total of <b>{banks?.length}</b> bank(s)
        </caption>
        <MDBTableHead>
          <tr>
            <th>#</th>
            <th scope="col">Name </th>
            {/* <th scope="col">Subject </th>
     <th scope="col">Type </th>
     <th>Cluster</th>
     <th>category</th> */}
            <th scope="col">Action </th>
          </tr>
        </MDBTableHead>
        <MDBTableBody>
          {banks ? (
            Object.entries(banks).map(([key, value], index) => (
              <tr>
                <td>{1 + index}</td>
                <td>{key}</td>
                <td>
                  <MDBBtn type="button" onClick={() => handleView(value)}>
                    <MDBIcon fas icon="eye" />
                  </MDBBtn>
                </td>
              </tr>
            ))
          ) : (
            // paginationHandler(banks, page, maxPage).map((bank, index) => (
            //   <tr key={`temperature-${index}`}>
            //     <td>{1 + index}</td>
            //     <td>{nameFormatter(bank?.user?.fullName)}</td>
            //     <td>{bank.subjectId?.name}</td>
            //     <td>{bank.type === "mc" ? "multiple choices" : bank.type}</td>
            //     <td>{bank.cluster}</td>
            //     <td>{bank.category}</td>
            //     <td>
            //       <MDBBtnGroup>
            //         <MDBBtn color="danger" onClick={() => handleDelete(bank._id)}>
            //           <MDBIcon fas icon="trash" />
            //         </MDBBtn>
            //         <MDBBtn onClick={() => handleUpdate(bank)}>
            //           <MDBIcon fas icon="pencil-alt" />
            //         </MDBBtn>
            //       </MDBBtnGroup>
            //       <MDBBtn onClick={() => handleView(bank)} color="warning">
            //         {" "}
            //         <MDBIcon fas icon="eye" />
            //       </MDBBtn>
            //     </td>
            //   </tr>
            // ))
            <tr className="text-center">
              <td colSpan={3}>No Staff accounts.</td>
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
