import React from "react";
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
import ModalForm from "./form";
import {
  SETVISIBILITY,
  UPDATE,
  SAVE,
} from "../../../../redux/slices/task/preferences";

export function Modal() {
  const { theme, token, onDuty, auth } = useSelector(({ auth }) => auth),
    { visibility, model, isLoading } = useSelector(
      ({ preferences }) => preferences
    ),
    dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (model._id) {
      dispatch(UPDATE({ data: { ...model }, id: model._id, token }));
    } else {
      dispatch(
        SAVE({
          data: { ...model, branchId: onDuty._id, userId: auth._id },
          token,
        })
      );
    }
  };

  return (
    <MDBModal tabIndex="-1" show={visibility}>
      <MDBModalDialog centered size="lg" scrollable>
        <MDBModalContent className={`${theme.bg} ${theme.text}`}>
          <MDBModalHeader>
            <MDBModalTitle>
              {model._id ? "Update" : "Create"} Preference
            </MDBModalTitle>
            <MDBBtn
              className="btn-close"
              color="none"
              onClick={() => dispatch(SETVISIBILITY(false))}
            />
          </MDBModalHeader>
          <form onSubmit={handleSubmit} autoComplete="off">
            <MDBModalBody>
              <ModalForm />
            </MDBModalBody>
            <MDBModalFooter className="py-0">
              <MDBBtn
                type="button"
                className="shadow-0"
                color={theme.color}
                onClick={() => dispatch(SETVISIBILITY(false))}
                disabled={isLoading}
              >
                Close
              </MDBBtn>
              <MDBBtn type="submit" disabled={isLoading}>
                {isLoading ? <MDBSpinner size="sm" grow /> : "Submit"}
              </MDBBtn>
            </MDBModalFooter>
          </form>
        </MDBModalContent>
      </MDBModalDialog>
    </MDBModal>
  );
}
