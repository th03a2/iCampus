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
import { SAVE, UPDATE } from "../../../../../redux/slices/query";
import ModalForm from "./form";

export default function MachineModal({ equipment, setVisibility, visibility }) {
  const { theme, token, onDuty } = useSelector(({ auth }) => auth),
    [loading, setLoading] = useState(false),
    [title, setTitle] = useState("Create"),
    dispatch = useDispatch();

  const toggleShow = () => setVisibility(!visibility);

  const handleSubmit = e => {
    e.preventDefault();
    const { user, department } = e.target;

    const data = {
      branch: onDuty._id,
      user: user.value,
      department: department.value,
    };
    dispatch(UPDATE({ entity: "users/heads", data, token, id: equipment._id }));
    toggleShow();
  };

  return (
    <MDBModal tabIndex="-1" show={visibility} setShow={setVisibility}>
      <MDBModalDialog centered size="lg" scrollable>
        <MDBModalContent className={`${theme.bg} ${theme.text}`}>
          <MDBModalHeader>
            <MDBModalTitle>Update Machine</MDBModalTitle>
            <MDBBtn className="btn-close" color="none" onClick={toggleShow} />
          </MDBModalHeader>
          <form onSubmit={handleSubmit} autoComplete="off" id="updateMachine">
            <MDBModalBody>
              <ModalForm equipment={equipment} />
            </MDBModalBody>
            <MDBModalFooter className="py-0">
              <MDBBtn
                type="button"
                className="shadow-0"
                color={theme.color}
                onClick={() => {
                  toggleShow();
                  document.getElementById("updateMachine").reset();
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
