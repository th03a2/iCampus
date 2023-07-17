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

export default function TableCard({ user, handleAction, handleVisible }) {
  return (
    <tr>
      <td>
        <div className="d-flex align-items-center">
          <img
            src={`${ENDPOINT}/assets/profile/${user?.email}.jpg`}
            alt={user?.email}
            style={{ width: "45px", height: "45px" }}
            onError={e => (e.target.src = PresetUser)}
            className="rounded-circle"
          />
          <div className="ms-3">
            <p className="fw-bold mb-1 text-capitalize">
              {nameFormatter(user?.fullName)}

              <MDBIcon onClick={() => handleVisible(user)} icon="pencil-alt" />
            </p>
            <p className="text-muted mb-0">{user?.email}</p>
          </div>
        </div>
      </td>
      <td>
        <p className="fw-bold mb-1">
          {getAge(user?.dob, true)}
          <MDBIcon
            icon={user.isMale ? "mars" : "venus"}
            className={`text-${user.isMale ? "success" : "danger"}`}
          />
        </p>
        <p className="text-muted mb-0">{user?.dob}</p>
      </td>
      <td>
        <p className="text-center fw-normal mb-1">
          {mobileFormatter(user?.mobile)}
        </p>
      </td>
      <td>
        <p className="text-center fw-normal mb-1">
          {fullAddress(user.address, false)}
        </p>
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
