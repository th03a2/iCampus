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
  MDBContainer,
  MDBRow,
  MDBCol,
} from "mdb-react-ui-kit";
import { useSelector, useDispatch } from "react-redux";
// import { Statement } from "../../../../../../fakeDb";
import { SAVE, UPDATE } from "../../../../../../redux/slices/query";

export default function Modal({
  visibility,
  setVisibility,
  update,
  setIsUpdate,
  isUpdate,
}) {
  const { theme, token } = useSelector(({ auth }) => auth);
  const [form, setForm] = useState({
    type: "",
    cluster: "",
    category: "",
    message: "",
    question: "",
    subjectId: "",
    mcAnswers: {},
  });
  const dispatch = useDispatch();

  useEffect(() => {
    if (isUpdate) {
      setForm(update);
    }
  }, [isUpdate]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isUpdate) {
      dispatch(
        UPDATE({
          entity: "assets/levels",
          data: form,
          id: form._id,
          token,
        })
      );
    } else {
      dispatch(
        SAVE({
          entity: "assets/levels",
          data: form,
          token,
        })
      );
    }
    setVisibility(false);
  };

  const handleClose = () => {
    setVisibility(false);
    setIsUpdate(false);
    setForm({
      type: "",
      cluster: "",
      category: "",
      message: "",
      question: "",
      subjectId: "",
      mcAnswers: {},
    });
  };

  return (
    <MDBModal show={visibility} setShow={setVisibility} staticBackdrop>
      <MDBModalDialog size="xl">
        <MDBModalContent className={`${theme.bg} ${theme.text}`}>
          <MDBModalHeader>
            <MDBModalTitle>
              <MDBIcon
                fas
                icon="user-graduate"
                style={{ width: "20px" }}
                color="warning"
              />{" "}
              Grade Level
            </MDBModalTitle>
            <MDBBtn className="btn-close" color="none" onClick={handleClose} />
          </MDBModalHeader>
          <MDBModalBody className={`${theme.bg} ${theme.text} gui-viewer`}>
            <form onSubmit={handleSubmit}>
              <MDBRow>
                <MDBCol md={4}>
                  <MDBInput
                    type="text"
                    label="Cluster"
                    name="name"
                    value={form.cluster}
                    onChange={handleChange}
                    required
                  />
                </MDBCol>
                <MDBCol md={4}>
                  <MDBInput
                    type="text"
                    label="Level"
                    name="lvl"
                    value={form.lvl}
                    onChange={handleChange}
                    required
                  />
                </MDBCol>
              </MDBRow>
              <MDBRow className="mt-4">
                <MDBCol md={6}>
                  <MDBInput
                    type="text"
                    label="Stage"
                    name="stage"
                    value={form.stage}
                    onChange={handleChange}
                    required
                  />
                </MDBCol>
                <MDBCol md={6}>
                  <MDBInput
                    type="text"
                    label="Description"
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    required
                  />
                </MDBCol>
              </MDBRow>
              <MDBContainer className="d-flex justify-content-end mt-4">
                <MDBBtn type="submit">{isUpdate ? "Update" : "Submit"}</MDBBtn>
              </MDBContainer>
            </form>
          </MDBModalBody>
        </MDBModalContent>
      </MDBModalDialog>
    </MDBModal>
  );
}
