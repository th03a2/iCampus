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
import {
  // REVERSE,
  SAVE,
} from "../../../../../../redux/slices/assets/procurements";
import ModalForm from "./form";

export default function MachinesModal({ setVisibility, visibility }) {
  const { theme, token, onDuty, auth } = useSelector(({ auth }) => auth),
    { didSave } = useSelector(({ temperatures }) => temperatures),
    [loading, setLoading] = useState(false),
    dispatch = useDispatch();

  const toggleShow = () => setVisibility(!visibility);

  useEffect(() => {
    if (didSave) {
      toggleShow();
      setLoading(false);
      document.getElementById("registerMachine").reset();
      // dispatch(REVERSE());
    }
  }, [didSave]);

  const handleSubmit = e => {
    e.preventDefault();
    setLoading(true);

    const { celsius } = e.target;

    const form = {
      celsius: celsius.value,
      userId: auth._id,
      branchId: onDuty._id,
      // refTemp: refTemp.value,
    };
    dispatch(SAVE({ form, token }));
  };

  return (
    <MDBModal tabIndex="-1" show={visibility} setShow={setVisibility}>
      <MDBModalDialog centered size="lg" scrollable>
        <MDBModalContent className={`${theme.bg} ${theme.text}`}>
          <MDBModalHeader>
            <MDBModalTitle>Create Machine</MDBModalTitle>
            <MDBBtn className="btn-close" color="none" onClick={toggleShow} />
          </MDBModalHeader>
          <form onSubmit={handleSubmit} autoComplete="off" id="createMachine">
            <MDBModalBody>
              <ModalForm />
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
