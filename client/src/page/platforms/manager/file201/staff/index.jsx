import React, { useState, useEffect } from "react";
import { MDBCol, MDBContainer, MDBInput, MDBRow } from "mdb-react-ui-kit";
import BreadCrumb from "../../../../../components/breadcrumb";
import Pager from "../../../../../components/pager";
import { BROWSE } from "../../../../../redux/slices/assets/persons/personnels";
import { useDispatch, useSelector } from "react-redux";
import { nameFormatter } from "../../../../../components/utilities";
import { TBLstaff } from "../../../../../templates";
import StaffModal from "./modal";

const path = [
  {
    path: "Staff",
  },
];

export const Staffs = () => {
  const { theme, token, maxPage, onDuty } = useSelector(({ auth }) => auth),
    { catalogs } = useSelector(({ personnels }) => personnels),
    [staffs, setStaff] = useState([]),
    [staffList, setStaffList] = useState([]),
    [visibility, setVisibility] = useState(false),
    [page, setPage] = useState(1),
    [totalPages, setTotalPages] = useState(1),
    dispatch = useDispatch();

  useEffect(() => {
    dispatch(BROWSE({ branch: onDuty._id, token }));
  }, [onDuty]);

  useEffect(() => {
    setStaffList(catalogs);
  }, [catalogs]);

  //Pagination
  useEffect(() => {
    if (catalogs.length > 0) {
      let totalPages = Math.floor(catalogs.length / maxPage);
      if (catalogs.length % maxPage > 0) totalPages += 1;
      setTotalPages(totalPages);
      page > totalPages && setPage(totalPages);
      setStaff(catalogs);
    }
  }, [catalogs, maxPage, page]);

  const handleSearch = (string) => {
    // catalogs.filter((staff) => {}); //para san to
    if (string) {
      // const staffs = catalogs.filter(user => user.roles.length < 1);

      const staffs = catalogs.filter((staff) =>
        nameFormatter(staff.user.fullName)
          .toLowerCase()
          .startsWith(string.toLowerCase())
      );

      setStaff(staffs);
    } else {
      setStaff(staffs);
    }
  };

  return (
    <>
      <BreadCrumb
        title="Employees"
        setStaff
        paths={path}
        visibility={visibility}
        setVisibility={setVisibility}
        button={true}
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
        <TBLstaff staffs={staffs} page={page} />
        <StaffModal
          visibility={visibility}
          setVisibility={setVisibility}
          users={staffs}
          staffList={staffList}
        />
      </MDBContainer>
    </>
  );
};
