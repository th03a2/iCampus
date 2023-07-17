import React, { useState } from "react";
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
import { SAVE } from "../../../../../../redux/slices/query";
import ModalForm from "./form";

export default function PhysiciansModal({
  affiliated,
  setVisibility,
  visibility,
}) {
  const { theme, token, onDuty } = useSelector(({ auth }) => auth),
    [loading, setLoading] = useState(false),
    dispatch = useDispatch();

  const toggleShow = () => setVisibility(!visibility);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const { user } = e.target;

    const form = {
      branch: onDuty._id,
      user: user.value,
      designation: 25,
      status: "active",
    };

    dispatch(SAVE({ entity: "assets/persons/physicians", form, token }));
  };

  return (
    <MDBModal tabIndex="-1" show={visibility} setShow={setVisibility}>
      <MDBModalDialog centered size="lg" scrollable>
        <MDBModalContent className={`${theme.bg} ${theme.text}`}>
          <MDBModalHeader>
            <MDBModalTitle>Tag Physicians</MDBModalTitle>
            <MDBBtn className="btn-close" color="none" onClick={toggleShow} />
          </MDBModalHeader>
          <form onSubmit={handleSubmit} autoComplete="off" id="updatePhysician">
            <MDBModalBody>
              {/* <ModalForm affiliated={affiliated} /> */}
            </MDBModalBody>
            <MDBModalFooter className="py-0">
              <MDBBtn
                type="button"
                className="shadow-0"
                color={theme.color}
                onClick={() => {
                  toggleShow();
                  document.getElementById("updatePhysician").reset();
                }}
                disabled={loading}
              >
                Close
              </MDBBtn>
              <MDBBtn type="submit" disabled={loading}>
                {loading ? <MDBSpinner size="sm" grow /> : "Submit"}
              </MDBBtn>
            </MDBModalFooter>
          </form>
        </MDBModalContent>
      </MDBModalDialog>
    </MDBModal>
  );
}
