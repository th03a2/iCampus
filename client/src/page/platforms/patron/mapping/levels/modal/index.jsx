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
import { SAVE, UPDATE } from "../../../../../../redux/slices/query";
import field from "../../../../../../fakeDb/json/subjects";
export default function Modal({ visibility, setVisibility, content }) {
  const { description, subjects, strand } = content,
    [isStrand, setIsStrand] = useState(false),
    { theme } = useSelector(({ auth }) => auth),
    [topic, setTopic] = useState([]),
    [specifications, setSpecifications] = useState("");

  useEffect(() => {
    if (subjects) {
      const filterField = subjects.map((subject) =>
        field.find(({ id }) => id === subject)
      );
      setTopic(filterField);
    } else {
      setIsStrand(true);
    }
  }, [content, field, subjects]);

  const handleClose = () => {
    setVisibility(false);
  };
  const handleSubmit = () => {};

  const handleSearch = () => {
    const findStrand = strand.find(
      (data) => data.specifications === specifications
    );
    console.log(findStrand);
    if (findStrand) {
      const subjects = [...findStrand.subject];

      const filterField = subjects.map((id) =>
        field.find((data) => data.id === id)
      );
      setTopic(filterField);
    } else {
      setTopic([]);
    }
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
              {description}
            </MDBModalTitle>
            <MDBBtn className="btn-close" color="none" onClick={handleClose} />
          </MDBModalHeader>
          <MDBModalBody className={`${theme.bg} ${theme.text} gui-viewer`}>
            {isStrand && (
              <MDBRow>
                <MDBCol md={6}>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <MDBInput
                      label="Specifications"
                      value={specifications}
                      type="text"
                      onChange={(e) =>
                        setSpecifications(e.target.value.toUpperCase())
                      }
                    />
                    <MDBBtn onClick={handleSearch}>Search</MDBBtn>
                  </div>
                </MDBCol>
              </MDBRow>
            )}
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
