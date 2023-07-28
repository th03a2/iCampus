import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import Table from "../table";
import {
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
} from "mdb-react-ui-kit";
import { useDispatch, useSelector } from "react-redux";
import {
  BROWSE,
  UPDATE,
  SAVE,
} from "../../../../../redux/slices/responsibilities/access";
import { nameFormatter } from "../../../../../components/utilities";

import platform from "../../../../../fakeDb/json/platforms.json";

export default function Modal({
  setVisibility,
  visibility,
  userId,
  branchId,
  fullName,
}) {
  const { catalogs } = useSelector(({ access }) => access),
    { token, auth, onDuty } = useSelector(({ auth }) => auth),
    [access, setAccess] = useState([]),
    [platforms, setPlatforms] = useState([]), //["headquarter"]
    dispatch = useDispatch();

  const toggleShow = () => setVisibility(!visibility);

  useEffect(() => {
    if (access) {
      const choosen = Array.from(
        new Set(access?.map(({ flatform }) => flatform))
      );
      const newChoosen = ["headquarter", "student", ...choosen];

      const _platforms = platform
        .filter(({ code }) => !newChoosen.includes(code))
        .map(({ code }) => code);

      setPlatforms([..._platforms]);
    }
  }, [access]);

  useEffect(() => {
    dispatch(BROWSE({ data: { branchId, userId }, token }));
  }, [dispatch, branchId, userId, token]);

  useEffect(() => {
    setAccess(catalogs);
  }, [catalogs]);

  const handleApproval = (id, platform, status) => {
    dispatch(
      UPDATE({
        data: { status: status ? false : true, approvedBy: auth._id, platform },
        token,
        id,
      })
    );
  };

  const selectedOption = (platform) => {
    dispatch(
      SAVE({
        form: {
          branchId: onDuty._id,
          userId,
          approvedBy: auth._id,
          platform,
        },
        token,
      })
    );
    Swal.fire({
      title: "Successfully",
      text: `${platform} Successfully Added`,
      icon: "success",
      timer: 4000,
    });
  };

  const handleConfirmation = () => {
    Swal.fire({
      title: "Select an option",
      input: "select",
      inputOptions: platforms,
      inputPlaceholder: "Select platform",
      showCancelButton: true,
      confirmButtonText: "Add",
    }).then((result) => {
      if (result.isConfirmed) {
        selectedOption(platforms[result.value]);
      }
    });
  };
  return (
    <MDBModal tabIndex="-1" show={visibility} setShow={setVisibility}>
      <MDBModalDialog size="xl" scrollable>
        <MDBModalContent>
          <MDBModalHeader>
            <MDBModalTitle>
              {nameFormatter(fullName)}
              <MDBBtn onClick={handleConfirmation} className="pl-2" size="sm">
                Add access
              </MDBBtn>
            </MDBModalTitle>
            <MDBBtn className="btn-close" color="none" onClick={toggleShow} />
          </MDBModalHeader>
          <MDBModalBody>
            <Table handleApproval={handleApproval} access={access} />
          </MDBModalBody>
          <MDBModalFooter className="py-0">
            <MDBBtn type="button" className="shadow-0" onClick={toggleShow}>
              Close
            </MDBBtn>
          </MDBModalFooter>
        </MDBModalContent>
      </MDBModalDialog>
    </MDBModal>
  );
}
