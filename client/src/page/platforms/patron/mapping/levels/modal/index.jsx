import React, { useEffect, useState } from "react";
import {
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBInput,
  MDBIcon,
  MDBRow,
  MDBTable,
  MDBTableBody,
  MDBTableHead,
  MDBCol,
} from "mdb-react-ui-kit";
import { useSelector, useDispatch } from "react-redux";
// import { Statement } from "../../../../../../fakeDb";
import field from "../../../../../../fakeDb/json/subjects";
import levels from "../../../../../../fakeDb/json/levels";

export default function Modal({ visibility, setVisibility, content }) {
  // const { description, subjects, strand } = content,
  const { theme } = useSelector(({ auth }) => auth),
    [topic, setTopic] = useState([]);

  useEffect(() => {
    const findLevel = levels.find((level) => level.id === content.levelId);
    const { subjects } = findLevel;

    if (subjects) {
      const newArray = subjects.map((id) =>
        field.find((data) => data.id === id)
      );
      setTopic(newArray);
    } else {
      const findStrand = findLevel.strand?.find(
        (data) => data.specifications === content.specification
      );

      const newArray = [...findStrand.subject];
      const result = newArray.map((id) => field.find((data) => data.id == id));
      setTopic(result);
    }
  }, [content, field]);

  const handleClose = () => {
    setVisibility(false);
  };

  return (
    <MDBModal show={visibility} setShow={setVisibility} staticBackdrop>
      <MDBModalDialog size="lg">
        <MDBModalContent className={`${theme.bg} ${theme.text}`}>
          <MDBModalHeader>
            <MDBModalTitle>
              <MDBIcon
                fas
                icon="user-graduate"
                style={{ width: "20px" }}
                color="warning"
              />{" "}
              {content.name}
            </MDBModalTitle>
            <MDBBtn className="btn-close" color="none" onClick={handleClose} />
          </MDBModalHeader>
          <MDBModalBody className={`${theme.bg} ${theme.text} gui-viewer`}>
            <MDBRow>
              <MDBTable align="middle" hover responsive color={theme.color}>
                <MDBTableHead>
                  <tr>
                    <th>#</th>
                    <th scope="col" colSpan={5}>
                      Name{" "}
                    </th>
                  </tr>
                </MDBTableHead>
                <MDBTableBody>
                  {topic?.length > 0 ? (
                    topic.map((data, index) => (
                      <tr key={`temperature-${index}`}>
                        <td>{1 + index}</td>
                        <td>{data.name}</td>
                      </tr>
                    ))
                  ) : (
                    <tr className="text-center">
                      <td colSpan={3}>No Staff accounts.</td>
                    </tr>
                  )}
                </MDBTableBody>
              </MDBTable>
            </MDBRow>
            {/* <form onSubmit={handleSubmit}></form> */}
          </MDBModalBody>
        </MDBModalContent>
      </MDBModalDialog>
    </MDBModal>
  );
}
