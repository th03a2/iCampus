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
import { REVERT, UPDATE } from "../../../../../../redux/slices/assets/branches";
import ModalForm from "./form";

export default function CompaniesUpdate({ data, setVisibility, visibility }) {
  const { theme, token } = useSelector(({ auth }) => auth),
    { didUpdate } = useSelector(({ branches }) => branches),
    [loading, setLoading] = useState(false),
    dispatch = useDispatch();

  const toggleShow = () => setVisibility(!visibility);

  useEffect(() => {
    if (didUpdate && visibility) {
      setLoading(false);
      dispatch(REVERT());
      toggleShow();
    }
  }, [didUpdate, visibility]);

  const handleSubmit = e => {
    e.preventDefault();
    setLoading(true);

    const {
      name,
      mobile,
      email,
      region,
      province,
      city,
      barangay,
      street,
      tin,
      quota,
      classification,
    } = e.target;

    const form = {
      name: name.value,
      address: {
        region: region.value,
        province: province.value,
        city: city.value,
        barangay: barangay.value,
        street: street.value,
      },
      contacts: {
        mobile: mobile.value,
        email: email.value,
      },
      credentials: {
        tin: tin.value,
        quota: quota.value,
        classification: classification.value,
      },
    };

    dispatch(UPDATE({ data: form, token, id: data._id }));
  };

  return (
    <MDBModal tabIndex="-1" show={visibility} setShow={setVisibility}>
      <MDBModalDialog centered size="lg" scrollable>
        <MDBModalContent className={`${theme.bg} ${theme.text}`}>
          <MDBModalHeader>
            <MDBModalTitle>Register a Company</MDBModalTitle>
            <MDBBtn className="btn-close" color="none" onClick={toggleShow} />
          </MDBModalHeader>
          <form
            onSubmit={handleSubmit}
            autoComplete="off"
            id={`updateBranch-${data._id}`}
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
                  document.getElementById(`updateBranch-${data._id}`).reset();
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
