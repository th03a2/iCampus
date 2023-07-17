import React, { useState, useEffect } from "react";
import {
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
  MDBSpinner,
} from "mdb-react-ui-kit";
import { useDispatch, useSelector } from "react-redux";
import { SAVE, UPDATE } from "../../../../../../redux/slices/query";
import ModalForm from "./form";

export default function StaffModal({ model, setVisibility, visibility }) {
  const { theme, token, onDuty } = useSelector(({ auth }) => auth),
    [loading, setLoading] = useState(false),
    [title, setTitle] = useState("Create"),
    dispatch = useDispatch();

  useEffect(() => {
    model?._id && setTitle("Update");
  }, [model]);

  const toggleShow = () => setVisibility(!visibility);

  const handleSubmit = e => {
    e.preventDefault();
    const { user, department, section } = e.target;

    const data = {
      branch: onDuty._id,
      user: user.value,
      department: department.value,
      section: section.value,
    };
    if (model._id) {
      dispatch(
        UPDATE({
          entity: "assets/persons/heads",
          data,
          token,
          id: model._id,
        })
      );
    } else {
      dispatch(SAVE({ entity: "assets/persons/heads", data, token }));
    }
    toggleShow();
  };

  return (
    <MDBModal tabIndex="-1" show={visibility} setShow={setVisibility}>
      <MDBModalDialog centered size="lg" scrollable>
        <MDBModalContent className={`${theme.bg} ${theme.text}`}>
          <MDBModalHeader>
            <MDBModalTitle>Tag Staff</MDBModalTitle>
            <MDBBtn className="btn-close" color="none" onClick={toggleShow} />
          </MDBModalHeader>
          <form onSubmit={handleSubmit} autoComplete="off" id="tagPersonnel">
            <MDBModalBody>
              <ModalForm model={model} />
            </MDBModalBody>
            <MDBModalFooter className="py-0">
              <MDBBtn
                type="button"
                className="shadow-0"
                color={theme.color}
                onClick={() => {
                  toggleShow();
                  document.getElementById("tagPersonnel").reset();
                }}
                disabled={loading}
              >
                Close
              </MDBBtn>
              <MDBBtn type="submit" disabled={loading}>
                {loading ? <MDBSpinner size="sm" grow /> : title}
              </MDBBtn>
            </MDBModalFooter>
          </form>
        </MDBModalContent>
      </MDBModalDialog>
    </MDBModal>
  );
}
