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
  MDBInputGroup,
} from "mdb-react-ui-kit";
import { useDispatch, useSelector } from "react-redux";
import { SAVE, UPDATE } from "../../../../../../redux/slices/assets/sourcing";
import { BROWSE } from "../../../../../../redux/slices/subquery";

export default function SourcingModal({ model, setVisibility, visibility }) {
  const { theme, token, onDuty } = useSelector(({ auth }) => auth),
    { catalogs } = useSelector(({ subquery }) => subquery),
    [loading, setLoading] = useState(false),
    [title, setTitle] = useState("Requesting"),
    dispatch = useDispatch();

  useEffect(() => {
    dispatch(BROWSE({ entity: "assets/branches", token }));
  }, [onDuty]);

  useEffect(() => {
    model?._id && setTitle("Update");
  }, [model]);

  const toggleShow = () => setVisibility(!visibility);

  const handleSubmit = e => {
    e.preventDefault();
    const { vendors } = e.target;

    const data = {
      clients: onDuty._id,
      vendors: vendors.value,
      isApproved: false,
    };
    if (model._id) {
      dispatch(UPDATE({ data, token, id: model._id }));
    } else {
      dispatch(SAVE({ data, token }));
    }
    toggleShow();
  };

  return (
    <MDBModal tabIndex="-1" show={visibility} setShow={setVisibility}>
      <MDBModalDialog centered size="lg" scrollable>
        <MDBModalContent className={`${theme.bg} ${theme.text}`}>
          <MDBModalHeader>
            <MDBModalTitle>{title} Out Source</MDBModalTitle>
            <MDBBtn className="btn-close" color="none" onClick={toggleShow} />
          </MDBModalHeader>
          <form onSubmit={handleSubmit} autoComplete="off" id="tagPersonnel">
            <MDBModalBody>
              <MDBInputGroup
                textBefore={<span className={theme.text}>Vendors</span>}
              >
                <select
                  className="form-select"
                  name="vendors"
                  defaultValue={model?.vendors}
                >
                  {catalogs.map(branch => (
                    <option value={branch?._id}>
                      {branch?.name} | {branch?.companyName}
                    </option>
                  ))}
                </select>
              </MDBInputGroup>
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
