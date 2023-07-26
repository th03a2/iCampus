import React, { useState } from "react";
import { MDBBtn, MDBBtnGroup, MDBBadge } from "mdb-react-ui-kit";
import { useDispatch, useSelector } from "react-redux";
import {
  ENDPOINT,
  mobileFormatter,
  nameFormatter,
  PresetUser,
} from "../../../../../../components/utilities";
import { DESTROY } from "../../../../../../redux/slices/assets/sourcing";
import Swal from "sweetalert2";
// import CreateMenu from "./menus";

export default function TableCard({ vendor, index, handleVisibility }) {
  const { theme, token } = useSelector(({ auth }) => auth),
    dispatch = useDispatch();

  return (
    <tr>
      <td>
        <p className="text-capitalize fw-normal mb-1">{index}</p>
      </td>
      <td>
        <p className="text-capitalize text-center fw-normal mb-1">
          {vendor?.name} | {vendor?.companyName}
        </p>
      </td>
      <td>
        <p className="text-center fw-normal mb-1">
          <MDBBadge pill className="text-uppercase">
            {vendor.category}
          </MDBBadge>
        </p>
      </td>
      <td className="text-center">
        <p className="text-muted mb-0">
          {vendor.isApproved ? "Approved" : "Pending"}
        </p>
      </td>
      <td className="text-center">
        <MDBBtnGroup className="shadow-0">
          {/* <CreateMenu id={branch?._id} name={branch.name} /> */}
          <MDBBtn
            onClick={handleVisibility}
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
                  dispatch(DESTROY({ id: vendor._id, token }));
                }
              })
            }
            color={theme.color}
            size="sm"
            title="Archive this branch."
          >
            Breach
          </MDBBtn>
        </MDBBtnGroup>
        {/* <CompaniesUpdate
          data={branch}
          visibility={visibility}
          setVisibility={setVisibility}
        /> */}
      </td>
    </tr>
  );
}
