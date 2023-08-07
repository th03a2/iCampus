import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { MDBContainer, MDBRow, MDBCol, MDBInput } from "mdb-react-ui-kit";
import Pager from "../../../../components/pager";
import BreadCrumb from "../../../../components/breadcrumb";
import { BROWSE } from "../../../../redux/slices/assets/enrollment";
import { TBLenrollment } from "../../../../templates";
import Modal from "./modal";

const path = [
  {
    path: "Enrollment",
  },
];

export default function Enrollment() {
  const { token, maxPage, theme, onDuty } = useSelector(({ auth }) => auth),
    { catalogs } = useSelector(({ enrollment }) => enrollment),
    [visibility, setVisibility] = useState(false),
    [schools, setSchools] = useState([]),
    [schoolInformation, setSchoolInformation] = useState({}),
    [page, setPage] = useState(1),
    [totalPages, setTotalPages] = useState(1),
    dispatch = useDispatch();

  useEffect(() => {
    if (onDuty._id) {
      dispatch(
        BROWSE({
          branch: onDuty._id,
          token,
        })
      );
    }
  }, [dispatch, token, onDuty._id]);

  useEffect(() => {
    setSchools(catalogs);
  }, [catalogs]);

  useEffect(() => {
    if (schools.length > 0) {
      let totalPages = Math.floor(schools.length / maxPage);
      if (schools.length % maxPage > 0) totalPages += 1;
      setTotalPages(totalPages);

      page > totalPages && setPage(totalPages);
    }
  }, [schools, page, maxPage]);

  return (
    <>
      <BreadCrumb
        title="Enrollment"
        button={false}
        handler={setVisibility}
        visibility={visibility}
        paths={path}
      />
      <MDBContainer className="py-5 mt-5">
        <MDBRow className="mb-3">
          <MDBCol md={6}>
            <MDBInput
              // onChange={e => handleSearch(e.target.value)}
              type="search"
              label="Search by Grade level"
              contrast={theme.dark}
            />
          </MDBCol>
          <Pager setPage={setPage} total={totalPages} page={page} />
        </MDBRow>
        <TBLenrollment
          schools={schools}
          page={page}
          setSchoolInformation={setSchoolInformation}
          setVisibility={setVisibility}
        />
        {visibility && (
          <Modal
            visibility={visibility}
            setVisibility={setVisibility}
            schoolInformation={schoolInformation}
          />
        )}
      </MDBContainer>
    </>
  );
}
