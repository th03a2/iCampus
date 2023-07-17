import React from "react";
import {
  MDBTable,
  MDBTableHead,
  MDBTableBody,
  MDBBtnGroup,
  MDBBtn,
  MDBBadge,
} from "mdb-react-ui-kit";
import { useSelector, useDispatch } from "react-redux";
import {
  nameFormatter,
  paginationHandler,
  PresetUser,
  ENDPOINT,
} from "../../../../components/utilities";
import { Role } from "../../../../fakeDb";

export function TBLpetitioners({ page, handleStatus }) {
  const { token, theme, maxPage, auth } = useSelector(({ auth }) => auth),
    { catalogs } = useSelector(({ personnels }) => personnels),
    dispatch = useDispatch();

  return (
    <>
      <MDBTable align="middle" hover responsive color={theme.color}>
        <caption>List of pending petitioners</caption>
        <caption className="caption-top">
          Total of <b>{catalogs?.length}</b> petitioners(s)
        </caption>
        <MDBTableHead>
          <tr>
            <th>#</th>
            <th>Image</th>
            <th>Name</th>
            <th>PDS</th>
            <th>Resume</th>
            <th>Letter</th>
            <th>PRC</th>
            <th>Message</th>
            <th className="text-center">Action</th>
          </tr>
        </MDBTableHead>
        <MDBTableBody>
          {catalogs?.length > 0 ? (
            paginationHandler(catalogs, page, maxPage).map(
              (petitioner, index) => (
                <tr key={petitioner?._id}>
                  <td>{index + 1}</td>
                  <td>
                    <img
                      id="profile"
                      src={`${ENDPOINT}/public/patron/${petitioner?.user?.email}/profile.jpg`}
                      alt={petitioner?.user?.email}
                      style={{ borderRadius: "50px" }}
                      height={100}
                      width={100}
                      onError={(e) => (e.target.src = PresetUser)}
                    />
                  </td>
                  <td>
                    <p className="fw-bold mb-1 text-capitalize">
                      {nameFormatter(petitioner?.user?.fullName, false)}
                    </p>
                    <p className="text-muted mb-0">
                      <p className="text-muted mb-0">
                        {Role.find(petitioner?.designation).name} |{" "}
                        <MDBBadge
                          color={
                            petitioner.status === "banned" ? "danger" : "info"
                          }
                          pill
                        >
                          {petitioner?.status}
                        </MDBBadge>
                      </p>
                    </p>
                  </td>
                  <td>{petitioner.hasPds && " has PDS"}</td>
                  <td>{petitioner.hasResume && "has Resume"}</td>
                  <td>{petitioner.hasLetter && "has Letter"}</td>
                  <td>
                    {petitioner?.user?.prc && (
                      <>
                        <p className="fw-bold mb-1 text-capitalize">
                          {petitioner?.user?.prc?.id}
                        </p>
                        <p className="text-muted mb-0">
                          <p className="text-muted mb-0">
                            Expiration : {petitioner?.user?.prc?.to}
                          </p>
                        </p>
                      </>
                    )}
                  </td>
                  <td>{petitioner.message}</td>
                  <td className="text-center">
                    <MDBBtnGroup className="shadow-0">
                      <MDBBtn
                        onClick={() =>
                          handleStatus({ id: petitioner._id, status: "active" })
                        }
                        color="info"
                        size="sm"
                        title="Approve this application."
                      >
                        Approve
                      </MDBBtn>
                      {petitioner.status === "banned" || (
                        <MDBBtn
                          onClick={() =>
                            handleStatus({
                              id: petitioner._id,
                              status: "banned",
                            })
                          }
                          color={theme.color}
                          size="sm"
                          title="Deny this application."
                        >
                          Deny
                        </MDBBtn>
                      )}
                    </MDBBtnGroup>
                  </td>
                </tr>
              )
            )
          ) : (
            <tr className="text-center" style={{ height: "280px" }}>
              <td colSpan={4}>
                <h2>No Applicants.</h2>
              </td>
            </tr>
          )}
        </MDBTableBody>
      </MDBTable>
    </>
  );
}
