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
  UPDATE,
} from "./../../../../../../redux/slices/assets/procurements";
import ModalForm from "./form";

export default function TemperaturesUpdate({
  data,
  setVisibility,
  visibility,
}) {
  const { theme, token, onDuty, auth } = useSelector(({ auth }) => auth),
    { didUpdate } = useSelector(({ temperatures }) => temperatures),
    [loading, setLoading] = useState(false),
    dispatch = useDispatch();

  const toggleShow = () => setVisibility(!visibility);

  useEffect(() => {
    if (didUpdate && visibility) {
      setLoading(false);
      // dispatch(REVERSE());
      toggleShow();
    }
  }, [didUpdate, visibility, toggleShow]);

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

    dispatch(UPDATE({ data: form, token, id: data._id }));
  };

  return (
    <MDBModal tabIndex="-1" show={visibility} setShow={setVisibility}>
      <MDBModalDialog centered size="lg" scrollable>
        <MDBModalContent className={`${theme.bg} ${theme.text}`}>
          <MDBModalHeader>
            <MDBModalTitle>Register a Temperature</MDBModalTitle>
            <MDBBtn className="btn-close" color="none" onClick={toggleShow} />
          </MDBModalHeader>
          <form
            onSubmit={handleSubmit}
            autoComplete="off"
            id={`updateTemperature-${data._id}`}
          >
            <MDBModalBody>
              <ModalForm data={data} />
            </MDBModalBody>
            <MDBModalFooter className="py-0">
              <MDBBtn
                type="button"
                className="shadow-0"
                color={theme.color}
                onClick={() => {
                  toggleShow();
                  document
                    .getElementById(`updateTemperature-${data._id}`)
                    .reset();
                }}
                disabled={loading}
              >
                Close
              </MDBBtn>
              <MDBBtn type="submit" disabled={loading} color="info">
                {loading ? <MDBSpinner size="sm" grow /> : "Update"}
              </MDBBtn>
            </MDBModalFooter>
          </form>
        </MDBModalContent>
      </MDBModalDialog>
    </MDBModal>
  );
}
