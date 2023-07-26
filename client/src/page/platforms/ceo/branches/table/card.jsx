import React, { useState } from "react";
import { MDBBtn, MDBBtnGroup, MDBBadge } from "mdb-react-ui-kit";
import { useDispatch, useSelector } from "react-redux";
import {
  ENDPOINT,
  mobileFormatter,
  nameFormatter,
  PresetUser,
} from "../../../../../components/utilities";
import CompaniesUpdate from "./update";
import { DESTROY } from "../../../../../redux/slices/assets/branches";
import Swal from "sweetalert2";
// import CreateMenu from "./menus";

export default function TableCard({ branch }) {
  const { theme, token } = useSelector(({ auth }) => auth),
    [visibility, setVisibility] = useState(false),
    dispatch = useDispatch();

  const handleToggle = () => setVisibility(!visibility);

  return (
    <tr>
      <td>
        <p className="text-capitalize fw-normal mb-1">{branch?.name}</p>
      </td>
      <td>
        <p className="text-center fw-normal mb-1">
          <MDBBadge
            color={
              branch.credentials?.classification === "tertiary"
                ? "warning"
                : branch.credentials?.classification
            }
            pill
            className="text-uppercase"
          >
            {branch.credentials?.classification}
          </MDBBadge>
        </p>
      </td>
      {branch.managerId ? (
        <td>
          <div className="d-flex align-items-center">
            <img
              src={`${ENDPOINT}/assets/profile/${branch.managerId?.email}.jpg`}
              alt={branch.managerId?.email}
              style={{ width: "45px", height: "45px" }}
              onError={e => (e.target.src = PresetUser)}
              className="rounded-circle"
            />
            <div className="ms-3">
              <p className="fw-bold mb-1">
                {nameFormatter(branch.managerId?.fullName)}
              </p>
              <p className="text-muted mb-0">{branch.managerId?.email}</p>
            </div>
          </div>
        </td>
      ) : (
        <td className="text-center">
          <i>TBA</i>
        </td>
      )}
      <td className="text-center">
        <p className="fw-bold mb-1">{branch.contacts?.email}</p>
        <p className="text-muted mb-0">
          {mobileFormatter(branch.contacts?.mobile)}
        </p>
      </td>
      <td className="text-center">
        <MDBBtnGroup className="shadow-0">
          {/* <CreateMenu id={branch?._id} name={branch?.name} /> */}
          <MDBBtn
            onClick={handleToggle}
            color="info"
            size="sm"
            title="Update information."
          >
            update
          </MDBBtn>
          <MDBBtn
            onClick={() =>
              Swal.fire({
                icon: "warning",
                title: "Are you sure?",
                html: `You won't be able to revert this!`,
                showCancelButton: true,
                confirmButtonText: "Yes, continue!",
              }).then(result => {
                if (result.isConfirmed) {
                  dispatch(DESTROY({ id: branch._id, token }));
                }
              })
            }
            color={theme.color}
            size="sm"
            title="Archive this branch."
          >
            archive
          </MDBBtn>
        </MDBBtnGroup>
        <CompaniesUpdate
          data={branch}
          visibility={visibility}
          setVisibility={setVisibility}
        />
      </td>
    </tr>
  );
}
