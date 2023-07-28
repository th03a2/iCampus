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
  const { theme, token, auth, onDuty } = useSelector(({ auth }) => auth);
  const [form, setForm] = useState({
    name: "",
    accumulate: "",
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
          entity: "assets/Sections",
          data: {
            ...form,
            user: auth._id,
          },
          id: form._id,
          token,
        })
      );
    } else {
      dispatch(
        SAVE({
          entity: "assets/Sections",
          data: {
            ...form,
            user: auth._id,
          },
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
      name: "",
      accumulate: "",
    });
  };

  return (
    <MDBModal show={visibility} setShow={setVisibility} staticBackdrop>
      <MDBModalDialog size="lg">
        <MDBModalContent className={`${theme.bg} ${theme.text}`}>
          <MDBModalHeader>
            <MDBModalTitle>
              <MDBIcon
                fas
                icon="chalkboard-teacher"
                color="warning"
                style={{ paddingRight: "20px" }}
              />{" "}
              Grade Level
            </MDBModalTitle>
            <MDBBtn className="btn-close" color="none" onClick={handleClose} />
          </MDBModalHeader>
          <MDBModalBody
            className={`${theme.bg} ${theme.text} gui-viewer`}
          ></MDBModalBody>
        </MDBModalContent>
      </MDBModalDialog>
    </MDBModal>
  );
}
