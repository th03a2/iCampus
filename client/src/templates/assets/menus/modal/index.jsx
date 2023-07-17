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
import {
  SETVISIBILITY,
  SAVE,
  UPDATE,
} from "../../../../redux/slices/commerce/menus";
import ModalForm from "./form";

export function MenuModal() {
  const { theme, token } = useSelector(({ auth }) => auth),
    { visibility, model } = useSelector(({ menus }) => menus),
    [loading, setLoading] = useState(false),
    dispatch = useDispatch();

  const handleSubmit = e => {
    e.preventDefault();
    setLoading(true);
    if (model._id) {
      dispatch(UPDATE({ data: model, id: model._id, token }));
    } else {
      dispatch(SAVE({ data: model, token }));
    }

    dispatch(SETVISIBILITY(false));
  };

  return (
    <MDBModal tabIndex="-1" show={visibility}>
      <MDBModalDialog centered size="lg" scrollable>
        <MDBModalContent className={`${theme.bg} ${theme.text}`}>
          <MDBModalHeader>
            <MDBModalTitle>
              {model._id ? "Update" : "Create"} Menu
            </MDBModalTitle>
            <MDBBtn
              className="btn-close"
              color="none"
              onClick={() => dispatch(SETVISIBILITY(false))}
            />
          </MDBModalHeader>
          <form onSubmit={handleSubmit} autoComplete="off" id="create-menus">
            <MDBModalBody>
              <ModalForm />
            </MDBModalBody>
            <MDBModalFooter className="py-0">
              <MDBBtn
                type="button"
                className="shadow-0"
                color={theme.color}
                onClick={() => {
                  dispatch(SETVISIBILITY(false));
                  document.getElementById("create-menus").reset();
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
