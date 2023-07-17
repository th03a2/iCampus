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
// import {
//   // REVERSE,
//   SAVE,
//   UPDATE,
// } from "./../../../../../../redux/slices/assets/branches";
import ModalForm from "./form";

export default function StaffModal({
  setVisibility,
  visibility,
  users,
  staffList,
}) {
  const { theme } = useSelector(({ auth }) => auth),
    [loading, setLoading] = useState(false),
    dispatch = useDispatch();

  const toggleShow = () => setVisibility(!visibility);

  const handleSubmit = e => {
    e.preventDefault();

    const { user_id, designation } = e.target;

    const _staff = { ...staffList, [designation.value]: user_id.value };
    // dispatch(
    //   UPDATE({
    //     id:onDuty._id,
    //     token,
    //     data: {
    //       staff: _staff,
    //     },
    //   })
    // );
  };

  return (
    <MDBModal tabIndex="-1" show={visibility} setShow={setVisibility}>
      <MDBModalDialog centered size="lg" scrollable>
        <MDBModalContent className={`${theme.bg} ${theme.text}`}>
          <MDBModalHeader>
            <MDBModalTitle>Add Staff</MDBModalTitle>
            <MDBBtn className="btn-close" color="none" onClick={toggleShow} />
          </MDBModalHeader>
          <form onSubmit={handleSubmit} autoComplete="off" id="createMachine">
            <MDBModalBody>
              <ModalForm users={users} />
            </MDBModalBody>
            <MDBModalFooter className="py-0">
              <MDBBtn
                type="button"
                className="shadow-0"
                color={theme.color}
                onClick={() => {
                  toggleShow();
                  document.getElementById("createMachine").reset();
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
