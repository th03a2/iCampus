import React, { useState, useEffect } from "react";
import { MDBCol, MDBContainer, MDBInput, MDBRow } from "mdb-react-ui-kit";
import BreadCrumb from "../../../../../components/breadcrumb";
import Pager from "../../../../../components/pager";
import { BROWSE } from "../../../../../redux/slices/query";
import { useDispatch, useSelector } from "react-redux";
import { nameFormatter } from "../../../../../components/utilities";
import { TBLphysicians } from "../../../../../templates";
import PhysicianModal from "./modal";
const path = [
  {
    path: "Physicians",
  },
];

export const Physicians = () => {
  const { theme, token, maxPage, onDuty } = useSelector(({ auth }) => auth),
    { catalogs } = useSelector(({ query }) => query),
    [physicians, setPhysicians] = useState([]),
    [visibility, setVisibility] = useState(false),
    [page, setPage] = useState(1),
    [totalPages, setTotalPages] = useState(1),
    dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      BROWSE({
        entity: "assets/persons/physicians",
        branch: onDuty._id,
        token,
      })
    );
  }, [onDuty]);

  //Pagination
  useEffect(() => {
    if (catalogs.length > 0) {
      let totalPages = Math.floor(catalogs.length / maxPage);
      if (catalogs.length % maxPage > 0) totalPages += 1;
      setTotalPages(totalPages);
      page > totalPages && setPage(totalPages);
      setPhysicians(catalogs);
    }
  }, [catalogs, maxPage, page]);

  const handleSearch = (string) => {
    if (string) {
      const doctor = catalogs.filter((physician) =>
        nameFormatter(physician.user.fullName)
          .toLowerCase()
          .startsWith(string.toLowerCase())
      );

      setPhysicians(doctor);
    } else {
      setPhysicians(catalogs);
    }
  };
  const tagPhysicians = (id) => {
    // dispatch(
    //   UPDATE({
    //     id,
    //     token,
    //     data: {
    //       roles: {
    //         branchId: onDuty._id,
    //         name: "physician",
    //         role: "Physician",
    //       },
    //     },
    //   })
    // );
  };

  const untagPhysicians = (id) => {
    // dispatch(
    //   UPDATE({
    //     id,
    //     token,
    //     data: {
    //       roles: {
    //         branchId: "patron",
    //         name: "Patron",
    //         role: "patron",
    //       },
    //     },
    //   })
    // );
  };
  return (
    <>
      <BreadCrumb
        title="Physicians"
        paths={path}
        handler={setVisibility}
        button={true}
        tooltip="Tag New Physician"
      />
      <MDBContainer className="py-5 mt-4">
        <MDBRow className="mb-3">
          <MDBCol md={6}>
            <MDBInput
              onChange={(e) => handleSearch(e.target.value)}
              type="search"
              label="Search by Fullname"
              contrast={theme.dark}
            />
          </MDBCol>
          <Pager setPage={setPage} total={totalPages} page={page} />
        </MDBRow>
        <TBLphysicians
          physicians={physicians}
          page={page}
          tagPhysicians={tagPhysicians}
          untagPhysicians={untagPhysicians}
        />
        <PhysicianModal
          affiliated={physicians}
          visibility={visibility}
          setVisibility={setVisibility}
        />
      </MDBContainer>
    </>
  );
};
