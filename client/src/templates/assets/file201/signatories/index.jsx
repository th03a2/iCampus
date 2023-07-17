import React from "react";
import { MDBTable, MDBTableHead, MDBTableBody } from "mdb-react-ui-kit";
import { useSelector } from "react-redux";
import Avatar from "../../../../widgets/profile/avatar";
import Signatory from "../../../../widgets/profile/signatory";
import {
  nameFormatter,
  paginationHandler,
} from "../../../../components/utilities";
import { MDBBtn, MDBIcon } from "mdb-react-ui-kit";

export function TBLsignatories({ signatories, page, uploadSignature }) {
  const { theme, maxPage } = useSelector(({ auth }) => auth);

  return (
    <MDBTable align="middle" hover responsive color={theme.color}>
      <caption>List of Signatories</caption>
      <caption className="caption-top">
        Total of <b>{signatories?.length}</b> signatorie(s)
      </caption>
      <MDBTableHead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Profile</th>
          <th scope="col">Name</th>
          <th scope="col">Designation</th>
          <th scope="col">E-Signature</th>
          <th scope="col" className="text-center">
            Actions
          </th>
        </tr>
      </MDBTableHead>
      <MDBTableBody>
        {signatories?.length > 0 ? (
          paginationHandler(signatories, page, maxPage).map(
            (signatory, index) => (
              <tr key={signatory?._id}>
                <td>{index + 1}</td>
                <td>
                  <Avatar
                    email={signatory?.employee?.email}
                    gender={signatory?.employee?.isMale}
                  />
                </td>
                <td>
                  <p className="fw-bold mb-1">
                    {nameFormatter(signatory?.employee?.fullName, false)}
                  </p>
                  <p className="text-muted mb-0">
                    {signatory?.employee?.email}
                  </p>
                  <p className="text-muted mb-0">
                    {signatory?.employee?.mobile}
                  </p>
                </td>
                <td>
                  <p className="fw-bold mb-1 text-capitalize">
                    {signatory?.section}
                  </p>
                </td>
                <td>
                  <Signatory email={signatory?.employee?.email} />
                </td>
                <td>
                  <MDBBtn
                    onClick={() =>
                      document
                        .getElementById(
                          `signatures-${signatory?.employee?.email}`
                        )
                        .click()
                    }
                    color="info"
                    size="sm"
                    title="Upload"
                  >
                    <MDBIcon icon="upload" />
                  </MDBBtn>

                  <input
                    type="file"
                    onChange={(e) =>
                      uploadSignature(
                        e.target.files[0],
                        signatory?.employee?.email
                      )
                    }
                    id={`signatures-${signatory?.employee?.email}`}
                    className="d-none"
                  />
                </td>
              </tr>
            )
          )
        ) : (
          <tr className="text-center">
            <td colSpan={3}>No Signatories.</td>
          </tr>
        )}
      </MDBTableBody>
    </MDBTable>
  );
}
