import React from "react";
import {
  MDBTable,
  MDBTableHead,
  MDBTableBody,
  MDBBtnGroup,
  MDBBtn,
  MDBBadge,
} from "mdb-react-ui-kit";
import { useSelector } from "react-redux";
import {
  nameFormatter,
  paginationHandler,
  PresetUser,
  ENDPOINT,
} from "../../../../components/utilities";
import { Role } from "../../../../fakeDb";

export function TBLemployee({ page, handleAccess }) {
  const { theme, maxPage } = useSelector(({ auth }) => auth),
    { catalogs } = useSelector(({ personnels }) => personnels);

  return (
    <>
      <MDBTable align="middle" hover responsive color={theme.color}>
        <caption>List of Employees</caption>
        <caption className="caption-top">
          Total of <b>{catalogs?.length}</b> Employee(s)
        </caption>
        <MDBTableHead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Image</th>
            <th scope="col">Name</th>
            <th scope="col">PRC</th>
            <th scope="col" className="text-center">
              Action
            </th>
          </tr>
        </MDBTableHead>
        <MDBTableBody>
          {!!catalogs?.length ? (
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
                        {Role.find(petitioner?.designation)?.name} |{" "}
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
                  <td>
                    <p className="fw-bold mb-1 text-capitalize">
                      {petitioner?.user?.prc?.id}
                    </p>
                    <p className="text-muted mb-0">
                      <p className="text-muted mb-0">
                        Expiration : {petitioner?.user?.prc?.to}
                      </p>
                    </p>
                  </td>
                  <td className="text-center">
                    <MDBBtnGroup className="shadow-0">
                      <MDBBtn
                        type="button"
                        onClick={() =>
                          handleAccess(
                            true,
                            petitioner.branch,
                            petitioner.user._id,
                            petitioner.user.fullName
                          )
                        }
                      >
                        Access
                      </MDBBtn>
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
