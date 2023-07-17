import React, { useState } from "react";
import {
  MDBTable,
  MDBTableHead,
  MDBTableBody,
  MDBBtnGroup,
  MDBBtn,
  MDBTooltip,
} from "mdb-react-ui-kit";
import { useSelector, useDispatch } from "react-redux";
import {
  nameFormatter,
  paginationHandler,
  PresetUser,
  ENDPOINT,
} from "../../../../components/utilities";
import Swal from "sweetalert2";
import { DESTROY } from "../../../../redux/slices/query";
import { UPLOAD } from "../../../../redux/slices/assets/persons/auth";

export function TBLheads({ heads, page, handleToggle }) {
  const { token, theme, maxPage } = useSelector(({ auth }) => auth),
    [email, setEmail] = useState(),
    dispatch = useDispatch();

  const handleSignature = e => {
    const reader = new FileReader();
    reader.onload = e => {
      let image = new Image();
      image.src = e.target.result;

      image.onload = function () {
        dispatch(
          UPLOAD({
            data: {
              path: `patron/${email}`,
              base64: reader.result.split(",")[1],
              name: `signature.png`,
            },
            token,
          })
        );
      };
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  return (
    <>
      <MDBTable align="middle" hover responsive color={theme.color}>
        <caption>List of pending heads</caption>
        <caption className="caption-top">
          Total of <b>{heads?.length}</b> head(s)
        </caption>
        <MDBTableHead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Image</th>
            <th scope="col">Staff</th>
            <th scope="col">License</th>
            <th scope="col">Signature</th>
            <th scope="col" className="text-center">
              Action
            </th>
          </tr>
        </MDBTableHead>
        <MDBTableBody>
          {heads?.length > 0 ? (
            paginationHandler(heads, page, maxPage).map((head, index) => (
              <tr key={head?._id}>
                <td>{index + 1}</td>
                <td>
                  <img
                    id="profile"
                    src={`${ENDPOINT}/public/patron/${head?.user?.email}/profile.jpg`}
                    alt={head?.user?.email}
                    style={{ borderRadius: "50px" }}
                    height={100}
                    width={100}
                    onError={e => (e.target.src = PresetUser)}
                  />
                </td>
                <td>
                  <p className="fw-bold mb-1 text-capitalize">
                    {nameFormatter(head?.user?.fullName, false)}
                  </p>
                  <p className="text-muted mb-0">
                    <p className="text-muted mb-0">
                      {head?.section} | {head?.department}
                    </p>
                  </p>
                </td>
                <td>
                  <p className="fw-bold mb-1 text-capitalize">
                    {head?.user?.prc?.id}
                  </p>
                  <p className="text-muted mb-0">
                    <p className="text-muted mb-0">
                      Expiration : {head?.user?.prc?.to}
                    </p>
                  </p>
                </td>
                <td>
                  <MDBTooltip
                    tag="span"
                    wrapperClass="d-inline-block"
                    title="Change e-Signature!"
                    placement="bottom"
                  >
                    <img
                      id="signature"
                      src={`${ENDPOINT}/public/patron/${head?.user?.email}/signature.png`}
                      alt={head?.user?.email} //"Not found.."
                      height={50}
                      width={50}
                    />
                    <label
                      htmlFor="upload-signature"
                      className="mt-2 btn btn-info btn-sm"
                      onClick={() => setEmail(head?.user?.email)}
                    >
                      Upload e-Signature
                    </label>
                  </MDBTooltip>
                </td>
                <td className="text-center">
                  <MDBBtnGroup className="shadow-0">
                    <MDBBtn
                      onClick={() => handleToggle(head)}
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
                            dispatch(
                              DESTROY({
                                entity: "assets/persons/heads",
                                id: head._id,
                                token,
                              })
                            );
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
                </td>
              </tr>
            ))
          ) : (
            <tr className="text-center" style={{ height: "280px" }}>
              <td colSpan={4}>
                <h2>No Tag Section Heads.</h2>
              </td>
            </tr>
          )}
        </MDBTableBody>
      </MDBTable>
      <input
        id="upload-signature"
        onChange={handleSignature}
        className="d-none"
        type="file"
        accept="image/*"
      />
    </>
  );
}
