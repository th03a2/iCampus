import React, { useState, useEffect } from "react";
import { MDBBtn, MDBBtnGroup, MDBIcon } from "mdb-react-ui-kit";
import {
  ENDPOINT,
  fullAddress,
  mobileFormatter,
  nameFormatter,
  getAge,
  PresetUser,
} from "../../../../../../../components/utilities";

export default function TableCard({ user, handleAction }) {
  const [address, setAddress] = useState("");

  useEffect(() => {
    const handleAddress = async () =>
      setAddress(await fullAddress(user.address, false));

    handleAddress();
  }, [user]);

  return (
    <tr>
      <td>
        <div className="d-flex align-items-center">
          <img
            src={`${ENDPOINT}/assets/profile/${user?.email}.jpg`}
            alt={user?.email}
            style={{ width: "45px", height: "45px" }}
            onError={(e) => (e.target.src = PresetUser)}
            className="rounded-circle"
          />
          <div className="ms-3">
            <p className="fw-bold mb-1 text-capitalize">
              {nameFormatter(user?.fullName)}
            </p>
            <p className="text-muted mb-0">{user?.email}</p>
          </div>
        </div>
      </td>
      <td>
        <p className="text-center fw-normal mb-1">
          {user?.isMale ? "Male" : "Female"}
        </p>
      </td>
      <td>
        <p className="text-center fw-normal mb-1">
          {user?.dob}| {getAge(user?.dob, true)}
        </p>
      </td>
      <td>
        <p className="text-center fw-normal mb-1">
          {mobileFormatter(user?.mobile)}
        </p>
      </td>
      <td>
        <p className="text-center fw-normal mb-1">{address || "-"}</p>
      </td>
      <td className="text-center">
        <MDBBtnGroup className="shadow-0">
          <MDBBtn
            onClick={() => handleAction(user, "create")}
            size="sm"
            title="Create transaction."
          >
            <MDBIcon icon="cash-register" />
          </MDBBtn>
          <MDBBtn
            onClick={() => handleAction(user, "view")}
            color="info"
            size="sm"
            title="View history."
          >
            <MDBIcon icon="laptop-medical" />
          </MDBBtn>
        </MDBBtnGroup>
      </td>
    </tr>
  );
}
