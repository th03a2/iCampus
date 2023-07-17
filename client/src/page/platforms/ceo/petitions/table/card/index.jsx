import React, { useState, useEffect } from "react";
import { MDBBtn, MDBBtnGroup } from "mdb-react-ui-kit";
import { useSelector } from "react-redux";
import {
  ENDPOINT,
  nameFormatter,
  PresetUser,
} from "../../../../../../components/utilities";
import Swal from "sweetalert2";

const availableRoles = [
  { role: "manager", name: "Manager" },
  { role: "doctor", name: "Physician" },
  { role: "medtech", name: "Medical Technologist" },
  { role: "tech", name: "Medical Technician" },
  { role: "phlebotomist", name: "Phlebotomist" },
  { role: "cashier", name: "Cashier" },
];

export default function TableCard({ petition, handleAction }) {
  const { theme } = useSelector(({ auth }) => auth),
    [selectedRole, setSelectedRole] = useState("");

  const handleMessage = () =>
    Swal.fire({
      icon: "info",
      text: petition.message,
    });

  useEffect(() => {
    if (petition._id) {
      setSelectedRole(availableRoles.find(role => role.role === petition.role));
    }
  }, [petition]);

  return (
    <tr>
      <td>
        <div className="d-flex align-items-center">
          <img
            src={`${ENDPOINT}/assets/profile/${petition.userId?.email}.jpg`}
            alt={petition.userId?.email}
            style={{ width: "45px", height: "45px" }}
            onError={e => (e.target.src = PresetUser)}
            className="rounded-circle"
          />
          <div className="ms-3">
            <p className="fw-bold mb-1">
              {nameFormatter(petition.userId?.fullName)}
            </p>
            <p className="text-muted mb-0">{petition.userId?.email}</p>
          </div>
        </div>
      </td>
      <td>
        <div className="d-flex align-items-center">
          <img
            src={`${ENDPOINT}/assets/companies/${petition.branchId?.name}.jpg`}
            alt={petition.userId?.email}
            style={{ width: "45px", height: "45px" }}
            onError={e => (e.target.src = PresetUser)}
            className="rounded-circle"
          />
          <div className="ms-3">
            <p className="fw-bold mb-1">{petition.branchId?.name}</p>
            <p className="text-muted mb-0">
              As a <span className="text-info">{selectedRole.name}</span>
            </p>
          </div>
        </div>
      </td>
      <td>
        <p className="text-center fw-normal mb-1">
          {new Date(petition.createdAt).toLocaleString()}
        </p>
      </td>
      <td className="text-center">
        <MDBBtnGroup className="shadow-0">
          {petition.message && (
            <MDBBtn
              onClick={handleMessage}
              color="info"
              size="sm"
              title="Attached message by user"
            >
              memo
            </MDBBtn>
          )}
          <MDBBtn
            onClick={() =>
              handleAction(
                nameFormatter(petition.userId?.fullName),
                petition._id,
                "approved",
                petition.userId?._id,
                petition.userId?.roles,
                petition.companyId?._id,
                petition.companyId?.name,
                petition.branchId?._id,
                petition.branchId?.name,
                petition.role
              )
            }
            color="success"
            size="sm"
            title="Update information."
          >
            approve
          </MDBBtn>
          <MDBBtn
            onClick={() =>
              handleAction(
                nameFormatter(petition.userId?.fullName),
                petition._id,
                "denied",
                petition.userId?._id,
                "",
                "",
                petition.companyId?.name,
                "",
                petition.branchId?.name,
                ""
              )
            }
            color={theme.color}
            size="sm"
            title="Deny request."
          >
            deny
          </MDBBtn>
        </MDBBtnGroup>
      </td>
    </tr>
  );
}
