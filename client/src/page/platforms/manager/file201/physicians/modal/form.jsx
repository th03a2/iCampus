import React, { useState, useEffect } from "react";
import {
  MDBTable,
  MDBTableHead,
  MDBTableBody,
  MDBIcon,
  MDBBtn,
  MDBBtnGroup,
} from "mdb-react-ui-kit";
import { useSelector, useDispatch } from "react-redux";
import { BROWSE } from "../../../../../../redux/slices/subquery";
import {
  nameFormatter,
  mobileFormatter,
  PresetUser,
  ENDPOINT,
} from "../../../../../../components/utilities";

export default function ModalForm({ affiliated }) {
  const { theme, onDuty, token } = useSelector(({ auth }) => auth),
    [physicians, setPhysicians] = useState([]),
    { catalogs } = useSelector(({ subquery }) => subquery),
    dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      BROWSE({
        entity: "assets/persons/physicians",
        token,
      })
    );
  }, [onDuty]);
  useEffect(() => {
    if (catalogs.length > 0) {
      const _physician = catalogs?.filter(
        catalog => !affiliated?.find(a => a.user._id === catalog._id)
      );
      setPhysicians(_physician);
    }
  }, [catalogs, affiliated]);

  const handleSearch = string => {
    if (string) {
      const doctor = catalogs.filter(physician =>
        nameFormatter(physician.user.fullName)
          .toLowerCase()
          .startsWith(string.toLowerCase())
      );

      setPhysicians(doctor);
    } else {
      setPhysicians(catalogs);
    }
  };

  const tagPhysicians = id => {
    console.log(id);
  };

  return (
    <MDBTable align="middle" hover responsive color={theme.color}>
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
      <MDBTableBody>
        {/* {catalogs?.length > 0 ? (
          physicians?.map((catalog, index) => {
            // <tr key={catalog?._id}>
            //   <td>{index + 1}</td>
            //   <td>
            //     <img
            //       id="my-profile"
            //       src={`${ENDPOINT}/public/patron/${catalog?.email}/profile.jpg`}
            //       alt={catalog?.email}
            //       height={100}
            //       width={100}
            //       onError={(e) => (e.target.src = PresetUser)}
            //     />
            //   </td>
            //   <td>
            //     <p className="fw-bold mb-1">
            //       {nameFormatter(catalog?.fullName, false)}
            //     </p>
            //     <p className="text-muted mb-0">{catalog?.email}</p>
            //   </td>
            //   <td>
            //     <p className="fw-bold mb-1 text-capitalize">
            //       {new Date(catalog?.dob).toDateString()}
            //     </p>
            //     <p className="text-muted mb-0">
            //       {mobileFormatter(catalog?.mobile)} |{" "}
            //       {catalog?.isMale ? "Male" : "Female"}
            //     </p>
            //   </td>
            //   <td className="text-center">
            //     <MDBBtnGroup className="shadow-0">
            //       <MDBBtn
            //         onClick={() => tagPhysicians(catalog._id)}
            //         color="success"
            //         size="sm"
            //         type="button"
            //         title="Tag Physicians"
            //       >
            //         <MDBIcon icon="user-tag" />
            //       </MDBBtn>
            //     </MDBBtnGroup>
            //   </td>
            // </tr>
          })
        ) : (
          <tr className="text-center">
            <td colSpan={3}>No Staff accounts.</td>
          </tr>
        )} */}
      </MDBTableBody>
    </MDBTable>
  );
}
