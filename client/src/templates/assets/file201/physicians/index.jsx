import React from "react";
import { MDBTable, MDBTableHead, MDBTableBody } from "mdb-react-ui-kit";
import { useSelector } from "react-redux";
// import {
//   nameFormatter,
//   paginationHandler,
//   mobileFormatter,
//   PresetUser,
//   ENDPOINT,
// } from "../../components/utilities";
// import { MDBBtn, MDBBtnGroup, MDBIcon } from "mdb-react-ui-kit";

export function TBLphysicians({
  physicians,
  page,
  tagPhysicians,
  untagPhysicians,
}) {
  const { theme, maxPage } = useSelector(({ auth }) => auth);

  return (
    <MDBTable align="middle" hover responsive color={theme.color}>
      <caption>List of pending physicians</caption>
      <caption className="caption-top">
        Total of <b>{physicians?.length}</b> physician(s)
      </caption>
      <MDBTableHead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Image</th>
          <th scope="col">Name</th>
          <th scope="col">DOB/Mobile/Gender</th>
          <th scope="col" className="text-center">
            Actions
          </th>
        </tr>
      </MDBTableHead>
      {/* <MDBTableBody>
        {physicians?.length > 0 ? (
          paginationHandler(physicians, page, maxPage).map(
            (physician, index) => (
              <tr key={physician?._id}>
                <td>{index + 1}</td>
                <td>
                  <img
                    id="my-profile"
                    src={`${ENDPOINT}/public/patron/${physician?.user?.email}/profile.jpg`}
                    alt={physician?.user?.email}
                    height={100}
                    width={100}
                    onError={e => (e.target.src = PresetUser)}
                  />
                </td>
                <td>
                  <p className="fw-bold mb-1">
                    {nameFormatter(physician?.user?.fullName, false)}
                  </p>
                  <p className="text-muted mb-0">{physician?.user?.email}</p>
                </td>
                <td>
                  <p className="fw-bold mb-1 text-capitalize">
                    {new Date(physician?.user?.dob).toDateString()}
                  </p>
                  <p className="text-muted mb-0">
                    {mobileFormatter(physician?.user?.mobile)} |{" "}
                    {physician?.isMale ? "Male" : "Female"}
                  </p>
                </td>
                <td className="text-center">
                  <MDBBtnGroup className="shadow-0">
                    <MDBBtn
                      onClick={() => untagPhysicians(physician._id)}
                      color="danger"
                      size="sm"
                      title="UnTag Physicians"
                    >
                      <MDBIcon icon="user-tag" />
                    </MDBBtn>
                  </MDBBtnGroup>
                </td>
              </tr>
            )
          )
        ) : (
          <tr className="text-center">
            <td colSpan={3}>No Staff accounts.</td>
          </tr>
        )}
      </MDBTableBody> */}
    </MDBTable>
  );
}
